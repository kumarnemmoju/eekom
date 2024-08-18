import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getOrders(emailId: any) {
    console.log(this.apiUrl + '/orders?emailId=' + emailId);
    return this.http
      .get(this.apiUrl + '/orders?emailId=' + emailId)
      .pipe(catchError(this.handleError));
  }

  orderNow(order:any): Observable<string> {
    return this.http
      .post(`${this.apiUrl}/orders`, order, { responseType: 'text' })
      .pipe(catchError(this.handleError));
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
