import React, { useEffect, useState } from "react";
import { AuxCard } from "../../../helpers/widgets";
import { Row, Col } from "react-bootstrap";
import { TokenCardType } from "../../../constants/types";
import SubCard from "./SubCard";
import { fetchToken } from "app/state/lockups";
import { useAppDispatch } from "app/state";
import { useLockupState } from "app/state/hooks";
import { motion } from "framer-motion";

const TokenCard = (props: TokenCardType) => {
  const { selectedTokenId, onSelect } = props;
  const dispatch = useAppDispatch();
  const { fetchedToken } = useLockupState();
  const [fetchedList, setFetchedList] = useState([]);
  const [searchText, setSearchText] = useState<string>("");

  const handleSelect = () => {
    setSearchText("");
    onSelect();
  };

  const handleTokenChange = (e: any) => {
    setSearchText(e.target.value);
    dispatch(fetchToken(e.target.value.toLowerCase()));
  };

  useEffect(() => {
    console.log("tpkl", fetchedToken);
    setFetchedList(fetchedToken);
  }, [fetchedToken]);

  const tokenList = (fetchedList: any) => {
    console.log("List", fetchedList);
    if (fetchedList.length && fetchedList[0] !== null) {
      return fetchedList.map((token: any) => (
        <SubCard
          key={token.address}
          onSelect={handleSelect}
          tokenDetail={token}
        />
      ));
    } else {
      return <></>;
    }
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      // y: "20px",
      transition: {
        // delay: 0.5,
        duration: 0.5,
      },
    },
    //  exit: {
    //    x: "-100vw",
    //    transition: { ease: "easeInOut" },
    //  },
  };
  const imgVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      // y: "20px",
      transition: {
        delay: 0.2,
        duration: 0.5,
      },
    },
    //  exit: {
    //    x: "-100vw",
    //    transition: { ease: "easeInOut" },
    //  },
  };
  const pVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      // y: "20px",
      transition: {
        delay: 0.5,
        duration: 0.5,
      },
    },
    //  exit: {
    //    x: "-100vw",
    //    transition: { ease: "easeInOut" },
    //  },
  };
  const searchVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      // y: "20px",
      transition: {
        delay: 0.8,
        duration: 0.5,
      },
    },
    //  exit: {
    //    x: "-100vw",
    //    transition: { ease: "easeInOut" },
    //  },
  };
  const egVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      // y: "20px",
      transition: {
        delay: 1,
        duration: 0.5,
      },
    },
    //  exit: {
    //    x: "-100vw",
    //    transition: { ease: "easeInOut" },
    //  },
  };
  return (
    <AuxCard.Body className="token-card">
      <Col className="p-0">
        {!searchText && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Row className="m-0 header-row">
              <p className="mb-0">
                <motion.img
                  src={
                    require("../../../../assets/images/lock-tokens.png").default
                  }
                  alt=""
                  className="lock-tokens-img"
                  variants={imgVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                />
              </p>
              <motion.p
                className=" m-0 sub-text"
                variants={pVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {selectedTokenId === 2
                  ? "Enter the token address you would like to lock for"
                  : "Enter the uniswap pair address you would like to lock liquidity for"}
              </motion.p>
            </Row>
          </motion.div>
        )}
        <div>
          <Row className="m-0 mb-2">
            <div className={`input-search-container w-100`}>
              <motion.div
                className="input-with-icon"
                variants={searchVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.input
                  // whileFocus={{ scale: 1.05 }}
                  type="text"
                  placeholder={
                    selectedTokenId === 2 ? "Address" : "Uniswap pair address"
                  }
                  value={searchText}
                  onChange={handleTokenChange}
                />
                <i className="fa fa-search" aria-hidden="true" />
              </motion.div>
            </div>
            {!searchText && (
              <motion.p
                className="sub-text"
                variants={egVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                e.g. 0xb05AF453011d7ad68a92b0065FFD9d1277eD2741
              </motion.p>
            )}
            {searchText && tokenList(fetchedList)}
          </Row>
        </div>
      </Col>
    </AuxCard.Body>
  );
};

export default TokenCard;
