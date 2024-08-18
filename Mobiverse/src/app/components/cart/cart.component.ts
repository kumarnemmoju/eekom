import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { MobileService } from '../../Services/mobile.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OrderService } from '../../Services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  @ViewChild('newAddressForm') newAddressForm!: ElementRef<any>;

  allUsersDt: any[] = [];
  mobilesInCart: any[] = [];
  totalPrice: number = 0;
  confirmedAddress: any = null;

  userAddresses: any[] = [];
  selectedAddress = null;
  showAddressForm = false;

  newAddress = {
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  };
  fullJson: any;

  constructor(
    private userService: UserService,
    private mobileService: MobileService,
    private snackBar: MatSnackBar,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.loadCartItems();
  }

  generateFullJson() {
    let expandedMobiles: any[] = [];
    this.mobilesInCart.forEach((mobile: any) => {
      for (let i = 0; i < mobile.quantity; i++) {
        expandedMobiles.push({ ...mobile });
      }
    });

    const emailId = this.getFromLocalStorage('EmailId');
    if (!emailId) {
      this.handleError('Email ID is not available. Cannot generate order.');
      return;
    }

    this.fullJson = {
      emailId: emailId,
      mobilesOrdered: expandedMobiles,
      deliveryAddress: this.selectedAddress,
      totalPrice: this.totalPrice,
    };

    console.log(this.fullJson);
  }

  loadCartItems() {
    const email = this.getFromLocalStorage('EmailId');
    const pass = this.getFromLocalStorage('Password');

    if (email && pass) {
      this.userService.getAllUsers().subscribe(
        (res: any) => {
          this.allUsersDt = res;
          const user = this.allUsersDt.find(
            (e) => e.email === email && e.password === pass
          );
          if (user) {
            this.mobilesInCart = user.itemsInCart || [];
            this.userAddresses = user.addresses || [];

            if (this.userAddresses.length > 0) {
              this.selectedAddress =
                this.userAddresses[this.userAddresses.length - 1];
              this.confirmSelectedAddress();
            }

            this.mobilesInCart.forEach((mobile: any) => {
              if (!mobile.hasOwnProperty('quantity')) {
                mobile.quantity = 1;
              }
            });

            this.calculateTotalPrice();
            this.generateFullJson();
          } else {
            this.handleError('User not found');
          }
        },
        (error) => {
          this.handleError('Error fetching users', error);
        }
      );
    } else {
      this.handleError('Email or Password not found in localStorage');
    }
  }

  moveToWishlist(mobileId: number) {
    console.log(`Move mobile with ID ${mobileId} to wishlist`);
    // Implement logic to move the item to the wishlist
  }

  calculateTotalPrice() {
    this.totalPrice = this.mobilesInCart.reduce(
      (total, mobile: any) => total + (mobile.price * mobile.quantity || 1),
      0
    );
    this.generateFullJson();
  }

  getTotalItems() {
    return this.mobilesInCart.reduce(
      (total, mobile: any) => total + (mobile.quantity || 1),
      0
    );
  }

  updateTotalPrice() {
    this.calculateTotalPrice();
  }

  toggleAddressForm() {
    this.showAddressForm = !this.showAddressForm;
    if (this.showAddressForm && this.newAddressForm) {
      setTimeout(() => {
        if (this.newAddressForm && this.newAddressForm.nativeElement) {
          this.newAddressForm.nativeElement.scrollIntoView({
            behavior: 'smooth',
          });
        }
      }, 0);
    }
  }

  addNewAddress() {
    if (
      this.newAddress.street &&
      this.newAddress.city &&
      this.newAddress.state &&
      this.newAddress.postalCode &&
      this.newAddress.country
    ) {
      const userId = this.getFromLocalStorage('UserId');
      if (userId) {
        this.mobileService.addNewAddress(userId, this.newAddress).subscribe(
          (response: string) => {
            this.snackBar.open(response, 'Close', {
              duration: 3000,
            });

            this.userAddresses.push({ ...this.newAddress });

            this.newAddress = {
              street: '',
              city: '',
              state: '',
              postalCode: '',
              country: '',
            };
            this.showAddressForm = false;

            this.selectedAddress =
              this.userAddresses[this.userAddresses.length - 1];
            this.confirmSelectedAddress();
          },
          (error) => {
            this.handleError('Failed to add address', error);
          }
        );
      } else {
        this.handleError('User ID not found in localStorage');
      }
    }
  }

  confirmSelectedAddress() {
    this.confirmedAddress = this.selectedAddress;
    this.generateFullJson();
  }

  async removeFromCart(mobileId: any): Promise<void> {
    const userId = this.getFromLocalStorage('UserId');
    if (userId) {
      try {
        const response:any = await this.mobileService.removeMobileFromCart(mobileId, userId).toPromise();
        this.snackBar.open(response, 'Close', {
          duration: 3000,
        });
        this.mobilesInCart = this.mobilesInCart.filter(
          (mobile) => mobile.mobileId !== mobileId
        );
        this.calculateTotalPrice();
      } catch (error) {
        this.snackBar.open('Failed to remove mobile from cart', 'Close', {
          duration: 5000,
        });
        console.error('Failed to remove mobile from cart', error);
      }
    } else {
      this.handleError('User ID not found in localStorage');
    }
  }

  async orderNow() {
    if (!this.fullJson) {
      this.handleError('Order details are not available. Cannot place the order.');
      return;
    }

    try {
      await this.orderService.orderNow(this.fullJson).toPromise();
      this.snackBar.open('Order placed successfully!', 'Close', {
        duration: 3000,
      });

      // Clear the cart items after a successful order
      await this.clearCartItems();

      // Redirect to the /yourorders route after the cart is cleared
      this.router.navigate(['/yourorders']);
    } catch (error) {
      this.handleError('Failed to place order. Please try again.', error);
    }
  }

  async clearCartItems(): Promise<void> {
    for (const mobile of this.mobilesInCart) {
      await this.removeFromCart(mobile.mobileId);
    }
    this.mobilesInCart = [];
    this.calculateTotalPrice();
  }

  private getFromLocalStorage(key: string): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      const value = localStorage.getItem(key);
      if (value !== null && value !== undefined) {
        return value;
      } else {
        console.error(`Key ${key} not found in localStorage`);
        return null;
      }
    }
    console.error('localStorage is not available');
    return null;
  }

  private handleError(message: string, error?: any) {
    console.error(message, error);
    const errorMessage = error?.error?.message || message;
    this.snackBar.open(errorMessage, 'Close', {
      duration: 5000,
    });
  }
}
