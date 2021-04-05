import React, { useState } from "react";
import { useNavigate } from "react-router";
import '../../styles/Common/Header.css'
import { signOut } from '../../firebase/AuthMethods'
import NewPollModal from "./NewPollModal";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

function Header(props) {

	const navigate = useNavigate()
	const [isPollModalOpen, setIsPollModalOpen]: [boolean, any] = useState(false);
	const [isLoginModalOpen, setIsLoginModalOpen]: [boolean, any] = useState(false);
	const [isSignupModalOpen, setIsSignupModalOpen]: [boolean, any] = useState(false);

	function handleSignInStatus() {
		if (props.isLoggedIn) {
			signOut();
			props.setIsLoggedIn(false)
		} else {
			setIsLoginModalOpen(true)
		}
	}

	const fetchNewPollProps = {
		fetchNewPoll: props.fetchNewPoll,
		setFetchNewPoll: props.setFetchNewPoll
	}
	return (
		<>
			<NewPollModal isModalOpen={isPollModalOpen} setIsModalOpen={setIsPollModalOpen} {...fetchNewPollProps} />
			<LoginModal isModalOpen={isLoginModalOpen} setIsModalOpen={setIsLoginModalOpen}
				setIsSignupModalOpen={setIsSignupModalOpen} {...fetchNewPollProps} />
			<SignUpModal setIsLoggedIn={props.setIsLoggedIn} isModalOpen={isSignupModalOpen}
				setIsModalOpen={setIsSignupModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} {...fetchNewPollProps} />
			<div className="header">
				<div className="header-background"></div>
				<div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
					<a className="header-link" onClick={() => navigate('home')} style={{ cursor: 'pointer' }}>midpoint.</a>
					<div className="nav-text-link" style={{ marginLeft: '45px' }} onClick={() => navigate('my-profile')}>My Profile</div>
					<div className="nav-text-link" onClick={() => navigate('game')}>Game</div>
				</div>
				<div style={{ position: 'relative' }}>
					<button className="nav-link" onClick={() => { props.isLoggedIn ? setIsPollModalOpen(true) : setIsLoginModalOpen(true) }}>New Poll</button>
					<button className="nav-link"
						onClick={() => handleSignInStatus()}>{props.isLoggedIn ? 'Log out' : 'Sign in'}</button>
				</div>
			</div>
		</>
	);
}

export default Header;
