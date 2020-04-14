import React from "react";
import styles from "./TodoListInputs.module.scss";

const TodoListInputs = props => {
  const { title, info, dateComplete, handleClick,  } = props;
  return (
    <>
      <section className={styles.todoListInputs} required>
        <div>
          <h2>New Todo</h2>
          <input
            type="text"
            placeholder="Enter Title..."
            onInput={event => title(event.target.value)}
            maxlength="30"
            required
          ></input>
        </div>
        <textarea
          type="text"
          placeholder="Add Info..."
          onInput={event => info(event.target.value)}
          maxlength="200"
          required
        ></textarea>
        <div>
          <p>Complete by</p>
          <input
            type="date"
            min="2020-01-01"
            max="2021-12-31"
            onInput={event => dateComplete(event.target.value)}
            required
          ></input>
        </div>
        <button onClick={() => {handleClick(); }}>Create</button>
      </section >
    </>
  );
};

export default TodoListInputs;
