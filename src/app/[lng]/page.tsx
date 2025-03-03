import Banner from "@/components/home/Banner";
import CategoryGrid from "@/components/home/CategoryGrid";
import HomePageProductsSection from "@/components/home/HomePageProductsSection";
import { getBanners, getCategories, getHomePageProducts } from "./actions";
import dynamic from "next/dynamic";

interface HomeProps {
  params: {
    lng: string;
  };
}

const WhyUsSection = dynamic(() => import("@/components/home/WhyUsSection"), {
  ssr: false,
});
const AboutSection = dynamic(() => import("@/components/home/AboutSection"), {
  ssr: false,
});
const ReviewCarousel = dynamic(
  () => import("@/components/reviews/ReviewCarousel"),
  {
    ssr: false,
  }
);

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
