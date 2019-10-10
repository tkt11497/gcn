import * as firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyAr66KOA3tpzPjVAUDd8hlwjF8wYgzI26Q",
    authDomain: "stecomlikepos.firebaseapp.com",
    databaseURL: "https://stecomlikepos.firebaseio.com",
    projectId: "stecomlikepos",
    storageBucket: "stecomlikepos.appspot.com",
    messagingSenderId: "691919167371",
    appId: "1:691919167371:web:0c81e6fb09b2361443d98e"
};
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
//if use storage

export { firebase }