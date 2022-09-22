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
            return of({ type: error.message });
          })
        )
      )
    )
  );

  loadSingleAd$ = createEffect(() =>
    this.action$.pipe(
      ofType(GunAdActions.loadSingleAd),
      mergeMap(({ adId }) =>
        this.gunAdService.getSingle(adId).pipe(
          map((ad: GunAd) => {
            return GunAdActions.loadSingleAdSuccess({ ad });
          }),
          catchError(({ error }) => {
            return of({ type: error.message });
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
            return of({ type: error.message });
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
            return of({ type: error.message });
          })
        )
      )
    )
  );

  loadSearchAd$ = createEffect(() =>
    this.action$.pipe(
      ofType(GunAdActions.loadSearchedAds),
      mergeMap(({ input, categoryId }) =>
        this.gunAdService.getBySearch(input, categoryId).pipe(
          map((ads: GunAd[]) => {
            return GunAdActions.loadSearchedAdsSuccess({ ads });
          }),
          catchError(({ error }) => {
            return of({ type: error.message });
          })
        )
      )
    )
  );

  createAd$ = createEffect(() =>
    this.action$.pipe(
      ofType(GunAdActions.createAd),
      mergeMap(({ formData }) =>
        this.gunAdService.create(formData).pipe(
          map((gunAd) => {
            this.snackBar.open('Vaš oglas je uspešno kreiran!', 'Uredu', {
              duration: 5000,
            });
            this.router.navigate([`gun-ad-details/${gunAd.id}`], {
              replaceUrl: true,
            });
            return GunAdActions.createAdSuccess({ ad: gunAd });
          }),
          catchError(({ error }) => {
            this.snackBar.open('Greška na strani servera', 'Zatvori', {
              duration: 3000,
            });
            return of({ type: error.message });
          })
        )
      )
    )
  );

  updateAd$ = createEffect(() =>
    this.action$.pipe(
      ofType(GunAdActions.updateAd),
      mergeMap(({ formData }) =>
        this.gunAdService.update(formData).pipe(
          map((ad) => {
            if (ad) {
              this.router.navigate([`gun-ad-details/${ad.id}`], {
                replaceUrl: true,
              });
              this.snackBar.open('Vaš oglas je uspešno izmenjen!', 'Zatvori', {
                duration: 3000,
              });
            }

            return GunAdActions.updateAdSuccess({ ad: ad });
          }),
          catchError(({ error }) => {
            this.snackBar.open('Greška na strani servera', 'Zatvori', {
              duration: 3000,
            });
            return of({ type: error.message });
          })
        )
      )
    )
  );

  deleteAd$ = createEffect(() =>
    this.action$.pipe(
      ofType(GunAdActions.deleteAd),
      mergeMap(({ adId }) => {
        const id: number = adId;
        return this.gunAdService.delete(adId).pipe(
          map((res) => {
            if (res.success) {
              this.snackBar.open('Vaš oglas je uspešno obrisan.', 'Zatvori', {
                duration: 3000,
              });
            }
            this.router.navigate(['home'], { replaceUrl: true });
            return GunAdActions.deleteAdSuccess({ adId: id });
          }),
          catchError(({ error }) => {
            this.snackBar.open(error.message, 'Zatvori', {
              duration: 3000,
            });
            return of({ type: error.message });
          })
        );
      })
    )
  );

  adminDeleteAd$ = createEffect(() =>
    this.action$.pipe(
      ofType(GunAdActions.adminDeleteAd),
      mergeMap(({ adId }) => {
        const id: number = adId;
        return this.gunAdService.adminDelete(adId).pipe(
          map((res) => {
            if (res.success) {
              this.snackBar.open('Oglas je uspešno obrisan.', 'Zatvori', {
                duration: 3000,
              });
              this.router.navigate(['home'], { replaceUrl: true });
            }
            return GunAdActions.adminDeleteAdSuccess({ adId: id });
          }),
          catchError(({ error }) => {
            this.snackBar.open(error.message, 'Zatvori', {
              duration: 3000,
            });
            return of({ type: error.message });
          })
        );
      })
    )
  );
}
