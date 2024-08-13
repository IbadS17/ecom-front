import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css'],
})
export class ProductdetailComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private productService: ProductService
  ) {}

  idofProduct: any;
  productdetail = {
    id: 1,
    title: 'denim jeans 12',
    description: null,
    price: 0,
    discountedPrice: 0,
    discountPercent: 0,
    quantity: 0,
    setCategoryForCourseProduct: {
      id: 3,
      name: 'real course',
      level: 3,
      parentCourseCategory: {
        id: 2,
        name: 'course 11',
        level: 2,
        parentCourseCategory: {
          id: 1,
          name: 'course1',
          level: 1,
          parentCourseCategory: null,
        },
      },
    },
  };
  ngOnInit(): void {
    this.idofProduct = this.router.snapshot.params['id'];
    this.productService
      .getproductByID(this.idofProduct)
      .subscribe((data: any) => {
        this.productdetail = data;
      });
  }
}
