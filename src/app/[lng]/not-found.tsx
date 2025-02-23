import LocalizedLink from "@/components/shared/LocalizedLink";
import { fallbackLng, Language } from "@/app/i18n/settings";
import { cookies } from "next/headers";
import OptimizedImage from "@/components/shared/OptimizedImage";

export default function NotFound() {
  const cookieStore = cookies();
  const lng = (cookieStore.get("i18next")?.value as Language) || fallbackLng;

  //TODO: language support
  return (
    <div className="-mx-4 sm:-mx-6 md:-mx-8 lg:-mx-16">
      <div
        className="min-h-screen flex flex-col items-center justify-center px-5"
        style={{ backgroundColor: "#5C5CA2" }}
      >
        <div className="text-center">
          <OptimizedImage
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}/uploads/not_found_d5098ab0eb.png`}
            alt="404 not found"
            sizes="(max-width: 500px) 500px, (max-width: 750px) 750px, (max-width: 1000px) 1000px, 1280px"
            className="w-full h-full object-contain"
            width={600}
            height={200}
            priority
          />

          <div className="mt-8 text-white">
            <p className="text-base text-black font-medium mb-6">
              На жаль, сторінка не знайдена. Але все потрібне ви знайдете на
              головній!
            </p>
            <LocalizedLink
              href="/"
              className="inline-block px-6 py-3 bg-primary-gradient-elektro-massive-vertical text-white rounded transition-colors hover:bg-[#A61919]"
              lng={lng}
            >
              Перейти на головну
            </LocalizedLink>
          </div>
        </div>
      </div>
    </div>
  );
}
