"use client";

import { motion } from "framer-motion";

const STORE = {
  ios: { label: "App Store", sub: "TestFlight soon", href: "#waitlist" },
  android: { label: "Google Play", sub: "Internal testing soon", href: "#waitlist" },
};

function StoreIcon({ platform }: { platform: "ios" | "android" }) {
  if (platform === "ios") {
    return (
      <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    );
  }
  return (
    <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3.609 1.814L13.792 12 3.61 22.186a1.003 1.003 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z" />
    </svg>
  );
}

function StoreBadge({
  platform,
  label,
  sub,
  href,
}: {
  platform: "ios" | "android";
  label: string;
  sub: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-center gap-3.5 px-5 py-3.5 bg-brand-navy text-white rounded-2xl hover:bg-brand-navy-light transition-colors shadow-lg shadow-brand-navy/15 min-w-[11.5rem]"
    >
      <StoreIcon platform={platform} />
      <span className="text-left">
        <span className="block text-[10px] uppercase tracking-wider text-white/60 font-semibold">
          {platform === "ios" ? "Download on the" : "Get it on"}
        </span>
        <span className="block text-base font-bold leading-tight">{label}</span>
        <span className="block text-[11px] text-brand-green-light/90 font-medium mt-0.5">{sub}</span>
      </span>
    </a>
  );
}

export default function DownloadSection({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="flex flex-col sm:flex-row gap-3">
        <StoreBadge {...STORE.ios} platform="ios" />
        <StoreBadge {...STORE.android} platform="android" />
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
          <p className="text-xs font-bold uppercase tracking-widest text-brand-green-dark mb-3">
            Mobile-first
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-navy mb-4">
            Daily logging belongs on your phone
          </h2>
          <p className="text-stone-600 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Gutfeel is built for quick check-ins between meals — notifications, offline mode, and one-tap symptom logs.
            The website handles account, billing, and legal.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <StoreBadge {...STORE.ios} platform="ios" />
            <StoreBadge {...STORE.android} platform="android" />
          </div>

          <p className="text-sm text-stone-500">
            Stores launching soon —{" "}
            <a href="#waitlist" className="text-brand-green-dark font-semibold hover:underline">
              join the waitlist
            </a>{" "}
            for TestFlight &amp; Play internal access.{" "}
            <a href="/onboarding" className="text-stone-400 hover:text-stone-600 underline underline-offset-2">
              Try web demo
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
