"use client";

import { useEffect, useState } from "react";
import { getUser, signOut, getSubscription } from "@/lib/supabase";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const [plan, setPlan] = useState<string | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);

  useEffect(() => {
    getUser().then(async u => {
      setUser(u);
      if (u) {
        const { data } = await getSubscription(u.id);
        setPlan(data?.plan ?? null);
      }
    });
  }, []);

  async function startCheckout(tier: "premium" | "annual") {
    setCheckoutLoading(tier);
    try {
      const res = await fetch("/api/dodo/checkout/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier, email: user?.email, user_id: user?.id }),
      });
      const data = await res.json();
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        alert(data.error ?? "Checkout unavailable. Add Dodo product IDs to your environment.");
      }
    } catch {
      alert("Could not start checkout. Try again later.");
    }
    setCheckoutLoading(null);
  }

  async function handleSignOut() {
    await signOut();
    window.location.href = "/";
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4">
      <div className="max-w-lg mx-auto space-y-6">
        <a href="/dashboard" className="text-emerald-600 text-sm">← Back to app</a>

        <div className="bg-white rounded-2xl border border-stone-200 p-6">
          <h1 className="text-xl font-bold text-stone-900 mb-4">Account</h1>
          {user ? (
            <>
              <p className="text-sm text-stone-600 mb-1">Signed in as</p>
              <p className="font-medium text-stone-900 mb-4">{user.email}</p>
              <p className="text-sm text-stone-500 mb-4">
                Plan: <span className="font-semibold text-stone-800">{plan ?? "Free"}</span>
              </p>
              <button onClick={handleSignOut} className="text-sm text-red-600 font-medium">
                Sign out
              </button>
            </>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-stone-600">Sign in to sync data and manage subscriptions.</p>
              <Link href="/login" className="block text-center py-3 bg-emerald-600 text-white rounded-xl font-semibold">
                Sign In
              </Link>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-6">
          <h2 className="font-bold text-stone-900 mb-2">Upgrade to Premium</h2>
          <p className="text-sm text-stone-500 mb-4">
            Payments handled by Dodo Payments. Works on web — mobile app subscriptions coming separately
            (App Store / Play Store require their own billing).
          </p>
          <div className="space-y-3">
            <button
              onClick={() => startCheckout("premium")}
              disabled={checkoutLoading !== null}
              className="w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold disabled:opacity-60"
            >
              {checkoutLoading === "premium" ? "Loading…" : "Premium — $7.99/mo"}
            </button>
            <button
              onClick={() => startCheckout("annual")}
              disabled={checkoutLoading !== null}
              className="w-full py-3 border border-stone-300 text-stone-700 rounded-xl font-semibold disabled:opacity-60"
            >
              {checkoutLoading === "annual" ? "Loading…" : "Annual — $49/yr"}
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-stone-400 space-x-4">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
    </div>
  );
}
