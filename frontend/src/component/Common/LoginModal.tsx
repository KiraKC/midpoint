import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { FirebaseAuthConsumer, FirebaseAuthProvider, IfFirebaseAuthed, IfFirebaseAuthedAnd } from '@react-firebase/auth';
import firebase from 'firebase';
import "firebase/auth";
import firebaseConfig from "../../firebase/FirebaseIndex"
import '../../styles/Common/LoginModal.css'

interface INewPollModal {
	isModalOpen: boolean,
	setIsModalOpen: any,
	setIsSignupModalOpen: any
}

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		width: 'min(650px, 85vw)',
		height: 'max-content',
		transform: 'translate(-50%, -50%)',
		borderRadius: '30px',
		paddingTop: '30px',
		paddingBottom: '30px',
		paddingLeft: '30px',
		backgroundColor: 'rgba(255,255,255, 0.6)',
		backdropFilter: 'blur(20px)',
		boxShadow: 'rgb(0 0 0 / 46%) 0px 3px 6px, rgb(255 255 255 / 24%) 0px 3px 12px inset'
	}
};

function LoginModal(props: INewPollModal) {

	const [email, setEmail]: [string, any] = useState('');
	const [password, setPassword]: [string, any] = useState('');
	const [emailDescription, setEmailDescription]: [string, any] = useState('EMAIL');
	const [passwordDescription, setPasswordDescription]: [string, any] = useState('PASSWORD');

	function handleGoogleLogin() {
		let provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth()
			.signInWithPopup(provider)
			.then((result) => {
				/** @type {firebase.auth.OAuthCredential} */
				var credential: any = result.credential;
				// This gives you a Google Access Token. You can use it to access the Google API.
				var token = credential.accessToken;
				// The signed-in user info.
				var user = result.user;
				console.log(user.uid)
				setEmailDescription("EMAIL");
				setPasswordDescription("PASSWORD");
				props.setIsModalOpen(false)
			})
			.catch((error) => {
				var errorCode = error.code;
				console.log(errorCode)
			});
	}

	function handleEmailLogin() {
		setEmailDescription("EMAIL");
		setPasswordDescription("PASSWORD");
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then((userCredential) => {
				// Signed in
				let user = userCredential.user;
				console.log(user.uid)
				props.setIsModalOpen(false)
				console.log(userCredential)
				setEmailDescription("EMAIL");
				setPasswordDescription("PASSWORD");
			})
			.catch((error) => {
				let errorCode = error.code;
				if (errorCode === 'auth/too-many-requests') {
					setPasswordDescription("TOO MANY LOGIN REQUESTS");
					return;
				}
				if (errorCode === 'auth/invalid-email') {
					setEmailDescription("INVALID EMAIL ADDRESS");
					return;
				}
				if (errorCode === 'auth/user-not-found') {
					setEmailDescription("EMAIL NOT REGISTERED");
					return;
				}
				if (errorCode === 'auth/wrong-password') {
					setPasswordDescription("WRONG PASSWORD");
					return;
				}
			});
	}

	return (
		<Modal
			isOpen={props.isModalOpen}
			contentLabel="Login Modal"
			style={customStyles}>
			<FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
				<div className="login-modal-wrapper-grid">
					<div>
						<div className="login-section-heading">What is <br /> midpoint.fun?</div>
						<div className="login-modal-description">
							MidPoint is a platform where you can create custom surveys.
							<br />The statistics help you learn about the ideas and opinions
				 			of the wider community.
				 		</div>
					</div>
					<div>
						<div className="login-modal-flex-wrapper">
							<div className="login-modal-heading">Sign In</div>
							<button className="login-modal-close" onClick={() => {
								props.setIsModalOpen(false)
								setEmailDescription("EMAIL");
								setPasswordDescription("PASSWORD");
							}}>
								<span className="material-icons">close</span>
								<div className="poll-modal-close-text">CLOSE</div>
							</button>
						</div>
						<div className="login-modal-info-wrapper">
							<div className="login-modal-input-module" style={{ marginBottom: '20px', marginTop: '15px' }}>
								<input className="login-modal-user-input" type="text"
									placeholder="hello@midpoint.fun"
									onChange={(e) => { setEmail(e.target.value) }}></input>
								<div className="login-modal-question-desc-question"
									style={{ color: (emailDescription === 'EMAIL' ? 'black' : '#F24443') }}
								>{emailDescription}</div>
							</div>
							<div className="login-modal-input-module">
								<input className="login-modal-user-input" type="text"
									placeholder="Enter your secure password"
									onChange={(e) => { setPassword(e.target.value) }}></input>
								<div className="login-modal-question-desc-question"
									style={{ color: (passwordDescription === 'PASSWORD' ? 'black' : '#F24443') }}
								>{passwordDescription}</div>
								<div className="login-modal-forgot-password"
								onClick={() => {console.log('hello')}}
									>FORGOT PASSWORD?</div>
							</div>
							<div className="login-details">
								
								<div className="login-buttons-wrapper-flex">
									<div className="login-modal-submit" onClick={() => { handleGoogleLogin() }}>
										<img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
										<div className="login-modal-close-text">Sign In with Google</div>
									</div>
									<button className="login-modal-submit" onClick={() => { handleEmailLogin() }}>
										<span className="material-icons-outlined" style={{ marginRight: '7px' }}>email</span>
										<div className="login-modal-close-text">Email Sign In</div>
									</button>
								</div>
								<div className="login-modal-fineprint">Don't have an account?&nbsp; 
								<span style={{ cursor: 'pointer', textDecoration: 'underline'}}
								onClick={() => {
									props.setIsModalOpen(false);
									props.setIsSignupModalOpen(true)
								}}>
									Create your account</span></div>
							</div>
						</div>
					</div>
				</div>
			</FirebaseAuthProvider>

			{/* <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
					<div>
						<button onClick={() => { firebase.auth().signInAnonymously(); }}>
							Sign In Anonymously</button>
						<button onClick={() => { firebase.auth().signOut(); }}>
							Sign Out</button>
						<FirebaseAuthConsumer>
							{({ isSignedIn, firebase }) => {
								if (isSignedIn === true) {
									return (
										<div></div>
									);
								} else {
									return (
										<div></div>
									);
								}
							}}
						</FirebaseAuthConsumer>
					</div>
				</FirebaseAuthProvider> */}


		</Modal >
	);
}

export default LoginModal;