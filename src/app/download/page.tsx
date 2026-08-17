import { readFileSync } from "fs";
import path from "path";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DownloadPage, { ReleaseManifest } from "@/components/download/DownloadPage";

export const metadata = {
  title: "Download GutVista for Android",
  description: "Install the GutVista Android app — low FODMAP meal planner and symptom tracker. Works offline.",
};

function loadManifest(): ReleaseManifest | null {
  try {
    const manifestPath = path.join(process.cwd(), "public", "downloads", "manifest.json");
    const parsed = JSON.parse(readFileSync(manifestPath, "utf8"));
    return parsed as ReleaseManifest;
  } catch {
    return null;
  }
}

export default function DownloadRoute() {
  const manifest = loadManifest();
  return (
    <>
      <Header />
      <main>
        <DownloadPage serverManifest={manifest} />
      </main>
      <Footer />
    </>
  );
}
