import React from "react";
import styles from "./TodoListInputs.module.scss";

const TodoListInputs = (props) => {
  const { title, info, dateComplete, handleClick, hideModal } = props;

  return (
    <>
      <section className={styles.todoListInputs}>
        <div>
          <h2>New Todo</h2>
          <input
            type="text"
            placeholder="Enter Title..."
            onInput={(event) => title(event.target.value)}
            maxLength="30"
          ></input>
        </div>
        <textarea
          type="text"
          placeholder="Add Info..."
          onInput={(event) => info(event.target.value)}
          maxLength="200"
        ></textarea>
        <div>
          <p>Complete by</p>
          <input
            type="date"
            min="2020-01-01"
            max="2021-12-31"
            onInput={(event) => dateComplete(event.target.value)}
          ></input>
        </div>
        <button
          onClick={() => {
            handleClick();
          }}
        >
          Create
        </button>
      </section>
    </>
  );
};

export default TodoListInputs;
