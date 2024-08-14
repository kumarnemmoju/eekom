import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSource = new BehaviorSubject<any[]>([]);
  currentCartItems = this.cartItemsSource.asObservable();
  filteredData: any;

  constructor(private authService: AuthServiceService) {}

  updateCartItems(items: any[]): void {
    this.cartItemsSource.next(items);
  }

  loadUsersData() {
    this.authService.getAllUsers().subscribe((res) => {
      this.filteredData = res.filter(
        (data: any) =>
          data.email === localStorage.getItem('userEmail') &&
          data.password === localStorage.getItem('userPass')
      )[0];
      localStorage.setItem(
        'User Name',
        this.filteredData.firstName + ' ' + this.filteredData.lastName
      );
      this.authService.updateUserName(localStorage.getItem('User Name'));
      this.updateCartItems(this.filteredData.itemsInCart);
    });
  }
}
