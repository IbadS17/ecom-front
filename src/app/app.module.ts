import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './conponent/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryComponent } from './conponent/category/category.component';
import { ProductsComponent } from './conponent/products/products.component';
import { FormsModule } from '@angular/forms';
import { ProductdetailComponent } from './conponent/productdetail/productdetail.component';
import { CartstatusComponent } from './conponent/cartstatus/cartstatus.component';
import { WhishlistComponent } from './conponent/whishlist/whishlist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckoutformComponent } from './conponent/checkoutform/checkoutform.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './conponent/login/login.component';
import { authInterceptorProvider } from './service/auth.interceptor';
import { OrdersaverComponent } from './conponent/ordersaver/ordersaver.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CategoryComponent,
    ProductsComponent,
    ProductdetailComponent,
    CartstatusComponent,
    WhishlistComponent,
    CheckoutformComponent,
    LoginComponent,
    OrdersaverComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  providers: [authInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
