import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { NetworkCardType } from '../../constants/types';

const FieldCard = (props: NetworkCardType) => {
    const { logo, label, subText, onSelect, isSelected, icon } = props;

    return <Card className={`network-card ${isSelected && "selected"}`} onClick={onSelect}>
        <Row className="card-content">
            <Col className="network-logo p-0" sm={2} md={2} lg={2}>
                <img src={icon} alt={logo} />
            </Col>
            <Col className="p-0">
                <p className="network-name mb-0">{label}</p>
                <p className="network-sub-text mb-0">{subText}</p>
            </Col>
            <Col className="p-0" sm={2} md={2} lg={2}>
                <div className={`select-icon ${isSelected && "selected"}`} />
            </Col>
        </Row>
    </Card>
}

export default FieldCard;