import React, { useState } from "react";
import styles from "./NavBar.module.scss";

import { Link } from "@reach/router";

import TodoListInputs from "../../components/TodoListInputs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faDoorOpen, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const NavBar = (props) => {
  const { title, info, dateComplete, checkInput, signOut } = props;

  const [inputModalVisible, showInputModal] = useState(false);
  const [pageBtnHighlight, toggleBtnHighLight] = useState("list");

  const listLinkHighlight = pageBtnHighlight === "list" ? "linkHighlight" : "";
  const calendarLinkHighLight =
    pageBtnHighlight === "calendar" ? "linkHighlight" : "";

  const insertModalJsx = inputModalVisible ? (
    <section
      className={styles.inputModal}
      onClick={() => showInputModal(!inputModalVisible)}
    >
      <div onClick={(event) => event.stopPropagation()}>
        <TodoListInputs
          title={(value) => title(value)}
          info={(value) => info(value)}
          dateComplete={(value) => dateComplete(value)}
          handleClick={() => checkInput()}
          hideModal={() => showInputModal(!inputModalVisible)}
        />
      </div>
    </section>
  ) : null;

  return (
    <>
      <nav className={styles.navBar}>
        <div className={styles.navBarContainer}>
          <FontAwesomeIcon icon={faInfoCircle} className={styles.icon} />
          <h1>
            &lt;Todo&gt;<span>&lt;Li&gt;</span>
          </h1>
          <FontAwesomeIcon
            icon={faDoorOpen}
            className={styles.icon}
            onClick={() => signOut()}
          />
        </div>
        <div className={styles.navBarSubContainer}>
          <button
            className={styles.navBtn}
            onClick={() => showInputModal(!inputModalVisible)}
          >
            Create <span>New Todo</span>
          </button>
          <Link
            to="/calendar"
            className={`${styles.link} ${styles[calendarLinkHighLight]}`}
            onClick={() => toggleBtnHighLight("calendar")}
          >
            <p>Calendar</p>{" "}
          </Link>

          <Link
            to="/dashboard"
            className={`${styles.link} ${styles[listLinkHighlight]}`}
            onClick={() => toggleBtnHighLight("list")}
          >
            <p>List</p>{" "}
          </Link>
        </div>
      </nav>
      {insertModalJsx}
    </>
  );
};

export default NavBar;
