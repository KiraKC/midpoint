import React from 'react';
import './App.css';
import Header from './component/Common/Header';
import MasonryWrapper from './component/HomePage/MasonryWrapper'

function App() {
	return (
		<div id="website-wrapper">
			<Header />
			<MasonryWrapper />
		</div>
	);
}

export default App;