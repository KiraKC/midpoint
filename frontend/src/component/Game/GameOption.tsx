import '../../styles/Game/GameBox.css'
import { Emoji } from "emoji-mart";
import { useEffect, useState } from 'react';

interface IGameOptionProps {
	id: string,
	emoji: string,
	value: string,
	setSelectedOptionId: any
}

function GameOption(props: IGameOptionProps) {

	return (
		<button className="game-option-button" onClick={() => props.setSelectedOptionId(props.id)}>
			<Emoji emoji={props.emoji} set='apple' size={30} />
			<span style={{marginLeft: '10px'}}>{props.value.toUpperCase()}</span>
		</button>
	);
}

export default GameOption;
