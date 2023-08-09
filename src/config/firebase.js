import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCb4_jPEqM4SyMHxSlg0OfqK2M8cmYOFVE",
  authDomain: "worklist-app-1e3c5.firebaseapp.com",
  databaseURL:
    "https://worklist-app-1e3c5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "worklist-app-1e3c5",
  storageBucket: "worklist-app-1e3c5.appspot.com",
  messagingSenderId: "911428279757",
  appId: "1:911428279757:web:6851e5b7175da3fbb07884",
};
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
