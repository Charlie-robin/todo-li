import React from "react";
import styles from "./Completed.module.scss";
import { useEffect } from "react";

const Completed = props => {
  const { compList, getDate } = props;

  const getDaysInMonth = function(month, year) {
    return new Date(year, month, 0).getDate();
  };

  const monthsArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const curDays = getDaysInMonth(getDate().getMonth() + 1, getDate().getYear());
  const curMonth = monthsArray[getDate().getMonth()];

  // const curMonthComp = compList.filter( compTodo => compTodo.dateCompletedStr === "27-03-2020")
  // console.log(curMonthComp)
  
  const calendarDates = {};
  const calendarJsx = [];

  const calendarDateMaker = numdays => {
    for (let index = 1; index <= numdays; index++) {
      calendarDates[index] = [index];
    }
  };

  calendarDateMaker(curDays);

  compList.forEach(compTodo => {
    const CompDate = compTodo.dateCompletedStr
      .split("-")
      .slice(0, 1)
      .join();
    calendarDates[CompDate].push(compTodo);
  });

  const calendarJsxMaker = numdays => {
    for (let index = 1; index <= numdays; index++) {
      if (calendarDates[index].length > 1) {
        const completedArr = calendarDates[index]
          .splice(1, calendarDates[index].length)
          .map(todoComp => <p className={styles.completedTitle}>{todoComp.title}</p>);
        calendarJsx.push(
          <div>
            <p>{calendarDates[index]}</p>
            {completedArr}
          </div>
        );
      } else {
        calendarJsx.push(<p>{calendarDates[index]}</p>);
      }
    }
  };

  calendarJsxMaker(curDays);

  return (
    <>
      <section className={styles.completed}>
        <h2>{curMonth}</h2>
        <div>{calendarJsx}</div>
      </section>
    </>
  );
};

export default Completed;
