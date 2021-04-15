import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import teamLogo from '../../../assets/images/team-logo-white.png';
import { capitalize } from '../../helpers';

const HEADER_LIST: Array<{ id: number, label: string, icon: string }> = [
    { id: 1, label: "explore", icon: "explore" },
    { id: 2, label: "about", icon: "about-mobile" },
    { id: 3, label: "lockups", icon: "lock" },
    { id: 4, label: "mint", icon: "trust-outline" },
];

const Layout = () => {
    return (
        <div className="main-layout">
            <Row className="main-header m-0">
                <Col className="team-logo" sm={3} md={3} lg={3}>
                    <img src={teamLogo} alt="team-logo" />
                </Col>
                <Col sm={6} md={6} lg={6}>
                    <Row className="nav-options">
                        {HEADER_LIST.map(item => {
                            const icon = require(`../../../assets/images/header_${item.icon}.png`).default;
                            return <div key={item.id} className="nav-li">
                                <img src={icon} alt={capitalize(item.label)} />
                                <span>{capitalize(item.label)}</span>
                            </div>
                        })}
                    </Row>
                </Col>
                <Col className="btn-connect" sm={3} md={3} lg={3}>
                    <Button >
                        Connect Wallet
                </Button>
                </Col>
            </Row>
        </div>
    )
}

export default Layout;