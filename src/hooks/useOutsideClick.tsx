import { useEffect, useRef, useCallback } from "react";

type Callback = (event: MouseEvent) => void;

const useOutsideClick = (
  callback: Callback
): React.RefObject<HTMLDivElement> => {
  const callbackRef = useRef<Callback | null>(null); // Initialize mutable ref, which stores callback
  const innerRef = useRef<HTMLDivElement>(null); // Returned to client, who marks "inner" elements

  // Set current callback in ref, before second useEffect since it depends on it
  useEffect(() => {
    callbackRef.current = callback;
  });

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (
        innerRef.current &&
        !innerRef.current.contains(e.target as Node) &&
        callbackRef.current
      ) {
        callbackRef.current(e);
      }
    },
    [callbackRef]
  );

  useEffect(() => {
    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [handleClick]);

  return innerRef; // Retun ref to client to mark inner elements
};

export default useOutsideClick;
