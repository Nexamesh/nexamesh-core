import type { Metadata } from "next";
import CapabilitiesPageClient from "./CapabilitiesPageClient";

export const metadata: Metadata = {
  title: "Capabilities - NexaMesh",
  description:
    "Explore NexaMesh's counter-drone capabilities: multi-sensor fusion, RF jamming, GPS spoofing countermeasures, swarm defense, and sub-200ms autonomous response.",
  openGraph: {
    title: "Capabilities - NexaMesh",
    description:
      "Multi-sensor fusion, RF jamming, GPS spoofing countermeasures, swarm defense, and sub-200ms autonomous response for Kestrel Mesh and Sentinel Ring platforms.",
  },
};

export default CapabilitiesPageClient;
