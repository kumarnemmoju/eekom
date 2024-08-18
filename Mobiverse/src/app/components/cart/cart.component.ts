import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { MobileService } from '../../Services/mobile.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCartItems();
  }

  generateFullJson(){
    this.fullJson = {
      mobiles : this.mobilesInCart,
      selectedAddress : this.selectedAddress,
      totalPrice : this.totalPrice
    }
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
  
            // Select the last address by default
            if (this.userAddresses.length > 0) {
              this.selectedAddress =
                this.userAddresses[this.userAddresses.length - 1];
              this.confirmSelectedAddress(); // Confirm the default selected address
            }
  
            // Ensure each mobile in the cart has a quantity field
            this.mobilesInCart.forEach((mobile: any) => {
              if (!mobile.hasOwnProperty('quantity')) {
                mobile.quantity = 1; // Set default quantity to 1 if not already present
              }
            });
  
            this.calculateTotalPrice(); // Update total price on load
  
            // Generate the full JSON after loading all cart items and processing the data
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
    this.generateFullJson(); // Regenerate JSON after calculating total price
  }

  getTotalItems() {
    return this.mobilesInCart.reduce(
      (total, mobile: any) => total + (mobile.quantity || 1),
      0
    );
  }

  updateTotalPrice() {
    this.calculateTotalPrice();
    // The JSON will be regenerated inside calculateTotalPrice
  }

  toggleAddressForm() {
    this.showAddressForm = !this.showAddressForm;
    if (this.showAddressForm && this.newAddressForm) {
      // Scroll to the new address form
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

            // Add the new address to the user's addresses
            this.userAddresses.push({ ...this.newAddress });

            // Clear the new address form
            this.newAddress = {
              street: '',
              city: '',
              state: '',
              postalCode: '',
              country: '',
            };
            this.showAddressForm = false;

            // Set the newly added address as the selected address
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
    this.generateFullJson(); // Regenerate JSON after confirming address
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

  removeFromCart(mobileId: any): void {
    const userId = this.getFromLocalStorage('UserId');
    if (userId) {
      this.mobileService.removeMobileFromCart(mobileId, userId).subscribe(
        (response: string) => {
          this.snackBar.open(response, 'Close', {
            duration: 3000,
          });
          this.mobilesInCart = this.mobilesInCart.filter(
            (mobile) => mobile.mobileId !== mobileId
          ); // Remove the mobile from the local list
          this.calculateTotalPrice(); // Recalculate total price after removal
        },
        (error) => {
          this.snackBar.open('Failed to remove mobile from cart', 'Close', {
            duration: 5000,
          });
          console.error('Failed to remove mobile from cart', error);
        }
      );
    } else {
      this.snackBar.open('User ID not found in localStorage', 'Close', {
        duration: 5000,
      });
      console.error('User ID not found in localStorage');
    }
  }
}
