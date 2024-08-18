import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
interface Mobile {
  id: number;
  mobileId: number;
  name: string;
  series: string;
  year: number;
  ram: string;
  storage: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  imageUrl: string;
}

interface DeliveryAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface Order {
  orderId: number;
  emailId: string;
  mobilesOrdered: Mobile[];
  deliveryAddress: DeliveryAddress;
  totalPrice: number;
}

@Component({
  selector: 'app-your-orders',
  templateUrl: './your-orders.component.html',
  styleUrls: ['./your-orders.component.css'],
})
export class YourOrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  getInvoicePdf(order: Order) {
    const orderFl = {
      emailId: order.emailId,
      mobilesOrdered: order.mobilesOrdered.map((mobile: Mobile) => ({
        mobileId: mobile.mobileId,
        name: mobile.name,
        series: mobile.series,
        year: mobile.year,
        ram: mobile.ram,
        storage: mobile.storage,
        price: mobile.price,
        originalPrice: mobile.originalPrice,
        discount: mobile.discount,
        rating: mobile.rating,
        reviews: mobile.reviews,
        imageUrl: mobile.imageUrl,
      })),
      deliveryAddress: order.deliveryAddress,
      totalPrice: order.totalPrice,
    };

    this.orderService.getInvoice(orderFl).subscribe({
      next: (res) => {
        this.snackBar.open(res, 'Close', {
          duration: 3000
        });
      },
      error: (err) => {
        console.error('Error generating invoice:', err);

        let errorMessage =
          'Failed to generate invoice. Please try again later.';

        if (err.status === 500) {
          errorMessage =
            'Internal Server Error: Unable to generate the invoice at this time. Please try again later or contact support.';
        } else if (err.status === 400) {
          errorMessage =
            'Bad Request: The order details seem to be incorrect. Please check and try again.';
        } else if (err.status === 404) {
          errorMessage =
            'Service Not Found: The invoice generation service is unavailable. Please try again later.';
        }

        this.snackBar.open(errorMessage, 'Close', {
          duration: 3000,
        });
      },
    });
  }

  fetchOrders() {
    if (typeof window !== 'undefined' && localStorage) {
      const email = localStorage.getItem('EmailId');
      if (email) {
        this.orderService.getOrders(email).subscribe(
          (orders: any) => {
            this.orders = orders;
            this.snackBar.open('Orders fetched successfully!', 'Close', {
              duration: 3000,
            });
          },
          (error) => {
            console.error('Error fetching orders:', error);
            this.snackBar.open(
              'Failed to fetch orders. Please try again later.',
              'Close',
              {
                duration: 3000,
              }
            );
          }
        );
      } else {
        console.error('Email ID not found in localStorage');
        this.snackBar.open(
          'Email ID not found. Please log in again.',
          'Close',
          {
            duration: 3000,
          }
        );
      }
    } else {
      console.error('localStorage is not available');
      this.snackBar.open(
        'localStorage is not available in your browser.',
        'Close',
        {
          duration: 3000,
        }
      );
    }
  }
}
