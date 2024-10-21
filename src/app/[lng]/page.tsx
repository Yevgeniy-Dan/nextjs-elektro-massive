"use client";

import AboutSection from "@/components/home/AboutSection";
import Banner from "@/components/home/Banner";
import CategoryGrid from "@/components/home/CategoryGrid";
import HomePageProductsSection from "@/components/home/HomePageProductsSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import ReviewCarousel from "@/components/reviews/ReviewCarousel";

interface HomeProps {
  params: {
    lng: string;
  };
}

const Home: React.FC<HomeProps> = ({ params: { lng } }) => {
  return (
    <div className="w-full">
      <Banner />
      <HomePageProductsSection lng={lng} />
      <CategoryGrid lng={lng} />
      <WhyUsSection />
      <AboutSection />
      <ReviewCarousel />
    </div>
  );
};

export default Home;
