import { Component, Output } from '@angular/core';


@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
})
export class AuctionComponent {
  auctions: string[] = [];
}
