import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
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
        name: mobile.name,
        series: mobile.series,
        year: mobile.year,
        ram: mobile.ram,
        storage: mobile.storage,
        price: mobile.price,
        originalPrice: mobile.originalPrice,
        rating: mobile.rating,
        reviews: mobile.reviews,
        imageUrl: mobile.imageUrl,
      })),
      deliveryAddress: order.deliveryAddress,
      totalPrice: order.totalPrice,
    };
  
    const doc = new jsPDF();
  
    // Load the MOBIVERSE logo (replace with your actual logo path)
    const img = new Image();
    img.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdEAwAvhEPitkR9GbGy0yH9F12jJ29UL54EQ&s'; // Replace with the actual path to your logo
  
    img.onload = () => {
      doc.addImage(img, 'PNG', 10, 10, 50, 15);
  
      // Center the title 'Invoice'
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      const pageWidth = doc.internal.pageSize.getWidth();
      const title = 'Invoice';
      const textWidth = doc.getTextWidth(title);
      const xOffset = (pageWidth - textWidth) / 2;
      doc.text(title, xOffset, 30);
  
      // Add order details
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(`Email ID:`, 10, 50);
      doc.setFont('helvetica', 'normal');
      doc.text(orderFl.emailId, 40, 50);
  
      doc.setFont('helvetica', 'bold');
      doc.text('Delivery Address:', 10, 60);
      const address = `${orderFl.deliveryAddress.street}, ${orderFl.deliveryAddress.city}, ${orderFl.deliveryAddress.state} ${orderFl.deliveryAddress.postalCode}, ${orderFl.deliveryAddress.country}`;
      const addressLines = this.splitTextToSize(address, pageWidth - 20);
      doc.setFont('helvetica', 'normal');
      doc.text(addressLines, 10, 70);
  
      // Add table headers without Mobile ID and Discount
      const tableHeaders = [
        'Name',
        'Series',
        'Year',
        'RAM',
        'Storage',
        'Price',
        'Original Price',
      ];
  
      let startY = 90; // Adjusted startY to accommodate the delivery address
      const colXPositions = [10, 40, 70, 90, 110, 130, 150]; // Adjusted column positions
  
      doc.setFont('helvetica', 'bold');
      tableHeaders.forEach((header, index) => {
        doc.text(header, colXPositions[index], startY);
      });
  
      // Add table content
      startY += 10;
      const rowHeight = 10; // Space between rows
      doc.setFont('helvetica', 'normal');
      orderFl.mobilesOrdered.forEach((mobile, rowIndex) => {
        doc.text(mobile.name, colXPositions[0], startY + rowIndex * rowHeight);
        doc.text(mobile.series, colXPositions[1], startY + rowIndex * rowHeight);
        doc.text(mobile.year.toString(), colXPositions[2], startY + rowIndex * rowHeight);
        doc.text(mobile.ram, colXPositions[3], startY + rowIndex * rowHeight);
        doc.text(mobile.storage, colXPositions[4], startY + rowIndex * rowHeight);
        doc.text(mobile.price.toString(), colXPositions[5], startY + rowIndex * rowHeight);
        doc.text(mobile.originalPrice.toString(), colXPositions[6], startY + rowIndex * rowHeight);
      });
  
      // Add total price
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text(`Total Price:`, 10, startY + orderFl.mobilesOrdered.length * rowHeight + 20);
      doc.setFont('helvetica', 'normal');
      doc.text(`$${orderFl.totalPrice}`, 40, startY + orderFl.mobilesOrdered.length * rowHeight + 20);
  
      // Save the PDF
      doc.save('invoice.pdf');
    };
  
    img.onerror = (err) => {
      console.error('Failed to load image:', err);
      this.snackBar.open('Failed to load image for invoice. Please try again later.', 'Close', {
        duration: 3000,
      });
    };
  }
  
  // Helper function to split long text into multiple lines
  splitTextToSize(text: string, maxWidth: number): string[] {
    const doc = new jsPDF();
    return doc.splitTextToSize(text, maxWidth);
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
