import { Component, OnInit } from '@angular/core';
import { MobileService } from '../../Services/mobile.service';

export interface Mobile {
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

@Component({
  selector: 'app-mobiles',
  templateUrl: './mobiles.component.html',
  styleUrls: ['./mobiles.component.css'],
})
export class MobilesComponent implements OnInit {
  mobiles: Mobile[] = [];
  allMobiles: Mobile[] = [];
  minPrice: number = 0;
  maxPrice: number = 0;
  filteredMobiles: Mobile[] = [];
  selectedFilters: { [key: string]: any } = {}; // Object to store selected filters
  paginatedMobiles: Mobile[] = [];
  pageSize = 8;
  pageIndex = 0;

  constructor(private mobileService: MobileService) {}

  ngOnInit(): void {
    this.mobileService.getMobiles().subscribe((data) => {
      this.allMobiles = data;
      this.setPriceRange();
      this.applyFilters(); // Apply default filters
    });
  }

  setPriceRange(): void {
    this.minPrice = Math.min(...this.allMobiles.map((mobile) => mobile.price));
    this.maxPrice = Math.max(...this.allMobiles.map((mobile) => mobile.price));
  }

  applyFilters(): void {
    this.filteredMobiles = [...this.allMobiles];

    // Apply each filter if it exists in the selectedFilters object
    if (this.selectedFilters['Rating']) {
      this.filteredMobiles = this.filteredMobiles.filter(
        (mobile) => mobile.rating >= this.selectedFilters['Rating']
      );
    }
    if (this.selectedFilters['Brand']) {
      this.filteredMobiles = this.filteredMobiles.filter((mobile) =>
        mobile.name
          .toLowerCase()
          .includes(this.selectedFilters['Brand'].toLowerCase())
      );
    }
    if (this.selectedFilters['RAM']) {
      this.filteredMobiles = this.filteredMobiles.filter(
        (mobile) => mobile.ram === this.selectedFilters['RAM']
      );
    }
    if (this.selectedFilters['ROM']) {
      this.filteredMobiles = this.filteredMobiles.filter(
        (mobile) => mobile.storage === this.selectedFilters['ROM']
      );
    }
    if (this.selectedFilters['Price Range']) {
      this.filteredMobiles = this.filteredMobiles.filter(
        (mobile) =>
          mobile.price >= this.selectedFilters['Price Range'].min &&
          mobile.price <= this.selectedFilters['Price Range'].max
      );
    }

    // Apply sorting if any
    if (this.selectedFilters['Sort by']) {
      this.sortBy(this.selectedFilters['Sort by'], false);
    }

    this.updatePaginatedMobiles();
  }

  sortBy(criteria: string, updateFilter: boolean = true): void {
    if (criteria === 'lowToHigh') {
      this.filteredMobiles.sort((a, b) => a.price - b.price);
    } else if (criteria === 'highToLow') {
      this.filteredMobiles.sort((a, b) => b.price - a.price);
    } else if (criteria === 'newestFirst') {
      this.filteredMobiles.sort((a, b) => b.year - a.year);
    } else if (criteria === 'customerReview') {
      this.filteredMobiles.sort((a, b) => b.rating - a.rating);
    }

    if (updateFilter) {
      this.selectedFilters['Sort by'] = criteria;
    }

    this.updatePaginatedMobiles();
  }

  filterByRating(rating: number): void {
    this.selectedFilters['Rating'] = rating;
    this.applyFilters();
  }

  filterByBrand(brand: string): void {
    if (brand === 'All') {
      delete this.selectedFilters['Brand'];
    } else {
      this.selectedFilters['Brand'] = brand;
    }
    this.applyFilters();
  }

  filterByRam(ram: string): void {
    this.selectedFilters['RAM'] = ram;
    this.applyFilters();
  }

  filterByRom(rom: string): void {
    this.selectedFilters['ROM'] = rom;
    this.applyFilters();
  }

  filterByPriceRange(): void {
    this.selectedFilters['Price Range'] = {
      min: this.minPrice,
      max: this.maxPrice,
    };
    this.applyFilters();
  }

  resetFilters(): void {
    this.selectedFilters = {};
    this.filteredMobiles = [...this.allMobiles]; // Reset to show all mobiles
    this.setPriceRange();
    this.updatePaginatedMobiles();
  }

  removeFilter(filterType: string): void {
    delete this.selectedFilters[filterType]; // Remove the specific filter
    this.applyFilters(); // Reapply the remaining filters
  }

  getSelectedFilterKeys(): string[] {
    return Object.keys(this.selectedFilters);
  }

  setPage(pageIndex: number): void {
    if (pageIndex >= 0 && pageIndex < this.totalPages()) {
      this.pageIndex = pageIndex;
      this.updatePaginatedMobiles();
    }
  }

  updatePaginatedMobiles(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedMobiles = this.filteredMobiles.slice(start, end);
  }

  totalPages(): number {
    return Math.ceil(this.filteredMobiles.length / this.pageSize);
  }

  totalPagesArray(): number[] {
    return Array(this.totalPages()).fill(0).map((x, i) => i);
  }
}
