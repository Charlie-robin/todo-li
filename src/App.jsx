import React, { useState, useEffect } from "react";
import styles from "./App.module.scss";
import firebase, { provider, firestore } from "./firebase";

import Dashboard from "./containers/DashBoard";
import TodoListInputs from "./components/TodoListInputs";

function App() {
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
  useEffect(() => {
    getTodos();
  }, []);

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

  const getDate = () => new Date();

  const getDateString = () => {
    const date = new Date();
    return `${date.getDate()}-${
      date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
    }-${date.getFullYear()}`;
  };

  const addNewListDb = () => {
    const items = [
      {
        id: randomId(),
        title: title,
        info: info,
        dateCreated: getDate(),
        dateCreatedStr: getDateString(),
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

  const checkStateAddDb = () =>
    title !== "" && info !== "" && dateComplete !== "" ? addNewListDb() : null;

  const newListJsx = () => (
    <>
      <TodoListInputs
        title={value => addTitle(value)}
        info={value => addInfo(value)}
        dateComplete={value => addDateComplete(value)}
        handleClick={checkStateAddDb}
      />
    </>
  );

  return (
    <>
      {/* <button onClick={() => signInWithRedirect()}> Sign in </button>
    <button onClick={() => signOut()}> Sign Out </button>  */}
      <section className={styles.container}>{newListJsx()}</section>
      <Dashboard
        todos={todo}
        getDate={() => getDate()}
        delDb={value => deleteFromDb(value)}
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
