import '../../styles/HomePage/MasonryPoll.css';
import React from 'react';

interface MasonryPollProps {
	height: number;
	text: string;
}

function MasonryPoll(props: MasonryPollProps) {

	const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);

	return (
		<>
			<div className="masonary-poll-wrapper" style={{
				height: `${props.height}px`,
				backgroundColor: `${randomColor}`
			}}>
				<div className="masonary-poll-heading">{props.text}</div>
			</div>
		</>
	);
}

export default MasonryPoll;
