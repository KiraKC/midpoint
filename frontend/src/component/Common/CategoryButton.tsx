import { Emoji } from "emoji-mart";
import React, { useState } from "react";
import '../../styles/Common/CategoryButton.css'

interface ICategoryButtonProps {
	emoji: string,
	text: string,
	highlightColor: string
}

function CategoryButton(props: ICategoryButtonProps) {

	const [selected, setSelected]: [boolean, any] = useState(false)
	return (
		<button className="category-button">
			<div style={{marginTop: '3px'}}><Emoji emoji={props.emoji} set='apple' size={16} /></div>
			<div style={{marginLeft: '5px'}}>{props.text}</div>
		</button>
	);
}

export default CategoryButton;
