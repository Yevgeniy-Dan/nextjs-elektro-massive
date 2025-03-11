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
  loading: () => (
    <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] bg-gray-100 animate-pulse rounded-md pt-5"></div>
  ),
});

const HomePageProductsSection = dynamic(
  () => import("@/components/home/HomePageProductsSection"),
  {
    loading: () => (
      <div className="w-full h-[600px] md:h-[700px] lg:h-[800px] bg-white py-8 space-y-4">
        <div className="h-10 w-64 bg-gray-200 rounded-md mx-auto"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-[250px] bg-gray-100 rounded-md animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    ),
  }
);
const CategoryGrid = dynamic(() => import("@/components/home/CategoryGrid"), {
  loading: () => (
    <div className="w-full h-[300px] md:h-[400px] bg-white py-6">
      <div className="h-8 w-48 bg-gray-200 rounded-md mx-auto mb-6"></div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="h-[120px] bg-gray-100 rounded-md animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  ),
});

const WhyUsSection = dynamic(() => import("@/components/home/WhyUsSection"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] md:h-[400px] bg-gray-50 py-8">
      <div className="h-10 w-48 bg-gray-200 rounded-md mx-auto mb-8"></div>
      <div className="flex flex-col md:flex-row justify-center gap-4 px-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-[180px] w-full md:w-1/3 bg-gray-100 rounded-md animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  ),
});

const AboutSection = dynamic(() => import("@/components/home/AboutSection"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] md:h-[450px] bg-white py-8">
      <div className="h-10 w-48 bg-gray-200 rounded-md mx-auto mb-6"></div>
      <div className="flex flex-col md:flex-row gap-6 px-4">
        <div className="w-full md:w-1/2 h-[250px] bg-gray-100 rounded-md animate-pulse"></div>
        <div className="w-full md:w-1/2 h-[250px] flex flex-col gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded-md"></div>
          ))}
        </div>
      </div>
    </div>
  ),
});
const ReviewCarousel = dynamic(
  () => import("@/components/reviews/ReviewCarousel"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[300px] md:h-[350px] bg-gray-50 py-8">
        <div className="h-10 w-64 bg-gray-200 rounded-md mx-auto mb-6"></div>
        <div className="flex gap-4 px-4 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-full md:w-1/3 h-[200px] bg-gray-100 rounded-md animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    ),
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
