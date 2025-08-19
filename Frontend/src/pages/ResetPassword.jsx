// rafc
import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { BookOpen, Eye, EyeOff } from "lucide-react"; // 👁️ icons
import { AppContent } from "../contextapi/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContent);
  axios.defaults.withCredentials = true;

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState(0);
  const [isOtpSubmited, setIsOtpSubmited] = useState(false);
  const [showPassword, setShowPassword] = useState(false); //  toggle

  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    if (isNaN(e.target.value)) return;
    if (e.target.value && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
    const nextIndex = pasteArray.length < 6 ? pasteArray.length : 5;
    if (inputRefs.current[nextIndex]) {
      inputRefs.current[nextIndex].focus();
    }
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + "/user/reset-pass-otp", {
        email,
      });
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setIsEmailSent(true);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    try {
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");
      const { data } = await axios.post(backendUrl + "/user/check-otp", {
        email,
        otp,
      });
      data.success ? toast.success(data.message) : toast.error(data.message);
      if (data.success) {
        setOtp(otp);
        setIsOtpSubmited(true);
      }
    } catch (error) {
      toast.error("Invalid OTP");
    }
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + "/user/reset-password", {
        email,
        otp,
        newPassword,
      });
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate("/login");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      {/* Logo */}
      <a
        onClick={() => navigate("/")}
        className="flex items-center gap-2 px-3 py-2 fixed cursor-pointer"
      >
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-rose-500 shadow-sm">
          <BookOpen className="h-5 w-5 text-white" />
        </span>
        <div className="leading-tight">
          <div className="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-rose-600">
            ExamPrepHub
          </div>
        </div>
      </a>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-white to-indigo-50 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Step 1: Enter Email */}
          {!isEmailSent && (
            <form
              onSubmit={onSubmitEmail}
              className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 text-center border border-gray-100"
            >
              <h1 className="text-2xl font-bold text-indigo-600">
                Reset Password
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Enter your registered email address
              </p>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg mt-6 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition mt-4"
              >
                Send OTP
              </button>
            </form>
          )}

          {/* Step 2: Enter OTP */}
          {!isOtpSubmited && isEmailSent && (
            <form
              onSubmit={onSubmitOtp}
              className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 text-center border border-gray-100"
            >
              <h1 className="text-2xl font-bold text-indigo-600 mb-2">
                Verify OTP
              </h1>
              <p className="text-gray-500 text-sm mb-6">
                Enter the 6-digit code sent to your email
              </p>

              <div
                className="flex justify-between gap-0.5 mx-auto max-w-xs mb-6"
                onPaste={handlePaste}
              >
                {Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      required
                      ref={(el) => (inputRefs.current[index] = el)}
                      onChange={(e) => handleChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-12 h-14 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-xl"
                    />
                  ))}
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
              >
                Submit OTP
              </button>
            </form>
          )}

          {/* Step 3: New Password */}
          {isOtpSubmited && isEmailSent && (
            <form
              onSubmit={onSubmitNewPassword}
              className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 text-center border border-gray-100"
            >
              <h1 className="text-2xl font-bold text-indigo-600 mb-2">
                Set New Password
              </h1>
              <p className="text-gray-500 text-sm mb-6">
                Enter your new password below
              </p>

              <div className="relative w-full mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
              >
                Reset Password
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
