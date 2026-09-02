import SiteShell from "@/components/site-shell";
import { CHANNELS, PLATFORMS } from "@/lib/data";

export default function HomePage() {
  return <SiteShell channels={CHANNELS} platforms={PLATFORMS} />;
}
