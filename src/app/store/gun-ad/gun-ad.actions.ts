import { createAction, props } from '@ngrx/store';
import { GunAd } from 'src/app/models/gun-ad';

export const loadAds = createAction('loadAds');
export const loadAdsSuccess = createAction(
  'loadAdsSuccess',
  props<{ ads: GunAd[] }>()
);

export const loadSingleAd = createAction(
  'loadSingleAd',
  props<{ adId: number }>()
);
export const loadSingleAdSuccess = createAction(
  'loadSingleAdSuccess',
  props<{ ad: GunAd }>()
);

export const loadMyAds = createAction('loadMyAds');
export const loadMyAdsSuccess = createAction(
  'loadMyAdsSuccess',
  props<{ ads: GunAd[] }>()
);

export const loadSavedAds = createAction('loadSavedAds');
export const loadSavedAdsSuccess = createAction(
  'loadSavedAdsSuccess',
  props<{ ads: GunAd[] }>()
);

export const loadSearchedAds = createAction(
  'loadSearchedAds',
  props<{ input: string; categoryId: string }>()
);
export const loadSearchedAdsSuccess = createAction(
  'loadSearchedAdsSuccess',
  props<{ ads: GunAd[] }>()
);

export const createAd = createAction(
  'createAd',
  props<{ formData: FormData }>()
);
export const createAdSuccess = createAction('createAdSuccess');

export const updateAd = createAction(
  'updateAd',
  props<{ formData: FormData }>()
);
export const updateAdSuccess = createAction(
  'updateAdSuccess',
  props<{ ad: GunAd }>()
);

export const deleteAd = createAction('deleteAd', props<{ adId: number }>());
export const deleteAdSuccess = createAction(
  'deleteAdSuccess',
  props<{ adId: number }>()
);
