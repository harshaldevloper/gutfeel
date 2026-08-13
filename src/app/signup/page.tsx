"use client";

import { useState } from "react";
import { signUp } from "@/lib/supabase";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error: authError } = await signUp(email, password);
    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }
    setDone(true);
    setLoading(false);
  }

  if (done) {
    return (
      <div className="min-h-screen app-page-bg flex items-center justify-center p-4">
        <div className="w-full max-w-md premium-card p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-brand-green-light flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-brand-green-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <p className="font-serif text-xl font-bold text-brand-navy mb-2">Check your email</p>
          <p className="text-stone-500 text-sm mb-6">We sent a confirmation link to {email}</p>
          <Link href="/login" className="text-brand-green-dark font-semibold hover:underline">Back to sign in</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen app-page-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md premium-card p-8">
        <div className="flex justify-center mb-6">
          <BrandLogo height={48} variant="mark" href="/" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-brand-navy mb-2 text-center">Create account</h1>
        <p className="text-stone-500 text-sm mb-6 text-center">Sync your symptom logs and fingerprint across devices.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="input-field w-full px-4 py-3 text-stone-900 placeholder:text-stone-400"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password (min 6 characters)"
            required
            minLength={6}
            className="input-field w-full px-4 py-3 text-stone-900 placeholder:text-stone-400"
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
            {loading ? "Creating…" : "Create account"}
          </button>
        </form>
        <p className="text-center text-sm text-stone-500 mt-4">
          Already have an account? <Link href="/login" className="text-brand-green-dark font-semibold hover:underline">Sign in</Link>
        </p>
        <p className="text-xs text-stone-400 text-center mt-4">
          By signing up you agree to our <Link href="/terms" className="underline">Terms</Link> and{" "}
          <Link href="/privacy" className="underline">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
