import { fallbackLng, languages } from "@/app/i18n/settings";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|robots.txt|sw.js|site.webmanifest|.*\\.png$|.*\\.jpg$|.*\\.svg$|.*\\jpeg$).*)",
  ],
};

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  if (pathname === "/") {
    return NextResponse.rewrite(new URL(`/uk`, req.url));
  }

  if (pathname.startsWith("/sitemap")) {
    return NextResponse.next();
  }

  console.log(`Middleware triggered for path: ${pathname}`);

  if (pathname === "/uk") {
    return NextResponse.redirect(`${origin}`, 301);
  }

  // Добавляем проверку для корневых языковых путей (например, /ru, /en)
  if (languages.some((lang) => pathname === `/${lang}`) && pathname !== "/uk") {
    return NextResponse.next();
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

  const servicePages = [
    "/about",
    "/blog",
    "/checkout",
    "/favorites",
    "/guarantees-and-returns",
    "/partnership",
    "/payment-and-delivery",
    "/privacy-policy",
    "/public-offer",
    "/reviews",
    "/services",
    "/thankyou",
    "/search",
  ];

  const pathParts = pathname.split("/").filter(Boolean);

  const hasLng = languages.includes(pathParts[0]);

  const lng = hasLng ? pathParts[0] : null;

  const pathWithoutLang = hasLng
    ? `/${pathParts.slice(1).join("/")}`
    : pathname;

  if (
    servicePages.some(
      (page) =>
        pathWithoutLang === page || pathWithoutLang.startsWith(`${page}/`)
    )
  ) {
    // Если это URL без языкового префикса, делаем rewrite на украинскую версию
    if (!hasLng && !pathname.startsWith("/_next")) {
      return NextResponse.rewrite(new URL(`/uk${pathname}`, req.url));
    }

    // Для других языков просто пропускаем дальше
    return NextResponse.next();
  }

  const [categorySlug, subcategorySlug, productTypeSlug, productSlug] = hasLng
    ? pathParts.slice(1)
    : pathParts;

  try {
    let exists = false;

    if (productSlug) {
      // Проверяем существование всех сущностей в порядке иерархии
      exists =
        (await checkExists("category", categorySlug, lng || fallbackLng)) &&
        (await checkExists(
          "subcategory",
          subcategorySlug,
          lng || fallbackLng
        )) &&
        (await checkExists(
          "productType",
          productTypeSlug,
          lng || fallbackLng
        )) &&
        (await checkExists(
          "product",
          productSlug,
          lng || fallbackLng,
          productTypeSlug
        ));
    } else if (productTypeSlug) {
      exists =
        (await checkExists("category", categorySlug, lng || fallbackLng)) &&
        (await checkExists(
          "subcategory",
          subcategorySlug,
          lng || fallbackLng
        )) &&
        (await checkExists("productType", productTypeSlug, lng || fallbackLng));
    } else if (subcategorySlug) {
      exists =
        (await checkExists("category", categorySlug, lng || fallbackLng)) &&
        (await checkExists("subcategory", subcategorySlug, lng || fallbackLng));
    } else if (categorySlug) {
      exists = await checkExists("category", categorySlug, lng || fallbackLng);
    }

    if (!exists) {
      return NextResponse.rewrite(new URL("/404", req.url));
    }
  } catch (error) {
    return NextResponse.rewrite(new URL("/500", req.url));
  }

  // Для URL без префикса используем украинский контент
  if (!lng && !pathname.startsWith("/_next")) {
    return NextResponse.rewrite(new URL(`/uk${pathname}`, req.url));
  }

  // Для URL с другими языками (если они прошли проверку exists)
  if (lng && lng !== "uk" && !pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

async function checkExists(
  type: string,
  slug: string,
  lng: string,
  parentSlug?: string
) {
  let query = "";

  const typeMap: Record<string, string> = {
    category: "categories",
    subcategory: "subcategories",
    productType: "productTypes",
    product: "products",
  };

  const collectionName = typeMap[type];

  switch (type) {
    case "category":
      query = `query { categories(filters: { slug: { eq: "${slug}" }}, locale: "${lng}") { data { id } } }`;
      break;
    case "subcategory":
      query = `query {
      subcategories(filters: { slug: { eq: "${slug}" } }, locale: "${lng}") {
        data {
          id
        }
      }
    }`;
      break;
    case "productType":
      query = `query {
      productTypes(filters: { slug: { eq: "${slug}" } }, locale: "${lng}") {
        data {
          id
        }
      }
    }`;
      break;
    case "product":
      query = `query {
      products(filters: { slug: { eq: "${slug}" } }, locale: "${lng}") {
        data {
          id
          attributes {
            product_types(filters: { slug: { eq: "${parentSlug}" } })  {
              data {
                id
              }
            }
          }
        }
      }
    }`;
      break;
    default:
      console.error(`Unknown type: ${type}`);
      return false;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });

  const data = await res.json();

  const isProductTypeInProduct =
    !!data?.data?.products?.data?.[0]?.attributes?.product_types?.data?.length;
  return (
    !!data?.data?.[collectionName]?.data?.length &&
    (!parentSlug || isProductTypeInProduct)
  );
}
