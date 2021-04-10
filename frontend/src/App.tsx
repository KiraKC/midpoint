import './App.css';
import Header from './component/Common/Header';
import HomePage from './component/HomePage/HomePage'
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
import SearchResult from './component/SearchPage/SearchResult';
import HistoryPage from './component/HistoryPage/HistoryPage';

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
			{console.log(isLoggedIn)}
			<BrowserRouter>
				<FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
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
							<Route path="/my-polls" element={<HomePage
								{...pollProps} isLoggedIn={isLoggedIn} setIsLoginModalOpen={setIsLoginModalOpen}
								fetchNewPoll={fetchNewPoll} setFetchNewPoll={setFetchNewPoll}
								clearFeed={clearFeed} setClearFeed={setClearFeed} />} />
							<Route path="/search-result" element={<SearchResult searchString={searchString} 
							setIsLoginModalOpen={setIsLoginModalOpen} isLoggedIn={isLoggedIn} />} />
						</Routes>
					</div>
				</FirebaseAuthProvider>

			</BrowserRouter>
		</>
	);
}

export default App;