import { web3Service } from "app/utils/web3Service";
import { Dispatch } from "redux";
import { getCoreContract } from "../../ethereum/coreLB";
import { getProvider } from "../walletConnect/helper";

export const lockupHandling =
  (
    address: any,
    tokenAddresss: any,
    amount: any,
    unlockTime: any,
    wallet: any
  ) =>
  async (dispatch: Dispatch) => {
    const { currentProvider } = await getProvider(wallet);
    let fullAmount = web3Service.getValue(
      false,
      currentProvider,
      amount,
      tokenAddresss.decimals
    );
    getCoreContract(currentProvider)
      .methods.lockTokens(tokenAddresss.id, fullAmount, unlockTime)
      .send({ from: address, gas: 30000 })
      .on("transactionHash", (hash: any) => {
        console.log(hash);
      })
      .on("error", (err: any, res: any) => {
        console.log(err);
      });
  };
