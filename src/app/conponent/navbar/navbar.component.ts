import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { CategoryService } from 'src/app/service/category.service';
import { WhishlistService } from 'src/app/service/whishlist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  MainCat = [
    {
      id: 1,
      name: 'course1',
      level: 1,
      parentCourseCategory: null,
    },
  ];
  totalwhislistitem = 0;
  totalcartitem = 0;
  constructor(
    private categoryService: CategoryService,
    private whishlistService: WhishlistService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.categoryService.getMainCategory(1).subscribe(
      (data: any) => {
        this.MainCat = data;
        console.log(this.MainCat);
      },
      (error) => {
        console.log(error);
      }
    );

    this.whishlistService.totalWhishListItem.subscribe((data: any) => {
      this.totalwhislistitem = data;
    });

    this.cartService.totalitemofcart.subscribe((data: any) => {
      this.totalcartitem = data;
    });
  }

  testerSearch(va: any) {
    console.log(va);
  }
}
