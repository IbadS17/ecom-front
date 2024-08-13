import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { LoginService } from 'src/app/service/login.service';
import { OrderItem } from 'src/app/service/OrderItem';
import { Product } from 'src/app/service/Product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ordersaver',
  templateUrl: './ordersaver.component.html',
  styleUrls: ['./ordersaver.component.css'],
})
export class OrdersaverComponent implements OnInit {
  constructor(
    private CartServcie: CartService,
    private LoginService: LoginService,
    private router: Router
  ) {}
  address1: any = [
    {
      contactdetails: {
        name: 'as',
        mobilenos: 'asd',
      },
    },
    {
      address: {
        country: 4,
        state: 'maa',
        addressdetails: 'asd',
        pincode: '455',
        city: 'mumbai',
      },
    },
  ];
  cartItem: any = [];

  order: any = {
    user: {
      id: 1,
    },
    address: {
      firstName: 'advait',
      city: 'mumbai',
      state: 'maa',
      addressdetails: 'asd',
      pincode: '455',
      mobile: '343',
    },
    orderitem: [],
  };

  ot: any = [];
  ngOnInit(): void {
    this.address1 = this.CartServcie.getaddress();

    this.cartItem = this.CartServcie.getCartItem();
    console.log(this.cartItem);

    console.log(this.LoginService.getUser());
  }

  saveOrder() {
    for (let temp of this.cartItem) {
      this.ot.push(new OrderItem(new Product(temp.id)));
    }
    console.log(this.ot);
    let user = JSON.parse(this.LoginService.getUser());
    this.order.user.id = user.id;
    this.order.address = this.address1.address;
    this.order.address.firstName = this.address1.contactdetails.name;
    this.order.address.mobile = this.address1.contactdetails.mobilenos;
    this.order.address.addressdetails = this.address1.address.addressdetails;
    this.order.orderitem = this.ot;
    console.log(this.order);
    this.CartServcie.saveOrder(this.order).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Success', 'your Record is saved Successfully', 'success');
        this.cartItem = null;
        this.ot = null;
        this.CartServcie.setcartItem(this.cartItem);
        this.CartServcie.gettotalitem();
        this.router.navigateByUrl('/');
      },
      (error) => {
        Swal.fire('error', 'your Record is not Saved', 'error');
      }
    );
  }
}
