import React, {useEffect} from "react";
import styles from "./LandingPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { navigate } from "@reach/router";
 

const LandingPage = ({signIn, user}) => {
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);
  return (
    <>
      <section className={styles.landingPage}>
        <div>
          <h2>&lt;Todo&gt;&lt;Li&gt;</h2>
          <div>
          <p>Get it <span className={styles.changingWord}></span></p>
          </div>
          <FontAwesomeIcon icon={faGoogle} className={styles.google} onClick={() => signIn()}/>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
