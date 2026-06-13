import type { Metadata } from "next";
import HousePricePredictionPage from "@/components/house-price-page";

export const metadata: Metadata = {
  title: "House Price Prediction",
  description:
    "End-to-end ML pipeline on the Ames housing dataset. Full EDA, feature engineering, and outlier handling. Linear Regression achieving R² ≈ 0.99. Live demo on HuggingFace Spaces.",
};

export default function Page() {
  return <HousePricePredictionPage />;
}
