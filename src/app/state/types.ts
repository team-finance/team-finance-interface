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
}

export interface State {
  settings: SettingsState;
  wallets: WalletState;
}
