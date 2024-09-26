import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductGridState {
  currentPages: Record<string, number>;
  lastProductTypes: Record<string, string>;
  lastFilters: Record<string, Record<string, string[]>>;
  lastSubcategoryId: string | null;
}

const initialState: ProductGridState = {
  currentPages: {},
  lastProductTypes: {},
  lastFilters: {},
  lastSubcategoryId: null,
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
  },
});

export const {
  setCurrentPage,
  setLastProductType,
  setLastFilters,
  setLastSubcategoryId,
} = productGridSlice.actions;
export default productGridSlice.reducer;
