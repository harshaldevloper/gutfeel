type Day = { label: string; level: number; isToday?: boolean };

type Props = {
  data: Day[];
  title?: string;
};

/** Compact weekly bar chart for dashboard grid */
export default function WeeklyMiniChart({ data, title = "Weekly trend" }: Props) {
  return (
    <div className="premium-card glass-card-navy p-4 flex flex-col justify-between h-full min-h-[140px]">
      <p className="section-label mb-2">{title}</p>
      <div className="flex items-end justify-between gap-1 h-20 mt-auto">
        {data.map((day, i) => {
          const h = day.level > 0 ? Math.max(12, (day.level / 5) * 100) : 8;
          const isToday = day.isToday;
          return (
            <div key={i} className="flex-1 flex flex-col items-center justify-end h-full relative">
              <div
                className={`w-full rounded-t-md transition-all ${
                  isToday
                    ? "bg-brand-green"
                    : day.level <= 1.5
                      ? "bg-brand-green-light"
                      : day.level <= 2.5
                        ? "bg-amber-200"
                        : day.level > 0
                          ? "bg-red-200"
                          : "bg-stone-200"
                }`}
                style={{ height: `${h}%` }}
              />
              {isToday && (
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-green" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
