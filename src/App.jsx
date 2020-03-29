import React, { useState, useEffect } from "react";
import styles from "./App.module.scss";
import firebase, { provider, firestore } from "./firebase";

import Routes from "./containers/Routes";
import NavBar from "./containers/NavBar";

function App() {
  const [completedList, updateCompleted] = useState([]);
  const [todo, updateTodo] = useState([]);
  const [title, addTitle] = useState("");
  const [info, addInfo] = useState("");
  const [dateComplete, addDateComplete] = useState("");
  //   const [user, setUser] = useState(null);

  //    const signInWithRedirect = () => {
  //     firebase.auth().signInWithRedirect(provider);
  //   };

  // const getUser = () => {
  //     firebase
  //       .auth()
  //       .getRedirectResult()
  //       .then(result => {
  //         if (result.credential) {
  //           // This gives you a Google Access Token. You can use it to access the Google API.
  //           const token = result.credential.accessToken;
  //         }
  //         // The signed-in user info.
  //         console.log(result);
  //         const user = result.user;
  //         setUser(user);
  //       })
  //       .catch(error => {
  //         // Handle Errors here.
  //         const errorCode = error.code;
  //         const errorMessage = error.message;
  //         // The email of the user's account used.
  //         const email = error.email;
  //         // The firebase.auth.AuthCredential type that was used.
  //         const credential = error.credential;
  //         // ...
  //       });
  //   };

  //   const signOut = () => {
  //     firebase
  //       .auth()
  //       .signOut()
  //       .then(function() {
  //         setUser(null);
  //         alert("You have signed out!");
  //       })
  //       .catch(function(error) {
  //         alert("An error happened.");
  //       });
  //   };

  //  useEffect(() => {
  //   if (user) {
  //     getTodos();
  //   }
  // }, [user]);

  const getTodos = () => {
    firestore
      .collection("todo-list")
      .doc("user")
      .get()
      .then(doc => {
        const retirievedArray = doc.data().items;
        updateTodo(retirievedArray);
      });
  };

  const getCompleted = () => {
    firestore
      .collection("todo-list")
      .doc("user")
      .get()
      .then(doc => {
        const retirievedArray = doc.data().completed;
        updateCompleted(retirievedArray);
      });
  };

  useEffect(() => {
    getTodos();
    getCompleted();
  }, []);

  const deleteFromDb = value => {
    const newArray = [...todo];
    const newData = newArray.filter(obj => obj.id !== value);
    const newDoc = { items: newData, completed: completedList };

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

  const getDate = () => new Date();

  const getDateString = () => {
    const date = new Date();
    return `${date.getDate()}-${
      date.getMonth()+1 
    }-${date.getFullYear()}`;
  };

 
  const addNewListDb = () => {
    const newItems = [
      {
        id: randomId(),
        title: title,
        info: info,
        dateCreated: getDate(),
        dateCreatedStr: getDateString(),
        dateCompleteBy: dateComplete.split("-")
        .reverse().join("-")
      },
      ...todo
    ];

    const newDoc = { items: newItems, completed: completedList };

    firestore
      .collection("todo-list")
      .doc("user")
      .update(newDoc)
      .then(() => {
        getTodos();
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
      .doc("user")
      .update(newDoc)
      .then(() => {
        getCompleted();
        getTodos();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const checkInputsAddDb = () =>
    title !== "" && info !== "" && dateComplete !== "" ? addNewListDb() : null;

  return (
    <>
      {/* <button onClick={() => signInWithRedirect()}> Sign in </button>
    <button onClick={() => signOut()}> Sign Out </button>  */}
      <NavBar
        title={value => addTitle(value)}
        info={value => addInfo(value)}
        dateComplete={value => addDateComplete(value)}
        checkInput={() => checkInputsAddDb()}
      />
      <Routes
        todo={todo}
        getDate={() => getDate()}
        delDb={value => deleteFromDb(value)}
        addCompleted={value => addToCompletedDb(value)}
        compList={completedList}
      />
    </>
  );
}

export default App;

// import React from "react";
// import { Router } from "@reach/router";
// import { RecipeConsumer } from "../../context/recipe/recipeContext";
// import { firestore } from "../../firebase";

// import Dashboard from "../Dashboard";
// import Cookbook from "../Cookbook";
// import { useEffect } from "react";
// import { useState } from "react";

// const Routes = props => {
//   const { user } = props;
//   const [cookBookState, setCookBook] = useState([]);

//   useEffect(() => {
//     if (user) {
//       fetchCookBook();
//     }
//   }, [user]);

//   const fetchCookBook = () => {
//     firestore
//       .collection("users")
//       .doc(user.uid)
//       .get()
//       .then(doc => {
//         const fetchedCookBook = doc.data().cookBook;
//         setCookBook(fetchedCookBook);
//       })
//       .catch(err => console.log(err));
//   };

//   const addToCookBook = recipe => {
//     if (user) {
//       recipe.isFav = true;

//       const userDoc = {
//         cookBook: [recipe, ...cookBookState]
//       };

//       firestore
//         .collection("users")
//         .doc(user.uid)
//         .set(userDoc)
//         .then(fetchCookBook);
//     } else {
//       alert("Sign in with google");
//     }
//   };

//   const removeFromCookBook = recipe => {
//     const newCookBook = [...cookBookState];
//     const recipePosition = newCookBook.indexOf(recipe);
//     newCookBook.splice(recipePosition, 1);

//     const userDoc = {
//       cookBook: newCookBook
//     };

//     firestore
//       .collection("users")
//       .doc(user.uid)
//       .set(userDoc)
//       .then(fetchCookBook);
//   };

//   return (
//     <RecipeConsumer>
//       {recipeContext => (
//         <Router>
//           <Dashboard
//             recipes={recipeContext.recipes}
//             path="/"
//             setFav={addToCookBook}
//           />
//           <Cookbook
//             path="cookbook"
//             setFav={removeFromCookBook}
//             recipes={cookBookState}
//           />
//         </Router>
//       )}
//     </RecipeConsumer>
//   );
// };

// export default Routes;
