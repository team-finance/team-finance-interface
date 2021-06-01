import { useAppDispatch } from "app/state";
import React, { useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { TokenSubCardType } from "../../../constants/types";
import { setselectedToken } from "app/state/lockups/index";
const SubCard = (props: TokenSubCardType) => {
  const { key, onSelect, tokenDetail } = props;
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("token", tokenDetail);
  }, [tokenDetail]);
  const onTokenSelect = () => {
    dispatch(setselectedToken(tokenDetail));
    onSelect();
  };
  return (
    <Card className="sub-card">
      <Col className="p-0">
        <Row className="m-0 h-50">
          <p className="token-status mb-0">Token Found</p>
        </Row>
        <Row className="m-0 h-50">
          <Col className="p-0 token-info">
            <img
              src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${tokenDetail.address}/logo.png`}
              alt=""
              className="token-icon"
            />
            <span className="token-name">{tokenDetail.symbol}</span>
          </Col>
          <Col className="p-0">
            <Button className="select-btn" onClick={onTokenSelect}>
              Select
            </Button>
          </Col>
        </Row>
      </Col>
    </Card>
  );
};

export default SubCard;
