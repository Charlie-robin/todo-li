import React, { useEffect } from "react";
import { navigate } from "@reach/router";
import firebase from "../../firebase";

const PrivateRoutes = props => {
  const { children } = props;

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        navigate("/landing-page");
      }
    });
  });

  return <>{children}</>;
};

export default PrivateRoutes;
