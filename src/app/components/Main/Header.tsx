import React, { FC } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
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

const Header: FC<Props> = ({ onConnect }) => {
  const { wallets } = useWalletState();
  const { settings } = useSettings();
  // const networkInfo = NETWORK_LIST.filter(
  //   (item) => item.id === wallets.selectedNetworkId
  // )[0];

  return (
    <Row className="main-header m-0">
      <Col className="team-logo" sm={4} md={4} lg={3}>
        <img src={teamLogo} alt="team-logo" />
      </Col>
      <Col sm={3} md={4} lg={6}>
        <Row className="nav-options">
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
      <Col className="btn-connect" sm={5} md={4} lg={3}>
        {(wallets.accounts && wallets.accounts.length) ||
        wallets.isConnected ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8%",
            }}
          >
            {wallets?.activeNetWork && (
              <ActiveNetwork activeNetwork={wallets.activeNetWork} />
            )}

            <div
              style={{
                display: "flex",
                backgroundColor: "",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "20px",
                color: "white",
                border: "0.0625rem solid #ffffff",
                padding: " 0 0.4rem",
              }}
            >
              <AccountBalance
                accountBalance={
                  wallets?.accountBalance && wallets.accountBalance
                }
                tokenType={wallets.networkId}
              />
            </div>
            <AddressTab
              theme={settings.isDark}
              onClick={() => {}}
              address={wallets.accounts[0]}
            />
          </div>
        ) : (
          <ConnectWalletButton
            theme={settings.isDark}
            onClick={() => {
              onConnect();
              // setWalletModalInfo(true)
            }}
            loading={wallets.loading}
          />
        )}
      </Col>
    </Row>
  );
};

export default Header;
