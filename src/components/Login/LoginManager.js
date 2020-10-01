import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFrameWorker = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

export const handleSignInBtn = () => {             //sign in handle btn
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
    .then(result => {
      const {displayName, email, photoURL} = result.user;
      const signInUser ={
        isSignedIn : true,
        name : displayName,
        email : email,
        photo : photoURL,
        success : true
      }
      return signInUser;
    })
    .catch(err => {
      console.log(err.code, err.message);
    })
  }

  export const handleSignOutBtn = () => {          //sign out handle btn
    return firebase.auth().signOut()
    .then(res => {
      const signOutUser ={
        isSignedIn : false,
        name : '',
        email : '',
        photo : '',
        error : '',
        success : false
      }
      return signOutUser;
    })
    .catch(err => {
      console.log(err.code, err.message);
    })
  }

  export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      updateUserInfo(name);
      return newUserInfo;
    })
    .catch(error => {
      // Handle Errors here.
      const newUserInfo = {}
      newUserInfo.error  = error.message;
      newUserInfo.success = false;
      return newUserInfo;
      // ...
    });
  }

  export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo; 
    })
    .catch(error => {
      // Handle Errors here.
      const newUserInfo = {}
      newUserInfo.error  = error.message;
      newUserInfo.success = false;
      return newUserInfo;
      // ...
    });
  }
const updateUserInfo = name => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    })
    .then(() => {
      // Update successful.
      console.log('update user name successfully');
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
  }