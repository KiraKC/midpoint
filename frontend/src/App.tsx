import React from 'react';
import './App.css';
import Header from './component/Common/Header';
import MasonryWrapper from './component/HomePage/MasonryWrapper'
import Modal from 'react-modal';
import { useState } from 'react';
import NewPollModal from './component/Common/NewPollModal';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';


function App() {
	const [isModalOpen, setIsModalOpen]: [boolean, any] = useState(false);

	return (
		<>
			<NewPollModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
			<BrowserRouter>
			<div id="website-wrapper">
				<Header setIsModalOpen={setIsModalOpen} />
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