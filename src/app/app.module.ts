import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { AuctionBidComponent } from './dashboard/auction/auction-bid/auction-bid.component';
import { AuctionComponent } from './dashboard/auction/auction.component';
import { MetaMaskComponent } from './dashboard/meta-mask/meta-mask.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AuctionRegisterComponent } from './dashboard/auction/auction-register/auction-register.component';
import { AuctionDataComponent } from './dashboard/auction/auction-data/auction-data.component';


@NgModule({
  declarations: [
    AppComponent,
    AuctionComponent,
    NavbarComponent,
    MetaMaskComponent,
    AuctionRegisterComponent,
    AuctionDataComponent,
    AuctionBidComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
