type Variant = "info" | "tip" | "warning";

const styles: Record<Variant, string> = {
  info: "bg-blue-50 border-blue-200 text-blue-900",
  tip: "bg-amber-50 border-amber-200 text-amber-950",
  warning: "bg-orange-50 border-orange-200 text-orange-950",
};

const icons: Record<Variant, string> = {
  info: "ℹ️",
  tip: "💡",
  warning: "⚠️",
};

type Props = {
  title?: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
};

/** Friendly explainer box — use for IBS hints, medical disclaimers, etc. */
export default function HintCard({ title, children, variant = "info", className = "" }: Props) {
  return (
    <div className={`rounded-xl border p-4 text-sm leading-relaxed ${styles[variant]} ${className}`}>
      <div className="flex gap-2.5">
        <span className="text-base shrink-0 mt-0.5" aria-hidden>
          {icons[variant]}
        </span>
        <div className="min-w-0">
          {title && <p className="font-semibold mb-1.5">{title}</p>}
          <div className="opacity-90 [&_ul]:mt-2 [&_ul]:space-y-1 [&_ul]:list-disc [&_ul]:pl-4 [&_p+p]:mt-2">{children}</div>
        </div>
      </div>
    </div>
  );
}
