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
