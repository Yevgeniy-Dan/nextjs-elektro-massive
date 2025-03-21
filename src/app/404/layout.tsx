import { dir } from "i18next";

import React, { Suspense } from "react";

import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "../[lng]/globals.css";
import "react-toastify/dist/ReactToastify.css";

import { Providers } from "../providers";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/authOptions";

import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { fallbackLng, Language } from "../i18n/settings";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: true,
  variable: "--font-roboto",
});

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = cookies();
  const lng = (cookieStore.get("i18next")?.value as Language) || fallbackLng;

  const metadata: Record<Language, { title: string; description: string }> = {
    uk: {
      title: "404 - сторінка не знайдена | ELEKTRO-MASSIVE",
      description: "Запрошувану сторінку не знайдено на сайті ELEKTRO-MASSIVE.",
    },
    ru: {
      title: "404 - страница не найдена | ELEKTRO-MASSIVE",
      description:
        "Запрашиваемая страница не найдена на сайте ELEKTRO-MASSIVE.",
    },
  };

  return {
    title: metadata[lng]?.title || metadata.uk.title,
    description: metadata[lng]?.description || metadata.uk.description,
  };
}
const ToastContainer = dynamic(
  () => import("react-toastify").then((mod) => mod.ToastContainer),
  { loading: () => null }
);

const GoogleAnalytic = dynamic(
  () =>
    import("@/components/services/GoogleAnalytic").then(
      (mod) => mod.GoogleAnalytic
    ),
  {
    ssr: false,
  }
);

const SignInModal = dynamic(() => import("@/components/shared/SignInModal"), {
  ssr: false,
});

const ShoppingCartModal = dynamic(
  () => import("@/components/shared/ShoppingCartModal"),
  {
    ssr: false,
  }
);

const Footer = dynamic(() => import("@/components/shared/Footer"), {
  ssr: false,
  loading: () => <div className="h-40 bg-gray-100" />,
});

const Header = dynamic(() => import("@/components/shared/Header"), {
  ssr: true,
  loading: () => <div className="h-16 bg-gray-100" />,
});

export default async function NotFoundLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const cookieStore = cookies();
  const lng = (cookieStore.get("i18next")?.value as Language) || fallbackLng;

  return (
    <html lang={lng} dir={dir(lng)}>
      <head>
        <link rel="preconnect" href="https://decyx998ihuuw.cloudfront.net" />
      </head>
      <body className={`${roboto.variable} flex flex-col min-h-screen`}>
        <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
          <Providers session={session}>
            <div className="flex-grow">
              <div className="px-4 sm:px-6 md:px-8 lg:px-16 relative">
                <Header lng={lng} />
                <div className="max-w-7xl mx-auto">{children}</div>
              </div>
            </div>
            <Footer className="flex-shrink-0" lng={lng} />
            <Suspense fallback={null}>
              <ShoppingCartModal lng={lng} />
              <SignInModal lng={lng} />
              <ToastContainer />
            </Suspense>
            <Suspense fallback={null}>
              <GoogleAnalytic />
            </Suspense>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
