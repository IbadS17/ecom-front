import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cartstatus',
  templateUrl: './cartstatus.component.html',
  styleUrls: ['./cartstatus.component.css'],
})
export class CartstatusComponent implements OnInit {
  constructor(private cartService: CartService) {}
  whishlist = [
    {
      id: 1,
      title: 's',
      price: 11,
      quantity: 100,
    },
  ];
  totalprice = 0;
  ngOnInit(): void {
    this.whishlist = this.cartService.gettotalitem();
    this.cartService.totalprice.subscribe((data: any) => {
      this.totalprice = data;
      console.log(data);
    });
    this.cartService.gettotalcount();
  }
  increment(temp: any) {
    console.log(temp);
    this.cartService.additemtocart(temp);
    this.cartService.gettotalcount();
  }
}
