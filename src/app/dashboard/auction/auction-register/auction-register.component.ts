import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AbiItem } from 'web3-utils';
import data from '../../../core/contracts/AwesomePictureAuctions.json';
import { auctionContractAddress, web3 } from '../../../core/web3';


@Component({
  selector: 'app-auction-register',
  templateUrl: './auction-register.component.html',
})
export class AuctionRegisterComponent implements OnInit {
  @Input() auctions: string[];
  @Output() auctionsChange = new EventEmitter<string[]>();

  newAuction: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.buildNewAuctionForm();
  }

  buildNewAuctionForm(): void {
    this.newAuction = this.formBuilder.group({
      id: ['123', [Validators.required]],
      description: ['NFT', [Validators.required]],
      startingPrice: ['10', [Validators.required]],
      startTime: ['15', [Validators.required]],
      endTime: ['99999', [Validators.required]],
      gasPrice: ['20', [Validators.required]],
    });
  }

  async addAuction(): Promise<void> {
    const accounts = await web3.eth.getAccounts();
    const auctionContract = new web3.eth.Contract(data.abi as AbiItem[], auctionContractAddress);

    auctionContract.methods.addAuction(
      this.newAuction.get('id')?.value,
      this.newAuction.get('description')?.value,
      this.newAuction.get('startingPrice')?.value,
      this.newAuction.get('startTime')?.value,
      this.newAuction.get('endTime')?.value,
    ).send({
      from: accounts[0],
      gas: 200000,
      gasPrice: web3.utils.toWei(web3.utils.toBN(this.newAuction.get('gasPrice')?.value), 'gwei'),
    }).on('error', (error: any) => {
      console.log('[REGISTER-AUCTION] Error: ', error);
    }).on('transactionHash', (txHash: any) => {
      console.log('[REGISTER-AUCTION] TxHash: ', txHash);
    }).then((result: any) => {
      console.log('[REGISTER-AUCTION] Result: ', result);
      this.auctionsChange.emit([...this.auctions, this.newAuction.get('id')?.value]);
    }).catch((event: any) => {
      console.log('[REGISTER-AUCTION] Catch: ', event);
    });
  }
}
