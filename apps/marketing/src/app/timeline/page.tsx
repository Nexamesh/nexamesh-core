import type { Metadata } from "next";
import TimelinePageClient from "./TimelinePageClient";

export const metadata: Metadata = {
  title: "Development Timeline - NexaMesh",
  description:
    "NexaMesh's five-phase development roadmap from SBIR Phase I through full production. Track milestones for Kestrel Mesh, Sentinel Ring, and the broader counter-UAS platform.",
  openGraph: {
    title: "Development Timeline - NexaMesh",
    description:
      "Five-phase development roadmap from SBIR Phase I to full production. Kestrel Mesh, Sentinel Ring, and counter-UAS platform milestones.",
  },
};

export default TimelinePageClient;
