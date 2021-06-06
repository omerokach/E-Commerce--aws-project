import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfigObj from './firebaseConfig'
const firebaseConfig = firebaseConfige

const app = firebase.initializeApp(firebaseConfigObj);

export const auth = app.auth();
export default app;
