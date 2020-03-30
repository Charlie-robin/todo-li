import React from "react";
import styles from "./CalendarItemTile.module.scss";

const CalendarItemTile = ({ number, items }) => {
  const insertJsx = items.map(item => <p className={styles.completedTitle}>{item}</p>)
  return (
    <>
      <div className={styles.itemTile}>
        <p>{number}</p>
        {insertJsx}
      </div>
    </>
  );
};

export default CalendarItemTile;
