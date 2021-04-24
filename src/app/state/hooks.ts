import { useSelector } from "react-redux";
import { State } from "./types";

export const useSettings = (): any => {
  const settings = useSelector((state: State) => state);
  return settings;
};

export const useWalletState = (): any => {
  const wallets = useSelector((state: State) => state);
  return wallets;
};
