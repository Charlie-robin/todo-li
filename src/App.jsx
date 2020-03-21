import React, { useState, useEffect } from "react";
import "./App.css";
import { firestore } from "./firebase.js";

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

  const deleteFromDb = (value) => {
    const newArray = [...todo];
    console.log(newArray);
    console.log(value);
    const showd = newArray.filter( obj => obj.title !== value);
    console.log(showd);

    // const newDoc = {
    //   items: newArray
    // };

    // firestore
    //   .collection("todo")
    //   .doc("test")
    //   .set(newDoc)
    //   .then(() => {
    //     fetchTodos();
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };

  

  const getDate = () => {
    const date = new Date();
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  };

  const addNewListDb = () => {
    const items = [
      {
        title: title,
        info: info,
        dateCreated: getDate(),
        dateCompleteBy: dateComplete
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
      <input
        type="text"
        placeholder="Title"
        onInput={event => addTitle(event.target.value)}
      />
      <input
        type="text"
        placeholder="Todo item..."
        onInput={event => addInfo(event.target.value)}
      />
      <input
        type="date"
        id="start"
        name="trip-start"
        min="2020-01-01"
        max="2021-12-31"
        onInput={event => addDateComplete(event.target.value)}
      ></input>
      <button onClick={addNewListDb}>Submit</button>
    </>
  );

  const insertTodoJsx = () => {
    return todo.map(todoItem => (
      <>
        <p>{todoItem.title}</p>
        <p>{todoItem.info}</p>
        <p>{todoItem.dateCreated}</p>
        <p>{todoItem.dateCompleteBy}</p>
        <button onClick={() => deleteFromDb(todoItem.title)}>Delete</button>
      </>
    ));
  };

  return (
    <>
      {insertTodoJsx()}
      {newListJsx()}
    </>
  );
}

export default App;
