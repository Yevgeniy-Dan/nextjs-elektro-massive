import { useEffect } from "react";

export const useDebugLog = (name: string, value: any) => {
  useEffect(() => {
    console.log(`Debug ${name}:`, value);
  }, [name, value]);
};
