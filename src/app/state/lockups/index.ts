import { LockupState } from "../types";
import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { getCoreContract, getIERC20Contract } from "../../ethereum/coreLB";
import { coreContractAddress } from "../../ethereum/index";
const initialState: LockupState = {
  fetchedToken: [],
  selectedToken: "",
};

export const lockupSlice = createSlice({
  name: "Lockup",
  initialState,
  reducers: {
    fetchTokenDetails: (state, action) => {
      state.fetchedToken = [action.payload];
    },
    setselectedToken: (state, action) => {
      state.selectedToken = action.payload;
    },
  },
});

export const { fetchTokenDetails, setselectedToken } = lockupSlice.actions;

export const getAllowance = (address: any, currentProvider: any) => {
  //   console.log(getCoreContract(coreContractAddress, currentProvider));
  getIERC20Contract(
    "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    currentProvider
  ).methods.allowance(address, coreContractAddress);
};

export const fetchToken = (token: string) => async (dispatch: Dispatch) => {
  axios
    .get(`https://api.ethplorer.io/getAddressInfo/${token}`, {
      params: {
        apiKey: process.env.REACT_APP_ETHPLORER_API_KEY,
        showETHTotals: "true",
      },
    })
    .then((res) => {
      console.log(res.data.tokenInfo);
      dispatch(fetchTokenDetails(res.data.tokenInfo));
    });
};

export default lockupSlice.reducer;
