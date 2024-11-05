import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js'

const firebaseConfig = {
  apiKey: "AIzaSyD1UCWmIfOc2_15PbcQuB1uZNuesqO9n18",
  authDomain: "ixo-quiz.firebaseapp.com",
  projectId: "ixo-quiz",
  storageBucket: "ixo-quiz.appspot.com",
  messagingSenderId: "867157979915",
  appId: "1:867157979915:web:ccb902bee51fea6942680e",
  measurementId: "G-D15Z4G2FBT"
};

// Initialize Firebase

app.service('FirebaseAppService', function () {

  this.firebaseAppConfig = function () {
    return initializeApp(firebaseConfig);
  };

  this.firebaseAuthSignIn = function (firebaseApp, email, password) {
    const auth = getAuth(firebaseApp);
    return signInWithEmailAndPassword(auth, email, password);
  }

  this.checkUserLoginState = function () {
    let firebaseApp = initializeApp(firebaseConfig);
    const auth = getAuth(firebaseApp);
    let isLogIn = false;
    // onAuthStateChanged(auth, (user) => {
    //   if(user)
    //     isLogIn = true;
    //   else
    //     isLogIn = false;
    // });

    // return isLogIn;

    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user)
          resolve(user)
        else
          resolve(null)
      });
    });
  }

  this.userSignOut = function () {
    let firebaseApp = initializeApp(firebaseConfig);
    const auth = getAuth(firebaseApp);
    signOut(auth)
      .then(() => {
        alert('log out success');
        var path = window.location.href.split("#")[0] + "#/" + 'login';
        window.open(path, "_self");
      })
      .catch((error) => {
        console.log(error);
      })
  }

});