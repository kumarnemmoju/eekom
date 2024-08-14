import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {

  private baseUrl = 'http://localhost:8080/api';

  private userNameSource = new BehaviorSubject<string | null>(null);
  currentUserName = this.userNameSource.asObservable();

  constructor(private storageService: StorageService,private http : HttpClient) {
    const storedName = this.storageService.getItem('User Name');
    this.userNameSource.next(storedName);
  }

  updateUserName(name: string | null): void {
    if (name) {
      this.storageService.setItem('User Name', name);
    } else {
      this.storageService.removeItem('User Name');
    }
    this.userNameSource.next(name);
  }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ email, password });
    return this.http.post<any>(`${this.baseUrl}/login`, body, { headers });
  }

  register(userData: { firstName: string; lastName: string; email: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    // Construct the full user data object including empty arrays for addresses, cart, and wishlist
    const fullUserData = {
      ...userData,
      userAddresses: [],  // Default empty array for user addresses
      itemsInCart: [],    // Default empty array for items in cart
      itemsInWishlist: [] // Default empty array for items in wishlist
    };

    const body = JSON.stringify(fullUserData);
    return this.http.post<any>(`${this.baseUrl}/register`, body, { headers });
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }

  logout(): void {
    this.storageService.clear();  // Clear everything from localStorage
    this.userNameSource.next(null);  // Reset the user name observable
  }

}
