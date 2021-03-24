import Modal from 'react-modal';
import React from "react";
import '../../styles/Common/NewPollModal.css'
import CategoryButton from './CategoryButton';
import 'emoji-mart/css/emoji-mart.css'
import { BaseEmoji, Emoji, Picker } from 'emoji-mart'
import { useState } from 'react';

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
		// height: 'max-content',
		height: '600px',
		transform: 'translate(-50%, -50%)',
		borderRadius: '20px',
		border: '3px solid black',
		padding: '30px'
	}
};

function NewPollModal(props: INewPollModal) {

	Modal.setAppElement("#root")

	const [emoji, setEmoji]: [string, any] = useState('watermelon');
	const [question, setQuestion]: [string, any] = useState('');
	const [isEmojiOpen, setIsEmojiOpen]: [boolean, any] = useState(false);
	const [categories, setCategories]: [string[], any] = useState([])

	const handleEmoji = (emoji: any) => {
		setEmoji(emoji.id);
		console.log(emoji.id)
		setIsEmojiOpen(false)
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
					<button className="poll-modal-close" onClick={() => props.setIsModalOpen(false)}>
						<span className="material-icons">close</span>
						<div className="poll-modal-close-text">CLOSE</div>
					</button>
				</div>
				<div className="poll-modal-input-module display-relative">
					<button className="emoji-picker-button" onClick={() => setIsEmojiOpen(!isEmojiOpen)}><Emoji emoji={emoji} set='apple' size={25} /></button>
					{isEmojiOpen ? <div className="emoji-picker"><Picker title='Pick your emoji…' emoji='point_up' onClick={(emoji, event) => handleEmoji(emoji)} /></div> : ''}
					<div className="poll-modal-question-desc-emoji">EMOJI</div>
					<input className="poll-modal-question-input" type="text"
						placeholder="What's on your curious mind?"></input>
					<div className="poll-modal-question-desc-question">QUESTION</div>
				</div>

				<div className="poll-modal-input-module display-flex">
					<CategoryButton emoji="cop" text="Sports" highlightColor={"black"}/>
					<CategoryButton emoji="cop" text="Sports" highlightColor={"black"}/>
					<CategoryButton emoji="cop" text="Sports" highlightColor={"black"}/>
					<CategoryButton emoji="cop" text="Sports" highlightColor={"black"}/>
					<CategoryButton emoji="cop" text="Sports" highlightColor={"black"}/>
					<CategoryButton emoji="cop" text="Sports" highlightColor={"black"}/>
				</div>
			</Modal>
		</div>
	);
}

export default NewPollModal;
