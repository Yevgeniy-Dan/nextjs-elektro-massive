"use client";

import AboutSection from "@/components/home/AboutSection";
import Banner from "@/components/home/Banner";
import CategoryGrid from "@/components/home/CategoryGrid";
import HomePageProductsSection from "@/components/home/HomePageProductsSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import ReviewCarousel from "@/components/reviews/ReviewCarousel";

export default function Home() {
  return (
    <div className="w-full">
      <Banner />
      <HomePageProductsSection />
      <CategoryGrid />
      <WhyUsSection />
      <AboutSection />
      <ReviewCarousel />
    </div>
  );
}
