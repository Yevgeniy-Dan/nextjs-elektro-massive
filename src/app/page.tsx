"use client";

import AboutSection from "@/components/home/AboutSection";
import Banner from "@/components/home/Banner";
import CategoryGrid from "@/components/home/CategoryGrid";
import TopCardCarousel from "@/components/home/TopCardCarousel";
import WhyUsSection from "@/components/home/WhyUsSection";

export default function Home() {
  return (
    <div className="w-full">
      <Banner />
      <TopCardCarousel title="Популярне" label="top" />
      <TopCardCarousel title="Акції" label="sale" />
      <TopCardCarousel title="Гарячі новинки" label="new" />
      <CategoryGrid />
      <WhyUsSection />
      <AboutSection />
    </div>
  );
}
