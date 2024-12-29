import PublicOffer from "@/components/PublicOffer";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = `/public-offer`;
  const canonicalUrl = `${process.env.NEXT_PUBLIC_API_URL}${canonicalPath}`;

  return {
    alternates: {
      canonical: canonicalUrl,
      languages: {
        uk: `${process.env.NEXT_PUBLIC_API_URL}/uk${canonicalPath}`,
        ru: `${process.env.NEXT_PUBLIC_API_URL}/ru${canonicalPath}`,
        "x-default": canonicalUrl,
      },
    },
  };
}

export default function PublicOfferPage() {
  return <PublicOffer />;
}
