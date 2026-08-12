type Props = {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  padding?: "sm" | "md" | "lg";
};

const pad = { sm: "p-4", md: "p-5", lg: "p-6" };

export default function AppCard({ children, className = "", interactive = false, padding = "md" }: Props) {
  return (
    <div
      className={`app-card ${pad[padding]} ${interactive ? "app-card-interactive" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
