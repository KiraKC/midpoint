import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { FirebaseAuthConsumer, FirebaseAuthProvider, IfFirebaseAuthed, IfFirebaseAuthedAnd } from '@react-firebase/auth';
import firebase from 'firebase';
import "firebase/auth";
import firebaseConfig from "../../firebase/FirebaseIndex"
import '../../styles/Common/LoginModal.css'
import CategoryButton from './CategoryButton';
import OptionPanel from './OptionPanel';

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


function SignUpModal(props: INewPollModal) {

	const [categories, setCategories]: [string[], any] = useState([])


	const categoryArray = [
		{ emoji: "basketball", text: "sports", highlightColor: "#74AEBB" },
		{ emoji: "mega", text: "politics", highlightColor: "#D83282" },
		{ emoji: "joy", text: "funny", highlightColor: "#1D5110" },
		{ emoji: "classical_building", text: "culture", highlightColor: "#2ABC88" },
		{ emoji: "dancer", text: "entertainment", highlightColor: "#905A00" },
		{ emoji: "hamburger", text: "food", highlightColor: "#E498BD" },
		{ emoji: "school_satchel", text: "education", highlightColor: "#F24343" },
		{ emoji: "thinking_face", text: "serious", highlightColor: '#B4154E' },
		{ emoji: "cupid", text: "relationship", highlightColor: '#C18FD2' },

		{ emoji: "heart_eyes", text: "cute", highlightColor: "#A391E9" },
		{ emoji: "house_with_garden", text: "lifestyle", highlightColor: "#1D5110" },
		{ emoji: "newspaper", text: "news", highlightColor: "#0B5EA9" },
		{ emoji: "frog", text: "nature", highlightColor: "#328F1A" },

		{ emoji: "carrot", text: "health & fitness", highlightColor: "#86BBEC" },
		{ emoji: "nail_care", text: "beauty", highlightColor: '#FE7EAC' },
		{ emoji: "file_folder", text: "entrepreneurship", highlightColor: '#264779' },
		{ emoji: "video_game", text: "gaming", highlightColor: '#74AEBB' },
		{ emoji: "clapper", text: "movies", highlightColor: '#EF8E96' },
		{ emoji: "sunglasses", text: "celebrities", highlightColor: '#F7017B' },
		{ emoji: "microscope", text: "science", highlightColor: '#494848' },
		{ emoji: "briefcase", text: "business", highlightColor: '#905A00' },
		{ emoji: "books", text: "books", highlightColor: '#FA8920' },
		{ emoji: "art", text: "design", highlightColor: '#A6D5FF' },

		{ emoji: "mechanical_arm", text: "technology", highlightColor: '#FFA8EC' },
		{ emoji: "womans_hat", text: "fashion", highlightColor: '#FFA61B' },
		{ emoji: "scroll", text: "history", highlightColor: '#C18FD2' },
		{ emoji: "musical_note", text: "music", highlightColor: '#B4154E' },
		{ emoji: "speech_balloon", text: "languages", highlightColor: '#F43030' },

	]


	const firebaseInstance = firebase;
	return (
		<div>
			<Modal
				isOpen={props.isModalOpen}
				// onRequestClose={() => props.setIsModalOpen(false)}
				contentLabel="Login Modal"
				style={customStyles}>



				<div className="login-modal-flex-wrapper">
					<div className="login-modal-heading">Join Midpoint</div>
					<button className="login-modal-close" onClick={() => { props.setIsModalOpen(false) }}>

						<span className="material-icons">close</span>
						<div className="poll-modal-close-text">CLOSE</div>
					</button>
				</div>
				<div className="signup-modal-description">
					We are thrilled to have you here.
					MidPoint is an ananomized community for idea sharing.
					At MidPoint, you will have the opportunity to see how the world thinks.
					Now, we are collecting some information to create your account.
				 	</div>
				<div className="signup-modal-wrapper-grid">

					<div style={{ marginTop: '20px', marginBottom: '15px' }}>
						<div className="login-section-heading">Required</div>
						<div className="signup-modal-input-module" style={{ marginBottom: '15px', marginTop: '15px' }}>
							<input className="login-modal-user-input" type="text"
								placeholder="hello@midpoint.fun"
								onChange={(e) => { }}></input>
							<div className="login-modal-question-desc-question"
								style={{ color: (1 === 1 ? 'black' : '#F24443') }}
							>EMAIL</div>
						</div>
						<div className="signup-modal-input-module">
							<input className="login-modal-user-input" type="text"
								placeholder="Enter your secure password"
								onChange={(e) => { }}></input>
							<div className="login-modal-question-desc-question"
								style={{ color: (1 === 1 ? 'black' : '#F24443') }}
							>PASSWORD</div>
						</div>
						<div className="signup-modal-input-module" style={{ marginBottom: '15px', marginTop: '15px' }}>
							<input className="login-modal-user-input" type="text"
								placeholder="flyindragon"
								onChange={(e) => { }}></input>
							<div className="login-modal-question-desc-question"
								style={{ color: (1 === 1 ? 'black' : '#F24443') }}
							>NICKNAME</div>
						</div>
					</div>

					<div style={{ marginTop: '20px', marginBottom: '15px' }}>
							<div className="login-section-heading">Optional</div>
							stuff goes here.

					</div>

				</div>

				<div style={{ marginTop: '20px', marginBottom: '15px' }} className="login-section-heading">Interests (Minimum: 3)</div>
				<div className="signup-interests-input-module display-flex">

					{categoryArray.map((e, i) => (
						<CategoryButton
							emoji={e.emoji}
							text={e.text}
							highlightColor={e.highlightColor}
							categories={categories}
							setCategories={setCategories}
						/>
					))}
				</div>


				<div className="signup-details">
					<a>Already have an account? Sign in.</a>
				</div>

				<button className="signup-modal-submit" onClick={() => { }}>
					<div className="login-modal-close-text">Register</div>
				</button>
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

export default SignUpModal;