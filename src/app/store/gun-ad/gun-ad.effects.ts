import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { GunAd } from 'src/app/models/gun-ad';
import { GunAdService } from 'src/app/services/gun-ad.service';
import * as GunAdActions from './gun-ad.actions';

@Injectable()
export class GunAdEffects {
  constructor(
    private action$: Actions,
    private gunAdService: GunAdService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  loadAd$ = createEffect(() =>
    this.action$.pipe(
      ofType(GunAdActions.loadAds),
      mergeMap(() =>
        this.gunAdService.getAll().pipe(
          map((ads: GunAd[]) => {
            return GunAdActions.loadAdsSuccess({ ads });
          }),
          catchError(({ error }) => {
            console.log(error);
            return of({ type: 'err' });
          })
        )
      )
    )
  );

  loadSingleAd$ = createEffect(() =>
    this.action$.pipe(
      ofType(GunAdActions.loadSingleAd),
      mergeMap(({adId}) =>
        this.gunAdService.getSingle(adId).pipe(
          map((ad: GunAd) => {
            return GunAdActions.loadSingleAdSuccess({ ad });
          }),
          catchError(({ error }) => {
            console.log(error);
            return of({ type: 'err' });
          })
        )
      )
    )
  );

  loadMyAd$ = createEffect(() =>
    this.action$.pipe(
      ofType(GunAdActions.loadMyAds),
      mergeMap(() =>
        this.gunAdService.getByUser().pipe(
          map((ads: GunAd[]) => {
            return GunAdActions.loadMyAdsSuccess({ ads });
          }),
          catchError(({ error }) => {
            console.log(error);
            return of({ type: 'err' });
          })
        )
      )
    )
  );

  loadSavedAd$ = createEffect(() =>
  this.action$.pipe(
    ofType(GunAdActions.loadSavedAds),
    mergeMap(() =>
      this.gunAdService.getByUserSaved().pipe(
        map((ads: GunAd[]) => {
          return GunAdActions.loadSavedAdsSuccess({ ads });
        }),
        catchError(({ error }) => {
          console.log(error);
          return of({ type: 'err' });
        })
      )
    )
  )
);

  createAd$ = createEffect(() =>
    this.action$.pipe(
      ofType(GunAdActions.createAd),
      mergeMap((action) =>
        this.gunAdService.create(action.formData).pipe(
          map((res) => {
            if (res) {
              this.snackBar.open('Vaš oglas je uspešno kreiran!', 'Uredu', {
                duration: 5000,
              });
            }
            this.router.navigate(['home'], { replaceUrl: true });
            return GunAdActions.createAdSuccess();
          }),
          catchError(({ error }) => {
            console.log(error.message);
            this.snackBar.open('Greška na strani servera', 'Zatvori', {
              duration: 5000,
            });
            return of({ type: 'err' });
          })
        )
      )
    )
  );

  deleteAd$ = createEffect(() =>
    this.action$.pipe(
      ofType(GunAdActions.deleteAd),
      mergeMap((action) => {
        const id: number = action.adId;
        return this.gunAdService.delete(action.adId).pipe(
          map((res) => {
            if (res.success) {
              this.snackBar.open('Vaš oglas je uspešno obrisan.', 'Zatvori', {
                duration: 5000,
              });
            }
            this.router.navigate(['home'], { replaceUrl: true });
            return GunAdActions.deleteAdSuccess({ adId: id });
          }),
          catchError(({ error }) => {
            this.snackBar.open(error.message, 'Zatvori', {
              duration: 5000,
            });
            return of({ type: error.message });
          })
        );
      })
    )
  );
}
