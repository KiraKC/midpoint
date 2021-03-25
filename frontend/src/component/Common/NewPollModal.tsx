import Modal from 'react-modal';
import React from "react";
import '../../styles/Common/NewPollModal.css'
import CategoryButton from './CategoryButton';
import 'emoji-mart/css/emoji-mart.css'
import { Emoji, Picker } from 'emoji-mart'
import { useState } from 'react';
import axios from 'axios';
import OptionPanel from './OptionPanel';
import OptionButton from './OptionButton';

interface INewPollModal {
	isModalOpen: boolean,
	setIsModalOpen: any
}

interface IPollOption {
	value: string,
	emoji: string
}

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		width: 'min(650px, 85vw)',
		height: 'max-content',
		transform: 'translate(-50%, -50%)',
		borderRadius: '20px',
		border: '3px solid black',
		paddingTop: '30px',
		paddingBottom: '30px',
		paddingLeft: '30px'
	}
};

function NewPollModal(props: INewPollModal) {

	Modal.setAppElement("#root")

	const [pollEmojiArray, setPollEmojiArray]: [string[], any] = useState(['watermelon', 'smile']);
	const [isEmojiOpenArray, setIsEmojiOpenArray]: [boolean[], any] = useState([false, false]);
	const [textFieldValue, setTextFieldValue]: [string[], any] = useState(['', '']);

	const [questionText, setQuestionText]: [string, any] = useState('');
	const [questionEmoji, setQuestionEmoji]: [string, any] = useState('earth_asia')
	const [questionEmojiOpen, setQuestionEmojiOpen]: [boolean, any] = useState(false)

	const [categories, setCategories]: [string[], any] = useState([])
	const [numOfOptions, setNumOfOptions]: [number, any] = useState(2);

	const getOptionsArray = () => {
		const optionArray: IPollOption[] = [];
		for (let i = 0; i < numOfOptions; i++) {
			let option: IPollOption = {
				value: textFieldValue[i],
				emoji: pollEmojiArray[i]
			}
			optionArray.push(option)
		}
		return optionArray
	}
	const handleSubmit = () => {
		const toSend = {
			creatorId: 123,
			emoji: questionEmoji,
			question: questionText,
			answerOptions: getOptionsArray(),
			taggedCategories: categories
		}
		console.log(toSend)
		const config = {
			headers: {
				"Content-Type": "application/json",
				'Access-Control-Allow-Origin': '*',
			}
		}
		axios.post(
			"http://localhost:4567/poll/new",
			toSend,
			config,
		)
			.then(response => {
				return response.data;
			})
			.catch(e => {
				console.log(e);
			});
	}

	const optionPanelProp = {
		pollEmojiArray: pollEmojiArray,
		setPollEmojiArray: setPollEmojiArray,
		isEmojiOpenArray: isEmojiOpenArray,
		setIsEmojiOpenArray: setIsEmojiOpenArray,
		textFieldValue: textFieldValue,
		setTextFieldValue: setTextFieldValue,
		numOfOptions: numOfOptions,
		setNumOfOptions: setNumOfOptions
	}

	const handleIncrement = () => {
		if (numOfOptions < 6) {
			setNumOfOptions(numOfOptions + 1)
			let tempIsOpenArray = isEmojiOpenArray;
			tempIsOpenArray.push(false);
			setIsEmojiOpenArray([...tempIsOpenArray])
			let tempTextFieldValue = textFieldValue;
			tempTextFieldValue.push('');
			setTextFieldValue([...tempTextFieldValue])
			let tempPollEmojiArray = pollEmojiArray;
			tempPollEmojiArray.push('star-struck');
			setPollEmojiArray([...tempPollEmojiArray])
		} else {
			// TODO: error message somewhere
		}

	}

	const handleDecrement = () => {
		if (numOfOptions > 2) {
			setNumOfOptions(numOfOptions - 1)
			let tempIsOpenArray = isEmojiOpenArray;
			tempIsOpenArray.pop();
			setIsEmojiOpenArray([...tempIsOpenArray])
			let tempTextFieldValue = textFieldValue;
			tempTextFieldValue.pop();
			setTextFieldValue([...tempTextFieldValue])
			let tempPollEmojiArray = pollEmojiArray;
			tempPollEmojiArray.pop();
			setPollEmojiArray([...tempPollEmojiArray])
		} else {
			// TODO: error message somewhere
		}
	}

	return (
		<div>
			<Modal
				isOpen={props.isModalOpen}
				// onRequestClose={() => props.setIsModalOpen(false)}
				contentLabel="Example Modal"
				style={customStyles}>
				<div className="poll-modal-wrapper">
					<div className="poll-modal-wrapper-flex">
						<div className="poll-modal-heading">Create New Poll</div>
						<div style={{ display: 'flex' }}>
							<button className="poll-modal-close" onClick={() => props.setIsModalOpen(false)}>
								<span className="material-icons">close</span>
								<div className="poll-modal-close-text">CLOSE</div>
							</button>
							<button className="poll-modal-close" onClick={() => { props.setIsModalOpen(false); handleSubmit() }}>
								<span className="material-icons" style={{ marginRight: '3px' }}>poll</span>
								<div className="poll-modal-close-text">SUBMIT</div>
							</button>
						</div>
					</div>

					<div className="poll-section-heading">Enter a question</div>
					<div className="poll-modal-input-module display-relative">
						<button className="emoji-picker-button" onClick={() => setQuestionEmojiOpen(!questionEmojiOpen)}><Emoji emoji={questionEmoji} set='apple' size={25} /></button>
						{questionEmojiOpen ? <div className="emoji-picker"><Picker title='Pick your emoji…' emoji='point_up' onClick={(emoji) => { setQuestionEmoji(emoji.id); setQuestionEmojiOpen(false) }} /></div> : ''}
						<div className="poll-modal-question-desc-emoji">EMOJI</div>
						<input className="poll-modal-question-input" type="text"
							placeholder="What's on your curious mind?" onChange={(e) => { setQuestionText(e.target.value) }}></input>
						<div className="poll-modal-question-desc-question">QUESTION</div>
					</div>

					<div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'flex-end' }}>
						<div className="poll-section-heading">Provide some options</div>
						<div style={{display: 'flex', marginBottom: '15px', marginRight: '5px'}}>
							<OptionButton text={'add'} handler={handleIncrement} />
							<OptionButton text={'remove'} handler={handleDecrement} />
						</div>

					</div>
					<OptionPanel {...optionPanelProp} />

					<div style={{ marginTop: '15px', marginBottom: '20px' }} className="poll-section-heading">Finally, choose (several) categories</div>
					<div className="poll-modal-input-module display-flex">
						<CategoryButton emoji="basketball" text="sports" highlightColor={"#74AEBB"} categories={categories} setCategories={setCategories} />
						<CategoryButton emoji="mega" text="politics" highlightColor={"#D83282"} categories={categories} setCategories={setCategories} />
						<CategoryButton emoji="joy" text="funny" highlightColor={"#1D5110"} categories={categories} setCategories={setCategories} />
						<CategoryButton emoji="classical_building" text="culture" highlightColor={"#2ABC88"} categories={categories} setCategories={setCategories} />
						<CategoryButton emoji="dancer" text="entertainment" highlightColor={"#905A00"} categories={categories} setCategories={setCategories} />
						<CategoryButton emoji="hamburger" text="food" highlightColor={"#494848"} categories={categories} setCategories={setCategories} />
						<CategoryButton emoji="school_satchel" text="education" highlightColor={"#F24343"} categories={categories} setCategories={setCategories} />
						<CategoryButton emoji="thinking_face" text="serious" highlightColor={"#B4154E"} categories={categories} setCategories={setCategories} />
						<CategoryButton emoji="cupid" text="relationship" highlightColor={"#C18FD2"} categories={categories} setCategories={setCategories} />
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default NewPollModal;
