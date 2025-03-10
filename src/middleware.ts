import { languages } from "@/app/i18n/settings";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|robots.txt|sw.js|site.webmanifest|.*\\.png$|.*\\.jpg$|.*\\.svg$|.*\\jpeg$).*)",
  ],
};

export function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  if (pathname === "/sitemap.xml") {
    return NextResponse.redirect(
      "https://elektromassivebucketproduction.s3.amazonaws.com/sitemap/sitemap.xml",
      301
    );
  }

  if (pathname === "/uk") {
    return NextResponse.redirect(`${origin}`, 301);
  }

  if (pathname === "/search") {
    return NextResponse.rewrite(
      new URL(`/uk/search${req.nextUrl.search || ""}`, req.url)
    );
  }

  // URL с /uk делаем rewrite на версию без префикса
  if (pathname.startsWith("/uk/") && !pathname.startsWith("/uk/search")) {
    return NextResponse.redirect(
      new URL(pathname.replace(/^\/uk/, ""), req.url),
      301
    );
  }

  // Обработка поискового запроса с параметром q
  if (pathname === "/uk/search") {
    return NextResponse.redirect(
      new URL(`/search${req.nextUrl.search || ""}`, req.url),
      301
    );
  }

  // Другие языки оставляем как есть
  if (
    languages.some((lang) => lang !== "uk" && pathname.startsWith(`/${lang}`))
  ) {
    return NextResponse.next();
  }

  // Для URL без префикса используем украинский контент
  if (!pathname.startsWith("/_next")) {
    return NextResponse.rewrite(new URL(`/uk${pathname}`, req.url));
  }

  return NextResponse.next();
}
