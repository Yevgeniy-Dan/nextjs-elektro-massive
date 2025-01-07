import { fallbackLng } from "@/app/i18n/settings";
import CenteredSpinner from "@/components/shared/CenteredSpinner";
import SearchResults from "@/components/shared/SearchResults";
import { Suspense } from "react";

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
  params: {
    lng: string;
  };
}

const SearchPage: React.FC<SearchPageProps> = ({ searchParams, params }) => {
  const query = searchParams.q || "";
  const lng = params.lng || fallbackLng;

  return (
    <Suspense fallback={<CenteredSpinner />}>
      <SearchResults query={query} lng={lng} />
    </Suspense>
  );
};

export default SearchPage;
