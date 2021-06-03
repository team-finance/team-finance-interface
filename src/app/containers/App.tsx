/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Layout } from "./Layout";
import dotEnv from "dotenv";
import "../../assets/scss/app.scss";
// import { fetchToken, getAllowance } from "../state/lockups";
import { useWalletState } from "app/state/hooks";
import { connectWalletHandler } from "app/state/walletConnect";
import { useAppDispatch } from "app/state";
import { networkSwitchHandling } from "app/state/walletConnect/helper";
const App = () => {
  const { wallets } = useWalletState();
  const dispatch = useAppDispatch();
  useEffect(() => {
    // fetchToken("");
    if (wallets.connectedWallet && wallets.accounts[0]) {
      dispatch(
        connectWalletHandler(
          wallets.connectedWallet,
          wallets.selectedChain,
          wallets.selectedNetworkId
        )
      );
      dispatch(networkSwitchHandling(wallets.connectedWallet));
    }
    dotEnv.config();
  }, [
    wallets.connectedWallet,
    wallets.selectedChain,
    wallets.selectedNetworkId,
  ]);
  useEffect(() => {
    if (wallets.connectedWallet && wallets.accounts[0]) {
      dispatch(networkSwitchHandling(wallets.connectedWallet));
    }
  }, [wallets.accounts, wallets.connectedWallet]);
  return <Layout />;
};

export default App;
