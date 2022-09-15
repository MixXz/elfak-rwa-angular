import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GunAd } from '../models/gun-ad';

@Injectable({
  providedIn: 'root',
})
export class GunAdService {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<GunAd[]>(`${environment.api}/gun-ad`);
  }

  getByUser() {
    return this.httpClient.get<GunAd[]>(`${environment.api}/gun-ad/myAds`);
  }

  create(formData: FormData) {
    return this.httpClient.post<any>(`${environment.api}/gun-ad`, formData);
  }
}
