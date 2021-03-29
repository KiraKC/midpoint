import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/app'

var firebaseConfig = {
	apiKey: "AIzaSyCkuxygyT37m7BUlRqJz7pwclwQeYePSwo",
	authDomain: "midpoint-38ef0.firebaseapp.com",
	projectId: "midpoint-38ef0",
	storageBucket: "midpoint-38ef0.appspot.com",
	messagingSenderId: "962616729704",
	appId: "1:962616729704:web:069bf831465ad86a371bdd",
	measurementId: "G-CGKNC3TDRY"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.auth();

export default firebaseConfig; 
