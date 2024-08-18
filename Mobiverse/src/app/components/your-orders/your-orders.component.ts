import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Services/order.service';

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

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders() {
    if (typeof window !== 'undefined' && localStorage) {
      const email = localStorage.getItem('EmailId');
      console.log(email);
      if (email) {
        this.orderService.getOrders(email).subscribe(
          (orders:any) => {
            console.log(orders);
            this.orders = orders;
          },
          (error) => {
            console.error('Error fetching orders:', error);
            // Handle error
          }
        );
      } else {
        console.error('Email ID not found in localStorage');
        // Handle the case where the email is not available
      }
    } else {
      console.error('localStorage is not available');
      // Handle the case where localStorage is not available
    }

    // Sample data based on your backend response for demonstration
    this.orders = [
      {
        orderId: 1,
        emailId: 'kavi@gmail.com',
        mobilesOrdered: [
          {
            id: 1,
            mobileId: 3,
            name: 'Google Pixel 6',
            series: 'Pixel',
            year: 2021,
            ram: '8GB',
            storage: '128GB',
            price: 699,
            originalPrice: 799,
            discount: 13,
            rating: 4,
            reviews: 2700,
            imageUrl:
              'https://m.media-amazon.com/images/I/619VJYWIbXL._SL1200_.jpg',
          },
          {
            id: 2,
            mobileId: 8,
            name: 'OnePlus 9 Pro',
            series: 'OnePlus',
            year: 2021,
            ram: '12GB',
            storage: '256GB',
            price: 969,
            originalPrice: 1069,
            discount: 9,
            rating: 5,
            reviews: 4100,
            imageUrl:
              'https://m.media-amazon.com/images/I/619VJYWIbXL._SL1200_.jpg',
          },
        ],
        deliveryAddress: {
          street: '1309',
          city: 'New Haven',
          state: 'Connecticut',
          postalCode: '15623',
          country: 'USA',
        },
        totalPrice: 5000,
      },
      // Add more orders as needed
    ];
  }
}
