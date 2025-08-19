import React, { useContext, useEffect, useRef } from "react";
import { AppContent } from "../contextapi/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { BookOpen, Target } from "lucide-react";
import axios from "axios";

const VerifyEmail = () => {
  const inputRefs = useRef([]);
  const {getData , backendUrl,isLoggin,getUserdata} = useContext(AppContent);
  const navigate = useNavigate();


  const handleChange = (e, index) => {
    if (isNaN(e.target.value)) return; // allow only numbers
    if (e.target.value && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus(); // auto-focus next input
    }
  };

  const handleKeyDown = (e,index)=>{
    if(e.key === 'Backspace' && e.target.value === '' && index>0){
      inputRefs.current[index - 1].focus();
    }
  }

  const handlePaste = (e) => {
      e.preventDefault(); // prevent default paste action
      const paste = e.clipboardData.getData("text"); // get pasted text
      const pasteArray = paste.split("");

      pasteArray.forEach((char, index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index].value = char; // assign char to input
        }
      });

      // Optional: focus next empty input after paste
      const nextIndex = pasteArray.length < 6 ? pasteArray.length : 5;
      if (inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex].focus();
      }
    };
    

  const onSubmtHandler = async(e)=>{
    try{
        e.preventDefault();

      const otpArray = inputRefs.current.map(e => e.value);
      const otp = otpArray.join('');
      const { data } = await axios.post(backendUrl + '/user/verify-email', { otp });

      if(data.success){
        toast.success(data.message);
        getUserdata();
        navigate('/login-home')

      }
      else{
         toast.error(data.message);
      }
    }
    catch(err){
      toast.error(data.message);
    }
  }

  useEffect(() => {
    console.log(isLoggin + " " + getData + " "+ getData.AccountVarification);
  if (isLoggin && getData && getData.AccountVarification) {
    navigate('/login-home');
  }
}, [isLoggin, getData, navigate]);


  return (
    <>
    <a onClick={()=>navigate('/')} className="flex  items-center gap-2 px-3  py-2  fixed" >
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-rose-500 shadow-sm">
            <BookOpen className="h-5 w-5 text-white" />
        </span>
        <div className="leading-tight">
            <div className="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-rose-600">
                ExamPrepHub
            </div>
        </div>
    </a>
    
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={onSubmtHandler}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center"
      >
        <h1 className="text-2xl font-bold mb-2 text-indigo-600">Email Verify</h1>
        <p className="text-gray-600 mb-6">
          Enter the 6-digit code sent to your email id.
        </p>

        <div className="flex justify-center space-x-2 mb-6" onPaste={handlePaste}>
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
                onKeyDown={(e)=>handleKeyDown(e,index)}
                className="w-10 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
              />
            ))}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Verify Email
        </button>
      </form>
    </div>
    </>
  );
};

export default VerifyEmail;
