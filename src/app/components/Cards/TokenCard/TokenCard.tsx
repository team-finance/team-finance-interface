import React, { useEffect, useState } from "react";
import { AuxCard } from "../../../helpers/widgets";
import { Row, Col } from "react-bootstrap";
import { TokenCardType } from "../../../constants/types";
import SubCard from "./SubCard";
import { fetchToken } from "app/state/lockups";
import { useAppDispatch } from "app/state";
import { useLockupState } from "app/state/hooks";

const TokenCard = (props: TokenCardType) => {
  const { selectedTokenId, onSelect } = props;
  const dispatch = useAppDispatch();
  const { lockups } = useLockupState();
  const [fetchedList, setFetchedList] = useState([]);
  const [searchText, setSearchText] = useState<string>("");

  const handleSelect = () => {
    setSearchText("");
    onSelect();
  };

  const handleTokenChange = (e: any) => {
    setSearchText(e.target.value);
    dispatch(fetchToken(e.target.value));
  };

  useEffect(() => {
    console.log("tpkl", lockups.fetchedToken);
    setFetchedList(lockups.fetchedToken);
  }, [lockups.fetchedToken]);

  const tokenList = (fetchedList: any) => {
    console.log("List", fetchedList);
    return fetchedList.map((token: any) => {
      <SubCard
        key={token.address}
        onSelect={handleSelect}
        tokenDetail={token}
      />;
    });
  };
  return (
    <AuxCard.Body className="token-card">
      <Col className="p-0">
        {!searchText && (
          <Row className="m-0 header-row">
            <p className="mb-0">
              <img
                src={
                  require("../../../../assets/images/lock-tokens.png").default
                }
                alt=""
                className="lock-tokens-img"
              />
            </p>
            <p className=" m-0 sub-text">
              {selectedTokenId === 2
                ? "Enter the token address you would like to lock for"
                : "Enter the uniswap pair address you would like to lock liquidity for"}
            </p>
          </Row>
        )}
        <Row className="m-0 mb-2">
          <div className={`input-search-container w-100`}>
            <div className="input-with-icon">
              <input
                type="text"
                placeholder={
                  selectedTokenId === 2 ? "Address" : "Uniswap pair address"
                }
                value={searchText}
                onChange={handleTokenChange}
              />
              <i className="fa fa-search" aria-hidden="true" />
            </div>
          </div>
          {!searchText && (
            <p className="sub-text">
              e.g. 0xb05AF453011d7ad68a92b0065FFD9d1277eD2741
            </p>
          )}
          {searchText && tokenList(fetchedList)}
        </Row>
      </Col>
    </AuxCard.Body>
  );
};

export default TokenCard;
