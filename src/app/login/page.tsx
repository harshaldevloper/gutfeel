"use client";

import { useState } from "react";
import { signIn } from "@/lib/supabase";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error: authError } = await signIn(email, password);
    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }
    window.location.href = "/dashboard";
  }

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-stone-200 p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-stone-900 mb-2">Sign in</h1>
        <p className="text-stone-500 text-sm mb-6">
          Optional — sync your logs across devices. The app works offline without an account.
        </p>
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
            placeholder="Password"
            required
            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
        <p className="text-center text-sm text-stone-500 mt-4">
          No account? <Link href="/signup" className="text-emerald-600 font-medium">Sign up</Link>
        </p>
        <p className="text-center text-sm mt-2">
          <Link href="/onboarding" className="text-stone-400">Continue without account →</Link>
        </p>
      </div>
    </div>
  );
}
