import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, BookOpen, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router";

const links = [
  { label: "Features", href: "#features" },
  { label: "Courses", href: "#courses" },
  { label: "Resources", href: "#resources" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const navItem = (label, href) => (
    <a
      key={label}
      href={href}
      className="group relative px-3 py-2 text-sm font-medium text-gray-700 transition hover:text-gray-900"
    >
      {label}
      <span className="absolute inset-x-2 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 transition-all duration-300 group-hover:scale-x-100" />
    </a>
  );

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur bg-white/80 border-b border-black/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <a href="" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-rose-500 shadow-sm">
              <BookOpen className="h-5 w-5 text-white" />
            </span>
            <div className="leading-tight">
              <div className="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-rose-600">
                ExamPrepHub
              </div>
             
              <div className="text-[11px] tracking-wide md:block hidden text-gray-500">
                Learn • Practice • Ace
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => navItem(l.label, l.href))}
            {/* Dropdown */}
            <div className="relative group">
              <button className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                More
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="invisible absolute left-0 mt-1 w-56 translate-y-2 rounded-2xl border border-black/5 bg-white p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <a href="#blog" className="block rounded-xl px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">Blog</a>
                <a href="#guides" className="block rounded-xl px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">Study Guides</a>
                <a href="#contact" className="block rounded-xl px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">Contact</a>
              </div>
            </div>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/login")}
              className="hidden md:inline-flex items-center rounded-xl border border-black/5 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:shadow"
            >
              Sign in
            </button>
            <button
              onClick={() => navigate("/login")}
              className=" items-center md:inline-flex hidden rounded-xl bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
            >
              Create account
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
                {links.map((l) => (
                  <a
                    key={`m-${l.label}`}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-2 text-[15px] font-medium text-gray-700 hover:bg-gray-50"
                  >
                    {l.label}
                  </a>
                ))}
                <a href="#blog" onClick={() => setOpen(false)} className="rounded-xl px-3 py-2 text-[15px] font-medium text-gray-700 hover:bg-gray-50">Blog</a>
                <a href="#guides" onClick={() => setOpen(false)} className="rounded-xl px-3 py-2 text-[15px] font-medium text-gray-700 hover:bg-gray-50">Study Guides</a>
                <a href="#contact" onClick={() => setOpen(false)} className="rounded-xl px-3 py-2 text-[15px] font-medium text-gray-700 hover:bg-gray-50">Contact</a>
              </div>

              {/* Mobile Actions */}
              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={() => { setOpen(false); navigate("/login"); }}
                  className="w-full rounded-xl border border-black/5 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:shadow"
                >
                  Sign in
                </button>
                <button
                  onClick={() => { setOpen(false); navigate("/login"); }}
                  className="w-full rounded-xl bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
                >
                  Create account
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
