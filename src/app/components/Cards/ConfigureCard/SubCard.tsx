import React, { useState, useEffect } from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import { ConfigureSubCardType } from "../../../constants/types";
import { DAY_DROPDOWN_LIST } from "../../../constants";
import { setAccountBalance } from "app/state/walletConnect";
import {  useWalletState } from "app/state/hooks";
const SubCard = (props: ConfigureSubCardType) => {
  const {
    name,
    value,
    subValue,
    onChange,
    isUnit,
    isMax,
    token,
    unit,
    onSelect,
  } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { wallets } = useWalletState();

  const handleSelect = (id: number) => {
    onSelect && onSelect(id);
    setIsOpen(false);
  };

  const handleMax = () => {
  // setAmount(wallets.userTokenBalance);
  onChange(wallets.userTokenBalance);
  };

  return (
    <Card className="sub-card">
      <Col className="p-0">
        <Row className="m-0 h-50 row-wrap">
          <Col className="p-0 name-wrap">{name}</Col>
          <Col className="p-0 sub-value-wrap">
            <span className="sub-value">{subValue}</span>
          </Col>
        </Row>
        <Row className="m-0 h-50 row-wrap">
          <Col className="p-0 value-wrap" sm={6} md={6} lg={6}>
            <input
              type="number"
              value={value }
              className="form-control field-input"
              placeholder="0"
              onChange={(e) => onChange(parseInt(e.target.value))}
            />
          </Col>
          {isMax && (
            <Col className="p-0 max-wrap" sm={2} md={2} lg={2}>
              <Button 
              // onClick={() => handleMax()}
              onClick={handleMax} 
              className="max-btn">Max</Button>
            </Col>
          )}
          <Col className="unit-wrap">
            {isUnit && unit ? (
              <div className="drop-down-btn">
                <span className="title" onClick={() => setIsOpen(!isOpen)}>
                  {DAY_DROPDOWN_LIST[unit]}
                  <span className="down-arrow ml-2">
                    <i className="fa fa-chevron-down" />
                  </span>
                </span>
                {isOpen && (
                  <div className="drop-down-menu">
                    {Object.keys(DAY_DROPDOWN_LIST).map((id) => {
                      const isSelected = parseInt(id) === unit;
                      return (
                        <div
                          key={id}
                          className={`drop-down-item ${
                            isSelected && "selected"
                          }`}
                          onClick={() => handleSelect(parseInt(id))}
                        >
                          {DAY_DROPDOWN_LIST[parseInt(id)]}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              <span className="unit">
                <img
                  src={`data:image/jpeg;base64,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`}
                  alt="logo"
                  className="token-icon"
                  style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "10px",
                  }}
                />
                {token}
              </span>
            )}
          </Col>
        </Row>
      </Col>
    </Card>
  );
};

export default SubCard;
