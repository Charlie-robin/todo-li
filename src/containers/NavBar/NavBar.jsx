import React, { useState } from "react";
import styles from "./NavBar.module.scss";

import { Link } from "@reach/router";

import TodoListInputs from "../../components/TodoListInputs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";


const NavBar = props => {
  const { title, info, dateComplete, checkInput, signOut } = props;
  const [inputModalVisible, showInputModal] = useState(false);
  const [listNav, toggleListNav] = useState(true);

  const navContent = listNav ? "Calendar" : "List";
  const navLink = listNav ? "/calendar" : "/dashboard";

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
          <Link to={navLink} className={styles.link} onClick={() => toggleListNav(!listNav)}>
            <p>{navContent}</p>
          </Link>
            <h1>&lt;Todo&gt;<span>&lt;Li&gt;</span></h1>
          <FontAwesomeIcon icon={faDoorOpen} className={styles.exit} onClick={() => signOut()}/>
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
