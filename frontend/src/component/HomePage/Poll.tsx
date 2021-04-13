import '../../styles/HomePage/Poll.css';
import { Emoji } from 'emoji-mart';
import IOption from '../../interfaces/IOption';
import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import axios from 'axios';
import endpointUrl from '../../constants/Endpoint';
import AnsweredOption from './AnsweredOption';
import MasonryOption from './PollOption';
import { FacebookShareButton } from 'react-share';
import { Navigate, useNavigate } from 'react-router';

interface PollProps {
	id: string,
	question: string,
	emoji: string,
	color: string,
	answerOption: IOption[],
	isLoggedIn: boolean
	setIsLoginModalOpen: any
	imageUrl: string,
	answered: boolean,
	answeredStats?: {},
	numClicks: number,
	isCreated: boolean,
	refreshCreatedPage?: boolean,
	setRefreshCreatedPage?: any,
	setIsDeleteModalOpen?: any,
	confirmDelete?: boolean,
	selectedPollId?: string,
	setSelectedPollId?: any,
	setSelectedPollQuestion?: any
}

function Poll(props: PollProps) {

	const [selectedOptionValue, setSelectedOptionValue]: [string, any] = useState('');
	const [stats, setStats] = useState({})
	const [isShareModalOpen, setIsShareModalOpen]: [boolean, any] = useState(false);
	const navigate = useNavigate()

	useEffect(() => {
		if (props.confirmDelete && props.selectedPollId === props.id) {
			handleDelete();
		}
	}, [props.confirmDelete])

	const handleResponseToPoll = async (optionId: string, optionValue: string) => {
		if (props.isLoggedIn) {
			let status: boolean = await handleAnonAnswer(optionId, optionValue);
			if (status) {
				await handleCheckOff();
			}
		} else {
			props.setIsLoginModalOpen(true);
		}
	}

	const handleAnonAnswer = async (optionId: string, optionValue: string): Promise<boolean> => {
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
					setSelectedOptionValue(optionValue);
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

	const handleCheckOff = async (): Promise<boolean> => {
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

	const handleDelete = async () => {
		const userId = await firebase.auth().currentUser.getIdToken(true);
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
			endpointUrl + '/poll/delete',
			toSend,
			config,
		)
			.then(res => {
				if (res.data.status) {
					props.setRefreshCreatedPage(!props.refreshCreatedPage)
					props.setIsDeleteModalOpen(false);
					return true;
				} else {
					console.log("DELETION Failed")
					return false;
				}
			})
			.catch(e => {
				console.log(e);
				return false;
			});
	}

	const deleteButton = (
		<button className="poll-corner-delete"
			onClick={() => {
				props.setIsDeleteModalOpen(true);
				props.setSelectedPollId(props.id);
				props.setSelectedPollQuestion(props.question)
			}}>
			<span className="material-icons-outlined">delete</span>
			<div style={{ marginTop: '1px', marginLeft: '2px' }}>DELETE</div>
		</button>
	)

	const shareAndStats = (
		<div className="poll-corner-wrapper-flex">
			<button className="poll-corner-icon" onClick={() => navigate('/stats/' + props.id)}>
				<span className="material-icons-outlined">query_stats</span>
			</button>
			<FacebookShareButton
				children={<div className="poll-corner-icon"><span className="material-icons-outlined">share</span></div>}
				url={'https://www.midpoint.fun/poll' + props.id}
				quote={"Found this poll on MidPoint.Fun, let me know what you think!"}
				hashtag={"#TakeThePoll"}
				style={{ outline: 'none', border: 'none' }} />
		</div>
	)

	if (props.answered === true && selectedOptionValue === '') {
		return (
			<div className="masonry-poll-wrapper" >
				<div className="masonry-background" style={{
					backgroundColor: `${props.color}`
				}}></div>
				<div className="poll-top-flex">
					<Emoji emoji={props.emoji} set='apple' size={35} />
					{props.isCreated ? deleteButton : shareAndStats}
				</div>
				<div className="masonry-poll-heading">{props.question}</div>
				<div className="selection-hint" >TOTAL RESPONSES: {props.numClicks}</div>
				{props.imageUrl !== '' ? <img className="masonry-poll-img" src={props.imageUrl}></img> : ''}
				{props.answerOption.map((option, index) => (
					<AnsweredOption key={index} id={option.id} value={option.value}
						emoji={option.emoji} textColor={props.color}
						percentage={props.answeredStats[option.id]} />
				))}
				<div className="selection-hint" style={{ marginTop: '12px' }}>YOU'VE ANSWERED THIS POLL</div>
			</div>
		)
	}
	
	if (selectedOptionValue !== '') {
		return (
			<div className="masonry-poll-wrapper" >
				<div className="masonry-background" style={{
					backgroundColor: `${props.color}`
				}}></div>
				<div className="poll-top-flex">
					<Emoji emoji={props.emoji} set='apple' size={35} />
					{props.isCreated ? deleteButton : shareAndStats}
				</div>
				<div className="masonry-poll-heading">{props.question}</div>
				<div className="selection-hint">TOTAL RESPONSES: {props.numClicks + 1}</div>
				{props.imageUrl !== '' ? <img className="masonry-poll-img" src={props.imageUrl}></img> : ''}
				{props.answerOption.map((option, index) => (
					<AnsweredOption key={index} id={option.id} value={option.value}
						emoji={option.emoji} textColor={props.color}
						percentage={stats[option.id]} />
				))}
				{selectedOptionValue !== '' ?
					<div className="selection-hint" style={{ marginTop: '12px' }}>YOU CHOSE {selectedOptionValue.toUpperCase().substring(0, 18)}</div> : ''}
			</div>
		)
	}
	return (
		<>
			<div className="masonry-poll-wrapper" >
				<div className="masonry-background" style={{
					backgroundColor: `${props.color}`
				}}></div>
				<div className="poll-top-flex">
					<Emoji emoji={props.emoji} set='apple' size={35} />
					{props.isCreated ? deleteButton : shareAndStats}
				</div>
				<div className="masonry-poll-heading">{props.question}</div>
				<div className="selection-hint">TOTAL RESPONSES: {props.numClicks}</div>
				{props.imageUrl !== '' ? (<img className="masonry-poll-img" src={props.imageUrl}></img>) : ''}
				{props.answerOption.map((option, index) => (
					<MasonryOption key={index} id={option.id} value={option.value}
						emoji={option.emoji} textColor={props.color}
						isLoggedIn={props.isLoggedIn} setIsLoginModalOpen={props.setIsLoginModalOpen}
						clickHandler={handleResponseToPoll} />
				))}
			</div>
		</>
	);
}


export default Poll;
