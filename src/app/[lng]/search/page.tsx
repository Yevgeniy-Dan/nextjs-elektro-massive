import CenteredSpinner from "@/components/shared/CenteredSpinner";
import SearchResults from "@/components/shared/SearchResults";
import { Suspense } from "react";

interface SearchPageProps {
  searchParams: {
    q: string;
  };
}

const SearchPage: React.FC<SearchPageProps> = ({ searchParams }) => {
  return (
    <Suspense fallback={<CenteredSpinner />}>
      <SearchResults query={searchParams.q} />
    </Suspense>
  );
};

export default SearchPage;
