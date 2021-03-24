import Modal from 'react-modal';
import React from "react";
import '../../styles/Common/NewPollModal.css'
import CategoryButton from './CategoryButton';
import 'emoji-mart/css/emoji-mart.css'
import { Emoji, Picker } from 'emoji-mart'
import { useState } from 'react';
import axios from 'axios';

interface INewPollModal {
	isModalOpen: boolean,
	setIsModalOpen: any
}

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		width: 'min(1000px, 85vw)',
		height: 'max-content',
		transform: 'translate(-50%, -50%)',
		borderRadius: '20px',
		border: '3px solid black',
		padding: '30px'
	}
};

function NewPollModal(props: INewPollModal) {

	Modal.setAppElement("#root")

	const [pollEmojiArray, setPollEmojiArray]: [string[], any] = useState(['watermelon', 'smile', 'kissing_heart']);
	const [isEmojiOpenArray, setIsEmojiOpenArray]: [boolean[], any] = useState([false, false, false]);
	const [textFieldValue, setTextFieldValue]: [string[], any] = useState(['', '', '']);
	const [question, setQuestion]: [string, any] = useState('');
	const [categories, setCategories]: [string[], any] = useState([])

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
	}

	const handleTextChange = (e: any, index: number) => {
		let tempTextFieldValue = textFieldValue;
		tempTextFieldValue[index] = e.target.value;
		console.log(tempTextFieldValue)
		setTextFieldValue([...tempTextFieldValue])
	}

	const handleSubmit = () => {
		const toSend = {
			creatorId: 123,
			emoji: pollEmojiArray[0],
			question: textFieldValue[0],
			answerOptions:
				[{
					value: textFieldValue[1],
					emoji: pollEmojiArray[1]
				},
				{
					value: textFieldValue[1],
					emoji: pollEmojiArray[1]
				}],
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

	return (
		<div>
			<Modal
				isOpen={props.isModalOpen}
				// onRequestClose={() => props.setIsModalOpen(false)}
				contentLabel="Example Modal"
				style={customStyles}>
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
				<div className="poll-modal-input-module display-relative">
					<button className="emoji-picker-button" onClick={() => handleEmojiOpen(0)}><Emoji emoji={pollEmojiArray[0]} set='apple' size={25} /></button>
					{isEmojiOpenArray[0] ? <div className="emoji-picker"><Picker title='Pick your emoji…' emoji='point_up' onClick={(emoji, event) => handlePollEmoji(emoji, 0)} /></div> : ''}
					<div className="poll-modal-question-desc-emoji">EMOJI</div>
					<input className="poll-modal-question-input" type="text"
						placeholder="What's on your curious mind?" onChange={(e) => { handleTextChange(e, 0) }}></input>
					<div className="poll-modal-question-desc-question">QUESTION</div>
				</div>

				<div className="poll-modal-input-module display-relative">
					<button className="emoji-picker-button" onClick={() => handleEmojiOpen(1)}><Emoji emoji={pollEmojiArray[1]} set='apple' size={25} /></button>
					{isEmojiOpenArray[1] ? <div className="emoji-picker"><Picker title='Pick your emoji…' emoji='point_up' onClick={(emoji, event) => handlePollEmoji(emoji, 1)} /></div> : ''}
					<div className="poll-modal-question-desc-emoji">EMOJI</div>
					<input className="poll-modal-question-input" type="text"
						placeholder="Enter Option 1" onChange={(e) => { handleTextChange(e, 1) }}></input>
					<div className="poll-modal-question-desc-question">ANSWER 1</div>
				</div>

				<div className="poll-modal-input-module display-relative">
					<button className="emoji-picker-button" onClick={() => handleEmojiOpen(2)}><Emoji emoji={pollEmojiArray[2]} set='apple' size={25} /></button>
					{isEmojiOpenArray[2] ? <div className="emoji-picker"><Picker title='Pick your emoji…' emoji='point_up' onClick={(emoji, event) => handlePollEmoji(emoji, 2)} /></div> : ''}
					<div className="poll-modal-question-desc-emoji">EMOJI</div>
					<input className="poll-modal-question-input" type="text"
						placeholder="Enter Option 2" onChange={(e) => { handleTextChange(e, 2) }}></input>
					<div className="poll-modal-question-desc-question">ANSWER 2</div>
				</div>

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
			</Modal>
		</div>
	);
}

export default NewPollModal;
