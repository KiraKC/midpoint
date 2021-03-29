import React from 'react';
import './App.css';
import Header from './component/Common/Header';
import MasonryWrapper from './component/HomePage/MasonryWrapper'
import Modal from 'react-modal';
import { useState } from 'react';
import NewPollModal from './component/Common/NewPollModal';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import LoginModal from './component/Common/LoginModal';


function App() {
	const [isPollModalOpen, setIsPollModalOpen]: [boolean, any] = useState(false);
	const [isLoginModalOpen, setIsLoginModalOpen]: [boolean, any] = useState(false);

	return (
		<>
			<NewPollModal isModalOpen={isPollModalOpen} setIsModalOpen={setIsPollModalOpen} />
			<LoginModal isModalOpen={isLoginModalOpen} setIsModalOpen={setIsLoginModalOpen} />

			<BrowserRouter>
			<div id="website-wrapper">
				<Header setIsPollModalOpen={setIsPollModalOpen} setIsLoginModalOpen={setIsLoginModalOpen}/>
				<Routes>
					<Route element={<Navigate to="home" />} />
					<Route path="/home" element={<MasonryWrapper />} />
					<Route path="/game" element={<MasonryWrapper />} />
				</Routes>
			</div>
			</BrowserRouter>
		</>
	);
}

export default App;