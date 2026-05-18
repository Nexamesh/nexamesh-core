export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudy {
  title: string;
  summary: string;
  metrics: CaseStudyMetric[];
  outcomes: string[];
  imageUrl: string;
}

export const caseStudiesData: CaseStudy[] = [
  {
    title: "Kestrel Mesh Protects a Regional Power Station",
    summary:
      "A regional utility operator deployed a 6-node Kestrel Mesh perimeter around a 400-acre generation facility — operational in under 90 minutes, with zero cloud dependency in an RF-contested environment.",
    metrics: [
      { value: "<200ms", label: "Detection Latency" },
      { value: "0", label: "Cloud Dependencies" },
      { value: "90min", label: "Full Deploy Time" },
    ],
    outcomes: [
      "Detected and classified 143 drone incursions in the first 6 months, all logged to blockchain",
      "Maintained full detection capability during two simulated RF-jamming exercises",
      "Reduced security team response time by 68% through automated alert routing",
      "Evidence chain accepted as admissible in two trespass prosecutions",
    ],
    imageUrl: "/assets/case-study-1.png",
  },
  {
    title: "Sentinel Ring Secures a Major International Airport",
    summary:
      "A major international airport implemented Sentinel Ring to protect its airspace from unauthorized drone activity, covering 12 sq km of controlled airspace.",
    metrics: [
      { value: "24/7", label: "Monitoring" },
      { value: "<5s", label: "Response Time" },
      { value: "0", label: "Disruptions" },
    ],
    outcomes: [
      "Detected and classified 847 drone incursions in the first 12 months",
      "Achieved sub-200ms detection-to-alert latency across all sensor nodes",
      "Prevented an estimated $2.3M in potential runway closure costs",
      "Reduced false positive rate from 12% (legacy system) to 0.3%",
    ],
    imageUrl: "/assets/case-study-2.png",
  },
];
