import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CartService } from '../../Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  itemsInCart: any[] = [];

  

  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.loadUsersData();
    this.cartService.currentCartItems.subscribe((items) => {
      this.itemsInCart = items;
      console.log('itemsInCart',this.itemsInCart);
    });
    
  }

}
