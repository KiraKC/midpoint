import React, { useEffect, useState } from 'react';
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
import { registerNewUser } from '../../firebase/AuthMethods';
import axios from 'axios';

interface INewPollModal {
	isModalOpen: boolean,
	setIsModalOpen: any,
	setIsLoginModalOpen: any
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
	const [categoryDescription, setCategoryDescription]: [string, any] = useState('PLEASE CHOOSE AT LEAST 3 ✓')
	const [email, setEmail]: [string, any] = useState('');
	const [password, setPassword]: [string, any] = useState('');
	const [birthday, setBirthday]: [string, any] = useState('');
	const [gender, setGender]: [string, any] = useState('');
	const [maritalStatus, setMaritalStatus]: [string, any] = useState('')

	useEffect(() => {
		let arrayLength = categories.length;
		if (arrayLength === 0) {
			setCategoryDescription("PLEASE CHOOSE AT LEAST 3");
		}
		if (arrayLength > 0 && arrayLength < 3) {
			setCategoryDescription("PLEASE CHOOSE AT LEAST 3 (" + arrayLength + "/3)");
		}
		if (arrayLength >= 3) {
			setCategoryDescription("YOU'VE SELECTED " + arrayLength + ", CHOOSE MORE IF YOU WANT! ✓");
		}
	}, [categories])

	const handleRegister = () => {
		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(res => {
			addUserToMongo();
			props.setIsModalOpen(false);
		})
		.catch(err => {
			console.error(err)
		})
	}

	const addUserToMongo = () => {
		const toSend = {
			userIdToken: firebase.auth().currentUser.getIdToken(),
			userMetaData: [
				{key: 'age', value: '28'}
			],
			selectedCategories: categories
		}
		console.log(toSend)
		const config = {
			headers: {
				"Content-Type": "application/json",
				'Access-Control-Allow-Origin': '*',
			}
		}
		// console.log(isSubmissionValid())
		// if (isSubmissionValid()) {
			axios.post(
				"http://localhost:4567/user/new",
				toSend,
				config,
			)
				.then(response => {
					// cleanUpData()
					return response.data;
				})
				.catch(e => {
					console.log(e);
				});
		// }
	}

	return (
		<div>
			<Modal
				isOpen={props.isModalOpen}
				// onRequestClose={() => props.setIsModalOpen(false)}
				contentLabel="Login Modal"
				style={customStyles}>
				<div className="login-modal-wrapper">
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
									onChange={(e) => {setEmail(e.target.value)}}></input>
								<div className="login-modal-question-desc-question"
									style={{ color: (1 === 1 ? 'black' : '#F24443') }}
								>EMAIL</div>
							</div>
							<div className="signup-modal-input-module">
								<input className="login-modal-user-input" type="password"
									placeholder="Enter your secure password"
									onChange={(e) => {setPassword(e.target.value)}}></input>
								<div className="login-modal-question-desc-question"
									style={{ color: (1 === 1 ? 'black' : '#F24443') }}
								>PASSWORD</div>
							</div>
						</div>

						<div>
							<div className="login-section-heading">Personal Profile</div>
							<div className="login-option-flex-wrapper" style={{ marginTop: '10px' }}>
								<div className="login-option-title">Birthday</div>
								<input type="date" className="login-option-date-picker" />
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
								<OptionSelector optionArray={['Elementary School', 'Middle School', 'High School', 'Bachelor', 'Masters', 'PhD']} />
							</div>
							<div className="login-option-flex-wrapper">
								<div className="login-option-title">Political Leaning</div>
								<OptionSelector optionArray={['Left Leaning', 'Neutral', 'Right Leaning']} />
							</div>
						</div>
					</div>

					<div style={{ marginTop: '20px' }} className="login-section-heading">What topic interests you?</div>
					<div className="register-modal-desc"
						style={{ color: (1 === 1 ? 'black' : '#F24443') }}
					>{categoryDescription}</div>
					<div className="signup-interests-input-module display-flex">
						{categoryArray.map((e, i) => (
							<CategoryButton
								key={i}
								emoji={e.emoji}
								text={e.text}
								highlightColor={e.highlightColor}
								categories={categories}
								setCategories={setCategories}
							/>
						))}
					</div>
					<div className="signup-details login-modal-fineprint">
						<div>Already have an account?&nbsp;
						<span style={{ textDecoration: 'underline', cursor: 'pointer' }}
								onClick={() => {
									props.setIsModalOpen(false);
									props.setIsLoginModalOpen(true);
								}}>Sign In</span>
						</div>
					</div>
					<button className="signup-modal-submit" onClick={() => {handleRegister()}}>
						<div className="login-modal-close-text">Register</div>
					</button>
				</div>
			</Modal>
		</div>
	);
}

export default SignUpModal;