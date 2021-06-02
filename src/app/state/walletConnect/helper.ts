import { toFixed } from "app/helpers/common";
import { Wallet } from "app/helpers/types";
import { Dispatch } from "redux";
import { connectWallet } from ".";
import {
  CoinbaseProvider,
  CoinbaseWeb3,
  connectWalletProvider,
  connectWalletWeb3,
  fm,
  formaticWeb3,
  web3,
} from "../../utils/web3";
import { web3Service } from "../../utils/web3Service";

export const checkNet = (net: any) => {
  switch (net) {
    case 1:
      return "Mainnet";
    case 42:
      return "Kovan";
    case 3:
      return "Ropsten";
    case 4:
      return "RinkeBy";
    case 5:
      return "Goerli";
    case 56:
      return "Binance Mainnet";
    case 97:
      return "Binance Testnet";
    case 80001:
      return "Mumbai Testnet";
    case 137:
      return "Matic Mainnet";
    default:
      return "Localhost";
  }
};

export const getProvider = (wallet: any) => {
  let currentProvider: any;
  let provider: any;
  let EthProvider = (window as any).ethereum;
  switch (wallet.name) {
    case "metamask":
      currentProvider = web3;
      provider = EthProvider;
      break;
    case "walletConnect":
      currentProvider = connectWalletWeb3;
      provider = connectWalletProvider;
      break;
    case "CoinbaseWallet":
      currentProvider = CoinbaseWeb3;
      provider = EthProvider;
      break;
    case "Fortmatic":
      currentProvider = formaticWeb3;
      provider = fm;
      break;
    default:
      currentProvider = web3;
      provider = EthProvider;
  }
  return { currentProvider, provider };
};
