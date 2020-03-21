import React, { useState, useEffect } from "react";
import styles from "./App.module.scss";
import { firestore } from "./firebase.js";

import TodoList from "./components/TodoList";
import TodoListInputs from "./components/TodoListInputs";

function App() {
  const [todo, updateTodo] = useState([]);
  const [title, addTitle] = useState("");
  const [info, addInfo] = useState("");
  const [dateComplete, addDateComplete] = useState("");

  const getTodos = () => {
    firestore
      .collection("todo-list")
      .doc("user")
      .get()
      .then(doc => {
        const retirievedList = doc.data().items;
        updateTodo(retirievedList);
      });
  };

  useEffect(() => {
    getTodos();
  }, []);

  const deleteFromDb = value => {
    const newArray = [...todo];
    const newData = newArray.filter(obj => obj.id !== value);
    const newDoc = { items: newData };

    firestore
      .collection("todo-list")
      .doc("user")
      .set(newDoc)
      .then(() => {
        getTodos();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const randomId = () => Math.floor(Math.random() * Math.floor(999999));

  const getDate = () => {
    const date = new Date();
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  };

  const addNewListDb = () => {
    const items = [
      {
        id: randomId(),
        title: title,
        info: info,
        dateCreated: getDate(),
        dateCompleteBy: dateComplete
          .split("-")
          .reverse()
          .join("-")
      },
      ...todo
    ];

    firestore
      .collection("todo-list")
      .doc("user")
      .set({ items })
      .then(() => {
        getTodos();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const newListJsx = () => (
    <>
      <TodoListInputs
        title={value => addTitle(value)}
        info={value => addInfo(value)}
        dateComplete={value => addDateComplete(value)}
        handleClick={addNewListDb}
      />
    </>
  );

  const insertTodoListJsx = () => {
    return todo.map(todoItem => (
      <>
        <TodoList
          itemList={todoItem}
          handleClick={() => deleteFromDb(todoItem.id)}
        />
      </>
    ));
  };

  return (
    <>
      <section className={styles.container}>
        {newListJsx()}
        {insertTodoListJsx()}
      </section>
    </>
  );
}

export default App;
