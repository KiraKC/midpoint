import './App.css';
import Header from './component/Common/Header';
import MasonryWrapper from './component/HomePage/MasonryWrapper'
import { useState } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import "firebase/auth";
import firebase from "firebase/app";
import firebaseConfig from "./firebase/FirebaseIndex"
import {
	FirebaseAuthProvider,
	FirebaseAuthConsumer
} from "@react-firebase/auth";
import GameStart from './component/Game/GameStart';

function App() {

	const [isLoggedIn, setIsLoggedIn]: [boolean, any] = useState(false);

	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			setIsLoggedIn(true)
		} else {
			setIsLoggedIn(false)
		}
	});

	return (
		<>
			<BrowserRouter>
				<FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
					<div id="website-wrapper">
						<Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
						<Routes>
							<Route element={<Navigate to="home" />} />
							<Route path="/home" element={<MasonryWrapper isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
							<Route path="/game" element={<GameStart isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
						</Routes>
					</div>
				</FirebaseAuthProvider>

			</BrowserRouter>
		</>
	);
}

export default App;