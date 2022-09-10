import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/app.state";

export const selectCategories = createSelector(
    (state: AppState) => state.category,
    (state) => state.categories
);