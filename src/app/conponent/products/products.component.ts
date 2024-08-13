import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { WhishlistService } from 'src/app/service/whishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products = [
    {
      id: 104,
      title: 'tshirtlong',
      description: null,
      price: 0,
      discountedPrice: 0,
      discountPercent: 0,
      quantity: 0,
      setCategoryForCourseProduct: {
        id: 57,
        name: 'blue tshrtit',
        level: 3,
        parentCourseCategory: {
          id: 56,
          name: 'tshirt',
          level: 2,
          parentCourseCategory: {
            id: 55,
            name: 'Mens',
            level: 1,
            parentCourseCategory: null,
          },
        },
      },
    },
  ];

  constructor(
    private productService: ProductService,
    private router: ActivatedRoute,
    private whishlistService: WhishlistService
  ) {}

  catname = '';
  brandFilter = [
    {
      title: 'denim jeans 12',
      counter: 6,
      isChecked: false,
    },
  ];

  rangefilterPrice = [
    {
      start: 0,
      end: 250,
      count: 20,
      ischecked: false,
    },
  ];
  testesarray: any = [];
  ngOnInit(): void {
    this.catname = this.router.snapshot.params['name'];

    this.productService
      .getProductByCurrentCategory(this.catname)
      .subscribe((data: any) => {
        this.products = data;
      });

    this.productService
      .getfilterbybrand(this.catname)
      .subscribe((data: any) => {
        this.brandFilter = data;
      });

    this.productService
      .getrangeforPrice(this.catname)
      .subscribe((data: any) => {
        console.log(data);
        this.rangefilterPrice = data;
      });
  }

  cat1 = false;
  cat2 = false;
  pricearray: any = [];
  onCheckboxChange1(temp: any) {
    console.log(temp);
    this.cat2 = true;
    this.tester(temp);
  }

  tester(temp: any) {
    if (this.cat1 && this.cat2) {
      //  console.log('ya its both');
      this.whenbotharetrue(temp);
    } else if (this.cat1) {
      //console.log('ya it is... 1');
      this.whencat1istrue(temp);
    } else {
      // console.log('ya it is 2');
      this.whencat2istrue(temp);
    }
  }

  onCheckboxChange(temp: any) {
    this.cat1 = true;
    this.tester(temp);
  }

  whencat1istrue(temp: any) {
    if (temp.isChecked) {
      console.log(temp.title);
      this.testesarray.push(temp.title);
      console.log(this.testesarray);
      this.productService
        .getProductOfSelectedBrand(this.testesarray, this.catname)
        .subscribe((data: any) => {
          console.log(data);
          this.products = data;
        });
    } else {
      let newOne: any[] = [];
      for (let i = 0; i < this.testesarray.length; i++) {
        if (this.testesarray[i] != temp.title) {
          newOne.push(this.testesarray[i]);
        }
      }

      console.log('now..');
      console.log(newOne);
      this.testesarray = newOne;
      if (this.testesarray.length > 0) {
        console.log('entered....');
        this.productService
          .getProductOfSelectedBrand(this.testesarray, this.catname)
          .subscribe((data: any) => {
            console.log(data);
            this.products = data;
          });
      } else {
        this.cat1 = false;
        this.productService
          .getProductByCurrentCategory(this.catname)
          .subscribe((data: any) => {
            this.products = data;
          });
      }
    }
  }
  whencat2istrue(temp: any) {
    if (temp.ischecked) {
      console.log('checked');
      const { ischecked, ...tempWithoutIsChecked } = temp;
      console.log(tempWithoutIsChecked);
      this.pricearray.push(tempWithoutIsChecked);
      //find product

      this.productService
        .getProductWithRanges(this.pricearray, this.catname)
        .subscribe((data: any) => {
          this.products = data;
        });
    } else {
      //remove checked
      temp.ischecked = false;
      const { ischecked, ...withoutchecked } = temp;
      let newOne: any[] = [];
      for (let i = 0; i < this.pricearray.length; i++) {
        console.log(this.pricearray);
        console.log(withoutchecked);
        if (this.pricearray[i].start != withoutchecked.start) {
          newOne.push(this.pricearray[i]);
        }
      }
      console.log('----');
      console.log(newOne);
      //find product greater than 0 and  = 0
      this.pricearray = newOne;
      if (this.pricearray.length > 0) {
        this.productService
          .getProductWithRanges(this.pricearray, this.catname)
          .subscribe((data: any) => {
            this.products = data;
          });
      } else {
        this.cat2 = false;
        this.productService
          .getProductByCurrentCategory(this.catname)
          .subscribe((data: any) => {
            this.products = data;
          });
      }
    }
  }

  whenbotharetrue(temp: any) {
    // if (temp.isChecked) {
    //   console.log(temp.title);
    //   this.testesarray.push(temp.title);
    //   console.log(this.testesarray);

    //   const { ischecked, ...tempWithoutIsChecked } = temp;
    //   console.log(tempWithoutIsChecked);
    //   this.pricearray.push(tempWithoutIsChecked);
    // }
    if (temp.isChecked || temp.ischecked) {
      if (temp.isChecked && checker(this.testesarray, temp)) {
        this.testesarray.push(temp.title);
      } else {
        const { ischecked, ...tempWithoutIsChecked } = temp;
        this.pricearray.push(tempWithoutIsChecked);
      }
      console.log(this.testesarray);
      console.log('entering..');
      console.log(this.pricearray);
      this.productService
        .getbothfilter(this.pricearray, this.catname, this.testesarray)
        .subscribe((data: any) => {
          this.products = data;
        });
    } else {
      console.log('now for uncehcked....');
    }
  }
  checkerpricearray(tester: any, temp: any) {
    for (let i = 0; i < tester.length; temp++) {
      if (tester[i].start == temp.start) {
        return false;
      }
    }
    return true;
  }

  addtoWhishlist(temp: any) {
    let a = this.whishlistService.addtowhishlist(temp);
    if (a) {
      alert('successfully added to whislist');
    } else {
      alert('already exist');
    }
    this.whishlistService.getWhislist();
  }
}
function checker(tester: any, temp: any) {
  for (let i = 0; i < tester.length; i++) {
    if (tester[i].title == temp.title) {
      return false;
    }
  }
  return true;
}
