import { createReducer, on } from '@ngrx/store';
import { Category } from 'src/app/models/category';
import * as CategoryActions from './category.actions';

export interface CategoryState {
  categories: Category[];
}

export const initialState: CategoryState = {
  categories: [],
};

export const categoryReducer = createReducer(
  initialState,
  on(CategoryActions.loadCategoriesSuccess, (action) => ({
    categories: action.categories,
  }))
);
