"use client";

import { useState } from "react";
import BrandLogo from "@/components/BrandLogo";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-xl border-b border-brand-navy/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[4.5rem]">
          <BrandLogo height={42} />

          <nav className="hidden md:flex items-center gap-8">
            {[
              ["#problem", "Problem"],
              ["#solution", "How it works"],
              ["#features", "Features"],
              ["#download", "Get the app"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="text-stone-600 hover:text-brand-navy transition-colors text-sm font-medium">
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a href="/login" className="text-brand-navy/80 hover:text-brand-navy text-sm font-medium px-3 py-2">
              Sign in
            </a>
            <a href="/download/" className="btn-accent text-sm py-2.5 px-5">
              Download App
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 rounded-xl text-brand-navy hover:bg-brand-green-light/50"
            aria-label="Menu"
          >
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
          <div className="md:hidden py-4 border-t border-brand-navy/5">
            <nav className="flex flex-col gap-1">
              {[
                ["#problem", "Problem"],
                ["#solution", "How it works"],
                ["#features", "Features"],
                ["#download", "Get the app"],
              ].map(([href, label]) => (
                <a key={href} href={href} className="text-stone-700 text-sm font-medium py-2.5 px-2 rounded-lg hover:bg-brand-green-light/40">
                  {label}
                </a>
              ))}
              <a href="/download/" className="btn-accent text-center mt-3">
                Download App
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
