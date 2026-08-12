"use client";

import { useState } from "react";
import BrandLogo from "@/components/BrandLogo";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <BrandLogo height={40} />

          <nav className="hidden md:flex items-center gap-8">
            <a href="#problem" className="text-stone-600 hover:text-stone-900 transition-colors text-sm font-medium">Problem</a>
            <a href="#solution" className="text-stone-600 hover:text-stone-900 transition-colors text-sm font-medium">Solution</a>
            <a href="#features" className="text-stone-600 hover:text-stone-900 transition-colors text-sm font-medium">Features</a>
            <a href="#testimonials" className="text-stone-600 hover:text-stone-900 transition-colors text-sm font-medium">Testimonials</a>
            <a href="#pricing" className="text-stone-600 hover:text-stone-900 transition-colors text-sm font-medium">Pricing</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a href="/login" className="text-stone-600 hover:text-stone-900 text-sm font-medium">Sign in</a>
            <a href="/onboarding" className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors">
              Try App
            </a>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-stone-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-stone-200">
            <nav className="flex flex-col gap-3">
              <a href="#problem" className="text-stone-600 text-sm font-medium py-2">Problem</a>
              <a href="#solution" className="text-stone-600 text-sm font-medium py-2">Solution</a>
              <a href="#features" className="text-stone-600 text-sm font-medium py-2">Features</a>
              <a href="#testimonials" className="text-stone-600 text-sm font-medium py-2">Testimonials</a>
              <a href="#pricing" className="text-stone-600 text-sm font-medium py-2">Pricing</a>
              <a href="/onboarding" className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold text-center">Try App</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
