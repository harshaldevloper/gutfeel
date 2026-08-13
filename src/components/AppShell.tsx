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
    <div className="min-h-screen app-page-bg pb-28">
      <AppHeader title={title} right={headerRight} />
      <main className="max-w-4xl mx-auto px-4 py-5 space-y-5 relative z-[1]">{children}</main>
      <AppBottomNav />
    </div>
  );
}
