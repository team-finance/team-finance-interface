import React, { useState } from "react";
import Header from "../../components/Main/Header";
import Footer from "../../components/Main/Footer";
import Body from "../../components/Main/Body";
import { useWalletState } from "app/state/hooks";
import ConnectWalletModal from "app/components/View/UI/ConnectWalletModal";
import { Wallet } from "app/helpers/types";
import { connectWalletHandler } from "app/state/walletConnect";
import { useAppDispatch } from "app/state";
interface WalletConnectModal {
  show: boolean;
}
const Layout = () => {
  const [walletModalInfo, setWalletModalInfo] = useState<WalletConnectModal>({
    show: false,
  });
  const { wallets } = useWalletState();
  const dispatch = useAppDispatch();

  function walletConnect() {
    setWalletModalInfo({
      show: true,
    });
  }
  return (
    <div className="main-layout">
      <Header onConnect={() => walletConnect()} />
      {/* <Footer onConnect={() => walletConnect()} /> */}
      <Body />
      {walletModalInfo.show && !wallets.isConnected && (
        <ConnectWalletModal
          handleClose={() => setWalletModalInfo({ show: false })}
          handleWalletConnect={(wallet: Wallet) =>
            dispatch(
              connectWalletHandler(
                wallet,
                wallets.selectedChain,
                wallets.selectedNetworkId
              )
            )
          }
        />
      )}
    </div>
  );
};

export default Layout;
