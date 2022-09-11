import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { GunAd } from 'src/app/models/gun-ad';
import * as GunAdActions from './gun-ad.actions';

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
  on(GunAdActions.loadAdsSuccess, (state: GunAdState, { ads }) => {
    return adapter.addMany(ads, { ...state, loading: false });
  })
);
