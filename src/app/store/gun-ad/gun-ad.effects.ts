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
            console.log(ads);
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

  createAd$ = createEffect(() =>
    this.action$.pipe(
      ofType(GunAdActions.createAd),
      mergeMap((action) =>
        this.gunAdService.create(action.formData).pipe(
          map((res) => {
            if (res) {
              this.router.navigate(['home']);
              this.snackBar.open(
                'Vaš oglas je uspešno kreiran!',
                'Uredu',
                { duration: 5000 }
              );
            }
            return GunAdActions.createAdSuccess();
          }),
          catchError(({ error }) => {
            console.log(error.message);
            this.snackBar.open(
              'Greška na strani servera',
              'Zatvori',
              { duration: 5000 }
            );
            return of({ type: 'err' });
          })
        )
      )
    )
  );
}
