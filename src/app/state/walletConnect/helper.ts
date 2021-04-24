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

export const getProviders = (walletName: string) => {
  if (walletName) {
    let currentProvider: any;
    let provider: any;
    let EthProvider = (window as any).ethereum;
    switch (walletName) {
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
    // dispatch({
    //   type: ActionType.WALLET_DISCONNECT,
    // });
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
    console.log("META");
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
            // getAccountBalance(res[0], currentProvider);
            metamaskEventHandler(dispatch, (window as any).ethereum);
          })
          .catch((e: any) => {
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
          });
      })
      .catch((e: any) => {
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
      });
  } else {
    metamaskEventHandler(dispatch, (window as any).ethereum);
    // dispatch({
    //   type: ActionType.CONNECT_WALLET_SUCCESS,
    //   payload: [...accounts],
    // });
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

export async function handleWalletConnect(
  currentProviders: any,
  networkType: any,
  walletName: string,
  dispatch: Dispatch
) {
  try {
    let accounts: any;
    switch (walletName) {
      case "metamask":
        //// Ethererum ////
        if (networkType === 1) {
          try {
            accounts = await web3Service.getAccounts();
            handleMetamask(accounts, dispatch, currentProviders);
          } catch (e) {
            console.log(e);
          }
        } else if (networkType === 2) {
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
        } else if (networkType === 3) {
          accounts = await web3Service.getAccounts();

          handleMetamask(accounts, dispatch, currentProviders);
        }
        break;
      case "binanceWallet":
        try {
          // Binance //////
          //   const bsc = new BscConnector({
          //     supportedChainIds: [56, 97], // later on 1 ethereum mainnet and 3 ethereum ropsten will be supported
          //   });
          //   await bsc.activate().then((res: any) => {
          //     res.provider.enable().then((res) => {
          // dispatch(
          //   connectWallet({
          //     loading: false,
          //     isConnected: true,
          //     accounts: [res.account],
          //     walletError: null,
          //   })
          // );
          //     });
          //     dispatch(
          //   connectWallet({
          //     loading: false,
          //     isConnected: true,
          //     accounts: [res.account],
          //     walletError: null,
          //   })
          // );
          //   });
          //   let accounts = await bsc.getAccount();
          //   if (accounts) {
          //     dispatch(
          //   connectWallet({
          //     loading: false,
          //     isConnected: true,
          //     accounts: [accounts],
          //     walletError: null,
          //   })
          // );
          metamaskEventHandler(dispatch, (window as any).BinanceChain);
          //     getAccountBalance(accounts, 2);
          //   }
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
          //   console.log(accounts, networkId, "ss", chainId);
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
              //   getAccountBalance(address[0], currentProviders);
            })
            .catch((err: any) => {
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
          // );
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
      case "Portis":
        try {
          // if (wallet.name === "Portis" && !isMobile) {
          //   portisWeb3.eth.getAccounts((error, accounts) => {
          //     if (!error) {
          //       let address: string[];
          //       address = accounts;
          //       portis.onActiveWalletChanged((walletAddress: any) => {
          //         dispatch({
          //           type: ActionType.CONNECT_WALLET_SUCCESS,
          //           payload: [...address],
          //         });
          //         getAccountBalance(walletAddress[0]);
          //       });
          //       portis.onError((error: any) => {
          //         // console.log("error", error);
          //       });
          //       portis.onLogin(
          //         (walletAddress: any, email: any, reputation: any) => {
          //           // console.log(walletAddress, email, reputation);
          //           getAccountBalance(walletAddress);
          //         }
          //       );
          //       portis.onLogout(() => {
          //         dispatch({
          //           type: ActionType.WALLET_DISCONNECT,
          //         });
          //       });
          //       dispatch({
          //         type: ActionType.CONNECT_WALLET_SUCCESS,
          //         payload: [...address],
          //       });
          //     } else {
          //       dispatch({
          //         type: ActionType.CONNECT_WALLET_ERROR,
          //         payload: error.message,
          //       });
          //     }
          //   });
          // }
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
