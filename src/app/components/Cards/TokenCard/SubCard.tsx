import { useAppDispatch } from "app/state";
import React, { useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { TokenSubCardType } from "../../../constants/types";
import { setselectedToken } from "app/state/lockups/index";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {
    opacity: 0,
    y: "-20px",
  },
  visible: {
    opacity: 1,
    y: "0px",
    // transition: {
    //   delay: 0.3,
    //   duration: 0.8,
    // },
    transition: { ease: "easeOut", duration: 0.5 },
  },
  // exit: {
  //   x: "-100vw",
  //   transition: { ease: "easeInOut" },
  // },
};

const SubCard = (props: TokenSubCardType) => {
  const { key, onSelect, tokenDetail } = props;
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("token", tokenDetail);
  }, [tokenDetail]);
  const onTokenSelect = () => {
    dispatch(setselectedToken(tokenDetail));
    onSelect();
  };
  return (
    <motion.div
      className="sub-card"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Col className="p-0">
        <Row className="m-0 h-50">
          <motion.p variants={containerVariants} className="token-status mb-0">
            Token Found
          </motion.p>
        </Row>
        <Row className="m-0 h-50">
          <Col className="p-0 token-info">
            <motion.img
              variants={containerVariants}
              src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${tokenDetail.address}/logo.png`}
              alt=""
              className="token-icon"
            />
            <motion.span variants={containerVariants} className="token-name">
              {tokenDetail.symbol}
            </motion.span>
          </Col>
          <Col className="p-0">
            <motion.div variants={containerVariants}>
              <Button className="select-btn" onClick={onTokenSelect}>
                Select
              </Button>
            </motion.div>
          </Col>
        </Row>
      </Col>
    </motion.div>
  );
};

export default SubCard;
