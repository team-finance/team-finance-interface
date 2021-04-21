import React, { useState, useEffect } from 'react';
import { AuxCard } from "../../../helpers/widgets";
import moment from 'moment-timezone';
import { Row, Col, Button } from "react-bootstrap";
import SubCard from './SubCard';
import { DAY_DROPDOWN_LIST } from '../../../constants';

const ConfigureCard = () => {
    const [amount, setAmount] = useState<number>(0);
    const [dateCount, setDateCount] = useState<number>(90);
    const [unit, setUnit] = useState<number>(1);
    const [date, setDate] = useState(moment(Date()));

    useEffect(() => {
        getCalculatedDate(unit);
    }, [unit, dateCount]);

    const getCalculatedDate = (id: number) => {
        const value = DAY_DROPDOWN_LIST[id];
        switch (value) {
            case "Days": {
                setDate(moment().add(dateCount, 'days'));
                break;
            }
            case "Months": {
                setDate(moment().add(dateCount, 'months'));
                break;
            }
            case "Timestamp": {
                console.log("timestamp")
                break;
            }
            default: break;
        };
    };

    return <AuxCard.Body className="configure-card">
        <Col className="p-0">
            <SubCard
                name="Lock Amount"
                subValue="Balance: 0.00"
                value={amount}
                token="UNI"
                isUnit={false}
                isMax={true}
                onChange={setAmount}
            />
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
            <div className="btn-container">
                <Button className="btn-approve">Approve Lock</Button>
                <Button className="btn-lock" disabled>Lock UNI</Button>
            </div>
            <div className="progress-bar-container">
                <div className="circle">
                    <p>1</p>
                </div>
                <div className="progress-bar"></div>
                <div className="circle second">
                    <p>2</p>
                </div>
            </div>
        </Col>
    </AuxCard.Body>
};

export default ConfigureCard;