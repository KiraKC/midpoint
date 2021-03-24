import React from 'react';
import './App.css';
import Header from './component/Common/Header';
import MasonryWrapper from './component/HomePage/MasonryWrapper'
import Modal from 'react-modal';
import { useState } from 'react';
import NewPollModal from './component/Common/NewPollModal';


function App() {
	const [isModalOpen, setIsModalOpen]: [boolean, any] = useState(false);

	return (
		<>
		{console.log(isModalOpen)}
			<NewPollModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
			<div id="website-wrapper">
				<Header setIsModalOpen={setIsModalOpen} />
				<MasonryWrapper />
			</div>
		</>
	);
}

export default App;