import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountsAndListsComponent } from '../accounts-and-lists/accounts-and-lists.component';
import { ChooseLocationComponent } from '../choose-location/choose-location.component';
import { HeaderService } from '../../Services/header.service';
import { AuthServiceService } from '../../Services/auth-service.service';

@Component({
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.css'],
})
export class HeaderOneComponent implements OnInit {
  userName: string | null = null;

  constructor(
    private dialog: MatDialog,
    private headerService: HeaderService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.authService.currentUserName.subscribe((name) => {
      this.userName = name;
      console.log('userName : ', this.userName);
    });
  }

  openDialog(): void {
    this.headerService.getAccountDetails().subscribe(
      (data) => {
        const dialogRef = this.dialog.open(AccountsAndListsComponent, {
          data: data,
          height: '70%'
        });

        dialogRef.afterClosed().subscribe((result) => {
          console.log(`Dialog result: ${result}`);
        });
      },
      (error) => {
        console.error('There was an error fetching account details!', error);
      }
    );
  }

  chooseLocation(): void {
    const dialogRef = this.dialog.open(ChooseLocationComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
