import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WhishlistService {
  whishlist: any = [];

  totalWhishListItem: Subject<number> = new Subject<number>();
  constructor() {}

  addtowhishlist(theitem: any): boolean {
    let alreadyExist = false;
    let existitem: any;

    if (this.whishlist.length > 0) {
      for (let temp of this.whishlist) {
        if (temp.id === theitem.id) {
          existitem = temp;
          break;
        }
      }
    }
    alreadyExist = existitem != null;
    if (alreadyExist) {
      console.log('already added in whishlist');
      return false;
    } else {
      this.whishlist.push(theitem);
      return true;
    }
  }

  getWhislist() {
    this.totalWhishListItem.next(this.whishlist.length);
    return this.whishlist;
  }

  deleteitemFromWhistlist(theitem: any) {
    let newWhishlist = [];
    for (let temp of this.whishlist) {
      if (temp.id != theitem.id) {
        newWhishlist.push(temp);
      }
    }

    this.whishlist = newWhishlist;
  }
}
