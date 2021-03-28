import Masonry from 'react-masonry-css';
import '../../styles/HomePage/MasonryWrapper.css';
import React from 'react';
import MasonryPoll from './MasonryPoll'

// interface MasonryWrapperProps {

// }

function MasonryWrapper() {

	var items = [
		{ id: 1, text: "Should we get rid of Ratty's Chicken Finger Friday?", height: Math.max(150, Math.random() * 500) },
		{ id: 3, text: 'Trump Job Approval', height: Math.max(150, Math.random() * 500) },
		{ id: 4, text: 'Which Harry Potter house do you belong in?', height: Math.max(150, Math.random() * 500) },
		{ id: 5, text: 'High Five', height: Math.max(150, Math.random() * 500) },
		{ id: 5, text: 'High Five', height: Math.max(150, Math.random() * 500) },
		{ id: 5, text: 'High Five', height: Math.max(150, Math.random() * 500) },
		{ id: 5, text: 'High Five', height: Math.max(150, Math.random() * 500) },
		{ id: 5, text: 'High Five', height: Math.max(150, Math.random() * 500) },
		{ id: 5, text: 'High Five', height: Math.max(150, Math.random() * 500) },
		{ id: 5, text: 'High Five', height: Math.max(150, Math.random() * 500) },
		{ id: 5, text: 'High Five', height: Math.max(150, Math.random() * 500) },
		{ id: 5, text: 'High Five', height: Math.max(150, Math.random() * 500) },
		{ id: 5, text: 'High Five', height: Math.max(150, Math.random() * 500) },
		{ id: 5, text: 'High Five', height: Math.max(150, Math.random() * 500) },
		{ id: 5, text: 'High Five', height: Math.max(150, Math.random() * 500) },
		{ id: 5, text: 'High Five', height: Math.max(150, Math.random() * 500) },
		{ id: 5, text: 'High Five', height: Math.max(150, Math.random() * 500) },
		{ id: 5, text: 'High Five', height: Math.max(150, Math.random() * 500) },
		{ id: 5, text: 'High Five', height: Math.max(150, Math.random() * 500) },
		{ id: 5, text: 'High Five', height: Math.max(150, Math.random() * 500) },
		{ id: 5, text: 'High Five', height: Math.max(150, Math.random() * 500) },
		{ id: 5, text: 'High Five', height: Math.max(150, Math.random() * 500) },
		{ id: 5, text: 'High Five', height: Math.max(150, Math.random() * 500) },
		{ id: 5, text: 'High Five', height: Math.max(150, Math.random() * 500) },
		{ id: 5, text: 'High Five', height: Math.max(150, Math.random() * 500) },
		{ id: 5, text: 'High Five', height: Math.max(150, Math.random() * 500) },
		{ id: 5, text: 'High Five', height: Math.max(150, Math.random() * 500) },
		{ id: 5, text: 'High Five', height: Math.max(150, Math.random() * 500) },
		{ id: 5, text: 'High Five', height: Math.max(150, Math.random() * 500) },
		{ id: 5, text: 'High Five', height: Math.max(150, Math.random() * 500) }
	];

	const divItems = items.map(function (item) {
		return <div><MasonryPoll key={item.id} height={item.height} text={item.text} /></div>
		// return <MasonryPoll key={item.id} height={item.height} backgroundColor={item.backgroundColor} text={item.text} />
	});

	const breakpointColumnsObj = {
		default: 4,
		1700: 3,
		1200: 3,
		1000: 2,
		700: 2,
		600: 1
	};

	return (
		<div className="masonry-wrapper-wrapper">
			<Masonry
				breakpointCols={breakpointColumnsObj}
				className="my-masonry-grid"
				columnClassName="my-masonry-grid_column"
			>
				{divItems}
			</Masonry>
		</div>
	);
}

export default MasonryWrapper;
