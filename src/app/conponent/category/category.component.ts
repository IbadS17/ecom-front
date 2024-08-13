import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  cat = [
    {
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
  ];

  constructor(
    private categoryService: CategoryService,
    private router: ActivatedRoute
  ) {}
  namey = '';
  ngOnInit(): void {
    // this.namey = this.router.snapshot.params['name'];

    this.router.params.subscribe((params) => {
      this.namey = params['name'];
      // console.log(this.namey);
      this.categoryService
        .getcategoryOfMainOfLevel3(this.namey)
        .subscribe((data: any) => {
          //      console.log(data);
          this.cat = data;
        });
    });
  }
}
