import CenteredSpinner from "@/components/shared/CenteredSpinner";
import SearchResults from "@/components/shared/SearchResults";
import { Suspense } from "react";

interface SearchPageProps {
  searchParams: {
    q: string;
  };
  params: {
    lng: string;
  };
}

const SearchPage: React.FC<SearchPageProps> = ({ searchParams, params }) => {
  return (
    <Suspense fallback={<CenteredSpinner />}>
      <SearchResults query={searchParams.q} lng={params.lng} />
    </Suspense>
  );
};

export default SearchPage;
