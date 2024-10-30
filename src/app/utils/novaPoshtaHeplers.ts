import { Product } from "@/gql/graphql";

export function calculateProductDimensions(product: Product): {
  volume: number;
  weight: number;
  width: number;
  length: number;
  height: number;
} {
  const params = product.params || {};
  let weight = 0.1; // Default weight in kg
  let width = 10; // Default dimensions in cm
  let length = 10;
  let height = 10;

  if (params["Вага"]) {
    const weightStr = params["Вага"].toLowerCase();
    const weightMatch = weightStr.match(/(\d+(\.\d+)?)\s*(г|кг|g|kg)?/);

    if (weightMatch) {
      const value = parseFloat(weightMatch[1]);
      const unit = weightMatch[3];

      // Convert to kg depending on the unit of measurement
      if (!unit || unit === "г" || unit === "g") {
        weight = value / 1000; // from grams to kg
      } else if (unit === "кг" || unit === "kg") {
        weight = value; // already in kg
      }
    }
  }

  if (params["Розміри"]) {
    const dimensionsStr = params["Розміри"].replace(/mm/g, "");

    const dimensions = dimensionsStr
      .split("x")
      .map((dim: string) => parseFloat(dim.trim()));
    if (dimensions.length >= 2) {
      width = dimensions[0] / 10; //Convert mm to cm
      length = dimensions[1] / 10;

      if (dimensions.length === 3) {
        height = dimensions[2] / 10;
      } else {
        // If only 2 dimensions are provided, estimate the height
        height = Math.min(width, length) / 2;
      }
    }
  }

  const volume = (width * length * height) / 1000000; // Convert cm³ to m³

  return { volume, weight, width, length, height };
}
