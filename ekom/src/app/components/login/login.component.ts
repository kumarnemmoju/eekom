import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../Services/auth-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../Services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  signInForm!: FormGroup;
  filteredData: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router,
    private snackBar: MatSnackBar,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }



  onSubmit(): void {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;
      this.authService.login(email, password).subscribe(
        (response) => {
          this.snackBar.open(response.message || 'Login successful!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success'],
          });
          localStorage.setItem('userEmail', email);
          localStorage.setItem('userPass', password);
          this.cartService.loadUsersData();
          this.router.navigate(['/category/mobiles']);
        },
        (error) => {
          let errorMessage = 'An error occurred. Please try again.';

          if (error.status === 400) {
            errorMessage = 'Invalid request. Please check your input.';
          } else if (error.status === 401) {
            errorMessage = 'Unauthorized. Please check your credentials.';
          } else if (error.status === 500) {
            errorMessage = 'Server error. Please try again later.';
          }

          this.snackBar.open(errorMessage, 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error'],
          });
        }
      );
    } else {
      this.snackBar.open('Please fill in the form correctly.', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-warning'],
      });
    }
  }
}
