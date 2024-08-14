import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  constructor(private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.snackBar.open('Page not found! Redirecting to Mobiles', 'Close', {
      duration: 5000,
      panelClass: ['snackbar-style']
    });

    setTimeout(() => {
      this.router.navigate(['/category/mobiles']);
    }, 5000); // 5 seconds delay to match the Snackbar duration
  }
}
