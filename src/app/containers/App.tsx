import React, { useEffect } from "react";
import { Layout } from "./Layout";
import dotEnv from "dotenv";
import "../../assets/scss/app.scss";
const App = () => {
  useEffect(() => {
    dotEnv.config();
  }, []);
  return <Layout />;
};

export default App;
