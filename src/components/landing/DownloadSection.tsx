"use client";

import { motion } from "framer-motion";
import Link from "next/link";

function AndroidIcon() {
  return (
    <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85a.637.637 0 0 0-.83.22l-1.88 3.24a11.463 11.463 0 0 0-8.94 0L5.65 5.67a.643.643 0 0 0-.87-.22c-.3.16-.42.54-.26.85L6.4 9.48A8.959 8.959 0 0 0 1 14c0 .55.08 1.08.23 1.58l-1.84 3.18c-.16.31-.04.69.26.85.1.05.21.08.32.08.23 0 .46-.12.58-.34l1.87-3.23A8.994 8.994 0 0 0 12 19c1.66 0 3.2-.45 4.53-1.23l1.87 3.23c.12.22.35.34.58.34.11 0 .22-.03.32-.08.3-.16.42-.54.26-.85L22.77 15.6c.15-.5.23-1.03.23-1.58 0-1.66-.67-3.16-1.76-4.25A8.96 8.96 0 0 0 17.6 9.48zM7 15.25A1.25 1.25 0 1 1 8.25 14 1.25 1.25 0 0 1 7 15.25zm10 0A1.25 1.25 0 1 1 18.25 14 1.25 1.25 0 0 1 17 15.25z" />
    </svg>
  );
}

function DownloadButton({ compact }: { compact?: boolean }) {
  return (
    <Link
      href="/download/"
      className={
        compact
          ? "flex items-center gap-3.5 px-5 py-3.5 bg-brand-navy text-white rounded-2xl hover:bg-brand-navy-light transition-colors shadow-lg shadow-brand-navy/15 min-w-[11.5rem]"
          : "btn-accent inline-flex items-center justify-center gap-2"
      }
    >
      <AndroidIcon />
      <span className={compact ? "text-left" : undefined}>
        {compact && (
          <span className="block text-[10px] uppercase tracking-wider text-white/60 font-semibold">Android</span>
        )}
        <span className={compact ? "block text-base font-bold leading-tight" : undefined}>Download APK</span>
        {compact && (
          <span className="block text-[11px] text-brand-green-light/90 font-medium mt-0.5">Works offline</span>
        )}
      </span>
    </Link>
  );
}

export default function DownloadSection({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="flex flex-col sm:flex-row gap-3">
        <DownloadButton compact />
        <Link href="/account/" className="btn-secondary text-center min-w-[11.5rem] py-3.5">
          Premium
        </Link>
      </div>
    );
  }

  return (
    <section id="download" className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-cream-dark">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-brand-green-dark mb-3">Android app</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-navy mb-4">
            Install GutVista on your phone
          </h2>
          <p className="text-stone-600 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Native app for daily check-ins — offline, fast, built for roti-and-dal meal planning. Premium billing on the
            website.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <DownloadButton />
            <Link href="/#waitlist" className="btn-secondary px-8 py-3.5">
              Join waitlist
            </Link>
          </div>

          <p className="text-sm text-stone-500">
            Also coming to Amazon Appstore &amp; Samsung Galaxy Store.{" "}
            <Link href="/onboarding/" className="text-stone-400 hover:text-stone-600 underline underline-offset-2">
              Web demo
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
