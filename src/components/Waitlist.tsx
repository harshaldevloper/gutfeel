"use client";

import { useState } from "react";
import { joinWaitlist, isSupabaseConfigured } from "@/lib/supabase";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    setLoading(true);
    if (isSupabaseConfigured()) {
      const { error: dbError } = await joinWaitlist(email);
      if (dbError) {
        if (dbError.message.includes("duplicate")) {
          setSubmitted(true);
        } else {
          setError("Could not save your email. Try again or start the app directly.");
        }
        setLoading(false);
        return;
      }
    }
    setSubmitted(true);
    setLoading(false);
  }

  return (
    <section id="waitlist" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-800 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-900/40 rounded-full blur-3xl" />
      </div>
      <div className="max-w-3xl mx-auto text-center relative">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-5">
          Ready to stop guessing?
        </h2>
        <p className="text-lg text-emerald-100 mb-8 max-w-xl mx-auto">
          Join the waitlist for launch updates — or skip the line and try the app now. It&apos;s free and works offline.
        </p>

        {submitted ? (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <p className="text-2xl font-semibold text-white mb-2">You&apos;re in!</p>
            <p className="text-emerald-100 mb-4">We&apos;ll email you when we launch new features.</p>
            <a href="/onboarding" className="inline-block px-8 py-3 bg-white text-emerald-700 rounded-xl font-semibold">
              Try the App Now →
            </a>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-4 bg-stone-900 text-white rounded-xl font-semibold hover:bg-stone-800 transition-colors whitespace-nowrap disabled:opacity-60"
              >
                {loading ? "Saving…" : "Join Waitlist"}
              </button>
            </form>
            {error && <p className="text-red-100 text-sm mt-3">{error}</p>}
            <a href="/onboarding" className="inline-block mt-6 text-emerald-100 underline underline-offset-2 text-sm">
              Or skip waitlist — start using Gutfeel now
            </a>
          </>
        )}

        <div className="flex items-center justify-center gap-6 mt-8 text-sm text-emerald-200">
          <span>No spam</span>
          <span>•</span>
          <span>Unsubscribe anytime</span>
          <span>•</span>
          <span>Free core features</span>
        </div>
      </div>
    </section>
  );
}
