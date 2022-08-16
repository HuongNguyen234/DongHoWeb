import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyCr9fp2f9ZWJ-j-ERCZb_S0dh8ThxTylkQ",
  authDomain: "hongquan-c16c6.firebaseapp.com",
  projectId: "hongquan-c16c6",
  storageBucket: "hongquan-c16c6.appspot.com",
  messagingSenderId: "336950757036",
  appId: "1:336950757036:web:3929773ac71af9fc37c109"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();
  export const store =  firebase.storage()
  export const auth = firebase.auth();
  export default firebase
  