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
