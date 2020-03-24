import React from "react";
import styles from "./TodoList.module.scss";

const TodoList = props => {
  const { itemList, handleClick, currentDate } = props;

  const dateDiff = () => {
    const msPerDay = 24 * 60 * 60 * 1000;
    const timeLeft =
      new Date(itemList.dateCompleteBy).getTime() - currentDate.getTime();
    return Math.floor(timeLeft / msPerDay);
  };

  console.log(dateDiff());

  const listStyles =
    dateDiff() > 3 ? null : dateDiff() > 1 ? styles.yellow : styles.red;

  return (
    <>
      <div className={`${styles.todoList} ${listStyles} ${styles.fadeIn}`}>
        <h2>{itemList.title || "No title given"}</h2>
        <p>{itemList.info || "No info given"}</p>
        <div>
          <p>
            Creation :{" "}
            {itemList.dateCreatedStr
              .split("-")
              .slice(0, 2)
              .join(" / ") || "N/A"}
          </p>
          <p>
            Completion :{" "}
            {itemList.dateCompleteBy
              .split("-")
              .reverse()
              .slice(0, 2)
              .join(" / ") || "N/A"}
          </p>
        </div>
        <button onClick={handleClick}>Complete</button>
      </div>
    </>
  );
};

export default TodoList;
