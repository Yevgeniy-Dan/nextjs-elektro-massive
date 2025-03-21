import LocalizedLink from "@/components/shared/LocalizedLink";
import OptimizedImage from "@/components/shared/OptimizedImage";
import { cookies } from "next/headers";
import { fallbackLng, Language } from "../i18n/settings";
import { useTranslation as getTranslations } from "../i18n";

export default async function NotFoundPage() {
  const cookieStore = cookies();
  const lng = (cookieStore.get("i18next")?.value as Language) || fallbackLng;

  const { t } = await getTranslations(lng, "common");

  return (
    <div className="-mx-4 sm:-mx-6 md:-mx-8 lg:-mx-16">
      <div
        className="min-h-screen flex flex-col items-center justify-center px-5"
        style={{ backgroundColor: "#5C5CA2" }}
      >
        <div className="text-center">
          <OptimizedImage
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}/uploads/not_found_d5098ab0eb.png`}
            alt={t("notFound.imageAlt")}
            sizes="(max-width: 500px) 500px, (max-width: 750px) 750px, (max-width: 1000px) 1000px, 1280px"
            className="w-full h-full object-contain"
            width={600}
            height={200}
            priority
          />

          <div className="mt-8 text-white">
            <p className="text-base text-black font-medium mb-6">
              {t("notFound.message")}
            </p>
            <LocalizedLink
              href="/"
              className="inline-block px-6 py-3 bg-primary-gradient-elektro-massive-vertical text-white rounded transition-colors hover:bg-[#A61919]"
              lng="uk"
            >
              {t("notFound.goHome")}
            </LocalizedLink>
          </div>
        </div>
      </div>
    </div>
  );
}
