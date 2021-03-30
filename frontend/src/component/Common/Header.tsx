import { FirebaseAuthProvider } from "@react-firebase/auth";
import firebase from "firebase";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import firebaseConfig from "../../firebase/FirebaseIndex";
import '../../styles/Common/Header.css'
import { isLoggedIn } from '../../firebase/AuthMethods'

interface IHeaderProps {
	setIsPollModalOpen: any,
	setIsLoginModalOpen: any
}

function Header(props: IHeaderProps) {
	const navigate = useNavigate()
	const [isLoggedIn, setIsLoggedIn]: [boolean, any] = useState(false);

	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			// User is signed in.
			setIsLoggedIn(true)
		} else {
			// No user is signed in.
			setIsLoggedIn(false)
		}
	});
	return (
		<div className="header">
			<div className="header-background"></div>
			<div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
				<a className="header-link" onClick={() => navigate('home')} style={{ cursor: 'pointer' }}>midpoint.</a>
				<div className="nav-text-link" style={{ marginLeft: '45px' }} onClick={() => navigate('answer')}>Answer</div>
				<div className="nav-text-link" onClick={() => navigate('game')}>Game</div>

			</div>
			<div style={{ position: 'relative' }}>
				<button className="nav-link" onClick={() => props.setIsLoginModalOpen(true)}>{isLoggedIn ? 'Log out' : 'Sign in'}</button>
				<button className="nav-link" onClick={() => props.setIsPollModalOpen(true)}>New Poll</button>
			</div>
		</div>
	);
}

export default Header;
