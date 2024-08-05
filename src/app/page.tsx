import { strapiApi } from "../../lib/api";
import Banner from "@/components/banner";
import TopCardCarousel from "@/components/top-card-carousel";
import CategoryGrid from "@/components/category-grid";
import WhyUsSection from "@/components/why-us-section";
import AboutSection from "@/components/about-section";

export default async function Home() {
  // const products = await strapiApi.getProducts();
  const products: any[] = [];

  return (
    <div className="w-full">
      <Banner />
      <TopCardCarousel title="Популярне" />
      <TopCardCarousel
        title="Акції"
        rows={1}
        productLabelPath="/new-product-label.png"
      />
      <TopCardCarousel
        title="Гарячі новинки"
        rows={1}
        productLabelPath="/sale.png"
      />
      <CategoryGrid />
      <WhyUsSection />
      <AboutSection />
    </div>
  );
}
