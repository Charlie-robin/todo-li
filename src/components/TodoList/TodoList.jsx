import React from "react";
import styles from "./TodoList.module.scss";

const TodoList = props => {
  const { itemList, currentDate, delDb, addCompleted } = props;

  const dateDiff = () => {
    const msPerDay = 24 * 60 * 60 * 1000;
    const timeLeft =
      new Date(itemList.dateCompleteBy.split("-").reverse()).getTime() - currentDate.getTime();
    return Math.ceil(timeLeft / msPerDay);
  };

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
            {`${itemList.dateCreatedStr
              .split("-")
              .slice(0, 1)
              .join(" / ")} / ${
              itemList.dateCreatedStr.split("-").slice(1, 2) < 10
                ? "0" + itemList.dateCreatedStr.split("-").slice(1, 2)
                : itemList.dateCreatedStr.split("-").slice(1, 2)
            }`}
          </p>
          <p>
            Completion :{" "}
            {itemList.dateCompleteBy
              .split("-")
              .slice(0, 2)
              .join(" / ") || "N/A"}
          </p>
        </div>
        <div>
          <button onClick={addCompleted}>Complete</button>
          <button onClick={delDb}>Delete</button>
        </div>
      </div>
    </>
  );
};

export default TodoList;
