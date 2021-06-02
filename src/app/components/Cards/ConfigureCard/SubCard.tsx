import React, { useState, useEffect } from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import { ConfigureSubCardType } from "../../../constants/types";
import { DAY_DROPDOWN_LIST } from "../../../constants";
import { useLockupState } from "app/state/hooks";
import { web3Service } from "app/utils/web3Service";

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
  const [tokenAddress, setTokenAddress] = useState<any>();
  const { selectedToken } = useLockupState();
  useEffect(() => {
    if (selectedToken?.id) {
      console.log(selectedToken.id);
      let address = web3Service.getChecksumAddress(selectedToken.id);
      setTokenAddress(address);
    }
  }, [selectedToken.id]);
  const handleSelect = (id: number) => {
    onSelect && onSelect(id);
    setIsOpen(false);
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
              value={value}
              className="form-control field-input"
              placeholder="0"
              onChange={(e) => onChange(parseInt(e.target.value))}
            />
          </Col>
          {isMax && (
            <Col className="p-0 max-wrap" sm={2} md={2} lg={2}>
              <Button className="max-btn">Max</Button>
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
                  src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${tokenAddress}/logo.png`}
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
