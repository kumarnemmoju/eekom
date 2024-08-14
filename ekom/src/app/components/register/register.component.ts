import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceService } from '../../Services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordCheck: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { firstName, lastName, email, password } = this.registerForm.value;
      this.authService.register({ firstName, lastName, email, password }).subscribe(
        (response) => {
          this.snackBar.open('Registration successful!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success'],
          });
          this.router.navigate(['/login']); // Redirect to login or any other page
        },
        (error) => {
          let errorMessage = 'An error occurred. Please try again.';

          if (error.status === 400) {
            errorMessage = 'Invalid request. Please check your input.';
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
