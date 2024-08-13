import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersaverComponent } from './ordersaver.component';

describe('OrdersaverComponent', () => {
  let component: OrdersaverComponent;
  let fixture: ComponentFixture<OrdersaverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersaverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersaverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
