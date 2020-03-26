import React from "react";
import styles from "./Routes.module.scss";
import { Router, Redirect } from "@reach/router";

import Dashboard from "../DashBoard";
import Completed from "../Completed";

const NotFound = () => <p>Not Found!!!</p>;

const Routes = props => {
  const { todo, getDate, delDb } = props;
  return (
    <>
        <Router>
          <Dashboard
            todo={todo}
            getDate={() => getDate()}
            delDb={value => delDb(value)}
            path="/dashboard"
          />
          <Completed path="completed"/>
          
        </Router>
    </>
  );
};

export default Routes;
