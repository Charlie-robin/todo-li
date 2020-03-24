import React from "react";
import styles from "./DashBoard.module.scss";
import TodoList from "../../components/TodoList";

const DashBoard = props => {
  const { todos, getDate, delDb } = props;
  const insertTodoLists = () => {
    return todos.map(todoItem => (
      <>
        <TodoList
          itemList={todoItem}
          currentDate={getDate()}
          handleClick={() => delDb(todoItem.id)}
        />
      </>
    ));
  };

  return (
    <>
      <section className={styles.dashContainer}>{insertTodoLists()}</section>
    </>
  );
};

export default DashBoard;
