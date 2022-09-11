import { CategoryState } from './store/category/category.reducer';
import { GunAdState } from './store/gun-ad/gun-ad.reducer';
import { UserState } from './store/user/user.reducer';

export interface AppState {
  user: UserState;
  category: CategoryState;
  gunAd: GunAdState;
}
