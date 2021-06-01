import React, { Dispatch, SetStateAction } from "react";

export interface HeaderListType {
  id: number;
  label: string;
  icon: string;
}

export interface FieldListType {
  id: number;
  label: string;
  logo: string;
  subText: string;
}

export interface DayDropdownListType {
  id: number;
  label: string;
}

export interface NetworkCardType {
  id: number;
  label: string;
  logo: string;
  subText: string;
  isSelected: boolean;
  icon: string;
  onSelect: () => void;
}

export interface AuxCardType {
  children: React.ReactNode;
  className?: string;
  width?: number;
}

export interface TokenCardType {
  selectedTokenId: number;
  onSelect: () => void;
}

export interface SlideCardType {
  networkCard: boolean;
  tokenList: boolean;
  tokenCard: boolean;
  configureCard: boolean;
}

export interface TokenSubCardType {
  onSelect: () => void;
  tokenDetail: any;
}

export interface ConfigureSubCardType {
  name: string;
  value: number;
  subValue: string;
  onChange: Dispatch<SetStateAction<number>>;
  isUnit: boolean;
  isMax?: boolean;
  token?: string;
  unit?: number;
  onSelect?: Dispatch<SetStateAction<number>>;
}
