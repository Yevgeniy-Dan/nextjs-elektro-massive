// import {
//   lngCookieName,
//   fallbackLng,
//   languages,
//   prevLngCookieName,
// } from "@/app/i18n/settings";
// import acceptLanguage from "accept-language";
import { NextRequest, NextResponse } from "next/server";

// acceptLanguage.languages(languages);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|robots.txt|sw.js|site.webmanifest|.*\\.png$|.*\\.jpg$|.*\\.svg$|.*\\jpeg$).*)",
  ],
};

export function middleware(req: NextRequest) {
  console.log("Middleware called for path:", req.nextUrl.pathname);

  if (req.nextUrl.pathname === "/sitemap.xml") {
    return NextResponse.redirect(
      "https://elektromassivebucketproduction.s3.amazonaws.com/sitemap/sitemap.xml",
      301
    );
  }

  // If the path starts with /uk/ or /ru/, redirect to the version without the prefix
  if (
    req.nextUrl.pathname.startsWith("/uk/") ||
    req.nextUrl.pathname.startsWith("/ru/")
  ) {
    const newPath = req.nextUrl.pathname.replace(/\/(uk|ru)\//, "/");
    if (newPath !== req.nextUrl.pathname) {
      return NextResponse.redirect(new URL(newPath, req.url), 301);
    }
  }

  if (req.nextUrl.pathname === "/search") {
    const searchParams = req.nextUrl.searchParams;
    return NextResponse.rewrite(
      new URL(`/uk/search?${searchParams.toString()}`, req.url)
    );
  }

  return NextResponse.next();

  //TODO: DO NOT DELETE THE CODE BELOW
  // IN FUTURE IT WILL BE POSSIBLE TO CHANGE LANGUAGE
  // let lng;
  // if (req.cookies.has(lngCookieName))
  //   lng = acceptLanguage.get(req.cookies.get(lngCookieName)?.value);
  // if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  // if (!lng) lng = fallbackLng;

  // // Redirect if lng in path is not supported
  // if (
  //   !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
  //   !req.nextUrl.pathname.startsWith("/_next")
  // ) {
  //   return NextResponse.redirect(
  //     new URL(`/${lng}${req.nextUrl.pathname}`, req.url)
  //   );
  // }

  // if (req.headers.has("referer")) {
  //   const refererUrl = new URL(req.headers.get("referer") as string);
  //   const lngInReferer = languages.find((l) =>
  //     refererUrl.pathname.startsWith(`/${l}`)
  //   );
  //   const response = NextResponse.next();
  //   if (lngInReferer) {
  //     const currentLng = req.cookies.get(lngCookieName)?.value;

  //     if (currentLng && currentLng !== lngInReferer) {
  //       response.cookies.set(prevLngCookieName, currentLng);
  //     }

  //     response.cookies.set(lngCookieName, lngInReferer);
  //   }
  //   return response;
  // }

  // return NextResponse.next();
}
