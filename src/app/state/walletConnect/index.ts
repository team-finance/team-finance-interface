import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { toFixed } from "app/helpers/common";
import { Wallet } from "app/helpers/types";
import {
  CoinbaseProvider,
  CoinbaseWeb3,
  connectWalletProvider,
  connectWalletWeb3,
  fm,
  formaticWeb3,
  web3,
} from "app/utils/web3";
import { web3Service } from "app/utils/web3Service";
import { WalletState } from "../types";
import { getAccountBalance, getProvider } from "./helper";
const initialState: WalletState = {
  isConnected: false,
  selectedChain: 1,
  loading: false,
  walletError: null,
  accounts: [],
  connectedWallet: null,
  currentProvider: null,
  provider: null,
  accountBalance: "",
};

export const walletSlice = createSlice({
  name: "wallets",
  initialState,
  reducers: {
    setSelectedChain: (state, action) => {
      state.selectedChain = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setConnectedWallet: (state, action) => {
      state.connectedWallet = action.payload;
    },
    setCurrentProvider: (state, action) => {
      state.currentProvider = action.payload.currentProvider;
      state.provider = action.payload.provider;
    },
    connectWallet: (state, action) => {
      state.loading = action.payload.loading;
      state.isConnected = action.payload.isConnected;
      state.accounts = action.payload.accounts;
      state.walletError = action.payload.walletError;
      state.currentProvider = action.payload.currentProvider;
    },
    setAccountBalance: (state, action) => {
      state.accountBalance = action.payload;
    },
  },
});

export const {
  setSelectedChain,
  connectWallet,
  setConnectedWallet,
  setCurrentProvider,
  setAccountBalance,
} = walletSlice.actions;

export const setChain = (chainId: number) => async (dispatch: any) => {
  dispatch(setSelectedChain(chainId));
};

export const connectWalletHandler =
  (wallet: any, networkType: any) => async (dispatch: any) => {
    if (wallet) {
      let { currentProvider } = await getProvider(wallet);
      dispatch(handleWalletConnect(wallet, networkType, currentProvider));
    }
  };
const metamaskEventHandler = (dispatch: any, provider: any) => {
  provider.on("chainChanged", (chainId: any) => {
    window.location.reload();
  });
  provider.on("accountsChanged", function (accounts: string) {
    dispatch(
      connectWallet({
        loading: false,
        isConnected: true,
        accounts: [accounts[0]],
        walletError: null,
      })
    );
  });
  provider.on("message", (message: any) => {
    // console.log(message);
  });
  provider.on("disconnect", (code: number, reason: string) => {
    dispatch(
      connectWallet({
        loading: false,
        isConnected: false,
        accounts: [],
        walletError: null,
      })
    );
  });
};

const handleMetamask = (accounts: any, dispatch: any, currentProvider: any) => {
  if (
    window &&
    !(window as any).ethereum.selectedAddress &&
    accounts.length <= 0
  ) {
    console.log("META", currentProvider);
    (window as any).ethereum
      .enable()
      .then((res: any) => {
        console.log(res);
        web3Service
          .getAccounts()
          .then((res: any) => {
            dispatch(
              connectWallet({
                loading: false,
                isConnected: true,
                accounts: [...res],
                walletError: null,
              })
            );
            dispatch(getAccountBalance(res[0], currentProvider));
            metamaskEventHandler(dispatch, (window as any).ethereum);
          })
          .catch((e: any) => {
            // dispatch({
            dispatch(
              connectWallet({
                loading: false,
                isConnected: false,
                accounts: [],
                walletError: e.message,
              })
            );
          });
      })
      .catch((e: any) => {
        dispatch(
          connectWallet({
            loading: false,
            isConnected: false,
            accounts: [],
            walletError: e.message,
          })
        );
      });
  } else {
    dispatch(getAccountBalance(accounts[0], currentProvider));

    metamaskEventHandler(dispatch, (window as any).ethereum);
    dispatch(
      connectWallet({
        loading: false,
        isConnected: true,
        accounts: [...accounts],
        walletError: null,
      })
    );
  }
};

export const handleWalletConnect =
  (wallet: Wallet, chainId: number, currentProviders: any) =>
  async (dispatch: Dispatch) => {
    dispatch(
      connectWallet({
        loading: true,
        isConnected: false,
        accounts: [],
        walletError: null,
      })
    );
    try {
      if (wallet) {
        dispatch(setConnectedWallet(wallet));
        try {
          let accounts: any;
          switch (wallet.name) {
            case "metamask":
              //// Ethererum ////
              console.log("chainId", chainId);
              if (chainId === 1) {
                try {
                  accounts = await web3Service.getAccounts();
                  handleMetamask(accounts, dispatch, currentProviders);
                } catch (e) {
                  console.log(e);
                }
              } else if (chainId === 2) {
                try {
                  if (
                    (window as any).ethereum &&
                    (window as any).ethereum.selectedAddress
                  ) {
                    const provider = (window as any).ethereum;
                    const chainId = 97;
                    try {
                      await provider.request({
                        method: "wallet_addEthereumChain",
                        params: [
                          {
                            chainId: `0x${chainId.toString(16)}`,
                            chainName: "Binance Smart Chain Mainnet",
                            nativeCurrency: {
                              name: "BNB",
                              symbol: "bnb",
                              decimals: 18,
                            },
                            rpcUrls: [
                              "https://data-seed-prebsc-1-s1.binance.org:8545/",
                            ],
                            blockExplorerUrls: ["https://testnet.bscscan.com/"],
                          },
                        ],
                      });
                      accounts = await web3Service.getAccounts();

                      // if (accounts) {
                      handleMetamask(accounts, dispatch, currentProviders);
                      // }

                      return true;
                    } catch (error) {
                      console.error(error);
                      return false;
                    }
                  } else {
                    console.error(
                      "Can't setup the BSC network on metamask because window.ethereum is undefined"
                    );
                    return false;
                  }
                } catch (e) {
                  console.log(e);
                }
              } else if (chainId === 3) {
                accounts = await web3Service.getAccounts();

                handleMetamask(accounts, dispatch, currentProviders);
              }
              break;
            case "binanceWallet":
              try {
                metamaskEventHandler(dispatch, (window as any).BinanceChain);
              } catch (e) {
                dispatch(
                  connectWallet({
                    loading: false,
                    isConnected: false,
                    accounts: [],
                    walletError: e.message,
                  })
                );
              }
              break;
            case "walletConnect":
              try {
                let provider: any = connectWalletProvider;
                await provider.enable().then((response: any) => {
                  metamaskEventHandler(dispatch, connectWalletProvider);
                });
                await connectWalletWeb3.eth.getAccounts().then((res: any) => {
                  dispatch(
                    connectWallet({
                      loading: false,
                      isConnected: true,
                      accounts: [...res],
                      walletError: null,
                    })
                  );
                });
                const chainId = await web3.eth.chainId();
              } catch (err) {
                dispatch(
                  connectWallet({
                    loading: false,
                    isConnected: false,
                    accounts: [],
                    walletError: err.message,
                  })
                );
              }
              break;
            case "CoinbaseWallet":
              try {
                CoinbaseProvider.enable()
                  .then((accounts: string[]) => {
                    CoinbaseWeb3.eth.defaultAccount = accounts[0];
                    dispatch(
                      connectWallet({
                        loading: false,
                        isConnected: true,
                        accounts: [...accounts],
                        walletError: null,
                      })
                    );
                    metamaskEventHandler(dispatch, (window as any).ethereum);
                    CoinbaseWeb3.eth
                      .getBalance(accounts[0])
                      .then((res: any) => {
                        let ethBal = web3Service.getWei(res, "ether");
                        let ethBalDeci = toFixed(parseFloat(ethBal), 3);
                        //   dispatch({
                        //     type: ActionType.ACCOUNT_BALANCE_SUCCESS,
                        //     payload: ethBalDeci,
                        //     fullAccountBalance: ethBal,
                        //   });
                      })
                      .catch((e: any) => {
                        //   dispatch({
                        //     type: ActionType.ACCOUNT_BALANCE_SUCCESS,
                        //     payload: "",
                        //     fullAccountBalance: "",
                        //   });
                      });
                  })
                  .catch((err) => {
                    //   dispatch({
                    //     type: ActionType.CONNECT_WALLET_ERROR,
                    //     payload: err.message,
                    //   });
                    dispatch(
                      connectWallet({
                        loading: false,
                        isConnected: false,
                        accounts: [],
                        walletError: err.message,
                      })
                    );
                  });
              } catch (err) {
                //   dispatch({
                //     type: ActionType.CONNECT_WALLET_ERROR,
                //     payload: err.message,
                //   });
                dispatch(
                  connectWallet({
                    loading: false,
                    isConnected: false,
                    accounts: [],
                    walletError: err.message,
                  })
                );
              }
              break;
            case "Fortmatic":
              try {
                let web3: any = formaticWeb3;
                // console.log(
                web3.currentProvider
                  .enable()
                  .then((res: any) => {
                    let address: string[];
                    address = res;
                    //   dispatch({
                    //     type: ActionType.CONNECT_WALLET_SUCCESS,
                    //     payload: [...address],
                    //   });
                    dispatch(
                      connectWallet({
                        loading: false,
                        isConnected: true,
                        accounts: [...address],
                        walletError: null,
                      })
                    );
                    metamaskEventHandler(dispatch, (window as any).ethereum);
                  })
                  .catch((err: any) => {
                    dispatch(
                      connectWallet({
                        loading: false,
                        isConnected: false,
                        accounts: [],
                        walletError: err.message,
                      })
                    );
                  });
                // );
              } catch (err) {
                dispatch(
                  connectWallet({
                    loading: false,
                    isConnected: false,
                    accounts: [],
                    walletError: err.message,
                  })
                );
              }
              break;
            case "Portis":
              try {
              } catch (err) {
                dispatch(
                  connectWallet({
                    loading: false,
                    isConnected: false,
                    accounts: [],
                    walletError: err.message,
                  })
                );
              }
              break;
            default:
              accounts = await web3Service.getAccounts();
              if (window && !(window as any).ethereum.selectedAddress) {
                (window as any).ethereum.enable();
                dispatch(
                  connectWallet({
                    loading: false,
                    isConnected: true,
                    accounts: [...accounts],
                    walletError: null,
                  })
                );
              } else {
                dispatch(
                  connectWallet({
                    loading: false,
                    isConnected: true,
                    accounts: [...accounts],
                    walletError: null,
                  })
                );
              }
              break;
          }
        } catch (e) {
          // dispatch({
          //   type: ActionType.CONNECT_WALLET_ERROR,
          //   payload: e.message,
          // });
          dispatch(
            connectWallet({
              loading: false,
              isConnected: false,
              accounts: [],
              walletError: e.message,
            })
          );
        }
      }
    } catch (e) {}
  };

export default walletSlice.reducer;
