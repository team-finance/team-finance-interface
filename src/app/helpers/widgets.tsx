import { Card } from 'react-bootstrap';
import { AuxCardType } from '../constants/types';
import '../../assets/scss/widgets.scss';

export const AuxCard = (props: AuxCardType) => {
    const { children, className, width } = props;

    return (
        <Card
            className={`aux-card ${className ? className : ""}`}
            style={{ width: width ? width : 500 }}
        >
            {children}
        </Card>
    )
};

export const AuxCardHeader = (props: AuxCardType) => {
    const { children, className } = props;

    return (
        <Card.Header
            className={`aux-card-header ${className ? className : ""}`}
        >
            {children}
        </Card.Header>
    )
};

export const AuxCardBody = (props: AuxCardType) => {
    const { children, className } = props;

    return (
        <Card.Body
            className={`aux-card-body ${className ? className : ""}`}
        >
            {children}
        </Card.Body>
    )
};

export const AuxCardFooter = (props: AuxCardType) => {
    const { children, className } = props;

    return (
        <Card.Footer
            className={`aux-card-Footer ${className ? className : ""}`}
        >
            {children}
        </Card.Footer>
    )
};

AuxCard.Header = AuxCardHeader;
AuxCard.Body = AuxCardBody;
AuxCard.Footer = AuxCardFooter;