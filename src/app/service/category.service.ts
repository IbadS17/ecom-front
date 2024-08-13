import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  basUrl = `http://localhost:5052`;

  constructor(private httpClient: HttpClient) {}

  getMainCategory(level: any) {
    return this.httpClient.get(`${this.basUrl}/course-category/level/${level}`);
  }

  getcategoryOfMainOfLevel3(name: any) {
    return this.httpClient.get(`${this.basUrl}/course-category/main/${name}`);
  }
}
