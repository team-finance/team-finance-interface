import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from "fortmatic";
// import Portis from "@portis/web3";
import WalletLink from "walletlink";

let web3Provider: any;
const API_KEY: any = process.env.REACT_APP_FORMATIC_API_KEY;
let PORTIS_API_KEY: any = process.env.REACT_APP_PORTIS_WALLET_ID;
const APP_NAME = "UniLend Finance Interface";
const APP_LOGO_URL =
  "https://app.unilend.finance/static/media/logo.d90c2543.svg";
const ROP_ETH_JSONRPC_URL = `https://ropsten.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`;
const ETH_JSONRPC_URL = `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`;
const CHAIN_ID = 1;
const ROP_CHAIN_ID = 3;

web3Provider = new Web3(Web3.givenProvider || "http://localhost:8545");

export const web3 = web3Provider;
export const connectWalletProvider: any = new WalletConnectProvider({
  infuraId: `${process.env.REACT_APP_INFURA_ID}`,
});
export const connectWalletWeb3 = new Web3(connectWalletProvider);
export const fm: any = new Fortmatic(API_KEY, "ropsten");
export const formaticWeb3 = new Web3(fm.getProvider());
// export const portis: any = new Portis(PORTIS_API_KEY, "ropsten");
// export const portisWeb3: any = new Web3(portis.provider);
// TypeScript

// Initialize WalletLink
export const walletLink = new WalletLink({
  appName: APP_NAME,
  appLogoUrl: APP_LOGO_URL,
  darkMode: false,
});

// Initialize a Web3 Provider object
// export const CoinbaseProvider = walletLink.makeWeb3Provider(
//   ETH_JSONRPC_URL,
//   CHAIN_ID
// );

export const CoinbaseProvider = walletLink.makeWeb3Provider(
  ROP_ETH_JSONRPC_URL,
  ROP_CHAIN_ID
);

// Initialize a Web3 object
export const CoinbaseWeb3 = new Web3(CoinbaseProvider as any);
