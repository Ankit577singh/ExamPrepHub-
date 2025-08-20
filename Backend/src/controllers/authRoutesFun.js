const User = require('../model/userScema');
const bcrypt = require('bcrypt');      // for storing password in hashcode formate 
const jwt = require('jsonwebtoken');   // for give jwt token to user
const validation = require('../util/validation');
const transporter = require('../config/nodemailer');
const {EMAIL_VERIFY_TEMPLATE,PASSWORD_RESET_TEMPLATE,RAGISTER_EMAIL,VERIFIED_ACCOUNT} = require('../config/email.template');

async function register(req, res) {
  try {
        // console.log("📩 Register API hit with data:", req.body);
    validation(req.body);
    

    const { name, email, password } = req.body;
    req.body.password = await bcrypt.hash(password, 10);

    const user = await User.create(req.body);

    const token = jwt.sign(
      { _id: user._id, email: email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: 60 * 60 }
    );

    res.cookie("token", token, {
     httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
          maxAge:  60 * 60 * 1000, 
            domain: process.env.NODE_ENV === 'production'?process.env.COOKIE_DOMAIN:'undefined'
    } );

    // safe mail send
    try {
      const mail = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: "Welcome to ExamPrepHub",
        // text: `Hi ${name}, welcome to ExamPrepHub. Your account has been created with ${email}`,
        html : RAGISTER_EMAIL.replace("{{name}}",name).replace("{{email}}",email).replace("{{url}}",process.env.FRONTEND_URL)
      };
      await transporter.sendMail(mail);
    } catch (mailErr) {
      console.error("Email send failed:", mailErr.message);
    }

    return res.json({ success: true, message: "User register successfully"});
  } catch (err) {
    console.error("Register error:", err.message);
    return res
      .status(500)
      .json({ success: false, message: err.message || "Server error" });
  }
}


async function login(req, res)  {
  try {
    const { email, password } = req.body;

    if (!email || !password) throw new Error('Invalid Credentials');

    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid Email');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Invalid Password');

    const token = jwt.sign(
      { _id: user._id, email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: 60 * 60 } // 1 hour
    );

    // ✅ Set secure, cross-domain cookie
    res.cookie('token', token, {
      httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
          maxAge:  60 * 60 * 1000, 
          domain: process.env.NODE_ENV === 'production'?process.env.COOKIE_DOMAIN:'undefined'
    });

    res.status(200).json({ success: true, message: 'Login successful' });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

async function logout(req, res) {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(400).json({ success: false, message: "Token not present" });
    }

    // Clear token properly
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // local dev ke liye false
      sameSite: "strict",
    });

    return res.json({ success: true, message: "Logout successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Error: " + err.message });
  }
}



async function verifyOtpSend(req,res){
    try{
        const user_id =  req.userId;
        const user = await User.findById(user_id);

         if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if(user.isAccountVerified){
            res.json({success : false , message : "account allready verified"});
        }

        const otp = String(Math.floor(100000+Math.random()*900000));
        user.verifyOtp = otp;
        user.verifyOtpExpired = Date.now() + 24*60*60*1000;
        // console.log(user.email + " " + user._id);
        

        await user.save();

         const mail = {
            from : process.env.SENDER_EMAIL,
            to : user.email,
            subject : "varification otp",
            // text : `hii ${user.name} welcome to ExamPreHub  , this is your verification otp : ${user.verifyOtp}`,
            html : EMAIL_VERIFY_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",user.email)
        }

        transporter.sendMail(mail);
        // res.send("verification otp send your email id ");
        res.json({success : true , message : "verification otp send your email id"});


    }
    catch(err){
        // res.send("Error : " + err);
        res.json({success : false , message : "Error : " + err});
    }
}

async function verifyEmail(req,res){
    try{
        const user_id =  req.userId;
        const {otp} = req.body;
        
        const user = await User.findById(user_id);

         if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if(user.isAccountVerified){
            return res.json({success : false , message : "account allready verified"});
        }

        if(user.verifyOtp === '' || user.verifyOtp!=otp){
            return res.json({success : false , message : "Invalid otp"});
        }

        if(user.verifyOtpExpired < Date.now()){
            return res.json({success : false , message : "otp expired"});
        }

        user.verifyOtpExpired = 0;
        user.verifyOtp = "";
        user.isAccountVerified = true;
        await user.save();

        const mail = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Account Verified ✔",
            html: VERIFIED_ACCOUNT.replace("{{url}}",process.env.FRONTEND_URL+'/user/login') 
        };


        transporter.sendMail(mail);
        // res.send("your account is verified");
        res.json({success : true , message : "your account is verified"});


    }
    catch(err){
        // res.send("Error : " + err);
        res.json({success : false , message : "Error : " + err});
    }
}

async function resetPasswordOtp(req,res) {
    try{
        const {email} = req.body;
        if (!email) {
            return res.json({ success: false, message: "Email is required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const PassOtp = String(Math.floor(100000+Math.random()*900000));
        user.resetOtp = PassOtp;
        user.resetOtpExpired = Date.now() + 24*60*60*1000; 
        await user.save();

         const mail = {
            from : process.env.SENDER_EMAIL,
            to : user.email,
            subject : "Reset Password",
            // text : `hii ${user.name}  , your reset passwoed otp is ${user.resetOtp}`
            html : PASSWORD_RESET_TEMPLATE.replace("{{otp}}",PassOtp).replace("{{email}}",user.email)
        }

        transporter.sendMail(mail);
        // res.send("reset otp send your email id ");
        res.json({success : true , message : "reset otp send your email id "});


    }
    catch(err){
        // res.send("Error : " + err);
        res.json({success : false , message : "Error : " + err});
    }
}

async function checkOtp(req, res) {
  try {
    const { otp, email } = req.body;

    if (!email || !otp) {
      return res.json({ success: false, message: "Missing field" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.resetOtp === "" || user.resetOtp != otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.resetOtpExpired < Date.now()) {
      return res.json({ success: false, message: "OTP expired" });
    }

    // ✅ Agar sab sahi hai
    return res.json({ success: true, message: "Now change the Password" });

  } catch (err) {
    return res.json({ success: false, message: "Error: " + err.message });
  }
}

async function resetPassword(req,res){
    try{
        const {email ,otp , newPassword} = req.body;
        
         if (!email || !otp || !newPassword) {
            return res.json({ success: false, message: "missing field" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        

        if(user.resetOtp === '' || user.resetOtp!=otp){
            return res.send("Invalid otp");
        }

        if(user.resetOtpExpired < Date.now()){
            return res.send("otp expired ");
        }

        const newHashPass = await bcrypt.hash(newPassword,10);
        user.password = newHashPass;

        user.resetOtpExpiredExpired = 0;
        user.resetOtp = "";
        await user.save();

        // res.send("your password has been changed ");
        res.json({success : true , message : "your password has been changed"});


    }
    catch(err){
        // res.send("Error : " + err);
        res.json({success : false , message : "Error : " + err});
    }
}


module.exports = {register,login,logout,verifyOtpSend,verifyEmail,resetPasswordOtp,resetPassword,checkOtp};

