import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBAuQjMt5Qg_hDNuSK6kSE4NBJYtTUkurQ',
  authDomain: 'catch-of-the-day-french.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-french.firebaseio.com',

});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;
