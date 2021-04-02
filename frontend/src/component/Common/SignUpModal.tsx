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
import categoryArray from '../../constants/Category';
import OptionSelector from './OptionSelector';

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
		paddingTop: '30px',
		paddingBottom: '30px',
		paddingLeft: '30px',
		backgroundColor: 'rgba(255,255,255, 0.6)',
		backdropFilter: 'blur(20px)',
		boxShadow: 'rgb(0 0 0 / 46%) 0px 3px 6px, rgb(255 255 255 / 24%) 0px 3px 12px inset'
	}
};


function SignUpModal(props: INewPollModal) {

	const [categories, setCategories]: [string[], any] = useState([])

	return (
		<div>
			<Modal
				isOpen={props.isModalOpen}
				// onRequestClose={() => props.setIsModalOpen(false)}
				contentLabel="Login Modal"
				style={customStyles}>
				<div className="login-modal-flex-wrapper">
					<div className="login-modal-heading">Join MidPoint</div>
					<button className="login-modal-close" onClick={() => { props.setIsModalOpen(false) }}>
						<span className="material-icons">close</span>
						<div className="poll-modal-close-text">CLOSE</div>
					</button>
				</div>
				<div className="signup-modal-description">
					We are thrilled to have you here.
					MidPoint is an anonymized community for idea sharing.
					At MidPoint, you will have the opportunity to see how the world thinks.
					Now, we are collecting some information to create your account.
				 	</div>
				<div className="signup-modal-wrapper-grid">
					<div>
						<div className="login-section-heading">Login Info</div>
						<div className="signup-modal-input-module" style={{ marginBottom: '15px', marginTop: '0' }}>
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
								placeholder="happyelephant"
								onChange={(e) => { }}></input>
							<div className="login-modal-question-desc-question"
								style={{ color: (1 === 1 ? 'black' : '#F24443') }}
							>NICKNAME</div>
						</div>
					</div>

					<div>
						<div className="login-section-heading">Personal Profile</div>
						<div className="login-option-flex-wrapper">
							<div className="login-option-title">Date of Birth</div>
							<input type="date" />
						</div>
						<div className="login-option-flex-wrapper">
							<div className="login-option-title">Gender</div>
							<OptionSelector optionArray={['Male', 'Female', 'Others']} />
						</div>
						<div className="login-option-flex-wrapper">
							<div className="login-option-title">Marital Status</div>
							<OptionSelector optionArray={['Undisclosed', 'Married', 'Unmarried']} />
						</div>
						<div className="login-option-flex-wrapper">
							<div className="login-option-title">Education</div>
							<OptionSelector optionArray={['Primary School', 'Middle School', 'High School', 'College', 'Masters', 'PhD']} />
						</div>
						<div className="login-option-flex-wrapper">
							<div className="login-option-title">Political Leaning</div>
							<input type="range" list="tickmarks" />

								<datalist id="tickmarks">
									<option value="0" label="0%"></option>
									<option value="10"></option>
									<option value="20"></option>
									<option value="30"></option>
									<option value="40"></option>
									<option value="50" label="50%"></option>
									<option value="60"></option>
									<option value="70"></option>
									<option value="80"></option>
									<option value="90"></option>
									<option value="100" label="100%"></option>
								</datalist>
						</div>
							<div className="login-option-flex-wrapper">
								<div className="login-option-title">Occupation</div>
								<OptionSelector optionArray={['hello']} />
							</div>
						</div>
					</div>

					<div style={{ marginTop: '20px', marginBottom: '15px' }} className="login-section-heading">Choose at least 3 interests</div>
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


					<div className="signup-details login-modal-fineprint">
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