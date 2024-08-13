import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  basUrl = `http://localhost:5052`;

  cartitems: any = [];
  totalitemofcart: Subject<number> = new Subject<number>();
  totalprice: Subject<number> = new Subject<number>();
  address: any = [];
  constructor(private httpClient: HttpClient) {}

  additemtocart(theitem: any) {
    let alreadyExist = false;
    let existitem: any;

    if (this.cartitems.length > 0) {
      for (let temp of this.cartitems) {
        if (temp.id === theitem.id) {
          existitem = temp;
          break;
        }
      }
    }
    alreadyExist = existitem != null;
    if (alreadyExist) {
      existitem.quantity++;
      console.log(existitem);

      return false;
    } else {
      this.cartitems.push(theitem);
      return true;
    }
  }

  gettotalitem() {
    if (this.cartitems == null) {
      this.totalitemofcart.next(0);
    } else {
      this.totalitemofcart.next(this.cartitems.length);
      return this.cartitems;
    }
  }

  gettotalcount() {
    let totalprice = 0;
    console.log(this.cartitems);

    for (let temp of this.cartitems) {
      totalprice = totalprice + temp.price * temp.quantity;
    }
    console.log(totalprice);
    this.totalprice.next(totalprice);
  }

  getCountry() {
    return this.httpClient.get(`${this.basUrl}/country/`);
  }

  getStateByCountryId(id: any) {
    return this.httpClient.get(`${this.basUrl}/country/states/${id}`);
  }

  saveaddress(address: any) {
    this.address = address;
    console.log(this.address);
  }
  getaddress() {
    return this.address;
  }
  getCartItem() {
    return this.cartitems;
  }
  setcartItem(cartitem: any) {
    this.cartitems = cartitem;
  }

  saveOrder(order: any) {
    return this.httpClient.post(`${this.basUrl}/order/`, order);
  }
}
