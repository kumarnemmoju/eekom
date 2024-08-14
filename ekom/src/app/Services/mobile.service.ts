import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mobile } from '../components/mobiles/mobiles.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MobileService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getMobiles(): Observable<Mobile[]> {
    return this.http.get<Mobile[]>(this.apiUrl+'/mobiles');
  }
}
