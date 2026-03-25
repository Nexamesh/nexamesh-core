import type { Metadata } from "next";
import ROICalculatorPageClient from "./ROICalculatorPageClient";

export const metadata: Metadata = {
  title: "ROI Calculator - NexaMesh",
  description:
    "Model the financial return of NexaMesh counter-UAS deployment. Input your threat frequency, response time, and deployment cost to calculate projected savings and payback period.",
  openGraph: {
    title: "ROI Calculator - NexaMesh",
    description:
      "Model the financial return of NexaMesh counter-UAS deployment. Calculate projected savings, payback period, and ROI for your facility.",
  },
};

export default ROICalculatorPageClient;
