"use client";

import { useState } from "react";

const INSTALL_URL = "#install";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <span className="font-bold text-gray-900 text-lg">
              AppFox
              <span className="text-purple-600"> Order Edit</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-600 hover:text-purple-600 transition-colors font-medium">Features</a>
            <a href="#pricing" className="text-sm text-gray-600 hover:text-purple-600 transition-colors font-medium">Pricing</a>
            <a href="#faq" className="text-sm text-gray-600 hover:text-purple-600 transition-colors font-medium">FAQ</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={INSTALL_URL}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
            >
              Install Free
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          <a href="#features" className="text-sm text-gray-700 font-medium" onClick={() => setMobileOpen(false)}>Features</a>
          <a href="#pricing" className="text-sm text-gray-700 font-medium" onClick={() => setMobileOpen(false)}>Pricing</a>
          <a href="#faq" className="text-sm text-gray-700 font-medium" onClick={() => setMobileOpen(false)}>FAQ</a>
          <a
            href={INSTALL_URL}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 text-white text-sm font-semibold"
            onClick={() => setMobileOpen(false)}
          >
            Install Free
          </a>
        </div>
      )}
    </header>
  );
}
