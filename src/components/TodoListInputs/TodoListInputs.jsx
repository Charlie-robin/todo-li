import React from "react";
import styles from "./TodoListInputs.module.scss";

const TodoListInputs = props => {
  const { title, info, dateComplete, handleClick } = props;
  return (
    <>
      <div className={styles.todoListInputs}>
        <input
          type="text"
          placeholder="Title"
          onInput={event => title(event.target.value)}
        ></input>
        <textarea
          type="text"
          placeholder="Todo Info..."
          onInput={event => info(event.target.value)}
        ></textarea>
        <div>
          <p>Complete by</p>
          <input
            type="date"
            min="2020-01-01"
            max="2021-12-31"
            onInput={event => dateComplete(event.target.value)}
          ></input>
        </div>
        <button onClick={handleClick}>Submit</button>
      </div>
    </>
  );
};

export default TodoListInputs;
