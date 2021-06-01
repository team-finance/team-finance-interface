import React, { useEffect } from "react";
import { Layout } from "./Layout";
import dotEnv from "dotenv";
import "../../assets/scss/app.scss";
// import { fetchToken, getAllowance } from "../state/lockups";
import { useWalletState } from "app/state/hooks";
const App = () => {
  const { wallets } = useWalletState();
  useEffect(() => {
    // fetchToken("");
    if (wallets.isConnected && wallets.currentProvider) {
      // getAllowance(wallets.accounts[0], wallets.currentProvider);
    }
    dotEnv.config();
  }, [wallets.isConnected, wallets.currentProvider]);
  return <Layout />;
};

export default App;
