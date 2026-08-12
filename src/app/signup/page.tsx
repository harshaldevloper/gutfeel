"use client";

import { useState } from "react";
import { signUp } from "@/lib/supabase";
import Link from "next/link";

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
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl border border-stone-200 p-8 text-center">
          <p className="text-2xl mb-2">Check your email</p>
          <p className="text-stone-500 text-sm mb-6">We sent a confirmation link to {email}</p>
          <Link href="/login" className="text-emerald-600 font-medium">Back to sign in</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-stone-200 p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-stone-900 mb-2">Create account</h1>
        <p className="text-stone-500 text-sm mb-6">Sync your symptom logs and fingerprint across devices.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password (min 6 characters)"
            required
            minLength={6}
            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold disabled:opacity-60"
          >
            {loading ? "Creating…" : "Create Account"}
          </button>
        </form>
        <p className="text-center text-sm text-stone-500 mt-4">
          Already have an account? <Link href="/login" className="text-emerald-600 font-medium">Sign in</Link>
        </p>
        <p className="text-xs text-stone-400 text-center mt-4">
          By signing up you agree to our <Link href="/terms" className="underline">Terms</Link> and{" "}
          <Link href="/privacy" className="underline">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
