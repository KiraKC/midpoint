import '../../styles/HomePage/MasonryPoll.css';
import { Emoji } from 'emoji-mart';
import IOption from '../../interfaces/IOption';
import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import axios from 'axios';
import endpointUrl from '../../constants/Endpoint';
import AnsweredOption from './AnsweredOption';
import MasonryOption from './PollOption';

interface MasonryPollProps {
	id: string,
	question: string,
	emoji: string,
	color: string,
	answerOption: IOption[],
	isLoggedIn: boolean
	setIsLoginModalOpen: any
}

function MasonryPoll(props: MasonryPollProps) {

	const [selectedOptionId, setSelectedOptionId]: [string, any] = useState("");
	const [stats, setStats] = useState({})
	
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
						setStats(res.data.miniStats);
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

	if (selectedOptionId === '') {
		return (
			<div className="masonary-poll-wrapper" >
				<div className="masonary-background" style={{
					backgroundColor: `${props.color}`
				}}></div>
				<Emoji emoji={props.emoji} set='apple' size={35} />
				<div className="masonary-poll-heading">{props.question}</div>
				{props.answerOption.map((option, index) => (
					<MasonryOption key={index} id={option.id} value={option.value}
						emoji={option.emoji} textColor={props.color}
						isLoggedIn={props.isLoggedIn} setIsLoginModalOpen={props.setIsLoginModalOpen}
						setSelectedOptionId={setSelectedOptionId} clickHandler={handleResponseToPoll}/>
				))}
			</div>
		);
	} else {
		return (
			<div className="masonary-poll-wrapper" >
				<div className="masonary-background" style={{
					backgroundColor: `${props.color}`
				}}></div>
				<Emoji emoji={props.emoji} set='apple' size={35} />
				<div className="masonary-poll-heading">{props.question}</div>
				{props.answerOption.map((option, index) => (
					<AnsweredOption key={index} id={option.id} value={option.value}
						emoji={option.emoji} textColor={props.color}
						isLoggedIn={props.isLoggedIn} setIsLoginModalOpen={props.setIsLoginModalOpen}
						setSelectedOptionId={setSelectedOptionId} percentage={stats[option.id]}/>
				))}
			</div>
		)
	}
	
}

export default MasonryPoll;
