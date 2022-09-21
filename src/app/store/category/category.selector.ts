import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Category } from 'src/app/models/category';

export const selectCategoryFeature = createSelector(
  (state: AppState) => state.category,
  (category) => category
);

export const selectCategoryIds = createSelector(
  selectCategoryFeature,
  (category) => category.ids
);

export const selectCategoryList = createSelector(
  selectCategoryFeature,
  (category) =>
    category.ids
      .map((id) => category.entities[id])
      .filter((category) => category != null)
      .map((category) => <Category>category)
);
