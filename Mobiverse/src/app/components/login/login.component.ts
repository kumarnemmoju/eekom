import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { UserCommunicationService } from '../../Services/user-communication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private userCommunicationService: UserCommunicationService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      const loginRequest = {
        email: formValue.email,
        password: formValue.password,
      };
  
      this.http.post('http://localhost:8080/api/users/login', loginRequest).subscribe(
        async (response: any) => {
          if (response.message === "User does not exist. Please register.") {
            this.snackBar.open(response.message, 'Close', {
              duration: 5000,
            });
            return; // Prevent further execution and redirection
          }
  
          this.snackBar.open('Login successful', 'Close', {
            duration: 3000,
          });
  
          // Store user data in localStorage and notify other components
          this.setToLocalStorage('EmailId', this.loginForm.value.email);
          this.setToLocalStorage('Password', this.loginForm.value.password);
  
          const user = await this.loadUserDetails();
          if (user) {
            this.setToLocalStorage('UserId', user.id); // Set UserId
            this.userCommunicationService.updateUserName(`${user.firstName} ${user.lastName}`);
          }
  
          this.router.navigate(['/all']);
        },
        (error) => {
          let errorMessage = 'Login failed';
          if (error.error && error.error.message) {
            errorMessage = error.error.message;
          }
  
          this.snackBar.open(errorMessage, 'Close', {
            duration: 5000,
          });
        }
      );
    } else {
      this.snackBar.open('Please fill out the form correctly', 'Close', {
        duration: 3000,
      });
    }
  }
  
  

  loadUserDetails(): Promise<any> {
    return new Promise((resolve, reject) => {
      const emailOfLoggedInUser = this.getFromLocalStorage('EmailId');
      const passwordOfLoggedInUser = this.getFromLocalStorage('Password');

      if (emailOfLoggedInUser && passwordOfLoggedInUser) {
        this.userService.getAllUsers().subscribe(
          (res: any) => {
            const filteredUser = res.find(
              (e: any) =>
                e.password === passwordOfLoggedInUser &&
                e.email === emailOfLoggedInUser
            );
            resolve(filteredUser || null);
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        resolve(null);
      }
    });
  }

  private getFromLocalStorage(key: string): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(key);
    }
    console.error('localStorage is not available');
    return null;
  }

  private setToLocalStorage(key: string, value: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, value);
    } else {
      console.error('localStorage is not available');
    }
  }
}
