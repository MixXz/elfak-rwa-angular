import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GunAd } from '../models/gun-ad';

@Injectable({
  providedIn: 'root'
})
export class GunAdService {

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<GunAd[]>(`${environment.api}/gun-ad`);
  }

}
