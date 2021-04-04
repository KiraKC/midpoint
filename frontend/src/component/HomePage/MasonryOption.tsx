import '../../styles/HomePage/MasonryOption.css';
import React from 'react';
import { Emoji } from 'emoji-mart'

interface MasonryOptionProps {
	id: string,
	emoji: string,
	value: string,
	textColor: string,
}

function MasonryOption(props: MasonryOptionProps) {

	return (
		<button
			className="option-wrapper"
			style={{ color: `${props.textColor}` }}>
			<div style={{ marginTop: "1px" }}>
				<Emoji emoji={props.emoji} set='apple' size={26} />
			</div>
			<div className="option-text">{props.value.toUpperCase()}</div>
		</button>
	);
}

export default MasonryOption;
