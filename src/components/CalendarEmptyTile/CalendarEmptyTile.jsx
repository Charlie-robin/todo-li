import React from "react";
import styles from "./CalendarEmptyTile.module.scss";

const CalendarEmptyTile = ({number}) => {
  return (
    <>
      <p className={styles.calendarTile}>{number}</p>
    </>
  );
};

export default CalendarEmptyTile;
