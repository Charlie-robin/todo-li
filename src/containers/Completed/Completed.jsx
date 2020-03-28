import React from "react";
import styles from "./Completed.module.scss";
import { useEffect, useState } from "react";

const Completed = props => {
  const { compList, getDate } = props;
  const [month, changeMonth] = useState("");

  useEffect(() => {
    addMonthToState(curMonthNum)
  }, []);


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

  const getDaysInMonth = function(month, year) {
    return new Date(year, month, 0).getDate();
  };
  const curDays = getDaysInMonth(month+1, getDate().getYear());
  const curMonth = monthsArray[month];
  const curMonthNum = (getDate().getMonth());
  const addMonthToState = month => changeMonth(month);
  const matchCompletedMonth = (month, compArr) => {
    const monthToMatch = "0" + (month + 1);

  return compArr.filter(
    month =>
      month.dateCompletedStr
        .split("-")
        .slice(1, 2)
        .join() === monthToMatch
  );
  }

  const completedThisMonth = matchCompletedMonth(month, compList);

  const calendarDateMaker = numdays => {
    let calendarDatesObj = {};
    for (let index = 1; index <= numdays; index++) {
      const indexZero = index < 10 ? "0"+index : index;
      calendarDatesObj[indexZero] = [index];
    }
    return calendarDatesObj;
  };

  const calendarDates = calendarDateMaker(curDays);

  const addCompTodoToCalendar = compArr => {
    compArr.forEach(compTodo => {
      const CompDate = compTodo.dateCompletedStr
        .split("-")
        .slice(0, 1)
        .join();
      calendarDates[CompDate].push(compTodo);
    });
  };

  addCompTodoToCalendar(completedThisMonth);

  const calendarJsxMaker = (numdays, monthArr) => {
    const jsx = [];
    for (let index = 1; index <= numdays; index++) {
      const indexZero = index < 10 ? "0"+index : index;
      if (monthArr[indexZero].length > 1) {
        const completedArr = monthArr[indexZero]
          .splice(1, monthArr[indexZero].length)
          .map(todoComp => (
            <p className={styles.completedTitle}>{todoComp.title}</p>
          ));
        jsx.push(
          <div>
            <p>{monthArr[indexZero]}</p>
            {completedArr}
          </div>
        );
      } else {
        jsx.push(<p>{calendarDates[indexZero]}</p>);
      }
    }
    return jsx;
  };

  const calendarJsx = calendarJsxMaker(curDays, calendarDates);

  return (
    <>
      <section className={styles.completed}>
          <button onClick={() => changeMonth(month-1)}>&lt;
</button>
          <h2>{curMonth}</h2>
          <button onClick={() => changeMonth(month+1)}>&gt;</button>
        <div>{calendarJsx}</div>
      </section>
    </>
  );
};

export default Completed;
