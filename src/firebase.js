import firebase from 'firebase/app'

import 'firebase/firestore'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAsrJIVZ6MlYNM334Jfaj_NKODQBSkHEzw",
    authDomain: "react-todo-c5358.firebaseapp.com",
    projectId: "react-todo-c5358",
    storageBucket: "react-todo-c5358.appspot.com",
    messagingSenderId: "622525258091",
    appId: "1:622525258091:web:276ccbe82f8daabee3542e",
    measurementId: "G-QBFL0CEZGP"
})

const db = firebaseApp.firestore();

export default db;