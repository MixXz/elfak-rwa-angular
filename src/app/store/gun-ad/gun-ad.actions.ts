import { createAction, props } from '@ngrx/store';
import { GunAd } from 'src/app/models/gun-ad';

export const loadAds = createAction('loadAds');
export const loadAdsSuccess = createAction(
  'loadAdsSuccess',
  props<{ ads: GunAd[] }>()
);

export const loadMyAds = createAction('loadMyAds');
export const loadMyAdsSuccess = createAction(
  'loadMyAdsSuccess',
  props<{ ads: GunAd[] }>()
);

export const createAd = createAction(
  'createAd',
  props<{ formData: FormData }>()
);
export const createAdSuccess = createAction('createAdSuccess');
