import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/models/category';

export const loadCategories = createAction('loadCategories');

export const loadCategoriesSuccess = createAction(
  'loadCategoriesSuccess',
  props<{ categories: Category[] }>()
);
