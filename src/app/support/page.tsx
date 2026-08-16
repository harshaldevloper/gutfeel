"use client";

import { useState } from "react";
import Link from "next/link";
import { submitSupportTicket, type SupportCategory } from "@/lib/support";
import BrandLogo from "@/components/BrandLogo";

const CATEGORIES: { id: SupportCategory; label: string }[] = [
  { id: "general", label: "General" },
  { id: "bug", label: "Bug report" },
  { id: "billing", label: "Billing" },
  { id: "feature", label: "Feature idea" },
  { id: "health", label: "Health question" },
];

export default function SupportPage() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState<SupportCategory>("general");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const result = await submitSupportTicket({ email, subject, message, category });
    if (result.ok) {
      setStatus("done");
      setSubject("");
      setMessage("");
    } else {
      setStatus("error");
      setError(result.error ?? "Something went wrong");
    }
  }

  return (
    <div className="min-h-screen app-page-bg">
      <header className="glass-header px-4 py-4 sticky top-0 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <BrandLogo height={28} variant="mark" />
            <span className="font-bold text-brand-navy text-sm">GutVista</span>
          </Link>
          <Link href="/dashboard" className="text-sm font-semibold text-brand-green-dark">
            Open app →
          </Link>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8 relative z-[1]">
        <p className="section-label">Support</p>
        <h1 className="font-serif text-3xl font-bold text-brand-navy mt-1 mb-2">How can we help?</h1>
        <p className="text-sm text-stone-600 mb-4">
          Prefer the app? Open <strong>GutVista → Home → Support</strong> for the best experience.
          This form also works on web.
        </p>
        <p className="text-xs text-stone-500 mb-6">
          Not medical advice. For emergencies, contact a doctor.
        </p>

        {status === "done" ? (
          <div className="glass-card-green rounded-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-brand-green/20 flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-brand-green-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <p className="font-semibold text-brand-navy">Message received</p>
            <p className="text-sm text-stone-600 mt-2">We&apos;ll email you at {email} when we have an answer.</p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-4 text-sm font-semibold text-brand-green-dark hover:underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="tracker-hero-glass p-6 space-y-5">
            <div>
              <label className="section-label block mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(c => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCategory(c.id)}
                    className={`chip ${category === c.id ? "chip-active" : ""}`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="section-label block mb-2">Email</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input-field w-full px-4 py-3"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="section-label block mb-2">Subject</label>
              <input
                id="subject"
                type="text"
                required
                maxLength={200}
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="input-field w-full px-4 py-3"
                placeholder="Brief summary"
              />
            </div>

            <div>
              <label htmlFor="message" className="section-label block mb-2">Message</label>
              <textarea
                id="message"
                required
                rows={5}
                maxLength={4000}
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="input-field w-full px-4 py-3 resize-none"
                placeholder="Describe your issue or question..."
              />
            </div>

            {status === "error" && (
              <p className="text-sm text-red-600 font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3.5 btn-glow text-white rounded-xl font-bold disabled:opacity-60"
            >
              {status === "loading" ? "Sending…" : "Send message"}
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
