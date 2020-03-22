import React from "react";
import styles from "./TodoList.module.scss";

const TodoList = props => {
  const { itemList, handleClick } = props;
  const dateDiff =
    parseInt(
      itemList.dateCompleteBy
        .split("-")
        .slice(0, 1)
        .join()
    ) -
    parseInt(
      itemList.dateCreated
        .split("-")
        .slice(0, 1)
        .join()
    );

  const listStyles = dateDiff > 2 ? null : dateDiff > 1 ? styles.amber : styles.red;

  return (
    <>
      <div className={`${styles.todoList} ${listStyles}`}>
        <h2>{itemList.title || "No title given"}</h2>
        <p>{itemList.info || "No info given"}</p>
        <div>
          <p>{itemList.dateCreated}</p>
          <p>{itemList.dateCompleteBy || "N/A"}</p>
        </div>
        <button onClick={handleClick}>Completed</button>
      </div>
    </>
  );
};

export default TodoList;
