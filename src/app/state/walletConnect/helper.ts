import { toFixed } from "app/helpers/common";
import { Wallet } from "app/helpers/types";
import { Dispatch } from "redux";
import { connectWallet, setAccountBalance, setUserTokenBalance } from ".";
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
import BigNumber from "bignumber.js";
import {getIERC20Contract, IERC20} from '../../ethereum/coreLB'; 
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

export const getAccountBalance =
  (selectedAccount: string, currentProvider: any, networkId?: any) =>
  async (dispatch: Dispatch) => {
    try {
      let balance: any;
      if (networkId && networkId === 2) {
        balance = await (window as any).BinanceChain.request({
          method: "eth_getBalance",
          params: [selectedAccount, "latest"],
        });
      } else {
        balance = await web3Service.getBalance(selectedAccount);
        if (currentProvider === CoinbaseWeb3) {
          balance = await currentProvider.eth.getBalance(selectedAccount);
        }
      }
      let ethBal = web3Service.getWei(balance, "ether");
      let ethBalDeci = toFixed(parseFloat(ethBal), 3);
      dispatch(setAccountBalance(ethBalDeci));
      // dispatch({
      //   type: ActionType.ACCOUNT_BALANCE_SUCCESS,
      //   payload: ethBalDeci,
      //   fullAccountBalance: ethBal,
      // });
    } catch (e) {
      dispatch(setAccountBalance(""));

      // errorHandler.report(e);
      // dispatch({
      //   type: ActionType.ACCOUNT_BALANCE_SUCCESS,
      //   payload: "",
      //   fullAccountBalance: "",
      // });
      // dispatch({
      //   type: ActionType.WALLET_DISCONNECT,
      // });
    }
  };

  export const getUserTokenBalance = (
    selectedToken: any,accounts: any,wallet: any
  ) => 
    async (dispatch: Dispatch) => {    
      console.log("Calling", selectedToken, accounts, wallet)        
      try {
    const { currentProvider } = await getProvider(wallet);

        getIERC20Contract(selectedToken.id, currentProvider).methods.balanceOf(accounts).call((e: any, r: any) => {
          console.log("AMO", r, e)
          if (!e) {
            let amount = r;
            const decimalAmount = new BigNumber(amount)
              .dividedBy(Math.pow(10, selectedToken.decimals))
              .toString();
            let fullAmount = new BigNumber(decimalAmount)
              .toFixed(3, 1)
              .toString();
              console.log(decimalAmount)
            dispatch(setUserTokenBalance(fullAmount));
            // });
          } else {
            console.log("err", e, r)
          }
        });
      } catch (e) {
        dispatch(setUserTokenBalance(""));
      }
    }