import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import firebase from 'firebase';
import "firebase/auth";
import '../../styles/Common/LoginModal.css'
import CategoryButton from './CategoryButton';
import categoryArray from '../../constants/Category';
import OptionSelector from './OptionSelector';
import axios from 'axios';
import Spinner from './Spinner';
import endpointUrl from '../../constants/Endpoint';
import { signOut } from '../../firebase/AuthMethods';
import SuccessScreen from './SuccessScreen';

interface ISignUpModalProps {
	isModalOpen: boolean,
	setIsModalOpen: any,
	setIsLoginModalOpen: any,
	setIsLoggedIn: any,
	fetchNewPoll: boolean,
	setFetchNewPoll: any,
	clearFeed: boolean,
	setClearFeed: any
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
		boxShadow: 'rgb(0 0 0 / 46%) 0px 3px 6px, rgb(255 255 255 / 24%) 0px 3px 12px inset',
	}
};

function SignUpModal(props: ISignUpModalProps) {

	const [categories, setCategories]: [string[], any] = useState([])
	const [categoryDescription, setCategoryDescription]: [string, any] = useState('PLEASE CHOOSE AT LEAST 3')
	const [credentialDescription, setCredentialDescription]: [string, any] = useState('ALL FIELDS REQUIRED')
	const [infoDescription, setInfoDescription]: [string, any] = useState('* INDICATES REQUIRED FIELD')
	const [emailDescription, setEmailDescription]: [string, any] = useState('EMAIL');
	const [passwordDescription, setPasswordDescription]: [string, any] = useState('PASSWORD');
	const [loading, setLoading]: [boolean, any] = useState(false);
	const [success, setSuccess]: [boolean, any] = useState(false);
	const [email, setEmail]: [string, any] = useState('');
	const [password, setPassword]: [string, any] = useState('');
	const [birthday, setBirthday]: [string, any] = useState('');
	const [gender, setGender]: [string, any] = useState('');
	const [maritalStatus, setMaritalStatus]: [string, any] = useState('')
	const [education, setEducation]: [string, any] = useState('');
	const [political, setPolitical]: [string, any] = useState('');

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

	useEffect(() => {
		setInfoDescription('* INDICATES REQUIRED FIELD');
	}, [birthday, gender])

	const isSubmissionValid = () => {
		let isValid = true;
		if (categories.length < 3) {
			setCategoryDescription("SELECT AT LEAST 3 BEFORE REGISTRATION");
			isValid = false;
		}
		if (birthday === '' || calculateAge() === NaN ||
			gender === 'Undisclosed' || gender === '' || calculateAge() <= 3) {
			if (calculateAge() <= 3) {
				setInfoDescription("HMM, ARE YOU REALLY THAT YOUNG?")
			} else {
				setInfoDescription("COMPLETE REQUIRED FIELD");
			}
			isValid = false;
		}
		if (email === '' || password === '') {
			setCredentialDescription("COMPLETE REQUIRED FIELD");
			isValid = false;
		}
		return isValid;
	}

	const handleRegister = async () => {
		cleanUpText()
		setLoading(true)
		if (isSubmissionValid()) {
			const isRegistered: boolean = await checkExists();
			if (isRegistered) {
				setEmailDescription("EMAIL ALREADY IN USE");
				setLoading(false)
				return;
			}
			// attempt to register credential with firebase
			firebase.auth().createUserWithEmailAndPassword(email, password)
				.then(async () => {
					// attempt to add user to MongoDB database
					let status: boolean = await addUserToMongo();
					console.log(status)
					if (status) {
						await firebase.auth().currentUser.getIdToken(true)
						.then((userToken) => localStorage.setItem('userToken', userToken))
						.catch(console.log)
						// clear feed and then wait 0.1s before refetching. this is to ensure no clashing of poll array (sometimes it doesn't refresh properly)
						props.setClearFeed(!props.clearFeed);
						setTimeout(() => props.setFetchNewPoll(!props.fetchNewPoll), 100);
						cleanUpData();
						setLoading(false)
						setSuccess(true)

						setTimeout(() => {
							props.setIsModalOpen(false)
							setSuccess(false)
						}, 500)
					} else {
						deleteAndLogOut();
						setLoading(false);
					}

				})
				.catch(err => {
					setLoading(false)
					let errorCode = err.code;
					console.log(errorCode)
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
					if (errorCode === 'auth/weak-password') {
						setPasswordDescription("STRONGER PASSWORD REQUIRED");
						return;
					}
					if (errorCode === 'auth/email-already-in-use') {
						setEmailDescription("EMAIL ALREADY IN USE");
						return;
					}
				})
		} else {
			setLoading(false)
		}
	}

	function calculateAge() {
		let datetimeBirthday = new Date(birthday);
		var ageDifMs = Date.now() - datetimeBirthday.getTime();
		var ageDate = new Date(ageDifMs);
		return Math.abs(ageDate.getUTCFullYear() - 1970);
	}

	function cleanUpData() {
		setCategories([]);
		setCategoryDescription('PLEASE CHOOSE AT LEAST 3');
		setEmail('');
		setPassword('');
		setBirthday('');
		setGender('');
		setMaritalStatus('');
		setEducation('');
		setPolitical('');
		setCredentialDescription('ALL FIELDS REQUIRED');
		setInfoDescription('* INDICATES REQUIRED FIELD');
		setEmailDescription('EMAIL');
		setPasswordDescription('PASSWORD');
	}

	function cleanUpText() {
		setCredentialDescription('ALL FIELDS REQUIRED');
		setInfoDescription('* INDICATES REQUIRED FIELD');
		setEmailDescription('EMAIL');
		setPasswordDescription('PASSWORD');
	}

	async function checkExists() {
		return firebase.auth()
			.fetchSignInMethodsForEmail(email)
			.then((result) => {
				if (result.length !== 0) {
					return true;
				}
				return false;
			})
			.catch((e) => {
				console.log(e)
				return false;
			});
	}

	async function deleteAndLogOut() {
		let user = firebase.auth().currentUser;
		user.delete().then(function () {
			signOut();
			props.setIsLoggedIn(false);
			return true;
		}).catch(function (error) {
			console.log(error);
			return false;
		});
	}

	const addUserToMongo = async () => {
		return firebase.auth().currentUser.getIdToken(true)
			.then(function (idToken) {
				const toSend = {
					userIdToken: idToken,
					userMetaData: [
						{ key: 'age', value: calculateAge() },
						{ key: 'birthday', value: birthday },
						{ key: 'gender', value: gender },
						{ key: 'maritalStatus', value: maritalStatus },
						{ key: 'education', value: education },
						{ key: 'political', value: political }
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
				return axios.post(
					endpointUrl + "/user/new",
					toSend,
					config,
				)
					.then((response) => {
						if (response.data.success) {
							return true;
						} else {
							return false;
						}
					})
					.catch(e => {
						console.log(e)
						setCredentialDescription('INTERNAL SERVER ERROR');
						return false;
					});
			}).catch(function (error) {
				console.log(error)
				return false;
			});
	}

	return (
		<div>
			<Modal
				isOpen={props.isModalOpen}
				contentLabel="Login Modal"
				style={customStyles}>
				{loading ?
					(<Spinner color="white" type="spin" />) : ''}
				{success ?
					(<SuccessScreen />) : ''}
				<div className="login-modal-wrapper">
					<div className="login-modal-flex-wrapper">
						<div className="login-modal-heading">Join MidPoint</div>
						<button className="login-modal-close" onClick={() => { cleanUpData(); props.setIsModalOpen(false); }}>
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
							<div className="register-modal-desc"
								style={{ marginBottom: '0', color: ("ALL FIELDS REQUIRED" === credentialDescription ? 'black' : '#F24443') }}
							>{credentialDescription}</div>
							<div className="signup-modal-input-module" style={{ marginBottom: '15px', marginTop: '0' }}>
								<input className="login-modal-user-input" type="text"
									placeholder="hello@midpoint.fun"
									onChange={(e) => { setEmail(e.target.value); setCredentialDescription("ALL FIELDS REQUIRED") }}></input>
								<div className="login-modal-question-desc-question"
									style={{ color: (emailDescription === 'EMAIL' ? 'black' : '#F24443') }}
								>{emailDescription}</div>
							</div>
							<div className="signup-modal-input-module">
								<input className="login-modal-user-input" type="password"
									placeholder="Enter your secure password"
									onChange={(e) => { setPassword(e.target.value); setCredentialDescription("ALL FIELDS REQUIRED") }}></input>
								<div className="login-modal-question-desc-question"
									style={{ color: (passwordDescription === 'PASSWORD' ? 'black' : '#F24443') }}
								>{passwordDescription}</div>
							</div>
						</div>

						<div>
							<div className="login-section-heading">Personal Profile</div>
							<div className="register-modal-desc"
								style={{
									marginBottom: '0', color: (infoDescription === "* INDICATES REQUIRED FIELD"
										? 'black' : '#F24443')
								}}
							>{infoDescription}</div>
							<div className="login-option-flex-wrapper" style={{ marginTop: '10px' }}>
								<div className="login-option-title">Birthday <span style={{ color: '#F24443' }}>*</span></div>
								<input type="date" className="login-option-date-picker"
									onChange={(e) => { setBirthday(e.target.value) }} />
							</div>
							<div className="login-option-flex-wrapper">
								<div className="login-option-title">Gender <span style={{ color: '#F24443' }}>*</span></div>
								<OptionSelector
									optionArray={['Undisclosed', 'Male', 'Female', 'Others']}
									setOptionValue={setGender} />
							</div>
							<div className="login-option-flex-wrapper">
								<div className="login-option-title">Marital Status</div>
								<OptionSelector
									optionArray={['Undisclosed', 'Married', 'Unmarried']}
									setOptionValue={setMaritalStatus} />
							</div>
							<div className="login-option-flex-wrapper">
								<div className="login-option-title">Education</div>
								<OptionSelector
									optionArray={['Undisclosed', 'Elementary School', 'Middle School', 'High School', 'Bachelor', 'Masters', 'PhD']}
									setOptionValue={setEducation} />
							</div>
							<div className="login-option-flex-wrapper">
								<div className="login-option-title">Political Leaning</div>
								<OptionSelector
									optionArray={['Undisclosed', 'Left Leaning', 'Neutral', 'Right Leaning']}
									setOptionValue={setPolitical} />
							</div>
						</div>
					</div>

					<div style={{ marginTop: '20px' }} className="login-section-heading">What topic interests you?</div>
					<div className="register-modal-desc"
						style={{ color: ("SELECT AT LEAST 3 BEFORE REGISTRATION" !== categoryDescription ? 'black' : '#F24443') }}
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
									cleanUpData();
									props.setIsModalOpen(false);
									props.setIsLoginModalOpen(true);
								}}>Sign In</span>
						</div>
					</div>
					<button className="signup-modal-submit" onClick={() => { handleRegister() }}>
						<div className="login-modal-close-text">Register</div>
					</button>
				</div>
			</Modal>
		</div>
	);
}

export default SignUpModal;