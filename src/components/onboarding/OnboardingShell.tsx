import BrandLogo from "@/components/BrandLogo";

const STEP_LABELS = ["Welcome", "Region", "IBS profile", "Diet", "Kitchen", "Done"];

type Props = {
  step: number;
  totalSteps?: number;
  children: React.ReactNode;
  onBack?: () => void;
  showBack?: boolean;
};

export default function OnboardingShell({ step, totalSteps = 5, children, onBack, showBack }: Props) {
  const progress = Math.round((step / totalSteps) * 100);

  return (
    <div className="min-h-screen bg-cream hero-mesh flex flex-col">
      <div className="px-4 pt-6 pb-2 max-w-lg mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <BrandLogo height={40} href="/" />
          <span className="text-xs font-medium text-stone-500">
            Step {step + 1} of {totalSteps + 1}
          </span>
        </div>

        <div className="mb-2">
          <div className="h-2 bg-stone-200/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <p className="text-xs text-stone-500 font-medium">{STEP_LABELS[step] ?? "Setup"}</p>
      </div>

      <div className="flex-1 flex items-start justify-center px-4 pb-8">
        <div className="w-full max-w-lg">
          <div className="card-elevated rounded-3xl p-6 sm:p-8">{children}</div>
          {showBack && onBack && (
            <button
              type="button"
              onClick={onBack}
              className="w-full mt-4 py-3 text-stone-600 font-medium text-sm hover:text-stone-900 transition-colors"
            >
              ← Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
