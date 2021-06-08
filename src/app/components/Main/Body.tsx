import React from "react";
import ContentCard from "../Cards/ContentCard";
import { Route, Redirect, Switch } from "react-router-dom";
import Explore from "../Explore";
const Body = () => {
  return (
    <div className="main-body" style={{ paddingTop: "1rem" }}>
      <Switch>
        <Route path="/lockups" exact component={ContentCard} />
        <Route path="/explore" exact component={Explore} />
        <Redirect exact from="/" to="/lockups" />
      </Switch>
    </div>
  );
};

export default Body;
