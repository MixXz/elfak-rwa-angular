import { GunAd } from './gun-ad';

export interface Report {
  id: number;
  text: string;
  status: string,
  gunAd: GunAd;
}
