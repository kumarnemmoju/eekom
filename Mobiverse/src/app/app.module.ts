import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from './material/material.module';
import { AllComponent } from './components/all/all.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { YourOrdersComponent } from './components/your-orders/your-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AllComponent,
    NotFoundComponent,
    RegisterComponent,
    LoginComponent,
    CartComponent,
    YourOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch() // Enable fetch API
    ),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
