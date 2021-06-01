/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Layout } from "./Layout";
import dotEnv from "dotenv";
import "../../assets/scss/app.scss";
// import { fetchToken, getAllowance } from "../state/lockups";
import { useWalletState } from "app/state/hooks";
import { connectWalletHandler } from "app/state/walletConnect";
import { useAppDispatch } from "app/state";
const App = () => {
  const { wallets } = useWalletState();
  const dispatch = useAppDispatch();
  useEffect(() => {
    // fetchToken("");
    if (wallets.isConnected && wallets.accounts[0]) {
      dispatch(
        connectWalletHandler(wallets.connectedWallet, wallets.selectedChain)
      );
      // getAllowance(wallets.accounts[0], wallets.currentProvider);
    }
    dotEnv.config();
  }, [wallets.connectedWallet, wallets.selectedChain]);
  return <Layout />;
};

export default App;
