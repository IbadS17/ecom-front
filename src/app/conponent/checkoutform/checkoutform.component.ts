import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-checkoutform',
  templateUrl: './checkoutform.component.html',
  styleUrls: ['./checkoutform.component.css'],
})
export class CheckoutformComponent implements OnInit {
  MainCheckoutOform!: FormGroup;
  country = [
    {
      id: 1,
      code: 'BR',
      name: 'Brazil',
    },
  ];

  states = [
    {
      id: 1,
      name: '',
      countryid: {
        id: 1,
        code: 'BR',
        name: 'Brazil',
      },
    },
  ];

  totalprice = 0;
  constructor(
    private formbuilder: FormBuilder,
    private Cartservice: CartService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.MainCheckoutOform = this.formbuilder.group({
      contactdetails: this.formbuilder.group({
        name: [''],
        mobilenos: [''],
      }),
      address: this.formbuilder.group({
        country: [''],
        state: [''],
        pincode: [''],
        addressdetails: [''],
        city: [''],
      }),
    });
    this.Cartservice.getCountry().subscribe((data: any) => {
      this.country = data;
    });

    this.Cartservice.totalprice.subscribe((data: any) => {
      this.totalprice = data;
    });

    this.Cartservice.gettotalcount();
  }

  addAddress() {
    console.log(this.MainCheckoutOform?.get('contactdetails')?.value);
    console.log(this.MainCheckoutOform.value);
    this.Cartservice.saveaddress(this.MainCheckoutOform.value);
    this.route.navigateByUrl('/order-checkout');
  }
  testercountry(aa: any, myval: HTMLLabelElement) {
    myval.textContent = '';
    const formControl = this.MainCheckoutOform.get(aa);
    console.log(formControl);
    if (formControl?.value['country']) {
      this.Cartservice.getStateByCountryId(
        formControl.value['country']
      ).subscribe((data: any) => {
        this.states = data;

        console.log(this.states[0].name);

        if (this.states.length > 0) {
          const statesControl = formControl.get('states');

          if (statesControl) {
            statesControl.setValue('add');
          }
        }
      });
    } else {
      console.log('no');
    }
  }
}
