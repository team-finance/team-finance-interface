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
import TransactionPopup from "app/components/TransactionLoader";
import { LockActionStatus, LockApproveState } from "app/state/types";
import { web3Service } from "app/utils/web3Service";

const ConfigureCard = () => {
  const [amount, setAmount] = useState<number>(0);
  const setTokenAddress = useState<any>()[1];

  const [dateCount, setDateCount] = useState<number>(90);
  const [unit, setUnit] = useState<number>(1);
  const [date, setDate] = useState(moment(Date()));
  const [transShow, setTransShow] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    selectedToken,
    lockApproveStatus,
    isLockupApproved,
    isLockApproveLoading,
    lockActionStatus,
  } = useLockupState();
  const { wallets } = useWalletState();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (selectedToken.id) {
      console.log(selectedToken.id);
      let address = web3Service.getChecksumAddress(selectedToken.id);
      setTokenAddress(address);
    }
  }, [selectedToken.id]);
  useEffect(() => {
    if (isLockupApproved) {
      setProgress(100);
    } else {
      switch (lockApproveStatus) {
        case LockApproveState.LOADING:
          setProgress(25);
          break;
        case LockApproveState.TRANS_RECEIVED:
          setProgress(75);
          break;
        case LockApproveState.SUCCESS:
          setProgress(100);
          break;
        default:
          setProgress(0);
      }
    }
  }, [lockApproveStatus, isLockupApproved]);
  useEffect(() => {
    if (wallets.isConnected && wallets.accounts[0]) {
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
    if (
      lockActionStatus !== 2 &&
      lockActionStatus !== 3 &&
      lockActionStatus !== 5
    )
      setLoading(false);
  }, [lockActionStatus]);

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
        let _d = new Date(date.toDate()).getTime();
        console.log(_d);
        // setDate();
        break;
      }
      default:
        break;
    }
  };
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
          onChange={(balance) => setAmount(balance)}
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
          <Row>
            <Col
              xs={12}
              sm={6}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                className={!isLockupApproved ? "btn-approve" : "btn-lock"}
                disabled={isLockupApproved || isLockApproveLoading}
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  marginTop: "10px",
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
            </Col>
            <Col
              xs={12}
              sm={6}
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <Button
                className={isLockupApproved ? "btn-approve" : "btn-lock"}
                disabled={!isLockupApproved}
                onClick={() => {
                  let _d = new Date(date.toDate()).getTime();
                  setTransShow(true);
                  setLoading(true);
                  dispatch(
                    lockupHandling(
                      wallets.accounts[0],
                      selectedToken,
                      amount,
                      _d,
                      wallets.connectedWallet
                    )
                  );
                }}
              >
                {!loading ? (
                  `Lock ${selectedToken.symbol}`
                ) : (
                  <>
                    {" "}
                    <Spinner animation="border" role="status" />
                  </>
                )}
              </Button>
            </Col>
          </Row>
        </div>
        <div className="progress-bar-container">
          <div className="circle">1</div>
          <div className="progress-bar">
            <ProgressBar now={progress} />
          </div>
          <div className={`circle ${!isLockupApproved && " inactive"}`}>2</div>
        </div>
      </Col>
      <Col>
        {transShow && (
          <TransactionPopup
            handleClose={() => {
              setTransShow(false);
            }}
            mode={
              lockActionStatus === LockActionStatus.TRANS_RECEIVED
                ? "success"
                : lockActionStatus === LockActionStatus.REJECTED
                ? "failure"
                : "loading"
            }
          />
        )}
      </Col>
    </AuxCard.Body>
  );
};

export default ConfigureCard;
