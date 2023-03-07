import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AbiItem } from 'web3-utils';
import data from '../../../core/contracts/AwesomePictureAuctions.json';
import { auctionContractAddress, web3 } from '../../../core/web3';
import { AuctionDataModel } from '../../../shared/model/auction-data.model';


@Component({
  selector: 'app-auction-data',
  templateUrl: './auction-data.component.html',
})
export class AuctionDataComponent implements OnInit {
  @Input() auctions: string[];

  getAuction: UntypedFormGroup;
  data: AuctionDataModel;
  errors: string[] = [];

  constructor(private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.buildGetAuctionForm();
  }

  buildGetAuctionForm(): void {
    this.getAuction = this.formBuilder.group({
      id: ['', [Validators.required]],
    });
  }

  getAuctionData(): void {
    this.getAddress();
    this.getPrice();
    this.getMaxBid();
  }

  getAddress(): void {
    this.data = {
      ...this.data,
      address: auctionContractAddress,
    };
  }

  getPrice(): void {
    const auctionContract = new web3.eth.Contract(data.abi as AbiItem[], auctionContractAddress);
    auctionContract.methods.retrieveStartingPrice(this.getAuction.get('id')?.value).call()
      .then((startingPrice: any) => {
        this.data = {
          ...this.data,
          startingPrice: startingPrice,
        };
      })
      .catch((error: any) => {
        if (!this.errors.includes(error)) {
          this.errors.push(error);
        }
      });
  }

  getMaxBid(): void {
    const auctionContract = new web3.eth.Contract(data.abi as AbiItem[], auctionContractAddress);
    auctionContract.methods.retrieveMaxBid(this.getAuction.get('id')?.value).call()
      .then((maxBid: any) => {
        this.data = {
          ...this.data,
          maxBid: maxBid,
        };
      })
      .catch((error: any) => {
        if (!this.errors.includes(error)) {
          this.errors.push(error);
        }
      });
  }

  hideError(error: string): void {
    this.errors = this.errors.filter((e) => error !== e);
  }
}
