import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DownloadPage from "@/components/download/DownloadPage";

export const metadata = {
  title: "Download Gutfeel for Android",
  description: "Install the Gutfeel Android app — low FODMAP meal planner and symptom tracker. Works offline.",
};

export default function DownloadRoute() {
  return (
    <>
      <Header />
      <main>
        <DownloadPage />
      </main>
      <Footer />
    </>
  );
}
