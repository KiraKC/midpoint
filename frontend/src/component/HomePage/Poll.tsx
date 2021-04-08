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
			let status:boolean = await handleAnonAnswer(optionId);
      if (status) {
        await handleCheckOff();
      }
		} else {
			props.setIsLoginModalOpen(true);
		}
	}

  const handleAnonAnswer = async (optionId: string) : Promise<boolean> => {
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
			return axios.post(
				endpointUrl + '/poll/anon-answer',
				toSend,
				config,
			)
				.then(res => {
					if (res.data.status) {
						setStats(res.data.miniStats);
						setSelectedOptionId(optionId);
            return true;
					} else {
						console.log("Option Selection Failed")
            return false;
					}
				})
				.catch(e => {
					console.log(e);
          return false;
				});
  }

  const handleCheckOff = async () : Promise<boolean> => {
    const userId = await firebase.auth().currentUser.getIdToken(true)
			const toSend = {
				pollId: props.id,
				userIdToken: userId,
			}
			console.log(toSend)
			const config = {
				headers: {
					"Content-Type": "application/json",
					'Access-Control-Allow-Origin': '*',
				}
			}
			return axios.post(
				endpointUrl + '/poll/check-off',
				toSend,
				config,
			)
				.then(res => {
					if (res.data.status) {
            return true;
					} else {
						console.log("Option Selection Failed")
            return false;
					}
				})
				.catch(e => {
					console.log(e);
          return false;
				});
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
