import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import * as CategoryActions from './category.actions';

@Injectable()
export class CategoryEffects {
  constructor(
    private action$: Actions,
    private categoryService: CategoryService
  ) {}

  loadCategories$ = createEffect(() =>
    this.action$.pipe(
      ofType(CategoryActions.loadCategories),
      mergeMap(() =>
        this.categoryService.getAll().pipe(
          map((categories: Category[]) => {
            return CategoryActions.loadCategoriesSuccess({ categories });
          }),
          catchError(({ error }) => {
            return of({ type: 'err' });
          })
        )
      )
    )
  );
}
