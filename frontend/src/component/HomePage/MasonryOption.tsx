import '../../styles/HomePage/MasonryOption.css';
import React from 'react';
import { Emoji } from 'emoji-mart'

interface MasonryOptionProps {
	emoji: string,
	text: string,
	textColor: string
}

function MasonryOption(props: MasonryOptionProps) {

	return (
		<>
			<button
				className="option-wrapper"
				style={{ color: `${props.textColor}` }}>
				<div style={{marginTop: "1px"}}>
				<Emoji emoji='smiley' set='apple' size={26} />
				</div>
				<div className="option-text">{props.text.toUpperCase()}</div>
			</button>
		</>
	);
}

export default MasonryOption;
