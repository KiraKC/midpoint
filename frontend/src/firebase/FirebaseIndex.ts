import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/app'

const firebaseConfig = {
	apiKey: "AIzaSyDkeKCChrlvYYcfrZwSGgersr5IXtgoHRQ",
	authDomain: "midpoint-b4a3c.firebaseapp.com",
	projectId: "midpoint-b4a3c",
	storageBucket: "midpoint-b4a3c.appspot.com",
	messagingSenderId: "602541675119",
	appId: "1:602541675119:web:0f978eda079ccb43ee739a",
	measurementId: "G-WBL2CW78F0",
	databaseURL: "https://midpoint-b4a3c-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
	firebase.analytics();
	firebase.auth();
}

export default firebaseConfig;

