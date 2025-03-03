import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProductGridStore {
  currentPages: Record<string, number>;
  lastProductTypes: Record<string, string>;
  lastFilters: Record<string, Record<string, string[]>>;
  lastSubcategoryId: string | null;
  appliedFilters: Record<string, Record<string, string[]>>;

  setCurrentPage: (subcategoryId: string, page: number) => void;
  setLastProductType: (subcategoryId: string, productTypeId: string) => void;
  setLastFilters: (
    subcategoryId: string,
    filters: Record<string, string[]>
  ) => void;
  setLastSubcategoryId: (subcategoryId: string) => void;
  setAppliedFilters: (
    subcategoryId: string,
    filters: Record<string, string[]>
  ) => void;
  updateAppliedFilter: (
    subcategoryId: string,
    filterName: string,
    values: string[]
  ) => void;
}

export const useProductGridStore = create(
  persist<ProductGridStore>(
    (set, get) => ({
      currentPages: {},
      lastProductTypes: {},
      lastFilters: {},
      lastSubcategoryId: null,
      appliedFilters: {},

      setCurrentPage: (subcategoryId, page) => {
        const currentState = get();
        if (currentState.currentPages[subcategoryId] === page) {
          return;
        }
        set({
          currentPages: { ...currentState.currentPages, [subcategoryId]: page },
        });
      },

      setLastProductType: (subcategoryId, productTypeId) => {
        const currentState = get();
        if (currentState.lastProductTypes[subcategoryId] === productTypeId) {
          return;
        }
        set({
          lastProductTypes: {
            ...currentState.lastProductTypes,
            [subcategoryId]: productTypeId,
          },
        });
      },

      setLastFilters: (subcategoryId, filters) => {
        const currentState = get();
        if (
          JSON.stringify(currentState.lastFilters[subcategoryId]) ===
          JSON.stringify(filters)
        ) {
          return;
        }
        set({
          lastFilters: {
            ...currentState.lastFilters,
            [subcategoryId]: filters,
          },
        });
      },

      setLastSubcategoryId: (subcategoryId) => {
        const currentState = get();
        if (currentState.lastSubcategoryId === subcategoryId) {
          return;
        }
        set({ lastSubcategoryId: subcategoryId });
      },

      setAppliedFilters: (subcategoryId, filters) => {
        const currentState = get();
        if (
          JSON.stringify(currentState.appliedFilters[subcategoryId]) ===
          JSON.stringify(filters)
        ) {
          return;
        }
        set({
          appliedFilters: {
            ...currentState.appliedFilters,
            [subcategoryId]: filters,
          },
        });
      },

      updateAppliedFilter: (subcategoryId, filterName, values) => {
        const currentState = get();

        const currentFilters = currentState.appliedFilters[subcategoryId] || {};

        if (
          JSON.stringify(currentFilters[filterName]) === JSON.stringify(values)
        ) {
          return;
        }

        const updatedFilters = { ...currentFilters };
        if (values.length === 0) {
          delete updatedFilters[filterName];
        } else {
          updatedFilters[filterName] = values;
        }

        set({
          appliedFilters: {
            ...currentState.appliedFilters,
            [subcategoryId]: updatedFilters,
          },
        });
      },
    }),
    {
      name: "product-grid-storage",
    }
  )
);
