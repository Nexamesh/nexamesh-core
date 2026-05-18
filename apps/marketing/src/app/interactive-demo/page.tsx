import type { Metadata } from "next";
import InteractiveDemoPageClient from "./InteractiveDemoPageClient";

export const metadata: Metadata = {
  title: "Interactive Threat Simulator - NexaMesh",
  description:
    "Try the NexaMesh interactive threat simulator. Experience real-time counter-drone detection and neutralization scenarios powered by WebAssembly in your browser.",
  openGraph: {
    title: "Interactive Threat Simulator - NexaMesh",
    description:
      "Experience real-time counter-drone detection and neutralization scenarios in the NexaMesh WebAssembly threat simulator.",
  },
};

export default InteractiveDemoPageClient;
