import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  baseUrl = 'http://localhost:8080/api';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      const registerRequest = {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        password: formValue.password,
      };

      this.http
        .post(this.baseUrl + '/users/register', registerRequest)
        .subscribe(
          (response) => {
            this.snackBar.open('Registration successful', 'Close', {
              duration: 3000
            });
            this.router.navigate(['/login']);  // Navigate to the login page
          },
          (error) => {
            this.snackBar.open('Registration failed: ' + error.error.message, 'Close', {
              duration: 5000
            });
          }
        );
    } else {
      this.snackBar.open('Please fill out the form correctly', 'Close', {
        duration: 3000
      });
    }
  }
}
