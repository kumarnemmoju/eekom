import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mobile } from '../Mobile';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MobileService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getMobiles(): Observable<Mobile[]> {
    return this.http.get<Mobile[]>(this.apiUrl+'/mobiles').pipe(
      catchError(this.handleError)
    );
  }

  addNewAddress(userId: string, address: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/${userId}/addresses`, address, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  addMobileToCart(mobileId: number, userId: string): Observable<string> {
    return this.http.post(
      `${this.apiUrl}/users/${userId}/cart?mobileId=${mobileId}`,
      {},
      { responseType: 'text' }
    ).pipe(
      catchError(this.handleError)
    );
  }

  removeMobileFromCart(mobileId: number, userId: string): Observable<string> {
    return this.http.delete(
      `${this.apiUrl}/users/${userId}/cart?mobileId=${mobileId}`,
      { responseType: 'text' }
    ).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
