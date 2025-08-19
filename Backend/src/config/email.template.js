export const EMAIL_VERIFY_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Email Verification - ExamPrepHub</title>
</head>
<body style="font-family: Arial, sans-serif; background: #f9f9f9; margin: 0; padding: 0;">
  <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background: #ffffff; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0,0,0,0.1);">
    <tr>
      <td style="text-align: center; padding: 30px;">
        <h1 style="color: #4f46e5; margin-bottom: 10px;">Verify Your Email</h1>
        <p style="color: #555;">Hi <b>{{email}}</b>,</p>
        <p style="color: #555;">Use the OTP below to verify your email address and activate your ExamPrepHub account.</p>
        <div style="margin: 25px 0;">
          <span style="font-size: 28px; letter-spacing: 8px; font-weight: bold; color: #4f46e5;">{{otp}}</span>
        </div>
        <p style="color: #999; font-size: 13px;">This OTP will expire in <b>10 minutes</b>. Do not share it with anyone.</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
        <p style="font-size: 12px; color: #999;">ExamPrepHub © 2025. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>
</html>
`

export const PASSWORD_RESET_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Password Reset - ExamPrepHub</title>
</head>
<body style="font-family: Arial, sans-serif; background: #f9f9f9; margin: 0; padding: 0;">
  <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background: #ffffff; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0,0,0,0.1);">
    <tr>
      <td style="text-align: center; padding: 30px;">
        <h1 style="color: #dc2626; margin-bottom: 10px;">Reset Your Password</h1>
        <p style="color: #555;">Hi <b>{{email}}</b>,</p>
        <p style="color: #555;">You requested to reset your password. Use the OTP below to continue.</p>
        <div style="margin: 25px 0;">
          <span style="font-size: 28px; letter-spacing: 8px; font-weight: bold; color: #dc2626;">{{otp}}</span>
        </div>
        <p style="color: #999; font-size: 13px;">This OTP will expire in <b>10 minutes</b>. If you didn’t request this, please ignore this email.</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
        <p style="font-size: 12px; color: #999;">ExamPrepHub © 2025. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>
</html>
`

export const RAGISTER_EMAIL = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Welcome to ExamPrepHub</title>
</head>
<body style="font-family: Arial, sans-serif; background:#f9f9f9; margin:0; padding:0;">
  <table align="center" width="100%" cellpadding="0" cellspacing="0" 
         style="max-width:600px; background:#ffffff; border-radius:10px; box-shadow:0px 4px 10px rgba(0,0,0,0.1);">
    <tr>
      <td style="text-align:center; padding:30px;">
        <h1 style="color:#4f46e5;">🎉 Welcome, {{name}}!</h1>
        <p style="color:#555;">Thank you for registering with <b>ExamPrepHub</b>.</p>
        <p style="color:#555;">We’ve registered your email: <b>{{email}}</b></p>
        <p style="margin:20px 0; color:#444;">Get ready to access high-quality study material, mock tests, and much more.</p>
        
        <a href="{{url}}" 
           style="display:inline-block; padding:12px 20px; background:#4f46e5; color:#fff; text-decoration:none; border-radius:6px; font-weight:bold;">
          Get Started 🚀
        </a>

        <hr style="margin:30px 0; border:none; border-top:1px solid #eee;" />
        <p style="font-size:12px; color:#999;">ExamPrepHub © 2025. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>
</html>
`;
export const VERIFIED_ACCOUNT = `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#f9f9f9;padding:30px;text-align:center;">
    <div style="max-width:500px;margin:0 auto;background:#ffffff;padding:25px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
      
      <div style="margin-bottom:20px;">
        <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="Success" width="70" style="margin-bottom:15px;" />
        <h2 style="color:#4F46E5;margin:0;">🎉 Account Verified!</h2>
      </div>
      
      <p style="color:#333;font-size:15px;line-height:1.6;">
        Hi there 👋,<br/>
        Your account has been successfully verified with 
        <b style="color:#4F46E5;">ExamPrepHub</b>.
      </p>
      
      <p style="color:#555;font-size:14px;line-height:1.6;">
        You can now <b>log in</b> and enjoy full access to all our features, study materials, 
        and exclusive content 🚀
      </p>
      
      <a href="{{url}}" 
        style="display:inline-block;margin-top:20px;padding:12px 25px;
               background:#4F46E5;color:#fff;text-decoration:none;
               border-radius:8px;font-size:15px;font-weight:bold;">
        Login to Your Account
      </a>
      
      <p style="margin-top:25px;color:#777;font-size:12px;">
        If you have any questions, feel free to reach out to our 
        <a href="mailto:support@examprephub.com" style="color:#4F46E5;text-decoration:none;">support team</a>.
      </p>
    </div>
  </div>
`;
