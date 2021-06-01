import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
apiKey:"AIzaSyA0Hf1giRlNV63KdH6QSK3Mn82PUMLKRsM",
authDomain:"e-commerce-87016.firebaseapp.com",
projectId:"e-commerce-87016",
storageBucket:"e-commerce-87016.appspot.com",
messagingSenderId:"1053636809053",
appId:"1:1053636809053:web:a5f81f0f601e4515a018b4",
measurementId:"G-51CCL07QZ3"
}

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export default app;
