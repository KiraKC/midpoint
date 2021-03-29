import React from 'react';
import './App.css';
import Header from './component/Common/Header';
import MasonryWrapper from './component/HomePage/MasonryWrapper'
import Modal from 'react-modal';
import { useState, useContext } from 'react';
import NewPollModal from './component/Common/NewPollModal';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import LoginModal from './component/Common/LoginModal';
import "firebase/auth";
import firebase from "firebase/app";
import firebaseConfig from "./firebase/FirebaseIndex"
import {
	FirebaseAuthProvider,
	FirebaseAuthConsumer
} from "@react-firebase/auth";

function App() {
	const [isPollModalOpen, setIsPollModalOpen]: [boolean, any] = useState(false);
	const [isLoginModalOpen, setIsLoginModalOpen]: [boolean, any] = useState(false);

	var user = firebase.auth().currentUser;
	var name, email, photoUrl, uid, emailVerified;
	
	if (user != null) {
	  name = user.displayName;
	  email = user.email;
	  photoUrl = user.photoURL;
	  emailVerified = user.emailVerified;
	  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
					   // this value to authenticate with your backend server, if
					   // you have one. Use User.getToken() instead.
					   console.log(uid)
	}

	return (
		<>
			<NewPollModal isModalOpen={isPollModalOpen} setIsModalOpen={setIsPollModalOpen} />
			<LoginModal isModalOpen={isLoginModalOpen} setIsModalOpen={setIsLoginModalOpen} />

			<BrowserRouter>
				<FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
					<FirebaseAuthConsumer>
						{({ isSignedIn, user, providerId }) => {
							return (
								<pre style={{ height: 300, overflow: "auto" }}>
									{JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
								</pre>
							);
						}}
					</FirebaseAuthConsumer>
					<div id="website-wrapper">
						<Header setIsPollModalOpen={setIsPollModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />
						<Routes>
							<Route element={<Navigate to="home" />} />
							<Route path="/home" element={<MasonryWrapper />} />
							<Route path="/game" element={<MasonryWrapper />} />
						</Routes>
					</div>
				</FirebaseAuthProvider>

			</BrowserRouter>
		</>
	);
}

export default App;