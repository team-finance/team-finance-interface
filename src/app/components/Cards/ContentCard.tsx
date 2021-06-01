import React, { useEffect, useState } from "react";
import { AuxCard } from "../../helpers/widgets";
import { Row, Col, Button } from "react-bootstrap";
import "../../../assets/scss/cards.scss";
import { NETWORK_LIST, TOKEN_LIST } from "../../constants";
import { FieldListType, SlideCardType } from "../../constants/types";
import FieldCard from "./FieldCard";
import { useAppDispatch } from "../../state";
import { setThemeHandler } from "../../state/settings";
import { useSettings, useWalletState } from "../../state/hooks";
import TokenCard from "./TokenCard/TokenCard";
import ConfigureCard from "./ConfigureCard/ConfigureCard";
import { setChain } from "../../state/walletConnect";

const ContentCard = () => {
  const [selectedNetworkId, setSelectedNetworkId] = useState<number>(1);
  const [selectedTokenId, setSelectedTokenId] = useState<number>(2);
  const [slideCard, setSlideCard] = useState<SlideCardType>({
    networkCard: true,
    tokenList: false,
    tokenCard: false,
    configureCard: false,
  });

  const dispatch = useAppDispatch();
  const { settings } = useSettings();
  const { wallets } = useWalletState();
  useEffect(() => {
    console.log(settings, wallets);
  }, [settings, wallets]);

  const handleContinue = () => {
    const { networkCard, tokenList, tokenCard } = slideCard;

    if (!tokenList && !tokenCard && selectedNetworkId)
      setSlideCard({ ...slideCard, networkCard: false, tokenList: true });
    else if (!networkCard && tokenList && selectedTokenId)
      setSlideCard({ ...slideCard, tokenList: false, tokenCard: true });

    dispatch(setThemeHandler());
  };

  const handleBackArrow = () => {
    const { networkCard, tokenList, tokenCard, configureCard } = slideCard;

    if (!networkCard && tokenList && !tokenCard && !configureCard)
      setSlideCard({ ...slideCard, networkCard: true, tokenList: false });
    else if (!networkCard && !tokenList && tokenCard && !configureCard)
      setSlideCard({ ...slideCard, tokenList: true, tokenCard: false });
    else if (!networkCard && !tokenList && !tokenCard && configureCard)
      setSlideCard({ ...slideCard, tokenCard: true, configureCard: false });
  };

  const handleSelect = () => {
    setSlideCard({ ...slideCard, tokenCard: false, configureCard: true });
  };

  return (
    <AuxCard className="content-card">
      <AuxCard.Header>
        {!slideCard.networkCard && (
          <span className="arrow">
            <i className="fa fa-long-arrow-left" onClick={handleBackArrow} />
          </span>
        )}
        <img
          src={require("../../../assets/images/lock.svg").default}
          alt=""
          className="lock-img mr-1"
        />
        <span className="heading">
          {!slideCard.configureCard ? "Create New Lock" : "Configure Lock"}
        </span>
      </AuxCard.Header>
      {!slideCard.networkCard &&
      !slideCard.tokenList &&
      selectedTokenId &&
      !slideCard.configureCard ? (
        <TokenCard selectedTokenId={selectedTokenId} onSelect={handleSelect} />
      ) : slideCard.configureCard ? (
        <ConfigureCard />
      ) : (
        <>
          <AuxCard.Body>
            <Col className="p-0">
              <Row className="m-0 header-row">
                <p className="mb-0">
                  <img
                    src={
                      require("../../../assets/images/lock-tokens.png").default
                    }
                    alt=""
                    className="lock-tokens-img"
                  />
                </p>
                <p className="sub-text">
                  {slideCard.tokenList && selectedNetworkId
                    ? `Select the type of token you would like to create a lock for
                             You can create multiple locks with different settings for each one.`
                    : "Choose the blockchain that your token you are locking is built on."}
                </p>
              </Row>
              <Row className="m-0 mb-2">
                {slideCard.tokenList && selectedNetworkId
                  ? TOKEN_LIST.map((token: FieldListType) => {
                      const icon =
                        require(`../../../assets/images/token_${token.logo}_locked.png`).default;
                      const isSelected = selectedTokenId === token.id;
                      return (
                        <FieldCard
                          key={token.id}
                          {...token}
                          isSelected={isSelected}
                          icon={icon}
                          onSelect={() => setSelectedTokenId(token.id)}
                        />
                      );
                    })
                  : NETWORK_LIST.map((network: FieldListType) => {
                      const icon =
                        require(`../../../assets/images/network_${network.logo}.png`).default;
                      const isSelected = wallets.selectedChain === network.id;
                      return (
                        <FieldCard
                          key={network.id}
                          {...network}
                          isSelected={isSelected}
                          icon={icon}
                          onSelect={() => dispatch(setChain(network.id))}
                        />
                      );
                    })}
              </Row>
            </Col>
          </AuxCard.Body>
          <AuxCard.Footer>
            <Button className="continue-btn" onClick={handleContinue}>
              Continue
            </Button>
          </AuxCard.Footer>
        </>
      )}
    </AuxCard>
  );
};

export default ContentCard;
