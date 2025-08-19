import React from "react";
import Navbar from "../component/Nevbar";
import Footer from "../component/Footer";
import { useNavigate } from "react-router";

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-blue-50 to-black">
        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center flex-1 text-center px-6 py-16 ">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-rose-600 bg-clip-text text-transparent mb-6">
            Welcome to ExamPrep Hub
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl">
            Prepare smarter, not harder. Join thousands of learners already excelling with our platform.
            </p>

            <div className="flex gap-4">
            <button onClick={()=>navigate('/login')} className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-rose-400  text-white font-semibold hover:scale-[105%] hover:brightness-110 transition-transform shadow-lg">
                Get Started
            </button>
            <button onClick={()=>navigate('/login')} className="px-6 py-3 rounded-2xl bg-white border border-blue-700 text-blue-700 font-semibold hover:bg-blue-50 shadow-lg">
                Learn More
            </button>
            </div>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-8 px-6 py-16 bg-white shadow-inner">
            <div className="p-6 rounded-2xl shadow-lg bg-blue-50 hover:scale-105 transition">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">📘 Study Materials</h3>
            <p className="text-gray-600">Access high-quality notes, question banks, and mock tests.</p>
            </div>
            <div className="p-6 rounded-2xl shadow-lg bg-blue-50 hover:scale-105 transition">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">🎯 Smart Practice</h3>
            <p className="text-gray-600">Practice with real-time feedback and AI-powered suggestions.</p>
            </div>
            <div className="p-6 rounded-2xl shadow-lg bg-blue-50 hover:scale-105 transition">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">⏳ Track Progress</h3>
            <p className="text-gray-600">Stay motivated with progress tracking and insights.</p>
            </div>
        </section>

        {/* Footer */}
        <Footer></Footer>
        </div>
    );
    };

    export default Home;
