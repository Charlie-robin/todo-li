import React, { useState } from "react";
import styles from "./NavBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
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
        <div>
          <h1>&lt;Todo&gt;&lt;Li&gt;</h1>
          <div>
            <p>
              Get it <span className={styles.changingWord}></span>
            </p>
          </div>
        </div>
        <Link to={"/completed"}>
          <p>Calendar</p>
        </Link>
        <Link to={"/dashboard"}>
          <p>List</p>
        </Link>
        <FontAwesomeIcon icon={faGoogle} />
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
