import type { Metadata } from "next";
import ProfileConfirmPageClient from "./ProfileConfirmPageClient";

export const metadata: Metadata = {
  title: "Confirm Profile | NexaMesh",
  description: "Confirm your profile details to complete account setup.",
  robots: { index: false, follow: false },
};

export default function ProfileConfirmPage() {
  return <ProfileConfirmPageClient />;
}
