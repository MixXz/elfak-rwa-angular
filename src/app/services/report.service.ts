import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Report } from '../models/report';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private httpClient: HttpClient) {}

  create(id: number, text: string) {
    return this.httpClient.post<Report>(`${environment.api}/report`, {
      gunAdId: id,
      text: text,
    });
  }

  getAll() {
    return this.httpClient.get<Report[]>(`${environment.api}/report`);
  }
}
