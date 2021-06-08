import React from "react";
import "../../../assets/scss/explore.scss";
import icon from "../../../assets/images/binance.png";

const ExploreCard = () => {
  return (
    <div className="explorecard-data">
      <img src={icon} className="explore-card-icon" alt="Avatar" />
      <div className="header-container">
        <h6 className="explorecard-value">value</h6>
        <h6 className="explorecard-value">value</h6>
      </div>
    </div>
  );
};

export default ExploreCard;