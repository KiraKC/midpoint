import { Emoji, Picker } from "emoji-mart";
import '../../styles/Common/NewPollModal.css'

interface IOptionItemProps {
	optionIndex: number,
	pollEmojiArray: string[],
	setPollEmojiArray: any,
	isEmojiOpenArray: boolean[],
	setIsEmojiOpenArray: any,
	textFieldValue: string[],
	setTextFieldValue: any,
	optionHint: string[],
	setOptionHint: any
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
		// close all other emoji picker
		for (let i = 0; i < tempEmojiOpenArray.length; i++) {
			index !== i ? tempEmojiOpenArray[i] = false : tempEmojiOpenArray[index] = !tempEmojiOpenArray[index];
		}
		setIsEmojiOpenArray([...tempEmojiOpenArray])
	}

	const handleTextChange = (e: any, index: number) => {
		let tempTextFieldValue = textFieldValue;
		tempTextFieldValue[index] = e.target.value;
		if (props.optionHint[index] !== "ANSWER") {
			let tempHint = props.optionHint;
			tempHint[index] = "ANSWER";
			props.setOptionHint([...tempHint])
		}
		setTextFieldValue([...tempTextFieldValue])
	}

	return (
		<div className="poll-modal-input-module display-relative">
			<button className="emoji-picker-button"
				onClick={() => handleEmojiOpen(index)}><Emoji emoji={pollEmojiArray[index]} set='apple' size={23} /></button>
			{isEmojiOpenArray[index] ? <div className="emoji-picker"><Picker title='Pick your emoji…' emoji='point_up' onClick={(emoji) => handlePollEmoji(emoji, index)} /></div> : ''}
			<div className="poll-modal-question-desc-emoji">EMOJI</div>
			<input className="poll-modal-question-input" type="text"
				placeholder={`Enter Option ${props.optionIndex + 1}`} onChange={(e) => { handleTextChange(e, index) }}></input>
			<div className="poll-modal-question-desc-question"
				style={{ color: (props.optionHint[index] === 'ANSWER' ? 'black' : '#F24443') }}>
				{props.optionHint[index]}
			</div>
		</div>
	);
}

export default OptionItem;
