import React, { useState } from "react";
import styles from "./NavBar.module.scss";
import TodoListInputs from "../../components/TodoListInputs";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const NavBar = props => {
  const { title, info, dateComplete, checkInput } = props;
  const [inputModalVisible, showInputModal] = useState(false);

  const insertModalJsx = inputModalVisible ?
  <section className={styles.inputModal} onClick={() => showInputModal(!inputModalVisible)}>
      <div onClick={event => event.stopPropagation()}>
        <TodoListInputs
          title={value => title(value)}
          info={value => info(value)}
          dateComplete={value => dateComplete(value)}
          handleClick={checkInput}
          hideModal={() => showInputModal(false)}
        />
      </div>
    </section>: null;
  
  return (
    <>
      <navbar className={styles.navBar}>
        <div>
          <h1>&lt;Todo&gt;&lt;Li&gt;</h1>
          <div>
            <p>Get it <span className={styles.changingWord}></span></p>
          </div>
        </div>
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
