import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FreshComponent } from './components/fresh/fresh.component';
import { FreshmeatComponent } from './components/freshmeat/freshmeat.component';
import { AmazonminitvComponent } from './components/amazonminitv/amazonminitv.component';
import { SellComponent } from './components/sell/sell.component';
import { BestSellersComponent } from './components/best-sellers/best-sellers.component';
import { TodaydealsComponent } from './components/todaydeals/todaydeals.component';
import { MobilesComponent } from './components/mobiles/mobiles.component';
import { CustomerServiceComponent } from './components/customer-service/customer-service.component';
import { ElectronicsComponent } from './components/electronics/electronics.component';
import { FashionComponent } from './components/fashion/fashion.component';
import { NewReleasesComponent } from './components/new-releases/new-releases.component';
import { LatestMoviesComponent } from './components/latest-movies/latest-movies.component';
import { FreeFastDeliveryComponent } from './components/free-fast-delivery/free-fast-delivery.component';
import { AddFreeMusicComponent } from './components/add-free-music/add-free-music.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CartComponent } from './components/cart/cart.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeAndKitchenComponent } from './components/home-and-kitchen/home-and-kitchen.component';

const routes: Routes = [
  { path: '', redirectTo: '/category/mobiles', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {path : 'register',component : RegisterComponent},
  { path: 'cart', component: CartComponent},
  { path: 'fresh/fresh', component: FreshComponent },
  { path: 'fresh/freshmeat', component: FreshmeatComponent },
  { path: 'category/amazonminitv', component: AmazonminitvComponent },
  { path: 'category/sell', component: SellComponent },
  { path: 'category/bestsellers', component: BestSellersComponent },
  { path: 'category/todaydeals', component: TodaydealsComponent },
  { path: 'category/mobiles', component: MobilesComponent },
  { path: 'category/customerservice', component: CustomerServiceComponent },
  { path: 'category/electronics', component: ElectronicsComponent },
  { path: 'category/fashion', component: FashionComponent },
  { path: 'category/newreleases', component: NewReleasesComponent },
  { path: 'category/homeandkitchen', component: HomeAndKitchenComponent },
  { path: 'prime/latestmoviesandtvshows', component: LatestMoviesComponent },
  { path: 'prime/freefastdeliveryonprimeitems', component: FreeFastDeliveryComponent },
  { path: 'prime/add-freemusicstreaming', component: AddFreeMusicComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
