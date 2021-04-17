import { HeaderListType, FieldListType } from './types';

export const HEADER_LIST: Array<HeaderListType> = [
    { id: 1, label: "explore", icon: "explore" },
    { id: 2, label: "about", icon: "about-mobile" },
    { id: 3, label: "lockups", icon: "lock" },
    { id: 4, label: "mint", icon: "trust-outline" },
];

export const NETWORK_LIST: Array<FieldListType> = [
    { id: 1, label: "Ethereum", logo: "ethereum", subText: "Choose if your coin is an ERC-20 Token" },
    { id: 2, label: "Binance Smart Chain", logo: "binance", subText: "Choose if your coin is built on BSC" },
    { id: 3, label: "Avalanche", logo: "avalanche", subText: "Choose if your coin is built on AVAX" }
];

export const TOKEN_LIST: Array<FieldListType> = [
    { id: 1, label: "Liquidity Tokens", logo: "liquidity", subText: "UNI-V2 LP Tokens generated from Uniswap Pool" },
    { id: 2, label: "Project Tokens", logo: "project", subText: "Regular ERC-20 Project Tokens" },
];