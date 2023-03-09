import Web3 from 'web3';

export const web3 = new Web3((window as any).ethereum);

// found in ./contracts/AwesomePictureAuctions.json in network/address
// after running truffle migrate for solidity contracts
export const auctionContractAddress = '0x381445710b5e73d34aF196c53A3D5cDa58EDBf7A';
