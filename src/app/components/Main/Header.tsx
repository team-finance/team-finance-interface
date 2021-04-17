import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import teamLogo from '../../../assets/images/team-logo-white.png';
import { capitalize } from '../../helpers/common';
import { HEADER_LIST } from '../../constants';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <Row className="main-header m-0">
            <Col className="team-logo" sm={3} md={3} lg={3}>
                <img src={teamLogo} alt="team-logo" />
            </Col>
            <Col sm={6} md={6} lg={6}>
                <Row className="nav-options">
                    {HEADER_LIST.map(item => {
                        const icon = require(`../../../assets/images/header_${item.icon}.png`).default;
                        return <NavLink key={item.id} to={`${item.label}`}
                            className="nav-li" activeClassName="nav-li-active">
                            <img src={icon} alt={capitalize(item.label)} />
                            <span>{capitalize(item.label)}</span>
                        </NavLink>
                    })}
                </Row>
            </Col>
            <Col className="btn-connect" sm={3} md={3} lg={3}>
                <Button >
                    Connect Wallet
                </Button>
            </Col>
        </Row>
    )
};

export default Header;