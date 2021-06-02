export enum LockApproveState {
  LOADING,
  NULL,
  TRANS_RECEIVED,
  REJECTED,
  SUCCESS,
  INVALID,
}

export enum LockActionStatus {
  LOADING,
  NULL,
  TRANS_RECEIVED,
  REJECTED,
  SUCCESS,
  INVALID,
}

export interface SettingsState {
  isDark: boolean;
}
export interface WalletState {
  isConnected: boolean;
  selectedChain: number;
  loading: boolean;
  walletError: string | null;
  accounts: string[];
  connectedWallet: any;
  currentProvider: any;
  provider: any;
  accountBalance: string;
  userTokenBalance: any;
}

export interface LockupState {
  fetchedToken: any[];
  selectedToken: any;
  isLockupApproved: boolean;
  isLockApproveLoading: boolean;
  lockApproveStatus: LockApproveState;
  lockActionStatus: LockActionStatus;
}

export interface State {
  settings: SettingsState;
  wallets: WalletState;
  lockups: LockupState;
}
