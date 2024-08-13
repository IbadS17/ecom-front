import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './conponent/category/category.component';
import { ProductsComponent } from './conponent/products/products.component';
import { ProductdetailComponent } from './conponent/productdetail/productdetail.component';
import { WhishlistComponent } from './conponent/whishlist/whishlist.component';
import { CartstatusComponent } from './conponent/cartstatus/cartstatus.component';
import { CheckoutformComponent } from './conponent/checkoutform/checkoutform.component';
import { LoginComponent } from './conponent/login/login.component';
import { OrdersaverComponent } from './conponent/ordersaver/ordersaver.component';

const routes: Routes = [
  { path: 'category/:name', component: CategoryComponent, pathMatch: 'full' },
  { path: 'product/:name', component: ProductsComponent },
  { path: 'productdetails/:id', component: ProductdetailComponent },
  { path: 'whishlist', component: WhishlistComponent },
  { path: 'cart-item', component: CartstatusComponent },
  { path: 'checkout-form', component: CheckoutformComponent },
  { path: 'login', component: LoginComponent },
  { path: 'order-checkout', component: OrdersaverComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
