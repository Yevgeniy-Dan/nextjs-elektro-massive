import AboutSection from "@/components/home/AboutSection";
import Banner from "@/components/home/Banner";
import CategoryGrid from "@/components/home/CategoryGrid";
import TopCardCarousel from "@/components/home/TopCardCarousel";
import WhyUsSection from "@/components/home/WhyUsSection";

export default async function Home() {
  // const products = await strapiApi.getProducts();
  const products: any[] = [];

  return (
    <div className="w-full">
      <Banner />
      <TopCardCarousel title="Популярне" rows={1} />
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
