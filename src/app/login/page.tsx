"use client";

import { useState } from "react";
import { signIn } from "@/lib/supabase";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

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
    <div className="min-h-screen app-page-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md premium-card p-8">
        <div className="flex justify-center mb-6">
          <BrandLogo height={48} variant="mark" href="/" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-brand-navy mb-2 text-center">Welcome back</h1>
        <p className="text-stone-500 text-sm mb-6 text-center">
          Sign in to sync your logs across devices
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="input-field w-full px-4 py-3 text-stone-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="input-field w-full px-4 py-3 text-stone-900"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="text-sm text-stone-500 mt-6 text-center">
          No account?{" "}
          <Link href="/signup" className="text-brand-green-dark font-semibold hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
