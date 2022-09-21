import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import * as CategoryActions from './category.actions';

@Injectable()
export class CategoryEffects {
  constructor(
    private action$: Actions,
    private categoryService: CategoryService,
    private snackbar: MatSnackBar
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

  createCategories$ = createEffect(() =>
    this.action$.pipe(
      ofType(CategoryActions.createCategory),
      mergeMap(({ name }) =>
        this.categoryService.create(name).pipe(
          map((category: Category) => {
            this.snackbar.open('Kategorija je usprešno kreirana', 'Zatvori', {
              duration: 3000,
            });
            return CategoryActions.createCategorySuccess({ category });
          }),
          catchError(({ error }) => {
            this.snackbar.open('Greška na strani servera', 'Zatvori', {
              duration: 3000,
            });
            return of({ type: error });
          })
        )
      )
    )
  );

  deleteCategories$ = createEffect(() =>
    this.action$.pipe(
      ofType(CategoryActions.deleteCategory),
      mergeMap(({ id }) => {
        const categoryId: string = id;
        return this.categoryService.delete(id).pipe(
          map(() => {
            this.snackbar.open('Kategorija je usprešno obrisana', 'Zatvori', {
              duration: 3000,
            });
            return CategoryActions.deleteCategorySuccess({ id: categoryId });
          }),
          catchError(({ error }) => {
            this.snackbar.open('Greška na strani servera', 'Zatvori', {
              duration: 3000,
            });
            return of({ type: error });
          })
        );
      })
    )
  );

  updateCategories$ = createEffect(() =>
    this.action$.pipe(
      ofType(CategoryActions.updateCategory),
      mergeMap(({ id, name }) => {
        const categoryId: string = id;
        const categoryName: string = name;
        return this.categoryService.update(id, name).pipe(
          map(() => {
            this.snackbar.open('Kategorija je usprešno izmenjena', 'Zatvori', {
              duration: 3000,
            });
            return CategoryActions.updateCategorySuccess({
              id: categoryId,
              name: categoryName,
            });
          }),
          catchError(({ error }) => {
            this.snackbar.open('Greška na strani servera', 'Zatvori', {
              duration: 3000,
            });
            return of({ type: error });
          })
        );
      })
    )
  );
}
