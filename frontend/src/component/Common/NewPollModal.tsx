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
		borderRadius: '40px',
		paddingTop: '30px',
		paddingBottom: '30px',
		paddingLeft: '30px',
		backgroundColor: 'rgba(255,255,255, 0.6)',
		backdropFilter: 'blur(20px)',
		boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.462), inset 0px 3px 12px rgba(255, 255, 255, 0.243)'
	}
};

function NewPollModal(props: INewPollModal) {

	Modal.setAppElement("#root")

	const [pollEmojiArray, setPollEmojiArray]: [string[], any] = useState(['watermelon', 'smile']);
	const [isEmojiOpenArray, setIsEmojiOpenArray]: [boolean[], any] = useState([false, false]);
	const [textFieldValue, setTextFieldValue]: [string[], any] = useState(['', '']);
	const [optionHint, setOptionHint]: [string[], any] = useState(['ANSWER', 'ANSWER'])

	const [questionText, setQuestionText]: [string, any] = useState('');
	const [questionEmoji, setQuestionEmoji]: [string, any] = useState('earth_asia')
	const [questionEmojiOpen, setQuestionEmojiOpen]: [boolean, any] = useState(false)
	const [questionHint, setQuestionHint]: [string, any] = useState('QUESTION')

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
		return isValid;
	}

	const cleanUpData = () => {
		setPollEmojiArray(['watermelon', 'smile']);
		setIsEmojiOpenArray([false, false]);
		setTextFieldValue(['', '']);
		setOptionHint(['ANSWER', 'ANSWER'])
		setQuestionText('')
		setQuestionEmoji('earth_asia')
		setQuestionEmojiOpen(false)
		setCategories([])
		setNumOfOptions(2)
		setQuestionHint("QUESTION")
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
		console.log(isSubmissionValid())
		if (isSubmissionValid()) {
			props.setIsModalOpen(false);
			axios.post(
				"http://localhost:4567/poll/new",
				toSend,
				config,
			)
				.then(response => {
					cleanUpData()
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

	const categoryArray = [
		{ emoji: "basketball", text: "sports", highlightColor: "#74AEBB"},
		{ emoji: "mega", text: "politics", highlightColor: "#D83282"},
		{ emoji: "joy", text: "funny", highlightColor: "#1D5110"},
		{ emoji: "classical_building", text: "culture", highlightColor: "#2ABC88"},
		{ emoji: "dancer", text: "entertainment", highlightColor: "#905A00"},
		{ emoji: "hamburger", text: "food", highlightColor: "#494848"},
		{ emoji: "school_satchel", text: "education", highlightColor: "#F24343"},
		{ emoji: "thinking_face", text: "serious", highlightColor: '#B4154E'},
		{ emoji: "cupid", text: "relationship", highlightColor: '#C18FD2'},

		{ emoji: "heart_eyes", text: "cute", highlightColor:"#FF8D24"},
		{ emoji: "house_with_garden", text: "lifestyle", highlightColor:"#1D5110"},
		{ emoji: "newspaper", text: "news", highlightColor:"#0B5EA9"},
		{ emoji: "frog", text: "nature", highlightColor:"#328F1A"},

		{ emoji: "woman_cartwheeling", text: "health & fitness", highlightColor:"#86BBEC"},
		{ emoji: "nail_care", text: "beauty", highlightColor: '#FE7EAC'},
		{ emoji: "file_folder", text: "entrepreneurship", highlightColor: '#264779'},
		{ emoji: "video_game", text: "gaming", highlightColor: '#74AEBB'},
		{ emoji: "clapper", text: "movies", highlightColor: '#EF8E96'},
		{ emoji: "sunglasses", text: "celebrities", highlightColor: '#FFE817'},
		{ emoji: "microscope", text: "science", highlightColor: '#494848'},
		{ emoji: "briefcase", text: "business", highlightColor: '#905A00'},
		{ emoji: "books", text: "books", highlightColor: '#FA8920'},
		{ emoji: "art", text: "design", highlightColor: '#A6D5FF'},

		{ emoji: "mechanical_arm", text: "technology", highlightColor: '#FFA8EC'},
		{ emoji: "womans_hat", text: "fashion", highlightColor: '#FFA61B'},
		{ emoji: "scroll", text: "history", highlightColor: '#C18FD2'},
		{ emoji: "musical_note", text: "music", highlightColor: '#B4154E'},
		{ emoji: "speech_balloon", text: "languages", highlightColor: '#F43030'},

	]

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
							<button className="poll-modal-close" onClick={() => { props.setIsModalOpen(false); cleanUpData() }}>
								<span className="material-icons">close</span>
								<div className="poll-modal-close-text">CLOSE</div>

							</button>
						</div>
					</div>

					<div className="poll-section-heading">Enter a question</div>
					<div className="poll-modal-input-module display-relative">
						<button className="emoji-picker-button" onClick={() => setQuestionEmojiOpen(!questionEmojiOpen)}><Emoji emoji={questionEmoji} set='apple' size={25} /></button>
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
						<div className="poll-section-heading">Provide some options</div>
						<div style={{ display: 'flex', marginRight: '5px' }}>
							<OptionButton text={'add'} handler={handleIncrement} />
							<OptionButton text={'remove'} handler={handleDecrement} />
						</div>

					</div>
					<OptionPanel {...optionPanelProp} />
					<div style={{ marginTop: '20px', marginBottom: '15px' }} className="poll-section-heading">Finally, choose (several) categories</div>
					<div className="poll-modal-input-module display-flex">

					{categoryArray.map((e, i) => (
                    <CategoryButton
                        emoji={e.emoji}
                        text={e.text}
						highlightColor={e.highlightColor}
						categories={categories} 
						setCategories={setCategories}
                    />
                ))}
					</div>
					<button className="poll-modal-submit" onClick={() => { handleSubmit() }}>
						<span className="material-icons" style={{ marginRight: '3px' }}>done</span>
						<div className="poll-modal-close-text">Let's Go!</div>
					</button>
				</div>
			</Modal>
		</div>
	);
}

export default NewPollModal;
