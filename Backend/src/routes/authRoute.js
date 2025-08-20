const express = require('express');
const {register,login,logout,verifyOtpSend,verifyEmail,resetPasswordOtp,resetPassword,checkOtp} = require('../controllers/authRoutesFun');
const userMiddleware = require('../middleware/userMiddleware');
const idMiddleware = require('../middleware/idMiddleware');
const getProfile = require('../controllers/userRoutes');


const authRouter = express.Router();

// register , login ,logout , getProfile

authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',userMiddleware,logout);
authRouter.post('/verifyotpSend',idMiddleware ,verifyOtpSend);
authRouter.post('/verify-email',idMiddleware ,verifyEmail);
authRouter.post('/reset-pass-otp' ,resetPasswordOtp);
authRouter.post('/check-otp' ,checkOtp);
authRouter.post('/reset-password',resetPassword);
authRouter.get('/getProfile',idMiddleware,getProfile); 


module.exports = authRouter;