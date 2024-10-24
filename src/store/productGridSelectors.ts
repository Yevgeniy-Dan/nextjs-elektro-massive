import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

const selectProductGridState = (state: RootState) => state.productGrid;

export const selectAppliedFiltersForSubcategory = createSelector(
  [
    selectProductGridState,
    (_state: RootState, subcategoryId: string) => subcategoryId,
  ],
  (productGrid, subcategoryId) =>
    productGrid.appliedFilters[subcategoryId] || {}
);

export const selectCurrentPage = createSelector(
  [
    selectProductGridState,
    (_state: RootState, subcategoryId: string) => subcategoryId,
  ],
  (productGrid, subcategoryId) => productGrid.currentPages[subcategoryId] || 1
);

export const selectLastProductType = createSelector(
  [
    selectProductGridState,
    (_state: RootState, subcategoryId: string) => subcategoryId,
  ],
  (productGrid, subcategoryId) => productGrid.lastProductTypes[subcategoryId]
);

export const selectLastFilters = createSelector(
  [
    selectProductGridState,
    (_state: RootState, subcategoryId: string) => subcategoryId,
  ],
  (productGrid, subcategoryId) => productGrid.lastFilters[subcategoryId]
);

export const selectLastSubcategoryId = createSelector(
  [selectProductGridState],
  (productGrid) => productGrid.lastSubcategoryId
);

export const selectAppliedFilters = createSelector(
  [
    selectProductGridState,
    (_state: RootState, subcategoryId: string) => subcategoryId,
  ],
  (productGrid, subcategoryId) =>
    productGrid.appliedFilters[subcategoryId] || {}
);
