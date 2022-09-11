import { createAction, props } from '@ngrx/store';
import { GunAd } from 'src/app/models/gun-ad';

export const loadAds = createAction('loadAds');

export const loadAdsSuccess = createAction(
  'loadAdsSuccess',
  props<{ ads: GunAd[] }>()
);
