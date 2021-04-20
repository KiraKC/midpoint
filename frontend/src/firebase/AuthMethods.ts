import firebase from 'firebase'

const signOut = () => {
	firebase.auth().signOut().then(() => {
	  }).catch((error) => {
		console.log(error)
	  });
}

export { signOut };