import * as firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDlUbADLsOsWe5hqINY57mqTPJPkDg66-g",
  authDomain: "todo-list-42bc4.firebaseapp.com",
  databaseURL: "https://todo-list-42bc4.firebaseio.com",
  projectId: "todo-list-42bc4",
  storageBucket: "todo-list-42bc4.appspot.com",
  messagingSenderId: "254226940157",
  appId: "1:254226940157:web:56eb498df8a3b5eed43e94",
  measurementId: "G-BV8B9TY3N2"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
