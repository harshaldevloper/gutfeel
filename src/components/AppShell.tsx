import AppBottomNav from "@/components/AppBottomNav";
import AppHeader from "@/components/AppHeader";

type Props = {
  children: React.ReactNode;
  title?: string;
  headerRight?: React.ReactNode;
};

/** Shared layout for in-app pages — cream bg, header, bottom nav */
export default function AppShell({ children, title, headerRight }: Props) {
  return (
    <div className="min-h-screen bg-cream pb-24">
      <AppHeader title={title} right={headerRight} />
      <main className="max-w-4xl mx-auto p-4 space-y-4">{children}</main>
      <AppBottomNav />
    </div>
  );
}
