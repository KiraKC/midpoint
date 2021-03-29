import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { FirebaseAuthConsumer, FirebaseAuthProvider, IfFirebaseAuthed, IfFirebaseAuthedAnd } from '@react-firebase/auth';
import firebase from 'firebase';
import "firebase/auth";
import firebaseConfig from "../../firebase/FirebaseIndex"

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
		borderRadius: '40px',
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
				<input placeholder="username"></input>
				<input placeholder="password"></input>
				<FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
					<div>
						<button
							data-testid="signin-anon"
							onClick={() => {
								firebase.auth().signInAnonymously();
							}}
						>
							Sign In Anonymously
        </button>
						<button
							onClick={() => {
								firebase.auth().signOut();
							}}
						>
							Sign Out
        </button>
						<FirebaseAuthConsumer>
							{({ isSignedIn, user, providerId }) => {
								return (
									<pre style={{ height: 300, overflow: "auto" }}>
										{JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
									</pre>
								);
							}}
						</FirebaseAuthConsumer>
						<div>
							<IfFirebaseAuthed>
								{() => {
									return <div>You are authenticated</div>;
								}}
							</IfFirebaseAuthed>
							<IfFirebaseAuthedAnd
								filter={({ providerId }) => providerId !== "anonymous"}
							>
								{({ providerId }) => {
									return <div>You are authenticated with {providerId}</div>;
								}}
							</IfFirebaseAuthedAnd>
						</div>
					</div>
				</FirebaseAuthProvider>
			</Modal>
		</div>
	);
}

export default LoginModal;