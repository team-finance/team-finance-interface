import React, { useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { TokenSubCardType } from "../../../constants/types";

const SubCard = (props: TokenSubCardType) => {
  const { onSelect, tokenDetail } = props;
  useEffect(() => {
    console.log("token", tokenDetail);
  }, [tokenDetail]);
  return (
    <Card className="sub-card">
      <Col className="p-0">
        <Row className="m-0 h-50">
          <p className="token-status mb-0">Token Found</p>
        </Row>
        <Row className="m-0 h-50">
          <Col className="p-0 token-info">
            <img
              src={
                require("../../../../assets/images/uniswap_token.png").default
              }
              alt=""
              className="token-icon"
            />
            <span className="token-name">UNI</span>
          </Col>
          <Col className="p-0">
            <Button className="select-btn" onClick={onSelect}>
              Select
            </Button>
          </Col>
        </Row>
      </Col>
    </Card>
  );
};

export default SubCard;
