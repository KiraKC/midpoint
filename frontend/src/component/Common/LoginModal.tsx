import { useState } from 'react';
import Modal from 'react-modal';
import { FirebaseAuthProvider } from '@react-firebase/auth';
import firebase from 'firebase';
import "firebase/auth";
import firebaseConfig from "../../firebase/FirebaseIndex"
import '../../styles/Common/LoginModal.css'
import Spinner from './Spinner';

interface ILoginModalProps {
	isModalOpen: boolean,
	setIsModalOpen: any,
	setIsSignupModalOpen: any,
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
		backgroundColor: 'rgba(255,255,255, 0.1)',
		backdropFilter: 'blur(20px)',
		boxShadow: 'rgb(0 0 0 / 46%) 0px 3px 6px, rgb(255 255 255 / 24%) 0px 3px 12px inset'
	}
};

function LoginModal(props: ILoginModalProps) {

	const [email, setEmail]: [string, any] = useState('');
	const [password, setPassword]: [string, any] = useState('');
	const [emailDescription, setEmailDescription]: [string, any] = useState('EMAIL');
	const [passwordDescription, setPasswordDescription]: [string, any] = useState('PASSWORD');
	const [forgetPasswordDescription, setForgetPasswordDescription]: [string, any] = useState('FORGOT PASSWORD?');
	const [loading, setLoading]: [boolean, any] = useState(false);

	function cleanUp() {
		setEmail('');
		setPassword('');
		setEmailDescription('EMAIL');
		setPasswordDescription('PASSWORD');
		setForgetPasswordDescription('FORGOT PASSWORD?');
		setLoading(false);
	}

	function handleEmailLogin() {
		setLoading(true);
		setEmailDescription("EMAIL");
		setPasswordDescription("PASSWORD");
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then((userCredential) => {
				// Signed in
				let user = userCredential.user;
				user.getIdToken(true)
					.then((userToken) => localStorage.setItem('userToken', userToken))
					.catch(console.log)
				// console.log(user.uid)
				// console.log(userCredential)
				setEmailDescription("EMAIL");
				setPasswordDescription("PASSWORD");
				setLoading(false);
				props.setIsModalOpen(false);
				cleanUp();
				// clear feed and then wait 0.1s before refetching. this is to ensure no clashing of poll array (sometimes it doesn't refresh properly)
				props.setClearFeed(!props.clearFeed);
				setTimeout(() => props.setFetchNewPoll(!props.fetchNewPoll), 100)
			})
			.catch((error) => {
				let errorCode = error.code;
				setLoading(false);
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

	function handleResetPassword() {
		var auth = firebase.auth();
		auth.sendPasswordResetEmail(email).then(function () {
			setForgetPasswordDescription('RESET PASSWORD EMAIL SENT!')
			setTimeout(function () {
				setForgetPasswordDescription('FORGOT PASSWORD?')
			}, 5000)
		}).catch(function (error) {
			// An error happened.
			if (error.code === 'auth/invalid-email') {
				setEmailDescription("INCORRECT EMAIL FORMAT");
				return;
			}
			if (error.code === 'auth/user-not-found') {
				setEmailDescription("EMAIL NOT REGISTERED");
				return;
			}
		});
	}

	return (
		<Modal
			isOpen={props.isModalOpen}
			contentLabel="Login Modal"
			style={customStyles}>
			{loading ?
				(<Spinner color="white" type="spin" />) : ''}
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
								props.setIsModalOpen(false);
								cleanUp();
							}}>
								<span className="material-icons">close</span>
								<div className="poll-modal-close-text">CLOSE</div>
							</button>
						</div>
						<div className="login-modal-info-wrapper">
							<div className="login-modal-input-module" style={{ marginBottom: '20px', marginTop: '10px' }}>
								<input className="login-modal-user-input" type="text"
									placeholder="hello@midpoint.fun"
									onChange={(e) => { setEmail(e.target.value); setEmailDescription("EMAIL"); }}></input>
								<div className="login-modal-question-desc-question"
									style={{ color: (emailDescription === 'EMAIL' ? 'black' : '#F24443') }}
								>{emailDescription}</div>
							</div>
							<div className="login-modal-input-module">
								<input className="login-modal-user-input" type="password"
									placeholder="Enter your secure password"
									onChange={(e) => { setPassword(e.target.value); setPasswordDescription("PASSWORD"); }}></input>
								<div className="login-modal-question-desc-question"
									style={{ color: (passwordDescription === 'PASSWORD' ? 'black' : '#F24443') }}
								>{passwordDescription}</div>
								<div className="login-modal-forgot-password"
									onClick={() => { handleResetPassword() }}
								>{forgetPasswordDescription}</div>
							</div>
							<div className="login-details">

								<div className="login-buttons-wrapper-flex">
									<button className="login-modal-submit" onClick={() => { handleEmailLogin() }}>
										<span className="material-icons-outlined" style={{ marginRight: '7px' }}>email</span>
										<div className="login-modal-close-text">Email Sign In</div>
									</button>
								</div>
								<div className="login-modal-fineprint" style={{ marginTop: '4px' }}>Don't have an account?&nbsp;
								<span style={{ cursor: 'pointer', textDecoration: 'underline' }}
										onClick={() => {
											props.setIsModalOpen(false);
											cleanUp();
											props.setIsSignupModalOpen(true)
										}}>
										Sign Up</span></div>
							</div>
						</div>
					</div>
				</div>
			</FirebaseAuthProvider>
		</Modal >
	);
}

export default LoginModal;