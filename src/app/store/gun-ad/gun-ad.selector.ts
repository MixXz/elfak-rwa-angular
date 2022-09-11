import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { GunAd } from 'src/app/models/gun-ad';

export const selectAdsFeature = createSelector(
  (state: AppState) => state.gunAd,
  (gunAd) => gunAd
);

export const selectAdsIds = createSelector(
  selectAdsFeature,
  (gunAd) => gunAd.ids
);

export const selectAdsList = createSelector(selectAdsFeature, (gunAd) =>
  gunAd.ids
    .map((id) => gunAd.entities[id])
    .filter((gunAd) => gunAd != null)
    .map((gunAd) => <GunAd>gunAd)
);
