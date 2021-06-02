import React, { FC } from "react";
import { Row, Col, Button, Spinner } from "react-bootstrap";
import teamLogo from "assets/images/team-logo-white.png";
import { capitalize, shortenAddress } from "../../helpers/common";
import { HEADER_LIST } from "../../constants";
import { NavLink } from "react-router-dom";
import { useSettings, useWalletState } from "app/state/hooks";
import {
  AddressTabProps,
  ConnectWalletButtonProps,
  AccountBalanceProps,
} from "app/helpers/types";
const activeNetworkBaseCurrency = (selectedNetworkId: any) => {
  if (selectedNetworkId === 1) {
    return "ETH";
  } else if (selectedNetworkId === 2) {
    return "BNB";
  } else if (selectedNetworkId === 3) {
    return "MATIC";
  }
};
// import settings from "app/state/settings";
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
  bal: any;
}
export const AccountBalance: FC<AccountBalanceP> = ({ bal }) => {
  return (
    <div className={` btn-custom-secondary btn-round-switch acc-balance`}>
      <span className="mr-1">{bal}</span>
      {/* <span className="currency">{activeNetworkBaseCurrency(tokenType)}</span> */}
    </div>
  );
};

const Header: FC<Props> = ({ onConnect }) => {
  const { wallets } = useWalletState();
  const { settings } = useSettings();

  return (
    <Row className="main-header m-0">
      <Col className="team-logo" sm={3} md={3} lg={3}>
        <img src={teamLogo} alt="team-logo" />
      </Col>
      <Col sm={6} md={6} lg={6}>
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
      <Col className="btn-connect" sm={3} md={3} lg={3}>
        {/* <Button onClick={onConnect}>Connect Wallet</Button> */}
        {(wallets.accounts && wallets.accounts.length) ||
        wallets.isConnected ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8%",
            }}
          >
            {wallets?.accountBalance && (
              <div
                style={{
                  display: "flex",
                  backgroundColor: "",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "20px",
                  color: "white",
                  border: "0.0625rem solid #ffffff",
                }}
              >
                <AccountBalance bal={wallets.accountBalance} />
              </div>
            )}
            <AddressTab
              theme={settings.isDark}
              onClick={
                () => {}
                // setWalletStatusInfo({
                //   show: true,
                //   address: accounts[0],
                // })
              }
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
