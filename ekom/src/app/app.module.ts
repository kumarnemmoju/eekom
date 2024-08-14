import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderOneComponent } from './components/header-one/header-one.component';
import { HeaderTwoComponent } from './components/header-two/header-two.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatDialogModule} from '@angular/material/dialog';
import { AccountsAndListsComponent } from './components/accounts-and-lists/accounts-and-lists.component';
import { ChooseLocationComponent } from './components/choose-location/choose-location.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SellComponent } from './components/sell/sell.component';
import { BestSellersComponent } from './components/best-sellers/best-sellers.component';
import { TodaydealsComponent } from './components/todaydeals/todaydeals.component';
import { FashionComponent } from './components/fashion/fashion.component';
import { ElectronicsComponent } from './components/electronics/electronics.component';
import { CustomerServiceComponent } from './components/customer-service/customer-service.component';
import { MobilesComponent } from './components/mobiles/mobiles.component';
import { NewReleasesComponent } from './components/new-releases/new-releases.component';
import { LatestMoviesComponent } from './components/latest-movies/latest-movies.component';
import { FreeFastDeliveryComponent } from './components/free-fast-delivery/free-fast-delivery.component';
import { AddFreeMusicComponent } from './components/add-free-music/add-free-music.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CartComponent } from './components/cart/cart.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeAndKitchenComponent } from './components/home-and-kitchen/home-and-kitchen.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderOneComponent,
    HeaderTwoComponent,
    AccountsAndListsComponent,
    ChooseLocationComponent,
    SellComponent,
    BestSellersComponent,
    TodaydealsComponent,
    FashionComponent,
    ElectronicsComponent,
    CustomerServiceComponent,
    MobilesComponent,
    NewReleasesComponent,
    LatestMoviesComponent,
    FreeFastDeliveryComponent,
    AddFreeMusicComponent,
    LoginComponent,
    NotFoundComponent,
    CartComponent,
    RegisterComponent,
    HomeAndKitchenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    RouterModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
