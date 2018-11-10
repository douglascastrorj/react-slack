import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";


var config = {
    apiKey: "AIzaSyC_lByU0Th-JksHkv-3eWg_4S-tCeH5Z30",
    authDomain: "react-slack-clone-739f1.firebaseapp.com",
    databaseURL: "https://react-slack-clone-739f1.firebaseio.com",
    projectId: "react-slack-clone-739f1",
    storageBucket: "react-slack-clone-739f1.appspot.com",
    messagingSenderId: "924006208485"
};

firebase.initializeApp(config);

export default firebase;