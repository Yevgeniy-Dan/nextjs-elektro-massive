import { ICartProduct } from "@/types/cart";

export function calculateProductDimensions(product: ICartProduct): {
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
    const weightMatch = params["Вага"].match(/(\d+(\.\d+)?)/);
    if (weightMatch) {
      weight = parseFloat(weightMatch[1]) / 1000; // Convert grams to kg //TODO: is there gaurantee that always will be in grams?
    }
  }

  if (params["Розміри"]) {
    const dimensionsStr = params["Розміри"].replace(/mm/g, "");

    const dimensions = dimensionsStr
      .split("x")
      .map((dim) => parseFloat(dim.trim()));
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
