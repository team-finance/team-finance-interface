import { web3Service } from "app/utils/web3Service";
import { Dispatch } from "redux";
import { setLockActionStatus,setLockHashRecived } from ".";
import { getCoreContract } from "../../ethereum/coreLB";
import { LockActionStatus, LockApproveState ,} from "../types";
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
    dispatch(setLockActionStatus(LockActionStatus.NULL));

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
      .on("receipt", (res: any) => {
        console.log("receipt", res);
        dispatch(setLockActionStatus(LockActionStatus.SUCCESS));
      })
      .on("transactionHash", (hash: any) => {
        console.log(hash);
        dispatch(setLockActionStatus(LockActionStatus.TRANS_RECEIVED));
        dispatch(setLockHashRecived(hash));
      })
      .on("error", (err: any, res: any) => {
        console.log(err);
        dispatch(
          setLockActionStatus(
            res === undefined
              ? LockActionStatus.REJECTED
              : LockActionStatus.INVALID
          )
        );
      });
  };
