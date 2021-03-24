import '../../styles/HomePage/MasonryPoll.css';
import React from 'react';
import MasonryOption from './MasonryOption';
import { Emoji } from 'emoji-mart';

interface MasonryPollProps {
	height: number;
	text: string;
}

function MasonryPoll(props: MasonryPollProps) {


	const colorBank = ["#74AEBB", "#D83282", "#0B5EA9", "#13BE8B", "#494848", "#D66EBF", "#905A00", "#F24343", "#B4154E", "#C18FD2", 
	"#328F1A", "#264779", "#FFA61B", "#FE7EAC", "#1D5110", "#FF8D24", "#88BC1B", "#2ABC88", "#86BBEC", "#FFDA1B"]

	const randomColor = () => {
		return colorBank[Math.floor((Math.random() * 100000)) % 20];
	}

	const selectedColor = randomColor();

	return (
		<div className="masonary-poll-wrapper" style={{
			backgroundColor: `${selectedColor}`
		}}>
			<Emoji emoji='cop' set='apple' size={35} />
			<div className="masonary-poll-heading">{props.text}</div>
			<MasonryOption emoji="hello" text="Biden" textColor={selectedColor} />
			<MasonryOption emoji="Sad" text="Trump" textColor={selectedColor} />

		</div>
	);
}

export default MasonryPoll;
