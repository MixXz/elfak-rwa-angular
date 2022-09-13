import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { GunAd } from 'src/app/models/gun-ad';
import { GunAdService } from 'src/app/services/gun-ad.service';
import * as GunAdActions from './gun-ad.actions';

@Injectable()
export class GunAdEffects {
  constructor(private action$: Actions, private gunAdService: GunAdService) {}

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
            console.log("proso req");
            console.log(res);
            return GunAdActions.createAdSuccess();
          }),
          catchError(({ error }) => {
            console.log(error);
            return of({ type: 'err' });
          })
        )
      )
    )
  );
}
