import React from "react";
import styles from "./LandingPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
 

const LandingPage = () => {
  return (
    <>
      <section className={styles.landingPage}>
        <div>
          <h2>&lt;Todo&gt;&lt;Li&gt;</h2>
          <p>Calendar, Todo List</p>
          <p>Get it <span className={styles.changingWord}></span></p>
          <FontAwesomeIcon icon={faGoogle} className={styles.google}/>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
