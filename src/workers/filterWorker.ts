import { Brand } from "@/types/types";

self.onmessage = (
  e: MessageEvent<{ filters: Record<string, string[]>; brands: Brand[] }>
) => {
  const { filters, brands } = e.data;
  const allFilterValues = new Set(Object.values(filters).flat());
  const filteredBrands = brands.filter((brand) =>
    brand.attributes?.title
      ? allFilterValues.has(brand.attributes?.title.trim())
      : false
  );

  self.postMessage(filteredBrands);
};
