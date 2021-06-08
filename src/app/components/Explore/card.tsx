import React from "react";
import "../../../assets/scss/explore.scss";
import icon from "../../../assets/images/binance.png";

const ExploreCard = () => {
  return (
    <div className="explorecard-data">
      <img src={icon} className="explore-card-icon" alt="Avatar" />
      <div className="header-container">
        <div className="explorecard-main-value">$ 555,150,751.57</div>
        <div className="explorecard-sub-value">Total Locked Token Value</div>
      </div>
    </div>
  );
};

export default ExploreCard;
