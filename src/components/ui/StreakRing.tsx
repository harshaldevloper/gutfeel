type Props = {
  days: number;
  goal?: number;
  label?: string;
};

/** Circular streak indicator — Stitch-inspired */
export default function StreakRing({ days, goal = 7, label = "Current streak" }: Props) {
  const r = 45;
  const circumference = 2 * Math.PI * r;
  const progress = Math.min(days / goal, 1);
  const offset = circumference * (1 - progress);

  return (
    <div className="premium-card glass-card-green p-4 flex flex-col items-center text-center h-full">
      <p className="section-label w-full text-left mb-3">Symptom free</p>
      <div className="relative w-24 h-24 mb-2">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100" aria-hidden>
          <circle cx="50" cy="50" r={r} fill="none" stroke="#e4e2df" strokeWidth="6" />
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke="currentColor"
            className="text-brand-green"
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-serif text-2xl font-bold text-brand-navy leading-none">
            {days}
            <span className="text-sm font-normal text-stone-500">d</span>
          </span>
        </div>
      </div>
      <p className="text-xs font-semibold text-stone-500">{label}</p>
    </div>
  );
}
