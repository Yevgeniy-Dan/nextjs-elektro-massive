import { useState, useEffect } from "react";
import { DocumentNode, useApolloClient } from "@apollo/client";

interface FetchAllDataOptions {
  query: DocumentNode;
  variables?: Record<string, any>;
  dataPath: string;
}

export const useFetchAllData = <T>(options: FetchAllDataOptions) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const client = useApolloClient();

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    let allData: T[] = [];
    let hasMore = true;
    let start = 0;
    const limit = 100; // Adjust based on your API's capabilities

    try {
      while (hasMore) {
        const result = await client.query({
          query: options.query,
          variables: { ...options.variables, start, limit },
        });

        const newData = result.data[options.dataPath]?.data || [];
        allData = [...allData, ...newData];

        const total =
          result.data[options.dataPath]?.meta?.pagination?.total || 0;
        start += limit;
        hasMore = start < total;
      }

      setData(allData);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error("An error occurred while fetching data")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [options.query, JSON.stringify(options.variables)]);

  return { data, loading, error, refetch: fetchAllData };
};
