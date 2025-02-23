import { dir } from "i18next";

import React from "react";

import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Providers } from "../providers";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/authOptions";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/react";
import { languages } from "../i18n/settings";
import { GoogleAnalytic } from "@/components/services/GoogleAnalytic";

import dynamic from "next/dynamic";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title:
    "ELEKTRO-MASSIVE | Електротовари, Сантехніка, Будматеріали для дому та ремонту",
  description:
    "ELEKTRO-MASSIVE - широкий асортимент електротоварів, сантехніки та будматеріалів. Замовляйте онлайн з доставкою по Україні. Вигідні ціни та висока якість.",
};

export function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

const SignInModal = dynamic(() => import("@/components/shared/SignInModal"), {
  ssr: false,
});

const ShoppingCartModal = dynamic(
  () => import("@/components/shared/ShoppingCartModal"),
  {
    ssr: false,
  }
);

export default async function RootLayout({
  children,
  params: { lng },
}: Readonly<{
  children: React.ReactNode;
  params: { lng: string };
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={`${roboto.className} flex flex-col min-h-screen`}>
        <GoogleAnalytic />
        <Providers session={session}>
          <div className="flex-grow">
            <div className="px-4 sm:px-6 md:px-8 lg:px-16 relative">
              <Header lng={lng} />
              <div className="max-w-7xl mx-auto">
                {children}
                <Analytics />
              </div>
            </div>
          </div>
          <Footer className="flex-shrink-0" lng={lng} />
          <ShoppingCartModal lng={lng} />
          <SignInModal lng={lng} />
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
