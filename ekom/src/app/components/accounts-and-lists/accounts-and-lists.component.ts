import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../Services/auth-service.service';

@Component({
  selector: 'app-accounts-and-lists',
  templateUrl: './accounts-and-lists.component.html',
  styleUrl: './accounts-and-lists.component.css'
})
export class AccountsAndListsComponent {
  isLoggedIn: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isLoggedIn = !!localStorage.getItem('userEmail') && !!localStorage.getItem('userPass');
    }
    console.log('opened : ', this.data);
  }

  signout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
