import { Component, OnInit } from '@angular/core';
import { UserCommunicationService } from '../../Services/user-communication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userName: string | null = null;

  constructor(
    private userCommunicationService: UserCommunicationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Directly check localStorage for the user name when the component initializes
    if (typeof window !== 'undefined' && localStorage) {
      this.userName = localStorage.getItem('User Name');
    }

    // Subscribe to the service's EventEmitter to update the name dynamically after login
    this.userCommunicationService.userNameChanged.subscribe((userName) => {
      this.userName = userName;
    });
  }

  logout() {
    localStorage.clear(); // Clear all user-related data including UserId
    this.userCommunicationService.clearUserName();
    this.router.navigate(['/login']);
  }
}
