import AboutSection from "@/components/home/AboutSection";
import Banner from "@/components/home/Banner";
import CategoryGrid from "@/components/home/CategoryGrid";
import HomePageProductsSection from "@/components/home/HomePageProductsSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import ReviewCarousel from "@/components/reviews/ReviewCarousel";
import { getBanners, getCategories, getHomePageProducts } from "./actions";

interface HomeProps {
  params: {
    lng: string;
  };
}

export default async function Home({ params: { lng } }: HomeProps) {
  const banners = await getBanners();
  const products = await getHomePageProducts(lng);
  const categories = await getCategories(lng);

  return (
    <div className="w-full">
      <Banner banners={banners ?? []} />
      <HomePageProductsSection lng={lng} homePageProducts={products} />
      <CategoryGrid lng={lng} data={categories ?? []} />
      <WhyUsSection />
      <AboutSection />
      <ReviewCarousel lng={lng} />
    </div>
  );
}
