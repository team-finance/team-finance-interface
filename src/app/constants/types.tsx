export interface HeaderListType { id: number, label: string, icon: string };

export interface FieldListType { id: number, label: string, logo: string, subText: string };

export interface NetworkCardType {
    id: number,
    label: string,
    logo: string,
    subText: string,
    isSelected: boolean,
    icon: string
    onSelect: () => void,
};

export interface AuxCardType {
    children: React.ReactNode,
    className?: string,
    width?: number
};

export interface TokenCardType {
    selectedTokenId: number
};