import firebase from 'firebase'
import firebaseConfig from './FirebaseIndex'


const signUp = (email, password) => {
	firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(res => {
			console.log(res)
		})
		.catch(err => {
			console.error(err)
		})
};
const signIn = (email, password) => {

}
const signOut = (email, password) => {

}
const isLoggedIn = () => {
	let user = firebase.auth().currentUser;
	if (user != null) {
		return true;
	} else {
		return false;
	}
}

export {signIn, signOut, isLoggedIn, signUp};