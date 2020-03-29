import React from "react";
import styles from "./Completed.module.scss";
import { useEffect, useState } from "react";

const Completed = props => {
  const { todo, compList, getDate } = props;
  const [month, changeMonth] = useState("");
  const [year, changeYear] = useState("");
  const [completed, toggleCompleted] = useState(false);

  useEffect(() => {
    addMonthToState(curMonthNum);
    addYearToState(curYear);
  }, []);

  const monthsByName = [
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

  const curYear = getDate().getFullYear();
  const curDays = getDaysInMonth(month + 1, year);
  const curMonthNum = getDate().getMonth();
  const curMonthName = monthsByName[month];

  const addMonthToState = month => changeMonth(month);
  const addYearToState = year => changeYear(year);

  const matchCompTodoYear = (year, todoList) => {
    return todoList.filter(
      todo =>
        parseInt(
          todo.dateCompletedStr
            .split("-")
            .slice(2, 3)
            .join()
        ) === year
    );
  };

  const matchTodoYear = (year, todoList) => {
    return todoList.filter(
      todo =>
        parseInt(
          todo.dateCompleteBy
            .split("-")
            .slice(2, 3)
            .join()
        ) === year
    );
  };

  const matchCompTodoMonth = (month, todoList) => {
    return todoList.filter(
      todo =>
        parseInt(
          todo.dateCompletedStr
            .split("-")
            .slice(1, 2)
            .join()
        ) ===
        month + 1
    );
  };

  const matchTodoMonth = (month, todoList) => {
    return todoList.filter(
      todo =>
        parseInt(
          todo.dateCompleteBy
            .split("-")
            .slice(1, 2)
            .join()
        ) ===
        month + 1
    );
  };

  let calendarDatesObj = {};

  const calendarDateMaker = numdays => {
    for (let index = 1; index <= numdays; index++) {
      const indexTwoDigit = index < 10 ? "0" + index : index;
      calendarDatesObj[indexTwoDigit] = [index];
    }
  };

  calendarDateMaker(curDays);

  const addCompTodoToCalendar = compArr => {
    compArr.forEach(compTodo => {
      const CompDate = compTodo.dateCompletedStr
        .split("-")
        .slice(0, 1)
        .join();
      calendarDatesObj[CompDate].push(compTodo);
    });
  };

  const addTodoToCalendar = compArr => {
    compArr.forEach(compTodo => {
      const CompDate = compTodo.dateCreatedStr
        .split("-")
        .slice(0, 1)
        .join();
      calendarDatesObj[CompDate].push(compTodo);
    });
  };

  const showCompleted = () => {
    const todoThisMonth = matchCompTodoMonth(
      month,
      matchCompTodoYear(year, compList)
    );
    addCompTodoToCalendar(todoThisMonth);
  };

  const showTodo = () => {
    const todoThisMonth = matchTodoMonth(month, matchTodoYear(year, todo));
    addTodoToCalendar(todoThisMonth);
  };

  completed ? showCompleted() : showTodo();

  const calendarJsxMaker = (numdays, monthArr) => {
    const jsx = [];
    for (let index = 1; index <= numdays; index++) {
      const indexTwoDigit = index < 10 ? "0" + index : index;
      if (monthArr[indexTwoDigit].length > 1) {
        const completedArr = monthArr[indexTwoDigit]
          .splice(1, monthArr[indexTwoDigit].length)
          .map(todoComp => (
            <p className={styles.completedTitle}>{todoComp.title}</p>
          ));
        jsx.push(
          <div>
            <p>{monthArr[indexTwoDigit]}</p>
            {completedArr}
          </div>
        );
      } else {
        jsx.push(<p>{calendarDatesObj[indexTwoDigit]}</p>);
      }
    }
    return jsx;
  };

  const calendarJsx = calendarJsxMaker(curDays, calendarDatesObj);

  const checkMonthUpdateYear = action => {
    if (month >= 11 && action === "plus") {
      changeMonth(0);
      changeYear(year + 1);
    } else if (month <= 0 && action === "minus") {
      changeYear(year - 1);
      changeMonth(11);
    }
  };

  const compStyles = completed ? styles.completedHighLight : null;
  const todoStyles = !completed ? styles.todoHighLight : null;

  return (
    <>
      <section className={styles.completed}>
        <div className={styles.calendarMonth}>
          <button
            onClick={() => {
              changeMonth(month - 1);
              checkMonthUpdateYear("minus");
            }}
          >
            &lt;
          </button>
          <h2>{curMonthName}</h2>
          <button
            onClick={() => {
              changeMonth(month + 1);
              checkMonthUpdateYear("plus");
            }}
          >
            &gt;
          </button>
        </div>
        <div className={styles.calendarYear}>
          <button className={compStyles} onClick={() => toggleCompleted(true)}>
            Completed
          </button>
          <p>{year}</p>
          <button className={todoStyles} onClick={() => toggleCompleted(false)}>
            Todo
          </button>
        </div>
        <div className={styles.calendarDates}>{calendarJsx}</div>
      </section>
    </>
  );
};

export default Completed;
