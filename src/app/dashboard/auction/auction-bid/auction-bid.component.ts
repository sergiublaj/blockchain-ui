import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AbiItem } from 'web3-utils';
import data from '../../../core/contracts/AwesomePictureAuctions.json';
import { auctionContractAddress, web3 } from '../../../core/web3';


@Component({
  selector: 'app-auction-bid',
  templateUrl: './auction-bid.component.html',
})
export class AuctionBidComponent implements OnInit {
  @Input() auctions: string[];

  bidAuction: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.buildBidAuctionForm();
  }

  buildBidAuctionForm(): void {
    this.bidAuction = this.formBuilder.group({
      id: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      gasPrice: ['', [Validators.required]],
    });
  }

  async submitBid(): Promise<void> {
    const accounts = await web3.eth.getAccounts();
    const auctionContract = new web3.eth.Contract(data.abi as AbiItem[], auctionContractAddress);

    auctionContract.methods.bid(
      this.bidAuction.get('id')?.value,
    ).send({
      from: accounts[0],
      value: this.bidAuction.get('amount')?.value,
      gas: 200000,
      gasPrice: web3.utils.toWei(web3.utils.toBN(this.bidAuction.get('gasPrice')?.value), 'gwei'),
    }).on('error', (error: any) => {
      console.log('[BID-AUCTION] Error: ', error);
    }).on('transactionHash', (txHash: any) => {
      console.log('[BID-AUCTION] TxHash: ', txHash);
    }).then((result: any) => {
      console.log('[BID-AUCTION] Result: ', result);
    }).catch((event: any) => {
      console.log('[BID-AUCTION] Catch: ', event);
    })
  }
}
