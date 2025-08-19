import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white/90 border-t border-gray-200 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-rose-600">
            ExamPrepHub
          </h2>
          <p className="text-gray-600 mt-3 text-sm">
            Your trusted platform to prepare smartly for exams with
            high-quality resources and guidance.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Links</h3>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#" className="hover:text-indigo-600">Home</a></li>
            <li><a href="#" className="hover:text-indigo-600">About</a></li>
            <li><a href="#" className="hover:text-indigo-600">Courses</a></li>
            <li><a href="#" className="hover:text-indigo-600">Pricing</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Resources</h3>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#" className="hover:text-indigo-600">Study Guides</a></li>
            <li><a href="#" className="hover:text-indigo-600">Mock Tests</a></li>
            <li><a href="#" className="hover:text-indigo-600">Blog</a></li>
            <li><a href="#" className="hover:text-indigo-600">FAQs</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Contact</h3>
          <p className="text-gray-600">support@examprephub.com</p>
          <p className="text-gray-600">+91 98765 43210</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-rose-600 text-white px-3 py-2 rounded-xl text-sm font-medium shadow hover:opacity-90 transition">
              Facebook
            </a>
            <a href="#" className="bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-rose-600 text-white px-3 py-2 rounded-xl text-sm font-medium shadow hover:opacity-90 transition">
              Twitter
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 mt-10 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} ExamPrepHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
