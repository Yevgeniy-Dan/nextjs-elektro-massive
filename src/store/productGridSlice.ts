import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductGridState {
  currentPages: Record<string, number>;
  lastProductTypes: Record<string, string>;
  lastFilters: Record<string, Record<string, string[]>>;
  lastSubcategoryId: string | null;
  appliedFilters: Record<string, Record<string, string[]>>;
}

const initialState: ProductGridState = {
  currentPages: {},
  lastProductTypes: {},
  lastFilters: {},
  lastSubcategoryId: null,
  appliedFilters: {},
};

const productGridSlice = createSlice({
  name: "productGrid",
  initialState,
  reducers: {
    setCurrentPage: (
      state,
      action: PayloadAction<{ subcategoryId: string; page: number }>
    ) => {
      state.currentPages[action.payload.subcategoryId] = action.payload.page;
    },
    setLastProductType: (
      state,
      action: PayloadAction<{ subcategoryId: string; productTypeId: string }>
    ) => {
      state.lastProductTypes[action.payload.subcategoryId] =
        action.payload.productTypeId;
    },
    setLastFilters: (
      state,
      action: PayloadAction<{
        subcategoryId: string;
        filters: Record<string, string[]>;
      }>
    ) => {
      state.lastFilters[action.payload.subcategoryId] = action.payload.filters;
    },
    setLastSubcategoryId: (state, action: PayloadAction<string>) => {
      state.lastSubcategoryId = action.payload;
    },
    setAppliedFilters: (
      state,
      action: PayloadAction<{
        subcategoryId: string;
        filters: Record<string, string[]>;
      }>
    ) => {
      state.appliedFilters[action.payload.subcategoryId] =
        action.payload.filters;
    },
    updateAppliedFilter: (
      state,
      action: PayloadAction<{
        subcategoryId: string;
        filterName: string;
        values: string[];
      }>
    ) => {
      if (!state.appliedFilters[action.payload.subcategoryId]) {
        state.appliedFilters[action.payload.subcategoryId] = {};
      }

      state.appliedFilters[action.payload.subcategoryId][
        action.payload.filterName
      ] = action.payload.values;
      // Remove filters with empty values
      Object.keys(state.appliedFilters[action.payload.subcategoryId]).forEach(
        (key) => {
          if (
            state.appliedFilters[action.payload.subcategoryId][key].length === 0
          ) {
            delete state.appliedFilters[action.payload.subcategoryId][key];
          }
        }
      );
    },
  },
});

export const {
  setCurrentPage,
  setLastProductType,
  setLastFilters,
  setLastSubcategoryId,
  setAppliedFilters,
  updateAppliedFilter,
} = productGridSlice.actions;
export default productGridSlice.reducer;
