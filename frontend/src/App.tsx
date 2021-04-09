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
import IPoll from './interfaces/IPoll';
import GameBox from './component/Game/GameBox';

function App() {

	// TODO: JINOO, global logged in state
	const [isLoggedIn, setIsLoggedIn]: [boolean, any] = useState(false);
	// TODO: JINOO, fetchpoll trigger [setFetchNewPoll(!fetchNewPoll)]
	const [fetchNewPoll, setFetchNewPoll]: [boolean, any] = useState(false);
	const [polls, setPolls]: [IPoll[], any] = useState([]);
	const [seenPollIds, setSeenPollIds]: [string[], any] = useState([]);
	const [isLoginModalOpen, setIsLoginModalOpen]: [boolean, any] = useState(false);


	useEffect(() => {
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				setIsLoggedIn(true)
			} else {
				setIsLoggedIn(false)
			}
		});
	}, [isLoggedIn])

	const pollProps = {
		polls: polls,
		setPolls: setPolls,
		seenPollIds: seenPollIds,
		setSeenPollIds: setSeenPollIds
	}

	return (
		<>
			{console.log(isLoggedIn)}
			<BrowserRouter>
				<FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
					<div id="website-wrapper">
						<Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}
							fetchNewPoll={fetchNewPoll} setFetchNewPoll={setFetchNewPoll}
							{...pollProps} isLoginModalOpen={isLoginModalOpen} 
							setIsLoginModalOpen={setIsLoginModalOpen} />
						<Routes>
							<Route element={<Navigate to="home" />} />
							<Route path="/home" element={<MasonryWrapper
								{...pollProps} isLoggedIn={isLoggedIn} setIsLoginModalOpen={setIsLoginModalOpen}
								fetchNewPoll={fetchNewPoll} setFetchNewPoll={setFetchNewPoll} />} />
							<Route path="/history" element={<MasonryWrapper
								{...pollProps} isLoggedIn={isLoggedIn} setIsLoginModalOpen={setIsLoginModalOpen}
								fetchNewPoll={fetchNewPoll} setFetchNewPoll={setFetchNewPoll} />} />
							<Route path="/my-polls" element={<MasonryWrapper
								{...pollProps} isLoggedIn={isLoggedIn} setIsLoginModalOpen={setIsLoginModalOpen}
								fetchNewPoll={fetchNewPoll} setFetchNewPoll={setFetchNewPoll} />} />
						</Routes>
					</div>
				</FirebaseAuthProvider>

			</BrowserRouter>
		</>
	);
}

export default App;