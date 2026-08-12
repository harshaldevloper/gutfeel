import SectionHeading from "@/components/SectionHeading";

/** Bento-style trust strip — data-first, not bullet lists (2026 health SaaS pattern) */
export default function ProductStrip() {
  const items = [
    { value: "3 min", label: "Onboarding with IBS hints", span: "" },
    { value: "500+", label: "Foods incl. India", span: "" },
    { value: "10 sec", label: "Symptom logging", span: "md:col-span-2" },
    { value: "Offline", label: "Works without account", span: "" },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-brand-navy/5">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="The app"
          title="See what you get on day one"
          subtitle="Real screens — meal plan, tracker, and Indian food database. No mockup fiction."
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {items.map(item => (
            <div
              key={item.label}
              className={`app-card p-5 text-center ${item.span}`}
            >
              <p className="font-serif text-2xl sm:text-3xl font-semibold text-brand-navy">{item.value}</p>
              <p className="text-sm text-stone-600 mt-1">{item.label}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          <a href="/onboarding" className="btn-accent">
            Start free setup
          </a>
          <a href="/dashboard" className="btn-secondary">
            Peek at dashboard
          </a>
        </div>
      </div>
    </section>
  );
}
