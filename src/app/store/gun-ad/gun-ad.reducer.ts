import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { GunAd } from 'src/app/models/gun-ad';
import * as GunAdActions from './gun-ad.actions';
import * as UserActions from '../user/user.actions';

export interface GunAdState extends EntityState<GunAd> {
  category: string | null;
  loading: boolean;
}

const adapter: EntityAdapter<GunAd> = createEntityAdapter<GunAd>();

export const initialState: GunAdState = adapter.getInitialState({
  category: null,
  loading: false,
});

export const gunAdReducer = createReducer(
  initialState,
  on(GunAdActions.loadAds, (state) => ({
    ...state,
    loading: true,
  })),
  on(GunAdActions.loadSingleAdSuccess, (state: GunAdState, { ad }) => {
    return adapter.setOne(ad, state);
  }),
  on(GunAdActions.loadAdsSuccess, (state: GunAdState, { ads }) => {
    return adapter.setAll(ads, { ...state, loading: false });
  }),
  on(GunAdActions.loadMyAdsSuccess, (state: GunAdState, { ads }) => {
    return adapter.setAll(ads, state);
  }),
  on(GunAdActions.loadSavedAdsSuccess, (state: GunAdState, { ads }) => {
    return adapter.setAll(ads, state);
  }),
  on(GunAdActions.loadSearchedAdsSuccess, (state: GunAdState, { ads }) => {
    return adapter.setAll(ads, state);
  }),
  on(GunAdActions.deleteAdSuccess, (state: GunAdState, { adId }) => {
    return adapter.removeOne(adId, state);
  }),
  on(UserActions.toggleSaveSuccess, (state: GunAdState, { adId }) => {
    return adapter.updateOne(
      {
        id: adId,
        changes: {
          ...state.entities[adId],
          isSaved: !state.entities[adId]?.isSaved,
        },
      },
      state
    );
  }),
  on(GunAdActions.updateAdSuccess, (state: GunAdState, {ad}) => {
    return adapter.updateOne(
      {
        id: ad.id,
        changes: {
          title: ad.title,
          description: ad.description,
          brand: ad.brand,
          caliber: ad.caliber,
          price: ad.price,
          gallery: ad.gallery,
        },
      },
      state
    );
  })
);
