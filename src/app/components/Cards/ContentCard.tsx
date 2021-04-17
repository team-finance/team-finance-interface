import React, { useState } from 'react';
import { AuxCard } from '../../helpers/widgets';
import { Row, Col, Button } from 'react-bootstrap';
import '../../../assets/scss/cards.scss';
import { NETWORK_LIST, TOKEN_LIST } from '../../constants';
import { FieldListType } from '../../constants/types';
import FieldCard from './FieldCard';

const ContentCard = () => {
    const [selectedNetworkId, setSelectedNetworkId] = useState<number>(1);
    const [selectedTokenId, setSelectedTokenId] = useState<number>(2);

    const [showTokens, setShowTokens] = useState<boolean>(false);

    const handleContinue = () => {
        if (!showTokens) setShowTokens(true);
    };

    return (
        <AuxCard className="content-card">
            <AuxCard.Header>
                {(showTokens && selectedNetworkId) &&
                    <span className="arrow">
                        <i className="fa fa-long-arrow-left" onClick={() => setShowTokens(false)} />
                    </span>}
                <img
                    src={require('../../../assets/images/lock.svg').default}
                    alt=""
                    className="lock-img" />
                <span className="heading">Create New Lock</span>
            </AuxCard.Header>
            <AuxCard.Body>
                <Col className="p-0">
                    <Row className="m-0 header-row">
                        <p className="mb-0">
                            <img
                                src={require('../../../assets/images/lock-tokens.png').default}
                                alt=""
                                className="lock-tokens-img"
                            />
                        </p>
                        <p className="sub-text">
                            {(showTokens && selectedNetworkId) ? `Select the type of token you would like to create a lock for
                             You can create multiple locks with different settings for each one.`
                                : "Choose the blockchain that your token you are locking is built on."}
                        </p>
                    </Row>
                    <Row className="m-0 mb-2">
                        {(showTokens && selectedNetworkId) ? TOKEN_LIST.map((token: FieldListType) => {
                            const icon = require(`../../../assets/images/token_${token.logo}_locked.png`).default;
                            const isSelected = selectedTokenId === token.id;
                            return <FieldCard
                                key={token.id}
                                {...token}
                                isSelected={isSelected}
                                icon={icon}
                                onSelect={() => setSelectedTokenId(token.id)}
                            />
                        }) : NETWORK_LIST.map((network: FieldListType) => {
                            const icon = require(`../../../assets/images/network_${network.logo}.png`).default;
                            const isSelected = selectedNetworkId === network.id;
                            return <FieldCard
                                key={network.id}
                                {...network}
                                isSelected={isSelected}
                                icon={icon}
                                onSelect={() => setSelectedNetworkId(network.id)}
                            />
                        })}
                    </Row>
                    <Row className="m-0">
                        <Button className="continue-btn" onClick={handleContinue}>Continue</Button>
                    </Row>
                </Col>
            </AuxCard.Body>
        </AuxCard>
    )
};

export default ContentCard;