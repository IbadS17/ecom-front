import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  basUrl = `http://localhost:5052`;

  constructor(private httpClient: HttpClient) {}

  getProductByCurrentCategory(catname: any) {
    return this.httpClient.get(`${this.basUrl}/course/current/${catname}`);
  }

  getfilterbybrand(categoryname: any) {
    return this.httpClient.get(
      `${this.basUrl}/course/brandfilter/${categoryname}`
    );
  }

  getProductOfSelectedBrand(brands: string[], catname: any) {
    const brandString = brands.join(',');
    console.log(brandString);
    return this.httpClient.get(
      `${this.basUrl}/course/tt/${catname}/${brandString}`
    );
  }
  getProductWithRanges(ranges: any[], catname: any) {
    const rangesString = encodeURIComponent(JSON.stringify(ranges));
    return this.httpClient.get(
      `${this.basUrl}/course/price-filter/${catname}/${rangesString}`
    );
  }

  getrangeforPrice(catname: any) {
    return this.httpClient.get(`${this.basUrl}/course/min-max/${catname}`);
  }

  getbothfilter(ranges: any, catname: any, brands: string[]) {
    const brandString = brands.join(',');

    const rangesString = encodeURIComponent(JSON.stringify(ranges));
    console.log(rangesString);
    return this.httpClient.get(
      `${this.basUrl}/course/total-filter/${catname}/${rangesString}/${brandString}`
    );
  }

  getproductByID(id: number) {
    return this.httpClient.get(`${this.basUrl}/course/product/${id}`);
  }
}
