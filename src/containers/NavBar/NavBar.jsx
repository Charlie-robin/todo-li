import React, { useState } from "react";
import styles from "./NavBar.module.scss";

import { Link } from "@reach/router";

import TodoListInputs from "../../components/TodoListInputs";

const NavBar = props => {
  const { title, info, dateComplete, checkInput } = props;
  const [inputModalVisible, showInputModal] = useState(false);

  const insertModalJsx = inputModalVisible ? (
    <section
      className={styles.inputModal}
      onClick={() => showInputModal(!inputModalVisible)}
    >
      <div onClick={event => event.stopPropagation()}>
        <TodoListInputs
          title={value => title(value)}
          info={value => info(value)}
          dateComplete={value => dateComplete(value)}
          handleClick={checkInput}
          hideModal={() => showInputModal(false)}
        />
      </div>
    </section>
  ) : null;

  return (
    <>
      <navbar className={styles.navBar}>
        <div className={styles.navBarContainer}>
          <div>
            <h1>&lt;Todo&gt;&lt;Li&gt;</h1>
            <div>
              <p>
                Get it <span className={styles.changingWord}></span>
              </p>
            </div>
          </div>
          <Link to={"/completed"} className={styles.link}>
            <p>Calendar</p>
          </Link>
          <Link to={"/dashboard"} className={styles.link}>
            <p>List</p>
          </Link>
         
        </div>
      </navbar>
      <button
        className={styles.navBtn}
        onClick={() => showInputModal(!inputModalVisible)}
      >
        Create New Todo
      </button>
      {insertModalJsx}
    </>
  );
};

export default NavBar;
