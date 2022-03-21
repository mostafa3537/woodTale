// import firebase from "firebase/app";
// import "firebase/firestore";
// import "firebase/auth";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvGa738e3OAaHxFNC1tpa1z-CTlTE_Rrc",
  authDomain: "crwn-3fa73.firebaseapp.com",
  projectId: "crwn-3fa73",
  storageBucket: "crwn-3fa73.appspot.com",
  messagingSenderId: "687583428605",
  appId: "1:687583428605:web:7ce8e23b5ad7e1e588e394",
  measurementId: "G-D259T8YNVT",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  //checking user existing by snapshot that has a property called exists
  //can not use ref for this check
    if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export default firebase;
