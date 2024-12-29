import { Metadata } from "next";
import PartnershipPageClient from "./Partnership";

interface PartnershipPageProps {
  params: { lng: string };
}

export async function generateMetadata({
  params,
}: PartnershipPageProps): Promise<Metadata> {
  const canonicalPath = `/partnership`;
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

export default function Page({ params }: PartnershipPageProps) {
  return <PartnershipPageClient params={params} />;
}
