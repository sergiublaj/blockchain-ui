import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionDataComponent } from './auction-data.component';

describe('AuctionDataComponent', () => {
  let component: AuctionDataComponent;
  let fixture: ComponentFixture<AuctionDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
