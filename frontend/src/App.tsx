import './App.css';
import Header from './component/Common/Header';
import HomePage from './component/HomePage/HomePage'
import React, { useEffect, useState } from 'react';
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
import SearchPage from './component/SearchPage/SearchPage';
import HistoryPage from './component/HistoryPage/HistoryPage';
import MyPollsPage from './component/MyPollsPage/MyPollsPage';
import StatsPage from './component/StatsPage/StatsPage';
import GameEnd from './component/Game/GameEnd';

function App() {

	const [isLoggedIn, setIsLoggedIn]: [boolean, any] = useState(false);
	const [fetchNewPoll, setFetchNewPoll]: [boolean, any] = useState(false);
	const [polls, setPolls]: [IPoll[], any] = useState([]);
	const [searchString, setSearchString]: [string, any] = useState('');
	const [seenPollIds, setSeenPollIds]: [string[], any] = useState([]);
	const [isLoginModalOpen, setIsLoginModalOpen]: [boolean, any] = useState(false);
	const [clearFeed, setClearFeed]: [boolean, any] = useState(false);

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
			<BrowserRouter>
				<FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
					<div id="background-color"></div>

					<div id="website-wrapper">
						<Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}
							fetchNewPoll={fetchNewPoll} setFetchNewPoll={setFetchNewPoll}
							{...pollProps} isLoginModalOpen={isLoginModalOpen}
							setIsLoginModalOpen={setIsLoginModalOpen}
							clearFeed={clearFeed} setClearFeed={setClearFeed} setSearchString={setSearchString} />
						<Routes>
							<Route element={<Navigate to="home" />} />
							<Route path="/home" element={<HomePage
								{...pollProps} isLoggedIn={isLoggedIn} setIsLoginModalOpen={setIsLoginModalOpen}
								fetchNewPoll={fetchNewPoll} setFetchNewPoll={setFetchNewPoll}
								clearFeed={clearFeed} setClearFeed={setClearFeed}
							/>} />
							<Route path="/history" element={<HistoryPage
								isLoggedIn={isLoggedIn} setIsLoginModalOpen={setIsLoginModalOpen}
							/>} />
							<Route path="/my-polls" element={<MyPollsPage
								isLoggedIn={isLoggedIn} setIsLoginModalOpen={setIsLoginModalOpen}
							/>} />
							<Route path="/search-result" element={<SearchPage searchString={searchString}
								setIsLoginModalOpen={setIsLoginModalOpen} isLoggedIn={isLoggedIn}
							/>} />
							<Route path="/stats/:pollId" element={<StatsPage
								setIsLoginModalOpen={setIsLoginModalOpen} isLoggedIn={isLoggedIn}
							/>} />
							<Route path="/game" element={<GameStart
							/>} />
							<Route path="/play" element={<GameBox
							/>} />
							<Route path="/endgame" element={<GameEnd
							/>} />
						</Routes>
					</div>
				</FirebaseAuthProvider>

			</BrowserRouter>
		</>
	);
}

export default App;