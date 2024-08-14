import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/categories`);
  }

  getAccountDetails(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/account-details`);
  }
}
