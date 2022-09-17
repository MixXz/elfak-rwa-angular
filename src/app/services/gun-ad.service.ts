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

  getBySearch(input: string, categoryId: string) {
    return this.httpClient.get<GunAd[]>(
      `${environment.api}/gun-ad/search?categoryId=${categoryId}&searchInput=${input}`
    );
  }

  getSingle(id: number) {
    return this.httpClient.get<GunAd>(`${environment.api}/gun-ad/${id}`);
  }

  getByUser() {
    return this.httpClient.get<GunAd[]>(`${environment.api}/gun-ad/myAds`);
  }

  getByUserSaved() {
    return this.httpClient.get<GunAd[]>(`${environment.api}/gun-ad/savedAds`);
  }

  create(formData: FormData) {
    return this.httpClient.post<GunAd[]>(`${environment.api}/gun-ad`, formData);
  }

  update(formData: FormData) {
    return this.httpClient.put<GunAd>(`${environment.api}/gun-ad`, formData);
  }

  delete(id: number) {
    return this.httpClient.delete<any>(`${environment.api}/gun-ad/${id}`);
  }
}
