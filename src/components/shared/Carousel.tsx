import React, { CSSProperties } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useSnapCarousel } from "react-snap-carousel";

// https://github.com/richardscarrott/react-snap-carousel

const styles = {
  root: {
    position: "relative",
  },
  scroll: {
    position: "relative",
    display: "grid",
    gridAutoFlow: "column",
    gap: "1rem",
    overflow: "hidden",
    scrollSnapType: "x mandatory",
  },
  item: {
    // width: "250px",
    // height: "auto",
    // flexShrink: 0,
  },
  itemSnapPoint: {
    scrollSnapAlign: "start",
  },
  controls: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  controlsContainer: {
    position: "relative",
    width: "100%",
  },
  leftButton: {
    //   position: "absolute",
    //   left: "-10px",
    //   top: "50%",
    //   transform: "translateY(-50%)",
  },
  rightButton: {
    //   position: "absolute",
    //   right: "10px",
    //   top: "50%",
    //   transform: "translateY(-50%)",
  },
  nextPrevButton: {},
  nextPrevButtonDisabled: { opacity: 0.3 },
  pagination: {
    display: "flex",
  },
  paginationButton: {
    margin: "10px",
  },
  paginationButtonActive: { opacity: 0.3 },
  pageIndicator: {
    display: "flex",
    justifyContent: "center",
  },
} satisfies Record<string, CSSProperties>;

interface CarouselProps<T> {
  readonly items: T[];
  readonly renderItem: (
    props: CarouselRenderItemProps<T>
  ) => React.ReactElement<CarouselItemProps>;
  /**
   * Additional CSS classes to be applied to the carousel container.
   * Must include a Tailwind CSS grid-rows-* class (e.g., grid-rows-1, grid-rows-2, grid-rows-3, etc.)
   * to specify the number of rows in the grid layout.
   * Example: 'grid-rows-2 md:grid-rows-1'
   */
  readonly className?: string;
}

interface CarouselRenderItemProps<T> {
  readonly item: T;
  readonly isSnapPoint: boolean;
}

export const Carousel = <T extends any>({
  items,
  renderItem,
  className,
}: CarouselProps<T>) => {
  const {
    scrollRef,
    pages,
    activePageIndex,
    prev,
    next,
    goTo,
    snapPointIndexes,
  } = useSnapCarousel();
  return (
    <div style={styles.root}>
      <ul style={styles.scroll} ref={scrollRef} className={`${className}`}>
        {items.map((item, i) =>
          renderItem({
            item,
            isSnapPoint: snapPointIndexes.has(i),
          })
        )}
      </ul>
      <button
        style={{
          ...styles.nextPrevButton,
          ...styles.leftButton,
          ...(activePageIndex === 0 ? styles.nextPrevButtonDisabled : {}),
        }}
        onClick={() => prev()}
        className="absolute left-[-10px] top-1/2 -translate-y-[80%]"
      >
        <FaChevronLeft className="text-[#990000] text-5xl" />
      </button>
      <button
        style={{
          ...styles.nextPrevButton,
          ...styles.rightButton,
          ...(activePageIndex === pages.length - 1
            ? styles.nextPrevButtonDisabled
            : {}),
        }}
        onClick={() => next()}
        className="absolute right-[-10px] top-1/2 -translate-y-[80%]"
      >
        <FaChevronRight className="text-[#990000] text-5xl" />
      </button>
    </div>
  );
};

interface CarouselItemProps {
  readonly isSnapPoint: boolean;
  readonly children?: React.ReactNode;
}

export const CarouselItem = ({ isSnapPoint, children }: CarouselItemProps) => (
  <li
    style={{
      ...styles.item,
      ...(isSnapPoint ? styles.itemSnapPoint : {}),
    }}
  >
    {children}
  </li>
);
