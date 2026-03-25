import type { Metadata } from "next";
import * as React from "react";
import HomePage from "./home";

export const metadata: Metadata = {
  title: "NexaMesh - Autonomous Counter-Drone Defense Platform",
  description:
    "NexaMesh delivers SAE Level 4 autonomous counter-drone defense. Kestrel Mesh for consumer protection, Sentinel Ring for enterprise security. Sub-200ms response in RF-denied environments.",
  openGraph: {
    title: "NexaMesh - Autonomous Counter-Drone Defense Platform",
    description:
      "SAE Level 4 autonomous counter-drone defense. Kestrel Mesh for consumer protection, Sentinel Ring for enterprise security. Sub-200ms response in RF-denied environments.",
  },
};

export default function Page(): React.ReactElement {
  return <HomePage />;
}
