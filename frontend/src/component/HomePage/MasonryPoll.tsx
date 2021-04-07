import '../../styles/HomePage/MasonryPoll.css';
import MasonryOption from './MasonryOption';
import { Emoji } from 'emoji-mart';
import IOption from '../../interfaces/IOption';
import { useEffect, useState } from 'react';
import firebase from 'firebase';
import axios from 'axios';
import endpointUrl from '../../constants/Endpoint';

interface MasonryPollProps {
	id: string,
	question: string,
	emoji: string,
	answerOption: IOption[],
	isLoggedIn: boolean
	setIsLoginModalOpen: any
}

function MasonryPoll(props: MasonryPollProps) {

	const [selectedOptionId, setSelectedOptionId]: [string, any] = useState("");

	const handleResponseToPoll = async (optionId: string) => {
		if (props.isLoggedIn) {
			const userId = await firebase.auth().currentUser.getIdToken(true)
			const toSend = {
				pollId: props.id,
				answerOptionId: optionId,
				userIdToken: userId,
			}
			console.log(toSend)
			const config = {
				headers: {
					"Content-Type": "application/json",
					'Access-Control-Allow-Origin': '*',
				}
			}
			axios.post(
				endpointUrl + '/poll/anon-answer',
				toSend,
				config,
			)
				.then(res => {
					if (res.data.status) {
						console.log(res.data.miniStats);
						setSelectedOptionId(optionId);
					} else {
						console.log("Option Selection Failed")
					}
				})
				.catch(e => {
					console.log(e);
				});
		} else {
			props.setIsLoginModalOpen(true);
		}
	}

	const colorBank = ["#2274A5", "#D83282", "#0B5EA9", "#13BE8B", "#494848", "#464D77", "#E26D5A", "#F24343", "#274690", "#7F5A83",
		"#B33951", "#264779", "#B36A5E", "#344966", "#A4303F", "#CF5C36", "#70A288", "#2ABC88", "#86BBEC", "#246A73"]

	const randomColor = () => {
		return colorBank[Math.floor((Math.random() * 100000)) % 20];
	}

	const selectedColor = randomColor();


	if (selectedOptionId === '') {
		return (
			<div className="masonary-poll-wrapper" >
				<div className="masonary-background" style={{
					backgroundColor: `${selectedColor}`
				}}></div>
				<Emoji emoji={props.emoji} set='apple' size={35} />
				<div className="masonary-poll-heading">{props.question}</div>
				{props.answerOption.map((option, index) => (
					<MasonryOption key={index} id={option.id} value={option.value}
						emoji={option.emoji} textColor={selectedColor}
						isLoggedIn={props.isLoggedIn} setIsLoginModalOpen={props.setIsLoginModalOpen}
						setSelectedOptionId={setSelectedOptionId} clickHandler={handleResponseToPoll} />
				))}
			</div>
		);
	} else {
		return (
			<div className="masonary-poll-wrapper" >
				<div className="masonary-background" style={{
					backgroundColor: `${selectedColor}`
				}}></div>
				<Emoji emoji={props.emoji} set='apple' size={35} />
				<div className="masonary-poll-heading">{props.question}</div>
				
			</div>
		)
	}
	
}

export default MasonryPoll;
