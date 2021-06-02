import { LockApproveState, LockupState } from "../types";
import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: LockupState = {
  fetchedToken: [],
  selectedToken: "",
  isLockupApproved: false,
  isLockApproveLoading: false,
  lockApproveStatus: LockApproveState.NULL,
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
    toggleLockupApproved: (state, action) => {
      state.isLockupApproved = action.payload;
    },
    toggleLockApproveLoading: (state, action) => {
      state.isLockApproveLoading = action.payload;
    },
    setLockApproveStatus: (state, action) => {
      state.lockApproveStatus = action.payload;
    },
  },
});

export const {
  fetchTokenDetails,
  setselectedToken,
  toggleLockupApproved,
  toggleLockApproveLoading,
  setLockApproveStatus,
} = lockupSlice.actions;

export const fetchToken = (token: string) => async (dispatch: Dispatch) => {
  axios({
    method: "post",
    url: `https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2`,
    data: {
      query: `{
          token(id:"${token}"){
          id
          symbol
          name
          decimals
          derivedETH
          tradeVolume
          totalLiquidity
          tradeVolumeUSD
          untrackedVolumeUSD
          __typename
          txCount    
        }
}`,
    },
  })
    .then((res) => {
      console.log(res.data.token);
      dispatch(fetchTokenDetails(res.data.data.token));
    })
    .catch((e) => {
      dispatch(fetchTokenDetails([]));
    });
};

export default lockupSlice.reducer;
