import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { Wallet } from "app/helpers/types";
import { WalletState } from "../types";
import { getProviders, handleWalletConnect } from "./helper";
const initialState: WalletState = {
  isConnected: false,
  selectedChain: 1,
  loading: false,
  walletError: null,
  accounts: [],
  connectedWallet: null,
  currentProvider: null,
};

export const walletSlice = createSlice({
  name: "Wallet",
  initialState,
  reducers: {
    setSelectedChain: (state, action) => {
      state.selectedChain = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    connectWallet: (state, action) => {
      state.loading = action.payload.loading;
      state.isConnected = action.payload.isConnected;
      state.accounts = action.payload.accounts;
      state.walletError = action.payload.walletError;
      state.currentProvider = action.payload.currentProvider;
    },
  },
});

export const { setSelectedChain, connectWallet } = walletSlice.actions;

export const setChain = (chainId: number) => async (dispatch: any) => {
  dispatch(setSelectedChain(chainId));
};

export const connectWalletHandler = (wallet: Wallet, chainId: number) => async (
  dispatch: Dispatch
) => {
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
      const prov: any = await getProviders(wallet.name);
      console.log(prov);
      handleWalletConnect(prov.currentProvider, chainId, wallet.name, dispatch);
    }
  } catch (e) {}
};

export default walletSlice.reducer;
