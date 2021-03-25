import { Emoji, Picker } from "emoji-mart";
import React from "react";
import '../../styles/Common/NewPollModal.css'

interface IOptionItemProps {
	optionIndex: number,
	pollEmojiArray: string[],
	setPollEmojiArray: any,
	isEmojiOpenArray: boolean[],
	setIsEmojiOpenArray: any,
	textFieldValue: string[],
	setTextFieldValue: any
}

function OptionItem(props: IOptionItemProps) {

	const index = props.optionIndex;
	const pollEmojiArray = props.pollEmojiArray;
	const setPollEmojiArray = props.setPollEmojiArray;
	const isEmojiOpenArray = props.isEmojiOpenArray;
	const setIsEmojiOpenArray = props.setIsEmojiOpenArray;
	const textFieldValue = props.textFieldValue;
	const setTextFieldValue = props.setTextFieldValue;

	const handlePollEmoji = (emoji: any, index: number) => {
		let tempEmojiArray = pollEmojiArray;
		tempEmojiArray[index] = emoji.id;
		setPollEmojiArray([...tempEmojiArray]);

		let tempEmojiOpenArray = isEmojiOpenArray;
		tempEmojiOpenArray[index] = false;
		setIsEmojiOpenArray([...tempEmojiOpenArray])
	}

	const handleEmojiOpen = (index: number) => {
		let tempEmojiOpenArray = isEmojiOpenArray;
		tempEmojiOpenArray[index] = !tempEmojiOpenArray[index];
		setIsEmojiOpenArray([...tempEmojiOpenArray])
		console.log(tempEmojiOpenArray)
	}

	const handleTextChange = (e: any, index: number) => {
		let tempTextFieldValue = textFieldValue;
		tempTextFieldValue[index] = e.target.value;
		console.log(tempTextFieldValue)
		setTextFieldValue([...tempTextFieldValue])
	}

	return (
		<div className="poll-modal-input-module display-relative">
			<button className="emoji-picker-button"
			 onClick={() => handleEmojiOpen(index)}><Emoji emoji={pollEmojiArray[index]} set='apple' size={25} /></button>
			{isEmojiOpenArray[index] ? <div className="emoji-picker"><Picker title='Pick your emoji…' emoji='point_up' onClick={(emoji) => handlePollEmoji(emoji, index)} /></div> : ''}
			<div className="poll-modal-question-desc-emoji">EMOJI</div>
			<input className="poll-modal-question-input" type="text"
				placeholder={`Enter Option ${props.optionIndex + 1}`} onChange={(e) => { handleTextChange(e, index) }}></input>
			<div className="poll-modal-question-desc-question">ANSWER</div>
		</div>
	);
}

export default OptionItem;
