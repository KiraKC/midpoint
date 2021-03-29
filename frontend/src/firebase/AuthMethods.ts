import firebase from 'firebase'
import firebaseConfig from './FirebaseIndex'

export const authMethods = {
	// firebase helper methods go here... 
	signup: (email, password) => {
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(res => {
				console.log(res)
			})
			.catch(err => {
				console.error(err)
			})
	},
	signin: (email, password) => {

	},
	signout: (email, password) => {

	},
}