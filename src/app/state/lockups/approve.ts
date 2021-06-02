import { Dispatch } from "redux";
import { getCoreContract, getIERC20Contract } from "../../ethereum/coreLB";
import {
  coreContractAddress,
  approveTokenMaximumValue,
} from "../../ethereum/index";
import { LockApproveState } from "../types";
import { getProvider } from "../walletConnect/helper";
import {
  toggleLockupApproved,
  setLockApproveStatus,
  toggleLockApproveLoading,
} from "./index";

export const getAllowance =
  (selectedToken: any, address: any, wallet: any) =>
  async (dispatch: Dispatch) => {
    const { currentProvider } = await getProvider(wallet);
    getIERC20Contract(selectedToken.id, currentProvider)
      .methods.allowance(address, coreContractAddress)
      .call((error: any, result: any) => {
        if (!error && result) {
          let allowance = result;
          console.log(allowance);
          if (allowance === "0") {
            dispatch(toggleLockupApproved(false));
          } else {
            dispatch(toggleLockupApproved(true));
          }
        } else {
          dispatch(toggleLockupApproved(false));
        }
      });
  };

export const handleApproval =
  (selectedToken: any, address: any, wallet: any) =>
  async (dispatch: Dispatch) => {
    const { currentProvider } = await getProvider(wallet);
    dispatch(toggleLockApproveLoading(true));
    dispatch(setLockApproveStatus(LockApproveState.LOADING));
    getIERC20Contract(selectedToken.id, currentProvider)
      .methods.approve(coreContractAddress, approveTokenMaximumValue)
      .send({
        from: address,
      })
      .on("receipt", (res: any) => {
        console.log("receipt", res);
        dispatch(toggleLockApproveLoading(false));

        dispatch(setLockApproveStatus(LockApproveState.SUCCESS));
        dispatch(toggleLockupApproved(true));
      })
      .on("transactionHash", (hash: any) => {
        console.log("transaction", hash);
        dispatch(setLockApproveStatus(LockApproveState.TRANS_RECEIVED));
      })
      .on("error", (err: any, res: any) => {
        console.log("approval_Err", err);
        dispatch(toggleLockApproveLoading(false));
        dispatch(
          setLockApproveStatus(
            res === undefined
              ? LockApproveState.REJECTED
              : LockApproveState.INVALID
          )
        );
      });
  };
