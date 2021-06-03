import React, { FC } from "react";
import { Row, Col, Button, Spinner } from "react-bootstrap";
import teamLogo from "assets/images/team-logo-white.png";
import { capitalize, shortenAddress } from "../../helpers/common";
import { HEADER_LIST, NETWORK_LIST } from "../../constants";
import { NavLink } from "react-router-dom";
import { useSettings, useWalletState } from "app/state/hooks";
import {
  AddressTabProps,
  ConnectWalletButtonProps,
  NetworkInfoTabProps,
} from "app/helpers/types";

const activeNetworkBaseCurrency = (selectedNetworkId: any) => {
  if (selectedNetworkId === 137 || selectedNetworkId === 80001) {
    return "MATIC";
  } else if (selectedNetworkId === 56 || selectedNetworkId === 97) {
    return "BNB";
  } else {
    return "ETH";
  }
};
interface Props {
  onConnect: () => void;
}

export const ConnectWalletButton = ({
  theme,
  onClick,
  loading,
}: ConnectWalletButtonProps) => {
  return (
    <button
      className={`d-flex btn ${theme && "btn-dark"} btn-custom-secondary`}
      onClick={onClick}
    >
      {!loading ? (
        <span>
          {/* <img
            src={require(`assets/images/wallet-${theme}.svg`).default}
            width="26"
            alt="Wallet"
            className="d-inline-block px-1"
          /> */}
          Connect wallet
        </span>
      ) : (
        // <div className="spinner-border" role="status">
        //   <span className="sr-only">Loading...</span>
        // </div>
        <Spinner
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      )}
    </button>
  );
};

export const NetworkInfoTab = ({
  theme,
  onClick,
  logo,
  label,
  className,
}: NetworkInfoTabProps) => {
  return (
    <button
      className={`d-flex btn ${
        theme === "dark" && "btn-dark"
      } btn-custom-secondary btn-round-switch  ${className ? className : ""}`}
      onClick={() => {
        onClick();
      }}
    >
      {/* <img
        src={require(`../../../../assets/${logo}.png`).default}
        alt={label}
      /> */}
      <span>{capitalize(label)}</span>
    </button>
  );
};

export const AddressTab = ({ theme, onClick, address }: AddressTabProps) => {
  return (
    <button
      className={`d-flex btn  btn-custom-secondary ${
        theme === "dark" && "btn-dark"
      }`}
      onClick={onClick}
    >
      {shortenAddress(address)}
    </button>
  );
};
interface AccountBalanceP {
  accountBalance: any;
  tokenType: any;
}
export const AccountBalance: FC<AccountBalanceP> = ({
  accountBalance,
  tokenType,
}) => {
  return (
    <div className={` btn-custom-secondary btn-round-switch acc-balance`}>
      <span className="mr-1">{accountBalance}</span>
      <span className="currency">{activeNetworkBaseCurrency(tokenType)}</span>
    </div>
  );
};

interface ActiveNetworkP {
  activeNetwork: any;
}

export const ActiveNetwork: FC<ActiveNetworkP> = ({ activeNetwork }) => {
  return (
    <div className={` btn-custom-secondary btn-round-switch acc-balance`}>
      <span className="mr-1">{activeNetwork}</span>
    </div>
  );
};

const Footer: FC<Props> = () => {
  const { wallets } = useWalletState();

  return (
    <Row className="main-footer m-0">
      <Col sm={6} md={6} lg={6}>
        <Row className="nav-options-footer">
          {HEADER_LIST.map((item) => {
            const icon =
              require(`../../../assets/images/header_${item.icon}.png`).default;
            return (
              <NavLink
                key={item.id}
                to={`${item.label}`}
                className="nav-li"
                activeClassName="nav-li-active"
              >
                <img src={icon} alt={capitalize(item.label)} />
                <span>{capitalize(item.label)}</span>
              </NavLink>
            );
          })}
        </Row>
      </Col>
    </Row>
  );
};

export default Footer;
