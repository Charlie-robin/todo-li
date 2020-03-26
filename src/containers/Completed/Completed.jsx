import React from "react";
import styles from "./Completed.module.scss";
import { useEffect } from "react";

const Completed = props => {
  const { compList, getDate } = props;
  
  const getDaysInMonth = function(month, year) {
    return new Date(year, month, 0).getDate();
  };

  const curDays = getDaysInMonth(getDate().getMonth() + 1, getDate().getYear());
  const monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const curMonth = monthsArray[getDate().getMonth()];
  const calendarDates = [];
  
  compList.forEach(compList => { 
    
  });

  const calendarCreator = numdays => {
  for (let index = 1; index <= numdays; index++) {
    calendarDates.push(<p>{index}</p>)
  }
  }

  calendarCreator(curDays);
  
  
  return (
    <>
      <section className={styles.completed}>
        <h2>{curMonth}</h2>
        <div>
          {calendarDates}
        </div>
      </section>
    </>
  );
};

export default Completed;