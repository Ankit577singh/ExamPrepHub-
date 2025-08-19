import React from "react";
// import Navbar from "../component/Nevbar";
import Footer from "../component/Footer";
import DashboardNavbar from "../component/DashbordNavbar";
import  { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AppContent } from "../contextapi/AppContext";


const DashboardHome = () => {
    const { getData ,isLoggin} = useContext(AppContent);
    console.log(getData);
    const navigate = useNavigate();

    useEffect(()=>{
      !isLoggin && navigate('/')
    },[isLoggin])
    
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-white to-gray-100">
      {/* Navbar */}
      <DashboardNavbar></DashboardNavbar>

      {/* Welcome Section */}
      <section className="flex flex-col items-center justify-center flex-1 text-center px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
          👋 Welcome back, {getData?.userName || "Guest"}!
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl">
          Continue your preparation and achieve your goals with ExamPrep Hub.
        </p>
      </section>

      {/* Quick Actions */}
      <section className="grid md:grid-cols-3 gap-8 px-6 py-12 bg-white shadow-inner">
        <div className="p-6 rounded-2xl shadow-lg bg-indigo-50 hover:scale-105 transition">
          <h3 className="text-xl font-semibold text-indigo-700 mb-2">📘 Continue Last Test</h3>
          <p className="text-gray-600">Pick up from where you left off.</p>
        </div>
        <div className="p-6 rounded-2xl shadow-lg bg-fuchsia-50 hover:scale-105 transition">
          <h3 className="text-xl font-semibold text-fuchsia-700 mb-2">📊 Your Progress</h3>
          <p className="text-gray-600">Track your scores and improvements.</p>
        </div>
        <div className="p-6 rounded-2xl shadow-lg bg-rose-50 hover:scale-105 transition">
          <h3 className="text-xl font-semibold text-rose-700 mb-2">🎯 Recommended Practice</h3>
          <p className="text-gray-600">Get AI-suggested practice sets just for you.</p>
        </div>
      </section>

      {/* Insights Section */}
      <section className="px-6 py-12 bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">🔥 Weekly Insights</h2>
        <p className="max-w-2xl mx-auto text-lg">
          You completed <span className="font-bold">5 tests</span> this week and improved your score by 
          <span className="font-bold"> 12%</span>. Keep going strong!
        </p>
      </section>

      {/* Download Papers Section */}
      <section className="px-6 py-16 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold text-blue-800 mb-8">📄 Download Previous Papers</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="p-6 rounded-2xl shadow-lg bg-white hover:scale-105 transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Maths - 2023</h3>
            <a 
              href="/papers/maths-2023.pdf" 
              download 
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
            >
              ⬇ Download
            </a>
          </div>
          <div className="p-6 rounded-2xl shadow-lg bg-white hover:scale-105 transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Science - 2023</h3>
            <a 
              href="/papers/science-2023.pdf" 
              download 
              className="px-4 py-2 rounded-xl bg-fuchsia-600 text-white hover:bg-fuchsia-700"
            >
              ⬇ Download
            </a>
          </div>
          <div className="p-6 rounded-2xl shadow-lg bg-white hover:scale-105 transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">English - 2023</h3>
            <a 
              href="/papers/english-2023.pdf" 
              download 
              className="px-4 py-2 rounded-xl bg-rose-600 text-white hover:bg-rose-700"
            >
              ⬇ Download
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DashboardHome; 