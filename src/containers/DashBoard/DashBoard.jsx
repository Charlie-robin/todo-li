import React from "react";
import styles from "./DashBoard.module.scss";
import TodoList from "../../components/TodoList";

const DashBoard = props => {
  const { todo, getDate, delDb, addCompleted } = props;
  const insertTodoLists = () => {
    return todo.map(todoItem => (
      <>
        <TodoList
          itemList={todoItem}
          currentDate={getDate()}
          delDb={() => delDb(todoItem.id)}
          addCompleted={() => addCompleted(todoItem.id) }
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
