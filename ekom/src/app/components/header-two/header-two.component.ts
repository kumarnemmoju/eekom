import { Component } from '@angular/core';
import { HeaderService } from '../../Services/header.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-two',
  templateUrl: './header-two.component.html',
  styleUrl: './header-two.component.css',
})
export class HeaderTwoComponent {
  categories: any = { fresh: [], prime: [], category: [] };

  constructor(private headerService: HeaderService, private router: Router) {}

  ngOnInit(): void {
    this.headerService.getCategories().subscribe(
      (data) => {
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

  loadPageNow(itemMain: string, item: string) {
    let link = '/' + itemMain + '/' + item.replaceAll(' ', '');
    this.router.navigate([link]);
  }

  openDropdown(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const dropdownElement = target.closest('.dropdown');
    if (dropdownElement) {
      dropdownElement.classList.add('show');
      const dropdownMenu = dropdownElement.querySelector('.dropdown-menu');
      if (dropdownMenu) {
        dropdownMenu.classList.add('show');
      }
    }
  }

  closeDropdown(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const dropdownElement = target.closest('.dropdown');
    if (dropdownElement) {
      dropdownElement.classList.remove('show');
      const dropdownMenu = dropdownElement.querySelector('.dropdown-menu');
      if (dropdownMenu) {
        dropdownMenu.classList.remove('show');
      }
    }
  }
}
