import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, BookOpen, LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { AppContent } from "../contextapi/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const dashboardLinks = [
  { label: "Home", href: "/dashboard" },
  { label: "Tests", href: "/dashboard/tests" },
  { label: "Progress", href: "/dashboard/progress" },
  { label: "Resources", href: "/dashboard/resources" },

];



export default function DashboardNavbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  

  const {backendUrl,isLoggin,setIsLoggin,getData,getUserdata,name} = useContext(AppContent);
  const [showTooltip, setShowTooltip] = useState(false);


//   const userName = getData?.username || 'Guest';
//   console.log(getData);
//   const firstLetter = userName.charAt(0).toUpperCase();

async function logoutfunc(){
         try {

                axios.defaults.withCredentials = true;
                const { data } = await axios.post(backendUrl + "/user/logout", {}, {withCredentials: true});
                if (data.success) {
                    toast.success(data.message || "User registered successfully ✅");
                    setIsLoggin(false);
                     localStorage.removeItem("token");
                    navigate("/");
                } else {
                    toast.error(data.message || "Registration failed");
                }
            } catch (err) {

                console.error("🔴 Axios Error:", err);  // 👈 log देखना browser console में

                if (err.response) {
                    toast.error(err.response.data.message || "Invalid email or password");
                } else {
                    toast.error("Something went wrong, please try again");
                }
            }

        
}

async function verifyEmailOtp(){
    try{
        axios.defaults.withCredentials = true;
        const {data} = await axios.post(backendUrl + '/user/verifyotpSend');
        if(data.success){
            navigate('/verify-email');
            toast.success(data.message);
        }
        else {
            toast.error(message.err);
        }
    }
    catch(err){
        toast.error(message.err);
    }
}

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur bg-white/80 border-b border-black/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <a href="/dashboard" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-rose-500 shadow-sm">
              <BookOpen className="h-5 w-5 text-white" />
            </span>
            <div className="leading-tight">
              <div className="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-rose-600">
                ExamPrepHub
              </div>
              <div className="text-[11px] tracking-wide md:block hidden text-gray-500">
                Dashboard
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {dashboardLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="group relative px-3 py-2 text-sm font-medium text-gray-700 transition hover:text-gray-900"
              >
                {l.label}
                <span className="absolute inset-x-2 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 transition-all duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Avatar with Hover Tooltip */}
            <div className="relative group">
                {/* Avatar Circle */}
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-600 to-fuchsia-600 flex items-center justify-center text-white font-semibold shadow-sm cursor-pointer">
                    {getData?.userName?.charAt(0).toUpperCase()}
                </div>

                {/* Tooltip */}
               
                 {
                     !getData.AccountVarification && (
                            <div onClick={verifyEmailOtp} className="absolute hidden md:block top-10 left-1/2 transform -translate-x-1/2 px-3 py-1.5 text-xs font-medium text-white 
                                bg-indigo-600/90 backdrop-blur-sm rounded-lg shadow-md opacity-0 group-hover:opacity-100 
                                transition-opacity duration-300 whitespace-nowrap cursor-pointer">
                                Verify Email
                            </div>
                     )
                 }
               

            </div>


            {/* Logout Button */}
            <button
              onClick={logoutfunc}
              className="hidden md:inline-flex items-center gap-2 rounded-xl border border-black/5 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>

            {/* Mobile Toggle */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="inline-flex lg:hidden h-10 w-10 items-center justify-center rounded-xl border border-black/5 bg-white shadow-sm transition hover:shadow"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 170, damping: 22 }}
            className="lg:hidden overflow-hidden border-t border-black/5 bg-white"
          >
            <div className="px-4 pb-4 pt-2 sm:px-6">
              <div className="grid gap-1">
                {dashboardLinks.map((l) => (
                  <a
                    key={`m-${l.label}`}
                    
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-2 text-[15px] font-medium text-gray-700 hover:bg-gray-50"
                  >
                    {l.label}
                  </a>
                ))}
              </div>

               {
                !getData.AccountVarification && (
                    <div onClick={verifyEmailOtp} className="w-full rounded-xl flex items-center justify-center gap-2 border border-black/5 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-red-50 hover:text-red-600">
                        Verify-Email
                    </div>
                )
               }

              {/* Mobile Actions */}
              <div className="mt-4 flex flex-col gap-2">
                <button
                   onClick={logoutfunc}
                  className="w-full rounded-xl flex items-center justify-center gap-2 border border-black/5 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
