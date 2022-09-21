import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  create(name: string) {
    return this.httpClient.post<Category>(`${environment.api}/category`, {
      name,
    });
  }

  update(id: string, name: string) {
    return this.httpClient.put<any>(`${environment.api}/category`, {
      id,
      name,
    });
  }

  delete(id: string) {
    return this.httpClient.delete<any>(`${environment.api}/category/${id}`);
  }

  getAll() {
    return this.httpClient.get<Category[]>(`${environment.api}/category`);
  }
}
