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
import categoryArray from '../../constants/Category';
import endpointUrl from '../../constants/Endpoint';
import IPoll from '../../interfaces/IPoll';
import firebase from 'firebase';
import randomColor from '../../constants/Color';
import listOfEmojis, { randomEmoji } from '../../constants/Emoji';

interface INewPollModal {
	isModalOpen: boolean,
	setIsModalOpen: any,
	polls: IPoll[],
	setPolls: any,
	seenPollIds: string[],
	setSeenPollIds: any
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
		borderRadius: '30px',
		paddingTop: '30px',
		paddingBottom: '30px',
		paddingLeft: '40px',
		backgroundColor: 'rgba(255,255,255, 0.6)',
		backdropFilter: 'blur(20px)',
		boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.462), inset 0px 3px 12px rgba(255, 255, 255, 0.243)'
	}
};

function NewPollModal(props: INewPollModal) {

	Modal.setAppElement("#root")

	const [pollEmojiArray, setPollEmojiArray]: [string[], any] = useState([randomEmoji(), randomEmoji()]);
	const [isEmojiOpenArray, setIsEmojiOpenArray]: [boolean[], any] = useState([false, false]);
	const [textFieldValue, setTextFieldValue]: [string[], any] = useState(['', '']);
	const [optionHint, setOptionHint]: [string[], any] = useState(['ANSWER', 'ANSWER'])

	const [questionText, setQuestionText]: [string, any] = useState('');
	const [questionEmoji, setQuestionEmoji]: [string, any] = useState(randomEmoji())
	const [questionEmojiOpen, setQuestionEmojiOpen]: [boolean, any] = useState(false)
	const [questionHint, setQuestionHint]: [string, any] = useState('QUESTION')

	const [categories, setCategories]: [string[], any] = useState([])
	const [numOfOptions, setNumOfOptions]: [number, any] = useState(2);
	const [imageUrl, setImageUrl]: [string, any] = useState('');
	const [imageHint, setImageHint]: [string, any] = useState('IMAGE URL');

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

	function checkIfDuplicateExists(myArray: string[]) {
		return new Set(myArray).size !== myArray.length
	}

	const isSubmissionValid = () => {
		let isValid = true;
		if (questionText === '') {
			setQuestionHint("QUESTION CANNOT BE EMPTY")
			isValid = false;
		}
		for (let i = 0; i < textFieldValue.length; i++) {
			if (textFieldValue[i] === '') {
				let tempHint = optionHint;
				tempHint[i] = "CANNOT HAVE EMPTY OPTION";
				setOptionHint([...tempHint])
				isValid = false;
			}
		}
		if (checkIfDuplicateExists(textFieldValue)) {
			setQuestionHint("THERE ARE DUPLICATE ANSWERS")
			isValid = false;
		}
		if (categories.length < 1) {
			setQuestionHint("PLEASE CHOOSE AT LEAST 1 CATEGORY")
			isValid = false;
		}
		if (isUriImage(imageUrl) === false) {
			setImageHint("PLEASE INCLUDE A VALID IMAGE FILE")
			isValid = false;
		}
		return isValid;
	}

	const cleanUpData = () => {
		setPollEmojiArray([randomEmoji(), randomEmoji()]);
		setIsEmojiOpenArray([false, false]);
		setTextFieldValue(['', '']);
		setOptionHint(['ANSWER', 'ANSWER'])
		setQuestionText('')
		setQuestionEmoji(randomEmoji())
		setQuestionEmojiOpen(false)
		setImageHint('IMAGE URL')
		setCategories([])
		setImageUrl('')
		setNumOfOptions(2)
		setQuestionHint("QUESTION")
	}

	const handleSubmit = async () => {
		const userId = await firebase.auth().currentUser.getIdToken(true)
		const toSend = {
			creatorId: userId,
			emoji: questionEmoji,
			question: questionText,
			answerOptions: getOptionsArray(),
			taggedCategories: categories,
			color: randomColor(),
			imageUrl: imageUrl
		}
		console.log(toSend)
		const config = {
			headers: {
				"Content-Type": "application/json",
				'Access-Control-Allow-Origin': '*',
			}
		}
		if (isSubmissionValid()) {
			axios.post(
				endpointUrl + '/poll/new',
				toSend,
				config,
			)
				.then(response => {
					const newPoll: IPoll = {
						id: response.data.newPoll.id,
						question: toSend.question,
						emoji: toSend.emoji,
						answerOptions: response.data.newPoll.answerOptions,
						color: toSend.color,
						imageUrl: response.data.newPoll.imageUrl,
						numClicks: response.data.newPoll.numClicks
					}
					let tempSeenIds = props.seenPollIds;
					tempSeenIds.push(newPoll.id)
					props.setSeenPollIds([...tempSeenIds])
					let tempPoll = props.polls;
					tempPoll.unshift(newPoll)
					props.setPolls([...tempPoll])
					props.setIsModalOpen(false);
					cleanUpData();
					return response.data;
				})
				.catch(e => {
					console.log(e);
				});
		}
	}

	const optionPanelProp = {
		pollEmojiArray: pollEmojiArray,
		setPollEmojiArray: setPollEmojiArray,
		isEmojiOpenArray: isEmojiOpenArray,
		setIsEmojiOpenArray: setIsEmojiOpenArray,
		textFieldValue: textFieldValue,
		setTextFieldValue: setTextFieldValue,
		numOfOptions: numOfOptions,
		setNumOfOptions: setNumOfOptions,
		optionHint: optionHint,
		setOptionHint: setOptionHint
	}

	const handleIncrement = () => {
		if (numOfOptions < 12) {
			setNumOfOptions(numOfOptions + 1)
			let tempIsOpenArray = isEmojiOpenArray;
			tempIsOpenArray.push(false);
			setIsEmojiOpenArray([...tempIsOpenArray])
			let tempTextFieldValue = textFieldValue;
			tempTextFieldValue.push('');
			setTextFieldValue([...tempTextFieldValue])
			let tempPollEmojiArray = pollEmojiArray;
			tempPollEmojiArray.push(listOfEmojis[numOfOptions - 2]);
			setPollEmojiArray([...tempPollEmojiArray])
			let tempOptionHint = optionHint;
			tempOptionHint.push('ANSWER');
			setOptionHint([...tempOptionHint])
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
			let tempOptionHint = optionHint;
			tempOptionHint.pop();
			setOptionHint([...tempOptionHint])
		}
	}

	var isUriImage = function (uri) {
		uri = uri.split('?')[0];
		var parts = uri.split('.');
		var extension = parts[parts.length - 1];
		var imageTypes = ['jpg', 'jpeg', 'tiff', 'png', 'gif', 'bmp', 'webp'];
		if (imageTypes.indexOf(extension) !== -1) {
			return true;
		}
		return false;
	}

	return (
		<div>
			<Modal
				isOpen={props.isModalOpen}
				contentLabel="Example Modal"
				style={customStyles}>
				<div className="poll-modal-wrapper">
					<div className="poll-modal-wrapper-flex">
						<div className="poll-modal-heading">Create New Poll</div>
						<div style={{ display: 'flex' }}>
							<button className="poll-modal-close" onClick={() => { props.setIsModalOpen(false); cleanUpData() }}>
								<span className="material-icons">close</span>
								<div className="poll-modal-close-text">CLOSE</div>
							</button>
						</div>
					</div>

					<div className="poll-section-heading">1. Enter a question</div>
					<div className="poll-modal-input-module display-relative">
						<button className="emoji-picker-button"
							onClick={() => setQuestionEmojiOpen(!questionEmojiOpen)}
							onBlur={() => setQuestionEmojiOpen(false)}>
							<Emoji emoji={questionEmoji} set='apple' size={23} />
						</button>
						{questionEmojiOpen ? <div className="emoji-picker"><Picker title='Pick your emoji…' emoji='point_up' onClick={(emoji) => { setQuestionEmoji(emoji.id); setQuestionEmojiOpen(false) }} /></div> : ''}
						<div className="poll-modal-question-desc-emoji">EMOJI</div>
						<input className="poll-modal-question-input" type="text"
							placeholder="What's on your curious mind?"
							onChange={(e) => { setQuestionText(e.target.value); setQuestionHint("QUESTION") }}></input>
						<div className="poll-modal-question-desc-question"
							style={{ color: (questionHint == 'QUESTION' ? 'black' : '#F24443') }}
						>{questionHint}</div>
					</div>

					<div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'flex-end' }}>
						<div className="poll-section-heading">2. Provide some options</div>
						<div style={{ display: 'flex', marginRight: '5px' }}>
							<OptionButton text={'add'} handler={handleIncrement} />
							<OptionButton text={'remove'} handler={handleDecrement} />
						</div>
					</div>
					<OptionPanel {...optionPanelProp} />
					<div className="poll-section-heading">3. Optionally, add an image to your poll</div>
					<div className="poll-modal-input-module display-relative">
						<input className="poll-image-url-input" type="text"
							placeholder="Image URL, starts with https://"
							onChange={(e) => { setImageUrl(e.target.value); setImageHint("IMAGE URL") }}></input>
						<div className="poll-modal-image-url-hint"
							style={{ color: (imageHint == 'IMAGE URL' ? 'black' : '#F24443') }}
						>{imageHint}</div>
					</div>

					<div style={{ marginTop: '20px', marginBottom: '15px' }} className="poll-section-heading">3. Finally, choose (several) categories</div>
					<div className="poll-modal-input-module display-flex">
						{categoryArray.map((e, i) => (
							<CategoryButton
								key={i}
								emoji={e.emoji}
								text={e.text}
								highlightColor={e.highlightColor}
								categories={categories}
								setCategories={setCategories}
							/>
						))}
					</div>
					<div className="on-the-right">
						<button className="poll-modal-submit" onClick={() => { handleSubmit() }}>
							<span className="material-icons" style={{ marginRight: '3px' }}>done</span>
							<div className="poll-modal-close-text">Let's Go!</div>
						</button>
					</div>
				</div>

			</Modal>
		</div>
	);
}

export default NewPollModal;
