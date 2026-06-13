import type { Metadata } from "next";
import MarineTrashDetectionPage from "@/components/marine-trash-page";

export const metadata: Metadata = {
  title: "Marine Trash Detection",
  description:
    "Fine-tuned YOLOv8m-seg on 7,212 underwater images across 16 classes. Achieves 65.6% mAP50. Live demo on HuggingFace Spaces.",
};

export default function Page() {
  return <MarineTrashDetectionPage />;
}
