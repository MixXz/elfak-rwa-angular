import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Category } from 'src/app/models/category';
import * as CategoryActions from './category.actions';

export interface CategoryState extends EntityState<Category> {}

const adapter: EntityAdapter<Category> = createEntityAdapter<Category>();

export const initialState: CategoryState = adapter.getInitialState({});

export const categoryReducer = createReducer(
  initialState,
  on(CategoryActions.loadCategoriesSuccess, (state, { categories }) => {
    return adapter.setAll(categories, state);
  }),
  on(CategoryActions.createCategorySuccess, (state, { category }) => {
    return adapter.addOne(category, state);
  }),
  on(CategoryActions.deleteCategorySuccess, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(CategoryActions.updateCategorySuccess, (state, { id, name }) => {
    return adapter.updateOne(
      {
        id: id,
        changes: {
          ...state.entities[id],
          name: name,
        },
      },
      state
    );
  })
);
