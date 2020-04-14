import React, { useEffect, useState } from "react";
import { Router, Redirect } from "@reach/router";
import { firestore } from "../../firebase";

import PrivateRoutes from "../PrivateRoutes";
import NavBar from "../NavBar";
import Dashboard from "../DashBoard";
import Calendar from "../Calendar";
import LandingPage from "../LandingPage/LandingPage";

const Routes = ({ user, signIn, signOut }) => {
  const [completedList, updateCompleted] = useState([]);
  const [todo, updateTodo] = useState([]);
  const [title, addTitle] = useState("");
  const [info, addInfo] = useState("");
  const [dateComplete, addDateComplete] = useState("");



  const getAllTodos = () => {
    firestore
      .collection("todo-list")
      .doc(user.uid)
      .get()
      .then(doc => {
        const retirievedArray = doc.data();
        if (retirievedArray) {
          updateTodo(retirievedArray.items);
          updateCompleted(retirievedArray.completed);
        }
      });
  };

  useEffect(() => {
    if (user) {
      getAllTodos();
    }
  }, [user]);

  const deleteFromDb = value => {
    const newArray = [...todo];
    const newData = newArray.filter(obj => obj.id !== value);
    const newDoc = { items: newData, completed: completedList };

    firestore
      .collection("todo-list")
      .doc(user.uid)
      .set(newDoc)
      .then(() => {
        getAllTodos();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const randomId = () => Math.floor(Math.random() * Math.floor(999999));

  const getDate = () => new Date();

  const getDateString = () => {
    const date = new Date();
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const addNewListDb = () => {
    const newItems = [
      {
        id: randomId(),
        title: title,
        info: info,
        dateCreated: getDate(),
        dateCreatedStr: getDateString(),
        dateCompleteBy: dateComplete.split("-").reverse().join("-")
      },
      ...todo
    ];
    
    const newDoc = { items: newItems, completed: completedList };

    firestore
      .collection("todo-list")
      .doc(user.uid)
      .set(newDoc)
      .then(() => {
        getAllTodos();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const addToCompletedDb = value => {
    const newArray = [...todo];
    const removedComp = newArray.filter(obj => obj.id !== value);

    const findComp = newArray.filter(obj => obj.id === value);
    findComp[0].dateCompletedStr = getDateString();

    const newComp = [...findComp, ...completedList];
    const newDoc = { items: removedComp, completed: newComp };

    firestore
      .collection("todo-list")
      .doc(user.uid)
      .update(newDoc)
      .then(() => {
        getAllTodos();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const checkInputsAddDb = () =>
    title !== "" && info !== "" && dateComplete !== "" ? addNewListDb() : null;

  return (
    <>
      <NavBar
        title={value => addTitle(value)}
        info={value => addInfo(value)}
        dateComplete={value => addDateComplete(value)}
        checkInput={() => checkInputsAddDb()}
        signOut={() => signOut()}
      />
      <Router>
        <Redirect noThrow from="/" to="landing-page" />
        <LandingPage path="landing-page" signIn={() => signIn()} user={user} />
        <PrivateRoutes path="/">
          <Dashboard
            todo={todo}
            getDate={() => getDate()}
            delDb={value => deleteFromDb(value)}
            addCompleted={value => addToCompletedDb(value)}
            compList={completedList}
            path="dashboard"
          />
          <Calendar
            path="calendar"
            todo={todo}
            compList={completedList}
            getDate={() => getDate()}
          />
        </PrivateRoutes>
      </Router>
    </>
  );
};

export default Routes;
