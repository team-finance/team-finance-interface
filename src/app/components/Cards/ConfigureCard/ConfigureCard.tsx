/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { AuxCard } from "../../../helpers/widgets";
import moment from "moment-timezone";
import { Row, Col, Button, Spinner, ProgressBar } from "react-bootstrap";
import SubCard from "./SubCard";
import { DAY_DROPDOWN_LIST } from "../../../constants";
import { useLockupState, useWalletState } from "app/state/hooks";
import { getAllowance, handleApproval } from "app/state/lockups/approve";
import { lockupHandling } from "app/state/lockups/lockup";
import { useAppDispatch } from "app/state";
import { getUserTokenBalance } from "app/state/walletConnect/helper";

const ConfigureCard = () => {
  const [amount, setAmount] = useState<number>(0);
  const [dateCount, setDateCount] = useState<number>(90);
  const [unit, setUnit] = useState<number>(1);
  const [date, setDate] = useState(moment(Date()));
  const { selectedToken, isLockupApproved, isLockApproveLoading } =
    useLockupState();
  const { wallets } = useWalletState();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (wallets.isConnected && wallets.accounts[0] && selectedToken) {
      dispatch(
        getUserTokenBalance(
          selectedToken,
          wallets.accounts[0],
          wallets.connectedWallet
        )
      );
      dispatch(
        getAllowance(
          selectedToken,
          wallets.accounts[0],
          wallets.connectedWallet
        )
      );
    }
  }, [wallets.connectedWallet, wallets.accounts[0], selectedToken]);
  useEffect(() => {
    getCalculatedDate(unit);
  }, [unit, dateCount]);
  useEffect(() => {
    console.log(selectedToken);
  }, [selectedToken]);
  const getCalculatedDate = (id: number) => {
    const value = DAY_DROPDOWN_LIST[id];
    switch (value) {
      case "Days": {
        setDate(moment().add(dateCount, "days"));
        break;
      }
      case "Months": {
        setDate(moment().add(dateCount, "months"));
        break;
      }
      case "Timestamp": {
        console.log("timestamp");
        break;
      }
      default:
        break;
    }
  };
  console.log(isLockApproveLoading);
  return (
    <AuxCard.Body className="configure-card">
      <Col className="p-0">
        {/* {lockups.fetchedToken.map((token: any) => { */}
        <SubCard
          name="Lock Amount"
          subValue={`Balance:${wallets.userTokenBalance || "0"} `}
          value={amount}
          token={selectedToken.symbol}
          isUnit={false}
          isMax={true}
          maxValue = {wallets.userTokenBalance}
          onChange={setAmount}
        />
        {/* })} */}
        <div className="lock-wrap">
          <img
            src={require("../../../../assets/images/lock.svg").default}
            alt=""
            className="lock-img mr-1"
          />
        </div>
        <SubCard
          name="Unlock Date"
          subValue={date.format(`MMMM D, YYYY`)}
          value={dateCount}
          isUnit={true}
          unit={unit}
          onChange={setDateCount}
          onSelect={setUnit}
        />
        <div className="card-details">
          <Row className="m-0 mb-1">
            <Col className="p-0 d-flex">
              <span className="tag">Service Fee</span>
              <i className="fa fa-question-circle-o" aria-hidden="true" />
            </Col>
            <Col className="p-0">
              <span className="fee">0% (No Fee)</span>
            </Col>
          </Row>
          <Row className="m-0 mb-1">
            <Col className="p-0">
              <span className="tag">Total Lockup Amount</span>
              <i className="fa fa-question-circle-o" aria-hidden="true" />
            </Col>
            <Col className="p-0">
              <span className="amount">{`${amount} UNI`}</span>
            </Col>
          </Row>
          <Row className="m-0 mb-1">
            <Col className="p-0">
              <span className="tag">Unlock Date</span>
              <i className="fa fa-question-circle-o" aria-hidden="true" />
            </Col>
            <Col className="p-0">
              <span className="date">07/19/2021 22:36 PM +05:30</span>
            </Col>
          </Row>
        </div>
        <div className="btn-container approve-btn">
          <Button
            className={!isLockupApproved ? "btn-approve" : "btn-lock"}
            disabled={isLockupApproved || isLockApproveLoading}
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
            onClick={() =>
              dispatch(
                handleApproval(
                  selectedToken,
                  wallets.accounts[0],
                  wallets.connectedWallet
                )
              )
            }
          >
            {!isLockApproveLoading ? (
              "Approve Lock"
            ) : (
              <>
                {" "}
                <span>Approving</span>{" "}
                <Spinner animation="border" role="status" />
              </>
            )}
          </Button>
          <Button
            className={isLockupApproved ? "btn-approve" : "btn-lock"}
            disabled={!isLockupApproved}
            onClick={() => {
              dispatch(
                lockupHandling(
                  wallets.accounts[0],
                  selectedToken,
                  "1",
                  "1622617505000",
                  wallets.connectedWallet
                )
              );
            }}
          >
            Lock UNI
          </Button>
        </div>
        <div className="progress-bar-container">
          <div className="circle">1</div>
          {/* <div className="progress-bar"></div> */}
          <div>
            <ProgressBar now={100} />
          </div>
          <div className="circle second">2</div>
        </div>
      </Col>
    </AuxCard.Body>
  );
};

export default ConfigureCard;
