import React, { useContext, useState } from "react";
import { BookOpen, Target } from "lucide-react";
import { useNavigate } from "react-router";
import { AppContent } from "../contextapi/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";  // 👈 import icons





const Login = () => {

    const [state , setstate] = useState('Sign in');
    const navigate = useNavigate();

    const [name , setname] = useState('');
    const [email , setemail] = useState('');
    const [password , setpassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const {backendUrl,isLoggin,setIsLoggin ,getUserdata} = useContext(AppContent);

   async function submitHandler(e) {
        try {
            e.preventDefault();

            axios.defaults.withCredentials = true;

            if (state === "Sign in") {
            const { data } = await axios.post(backendUrl + "/user/login", {
                email,
                password,
            }, { withCredentials: true } );

                if (data.success) {
                      // Remember Me ka logic
                    if (rememberMe) {
                        localStorage.setItem("authToken", data.token); // long-term
                    } else {
                        sessionStorage.setItem("authToken", data.token); // tab band hote hi clear
                    }
                    toast.success(data.message || "User registered successfully ✅");
                    setIsLoggin(true);
                    getUserdata();
                    navigate("/login-home");
                } else {
                    toast.error(data.message || "Registration failed");
                }

            } else {
                  const { data } = await axios.post(backendUrl + "/user/register", {
                    name,
                    email,
                    password,
                  }, { withCredentials: true } );

                  if (data.success) {
                    

                    toast.success(data.message || "Registration successful ✅");
                    setIsLoggin(true);
                    getUserdata();
                    navigate("/login-home");
                  } else {
                    toast.error(data.message || "Registration failed");
                  }
                }
            } catch (err) {
                console.error("🔴 Axios Error:", err);  

                if (err.response) {
                    toast.error(err.response.data.message || "Invalid email or password");
                } else {
                    toast.error("Something went wrong, please try again");
                }
            }

        }


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
    
    
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-fuchsia-50 px-4">
        
      <div className="w-full max-w-md bg-white/80 backdrop-blur rounded-2xl shadow-xl p-8">
        {/* Brand */}
        <div className="flex flex-col items-center mb-6">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-rose-500 shadow-sm mb-2">
            <BookOpen className="h-6 w-6 text-white" />
          </span>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-rose-600">
           {state === 'Sign in' ? ' Welcome Back' : 'Create Your Account'}
          </h1>
          <p className="text-gray-500 text-sm">{state === 'Sign in' ? 'Sign in to continue to ExamPrepHub' : 'Create your account in ExamPrepHub'}</p>
        </div>

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-4">

          {state === 'Sign up' && (
            <div>
            <label className="block text-sm font-medium text-gray-700">UserName</label>
            <input
              onChange={(e)=>setname(e.target.value)}
              value={name} 
              type="text" required
              placeholder="Enter your Full Name"
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-fuchsia-500 focus:ring focus:ring-fuchsia-200"
            />
          </div>
          )}


          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              onChange={(e)=>setemail(e.target.value)}
              value={email}
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-fuchsia-500 focus:ring focus:ring-fuchsia-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                onChange={(e)=>setpassword(e.target.value)}
                value={password}
                type={showPassword ? "text" : "password"}   // 👈 toggle here
                placeholder="••••••••"
                autoComplete={state === 'Sign in' ? "current-password" : "new-password"}
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 pr-10 text-sm shadow-sm focus:border-fuchsia-500 focus:ring focus:ring-fuchsia-200"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>


          {
            state=== 'Sign in' && (
                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-gray-300" 
                    />
                    Remember me
                    </label>
                    <span onClick={()=>navigate('/reset-password')}  className="text-fuchsia-600 cursor-pointer hover:underline">
                    Forgot password?
                    </span>
                </div>
            )
          }

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
          >
            {state}
          </button>
        </form>

        {/* Footer */}
        {state==='Sign in'? (
            <p className="mt-6 text-center text-sm text-gray-500">
                Don’t have an account?{" "}
                <span onClick={()=>{setstate('Sign up')}} className="text-fuchsia-600 cursor-pointer hover:underline">
                    Sign up
                </span>
            </p>
        ) : (
            <p className="mt-6 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <span onClick={()=>{setstate('Sign in')}} className="text-fuchsia-600 cursor-pointer hover:underline">
                    Sign in
                </span>
            </p>
        )}
        
      </div>
    </div>
    </>
  );
};

export default Login;
