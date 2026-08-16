"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ReleaseManifest {
  version: string;
  versionCode: number;
  available: boolean;
  apkUrl: string;
  sha256: string;
  publishedAt: string | null;
  releaseNotes: string;
}

const ALT_STORES = [
  { name: "Amazon Appstore", href: "https://developer.amazon.com/apps-and-games", note: "Listing soon" },
  { name: "Samsung Galaxy Store", href: "https://developer.samsung.com/galaxy-store", note: "Listing soon" },
  { name: "Uptodown", href: "https://en.uptodown.com/developers-console", note: "Listing soon" },
];

export default function DownloadPage() {
  const [manifest, setManifest] = useState<ReleaseManifest | null>(null);

  useEffect(() => {
    fetch("/downloads/manifest.json")
      .then(r => r.json())
      .then(setManifest)
      .catch(() => setManifest(null));
  }, []);

  const ready = manifest?.available && manifest.apkUrl;

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-cream min-h-screen">
      <div className="max-w-2xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-green-dark mb-3">Android app</p>
        <h1 className="font-serif text-4xl font-semibold text-brand-navy mb-4">Download GutVista</h1>
        <p className="text-stone-600 text-lg leading-relaxed mb-8">
          Native Android app — offline daily logging, meal plans, and your trigger fingerprint. No PWA. Install the APK
          or grab it from partner stores when listed.
        </p>

        <div className="bg-white rounded-3xl border border-brand-navy/8 p-6 sm:p-8 shadow-sm mb-8">
          {ready ? (
            <>
              <p className="text-sm text-stone-500 mb-1">Version {manifest!.version}</p>
              <a href={manifest!.apkUrl} className="btn-accent w-full text-center block mb-4">
                Download APK ({manifest!.version})
              </a>
              {manifest!.sha256 && (
                <p className="text-xs text-stone-400 font-mono break-all mb-4">
                  SHA-256: {manifest!.sha256}
                </p>
              )}
              {manifest!.releaseNotes && (
                <p className="text-sm text-stone-600">{manifest!.releaseNotes}</p>
              )}
            </>
          ) : (
            <>
              <p className="text-brand-navy font-semibold mb-2">First build shipping soon</p>
              <p className="text-sm text-stone-600 mb-6 leading-relaxed">
                We&apos;re running the first signed APK build. Join the waitlist to get notified when{" "}
                <strong>v{manifest?.version ?? "1.0.0"}</strong> is ready to install.
              </p>
              <a href="/#waitlist" className="btn-accent w-full text-center block mb-3">
                Notify me
              </a>
              <Link href="/onboarding" className="btn-secondary w-full text-center block">
                Use web app meanwhile
              </Link>
            </>
          )}
        </div>

        <section className="mb-10">
          <h2 className="font-serif text-xl font-semibold text-brand-navy mb-4">Install from APK</h2>
          <ol className="space-y-3 text-sm text-stone-600 list-decimal list-inside leading-relaxed">
            <li>Download the APK file to your Android phone.</li>
            <li>Open the file → if prompted, allow install from your browser or Files app.</li>
            <li>Settings → Security → enable install from unknown sources for that app (wording varies by phone).</li>
            <li>Open GutVista → complete onboarding → log daily.</li>
          </ol>
          <p className="text-xs text-stone-400 mt-4">
            Package: <code className="bg-stone-100 px-1 rounded">com.gutvista.app</code> · Not medical advice.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-xl font-semibold text-brand-navy mb-4">Premium &amp; account</h2>
          <p className="text-sm text-stone-600 mb-4 leading-relaxed">
            Core features are free in the app. Upgrade for cloud sync and reintroduction on the website — same account
            works everywhere.
          </p>
          <Link href="/account/" className="text-brand-green-dark font-semibold hover:underline">
            Manage subscription →
          </Link>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-brand-navy mb-4">Also on (coming soon)</h2>
          <ul className="space-y-2">
            {ALT_STORES.map(s => (
              <li key={s.name} className="flex justify-between text-sm border-b border-stone-100 py-2">
                <span className="text-stone-700">{s.name}</span>
                <span className="text-stone-400">{s.note}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
