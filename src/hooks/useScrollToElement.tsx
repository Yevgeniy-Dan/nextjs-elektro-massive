import { RefObject, useCallback } from "react";

interface ScrollToElementOptions {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  inline?: ScrollLogicalPosition;
}

export const useScrollToElement = () => {
  const scrollToElement = useCallback(
    (
      ref: RefObject<HTMLElement>,
      options: ScrollToElementOptions = {
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      }
    ) => {
      if (ref.current) {
        ref.current.scrollIntoView(options);
      }
    },
    []
  );

  return { scrollToElement };
};
