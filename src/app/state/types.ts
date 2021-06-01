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
}

export interface LockupState {
  fetchedToken: any[];
  selectedToken: any;
}

export interface State {
  settings: SettingsState;
  wallets: WalletState;
  lockups: LockupState;
}
