import { Metadata } from "next";
import GuaranteeReturnsPageClient from "./GuaranteesClient";

interface GuaranteeReturnsProps {
  params: {
    lng: string;
  };
}

export async function generateMetadata({
  params,
}: GuaranteeReturnsProps): Promise<Metadata> {
  const canonicalPath = `/guarantees-and-returns`;
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

export default function Page({ params }: GuaranteeReturnsProps) {
  return <GuaranteeReturnsPageClient params={params} />;
}
