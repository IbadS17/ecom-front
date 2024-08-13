import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { WhishlistService } from 'src/app/service/whishlist.service';

@Component({
  selector: 'app-whishlist',
  templateUrl: './whishlist.component.html',
  styleUrls: ['./whishlist.component.css'],
})
export class WhishlistComponent implements OnInit {
  whishlist = [
    {
      title: 's',
    },
  ];

  totalitemofwhislist = 0;
  constructor(
    private whishlistService: WhishlistService,
    private cartServcie: CartService
  ) {}

  ngOnInit(): void {
    this.whishlist = this.whishlistService.getWhislist();
    console.log(this.whishlist);

    this.totalitemofwhislist = this.whishlistService.getWhislist().length;
  }
  deleteitemthis(temp: any) {
    this.whishlistService.deleteitemFromWhistlist(temp);
    this.whishlist = this.whishlistService.getWhislist();
    this.totalitemofwhislist = this.whishlistService.getWhislist().length;
  }

  additemtocart(temp: any) {
    temp.quantity++;
    this.cartServcie.additemtocart(temp);
    this.whishlistService.deleteitemFromWhistlist(temp);
    this.whishlist = this.whishlistService.getWhislist();
    this.totalitemofwhislist = this.whishlistService.getWhislist().length;
    this.cartServcie.gettotalitem();
  }
}
