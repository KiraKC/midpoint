import './App.css';
import Header from './component/Common/Header';
import MasonryWrapper from './component/HomePage/MasonryWrapper'
import { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import "firebase/auth";
import firebase from "firebase/app";
import firebaseConfig from "./firebase/FirebaseIndex"
import {
	FirebaseAuthProvider,
	FirebaseAuthConsumer
} from "@react-firebase/auth";
import GameStart from './component/Game/GameStart';
import GameBox from './component/Game/GameBox';

function App() {

	const [isLoggedIn, setIsLoggedIn]: [boolean, any] = useState(false);
	const [fetchNewPoll, setFetchNewPoll]: [boolean, any] = useState(false);

	useEffect(() => {
		if (firebase.auth().currentUser !== null) {
			setIsLoggedIn(true)
		}
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				setIsLoggedIn(true)
			} else {
				setIsLoggedIn(false)
			}
		});
	}, [])
	

	return (
		<>
		{console.log(isLoggedIn)}
			<BrowserRouter>
				<FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
					<div id="website-wrapper">
						<Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}
							fetchNewPoll={fetchNewPoll} setFetchNewPoll={setFetchNewPoll} />
						<Routes>
							<Route element={<Navigate to="home" />} />
							<Route path="/home" element={<MasonryWrapper isLoggedIn={isLoggedIn} fetchNewPoll={fetchNewPoll} setFetchNewPoll={setFetchNewPoll} />} />
							<Route path="/game" element={<GameStart isLoggedIn={isLoggedIn} />} />
							<Route path="/my-profile" />
						</Routes>
					</div>
				</FirebaseAuthProvider>

			</BrowserRouter>
		</>
	);
}

export default App;