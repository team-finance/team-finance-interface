import Web3 from "web3";
import { coreContractAddress } from ".";
import coreABI from "./build/coreABI.json";
import IERC20ABI from "./build/IERC20.json";
import BEP20ABI from "./build/IBEP20.json";
import { bscWeb3 } from "./bscWeb3";

const getContract = (abi: any, address: any, web3: any) => {
  return new web3.eth.Contract(abi, address);
};

export const getCoreContract = (web3: any) => {
  return getContract(coreABI, coreContractAddress, web3);
};

export const getIERC20Contract = (address: string, web3: any) => {
  return getContract(IERC20ABI.abi, address, web3);
};
