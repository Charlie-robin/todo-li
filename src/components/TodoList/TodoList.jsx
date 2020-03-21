import React from "react";
import styles from "./TodoList.module.scss";

const TodoList = props => {
  const { itemList, handleClick } = props;

  return (
    <>
      <div className={styles.todoList}>
        <h2>{itemList.title}</h2>
        <p>{itemList.info}</p>
        <p>{itemList.dateCreated}</p>
        <p>{itemList.dateCompleteBy}</p>
        <button onClick={handleClick}>Completed</button>
      </div>
    </>
  );
};

export default TodoList;
