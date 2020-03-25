import React from "react";
import styles from "./NavBar.module.scss";
import TodoListInputs from "../../components/TodoListInputs";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const NavBar = props => {
  const { title, info, dateComplete, checkState } = props;

  return (
    <>
      <navbar className={styles.navBar}>
        <div>
          <h1>&lt;Todo&gt;&lt;Li&gt;</h1>
          <div>
            <p>Get it down</p>
            <p>Get it done</p>
          </div>
        </div>
        <FontAwesomeIcon icon={faGoogle} />
      </navbar>

      <button>Create New todo</button>

      <TodoListInputs
        title={value => title(value)}
        info={value => info(value)}
        dateComplete={value => dateComplete(value)}
        handleClick={checkState}
      />
    </>
  );
};

export default NavBar;
