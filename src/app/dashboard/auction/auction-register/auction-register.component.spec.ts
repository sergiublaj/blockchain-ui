import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionRegisterComponent } from './auction-register.component';

describe('AuctionRegisterComponent', () => {
  let component: AuctionRegisterComponent;
  let fixture: ComponentFixture<AuctionRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
