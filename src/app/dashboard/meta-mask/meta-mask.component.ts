import { Component, NgZone, OnInit } from '@angular/core';


@Component({
  selector: 'app-meta-mask',
  templateUrl: './meta-mask.component.html',
})
export class MetaMaskComponent implements OnInit {
  ethereum: any;
  canConnect = true;
  accountsLoaded = false;
  accounts: string[];
  error: string;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.connectToMetaMask();
  }

  connectToMetaMask() {
    this.ethereum = (window as any).ethereum;

    if (!this.ethereum) {
      this.canConnect = false;
      return;
    }

    this.ethereum.on('accountsChanged', () => this.getMetaMaskAccount());
  }

  async getMetaMaskAccount() {
    try {
      const accounts = await this.ethereum.request({
        method: 'eth_requestAccounts',
      });

      this.ngZone.run(() => {
        this.accountsLoaded = true;
        this.accounts = accounts;
      });
    } catch (error) {
      this.error = '[MetaMask] Could not fetch accounts!';
    }
  }
}
