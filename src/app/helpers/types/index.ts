export interface Wallet {
  id: number;
  name: string;
  icon: string;
}

export type ConnectWalletButtonProps = {
  theme: string;
  onClick: () => void;
  loading: boolean;
};

export type AddressTabProps = {
  theme: string;
  onClick: () => void;
  address: string;
};

export type AccountBalanceP = {
  accountBalance: string | number;
  tokenType: any;
  className?: string;
  theme: string;
};

export type ActiveNetworkP = {
  activeNetWork: string;
};

export type NetworkInfoTabProps = {
  onClick: () => void;
  theme: string;
  logo: string;
  label: string;
  className?: string;
};