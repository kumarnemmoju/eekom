import { Component, OnInit } from '@angular/core';
import { Mobile } from '../../Mobile';
import { MobileService } from '../../Services/mobile.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css'],
})
export class AllComponent implements OnInit {
  mobiles: Mobile[] = [];
  filteredMobiles: Mobile[] = [];
  displayedMobiles: Mobile[] = [];
  errorMessage: string = '';
  selectedFilters: { name: string; value: string }[] = [];

  constructor(
    private mobileService: MobileService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.mobileService.getMobiles().subscribe(
      (data: Mobile[]) => {
        this.mobiles = data;
        this.applyFilters(); // Apply filters on initial load
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  onFilterChange(filterName: string, event: Event): void {
    const filterValue = (event.target as HTMLSelectElement).value;

    const existingFilterIndex = this.selectedFilters.findIndex(
      (f) => f.name === filterName
    );
    if (existingFilterIndex >= 0) {
      this.selectedFilters[existingFilterIndex].value = filterValue;
    } else {
      this.selectedFilters.push({ name: filterName, value: filterValue });
    }

    this.applyFilters(); // Apply filters whenever a filter is changed
  }

  removeFilter(filter: { name: string; value: string }): void {
    this.selectedFilters = this.selectedFilters.filter((f) => f !== filter);

    this.clearRelatedInputs(filter.name);
    this.applyFilters(); // Reapply the remaining filters
  }

  clearRelatedInputs(filterName: string): void {
    switch (filterName) {
      case 'Brand':
        (document.getElementById('brandFilter') as HTMLSelectElement).value = '';
        break;
      case 'Rating':
        (document.getElementById('ratingFilter') as HTMLSelectElement).value = '';
        break;
      case 'RAM':
        (document.getElementById('ramFilter') as HTMLSelectElement).value = '';
        break;
      case 'ROM':
        (document.getElementById('romFilter') as HTMLSelectElement).value = '';
        break;
      case 'Min Price':
        (document.getElementById('minPrice') as HTMLInputElement).value = '';
        break;
      case 'Max Price':
        (document.getElementById('maxPrice') as HTMLInputElement).value = '';
        break;
      case 'Sort by':
        (document.getElementById('sortFilter') as HTMLSelectElement).value = '';
        break;
      default:
        break;
    }
  }

  clearAllFilters(): void {
    this.selectedFilters = [];

    // Clear all filter inputs and dropdowns
    this.clearRelatedInputs('Brand');
    this.clearRelatedInputs('Rating');
    this.clearRelatedInputs('RAM');
    this.clearRelatedInputs('ROM');
    this.clearRelatedInputs('Min Price');
    this.clearRelatedInputs('Max Price');
    this.clearRelatedInputs('Sort by');

    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredMobiles = [...this.mobiles]; // Reset to the full list of mobiles each time
  
    // Apply each filter one by one
    this.selectedFilters.forEach((filter) => {
      switch (filter.name) {
        case 'Brand':
          this.filteredMobiles = this.filteredMobiles.filter((mobile) =>
            mobile.name.toLowerCase().includes(filter.value.toLowerCase())
          );
          break;
        case 'Rating':
          this.filteredMobiles = this.filteredMobiles.filter(
            (mobile) => mobile.rating >= parseInt(filter.value)
          );
          break;
        case 'RAM':
          this.filteredMobiles = this.filteredMobiles.filter(
            (mobile) => mobile.ram === filter.value
          );
          break;
        case 'ROM':
          this.filteredMobiles = this.filteredMobiles.filter(
            (mobile) => mobile.storage === filter.value
          );
          break;
        case 'Min Price':
          if (filter.value) {
            this.filteredMobiles = this.filteredMobiles.filter(
              (mobile) => mobile.price >= parseInt(filter.value)
            );
          }
          break;
        case 'Max Price':
          if (filter.value) {
            this.filteredMobiles = this.filteredMobiles.filter(
              (mobile) => mobile.price <= parseInt(filter.value)
            );
          }
          break;
        case 'Sort by':
          this.filteredMobiles = this.sortMobiles(this.filteredMobiles, filter.value);
          break;
        default:
          break;
      }
    });

    this.displayedMobiles = this.filteredMobiles; // Update displayed mobiles with the filtered list
  }

  sortMobiles(mobiles: Mobile[], sortOrder: string): Mobile[] {
    switch (sortOrder) {
      case 'lowToHigh':
        return mobiles.sort((a, b) => a.price - b.price);
      case 'highToLow':
        return mobiles.sort((a, b) => b.price - a.price);
      case 'newestFirst':
        return mobiles.sort((a, b) => b.year - a.year);
      default:
        return mobiles;
    }
  }

  addToCart(mobileId: any): void {
    const userId = localStorage.getItem('UserId');
    if (userId) {
      this.mobileService.addMobileToCart(mobileId, userId).subscribe(
        (response: string) => {
          this.snackBar.open(response, 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/cart']); // Navigate to the cart page after adding to cart
        },
        (error) => {
          this.snackBar.open('Failed to add mobile to cart', 'Close', {
            duration: 5000,
          });
          console.error('Failed to add mobile to cart', error);
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
