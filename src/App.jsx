import React, { useState, useEffect } from "react";
import styles from "./App.module.scss";
import firebase, { provider, firestore } from "./firebase";

import Routes from "./containers/Routes";

function App() {
  const [user, setUser] = useState(null);

  const signInWithRedirect = () => {
    firebase.auth().signInWithRedirect(provider);
  };

  const getUser = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        alert("error");
        setUser(null);
      }
    });
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        setUser(null);
        alert("You have signed out!");
      })
      .catch(function(error) {
        alert("An error happened.");
      });
  };

  useEffect(() => {
    getUser();
  }, [user]);

  return (
    <>
      <Routes user={user} signOut={() => signOut()} signIn={() => signInWithRedirect()}/>
    </>
  );
}

export default App;


