import dynamic from "next/dynamic";

import { getBanners, getCategories, getHomePageProducts } from "./actions";
import { Suspense } from "react";

export const revalidate = 3600;

interface HomeProps {
  params: {
    lng: string;
  };
}

const Banner = dynamic(() => import("@/components/home/Banner"), {
  ssr: false,
});

const HomePageProductsSection = dynamic(
  () => import("@/components/home/HomePageProductsSection")
);
const CategoryGrid = dynamic(() => import("@/components/home/CategoryGrid"));

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
    loading: () => <div>Loading...</div>,
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
      <Suspense fallback={<div>Loading additional content...</div>}>
        <WhyUsSection />
        <AboutSection />
        <ReviewCarousel lng={lng} />
      </Suspense>
    </div>
  );
}
