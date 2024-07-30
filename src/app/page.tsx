import Image from "next/image";
import { strapiApi } from "../../lib/api";
import ProductList from "../components/product-list";
import Header from "@/components/header";
import Banner from "@/components/banner";
import TopCard from "@/components/top-card";
import TopCardCarousel from "@/components/top-card-carousel";
import CategoryGrid from "@/components/category-grid";
import WhyUsSection from "@/components/why-us-section";
import AboutSection from "@/components/about-section";
import Footer from "@/components/footer";

export default async function Home() {
  // const products = await strapiApi.getProducts();
  const products: any[] = [];

  return (
    <div className="w-full">
      <div className="px-4 sm:px-6 md:px-8 lg:px-16 relative">
        <Header />
        {/* <ProductList items={products} /> */}
        <div className="max-w-7xl mx-auto">
          <Banner />
          <TopCardCarousel title="Популярне" />
          <TopCardCarousel title="Акції" rows={1} />
          <TopCardCarousel title="Гарячі новинки" rows={1} />
          <CategoryGrid />
          <WhyUsSection />
          <AboutSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
