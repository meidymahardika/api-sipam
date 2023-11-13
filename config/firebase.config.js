// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAz4kTC_41NN5iMkNbPuz5CEz3_MlWKus0",
    authDomain: "sipam-c1be9.firebaseapp.com",
    databaseURL: "https://sipam-c1be9-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sipam-c1be9",
    storageBucket: "sipam-c1be9.appspot.com",
    messagingSenderId: "60441446319",
    appId: "1:60441446319:web:0cb57bba862ecfbbbf115a",
    measurementId: "G-FDNDBPN7ZE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

module.exports = {
  auth
}