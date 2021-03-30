import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { FirebaseAuthConsumer, FirebaseAuthProvider, IfFirebaseAuthed, IfFirebaseAuthedAnd } from '@react-firebase/auth';
import firebase from 'firebase';
import "firebase/auth";
import firebaseConfig from "../../firebase/FirebaseIndex"
import '../../styles/Common/LoginModal.css'


interface INewPollModal {
	isModalOpen: boolean,
	setIsModalOpen: any
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
		border: '3px solid black',
		paddingTop: '30px',
		paddingBottom: '30px',
		paddingLeft: '30px',
		backgroundColor: 'rgba(255,255,255, 0.6)',
		backdropFilter: 'blur(20px)'
	}
};

function LoginModal(props: INewPollModal) {
	const firebaseInstance = firebase;
	return (
		<div>
			<Modal
				isOpen={props.isModalOpen}
				// onRequestClose={() => props.setIsModalOpen(false)}
				contentLabel="Example Modal"
				style={customStyles} >

				<div className="on-the-right">
					<button className="login-modal-close" onClick={() => props.setIsModalOpen(false)}>CLOSE </button>
				</div>

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
					<div className="login-modal-input-module">
						<div className="login-modal-heading">Sign In</div>
						<input className="login-modal-user-input" placeholder="hello@midpoint.fun" ></input>
						<input className="login-modal-user-input" placeholder="enter your secure password"></input>
						</div>

					<div className="login-details">
						<a>Forgot Password?</a>
					<div className="login-buttons-wrapper-flex">
						<button className="login-modal-submit" onClick={() => { }}>
							<div className="login-modal-close-text">Sign in with Google</div>
						</button>
						<button className="login-modal-submit" onClick={() => { }}>
							<div className="login-modal-close-text">Sign In</div>
						</button>
					</div>
					<a>Don't have an account? Create your account</a>
					</div>

					</div>

				</div>



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


			</Modal>
		</div>
	);
}

export default LoginModal;