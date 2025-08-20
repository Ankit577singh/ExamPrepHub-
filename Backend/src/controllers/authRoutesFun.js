const User = require('../model/userScema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validation = require('../util/validation');
const transporter = require('../config/nodemailer');
const { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE, RAGISTER_EMAIL, VERIFIED_ACCOUNT } = require('../config/email.template');

async function register(req, res) {
  try {
    console.log("📩 [Register] API called with data:", req.body);

    validation(req.body);

    const { name, email, password } = req.body;
    console.log("👉 [Register] User input -> Name:", name, "Email:", email);

    req.body.password = await bcrypt.hash(password, 10);
    console.log("🔐 [Register] Password hashed successfully");

    const user = await User.create(req.body);
    console.log("✅ [Register] User created:", user._id);

    const token = jwt.sign(
      { _id: user._id, email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: 60 * 60 }
    );
    console.log("🎫 [Register] JWT generated:", token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 60 * 60 * 1000,
      domain: process.env.NODE_ENV === 'production' ? process.env.COOKIE_DOMAIN : 'undefined'
    });

    console.log("🍪 [Register] Cookie set successfully");

    try {
      const mail = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: "Welcome to ExamPrepHub",
        html: RAGISTER_EMAIL.replace("{{name}}", name).replace("{{email}}", email).replace("{{url}}", process.env.FRONTEND_URL)
      };
      await transporter.sendMail(mail);
      console.log("📧 [Register] Email sent to:", email);
    } catch (mailErr) {
      console.error("❌ [Register] Email send failed:", mailErr.message);
    }

    return res.json({ success: true, message: "User register successfully" });
  } catch (err) {
    console.error("❌ [Register] Error:", err.message);
    return res.status(500).json({ success: false, message: err.message || "Server error" });
  }
}


async function login(req, res) {
  try {
    console.log("📩 [Login] API called with data:", req.body);

    const { email, password } = req.body;
    if (!email || !password) throw new Error('Invalid Credentials');

    const user = await User.findOne({ email });
    console.log("👉 [Login] User found:", user ? user._id : "Not found");

    if (!user) throw new Error('Invalid Email');

    const match = await bcrypt.compare(password, user.password);
    console.log("🔐 [Login] Password match:", match);

    if (!match) throw new Error('Invalid Password');

    const token = jwt.sign(
      { _id: user._id, email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: 60 * 60 }
    );
    console.log("🎫 [Login] JWT generated:", token);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 60 * 60 * 1000,
      domain: process.env.NODE_ENV === 'production' ? process.env.COOKIE_DOMAIN : 'undefined'
    });

    console.log("🍪 [Login] Cookie set successfully");

    res.status(200).json({ success: true, message: 'Login successful' });
  } catch (err) {
    console.error("❌ [Login] Error:", err.message);
    res.status(401).json({ success: false, message: err.message });
  }
};

async function logout(req, res) {
  try {
    console.log("📩 [Logout] API called, Cookies:", req.cookies);

    const { token } = req.cookies;
    if (!token) {
      console.warn("⚠️ [Logout] Token not present in cookies");
      return res.status(400).json({ success: false, message: "Token not present" });
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    console.log("✅ [Logout] Cookie cleared successfully");
    return res.json({ success: true, message: "Logout successfully" });
  } catch (err) {
    console.error("❌ [Logout] Error:", err.message);
    return res.status(500).json({ success: false, message: "Error: " + err.message });
  }
}

module.exports = { register, login, logout };
