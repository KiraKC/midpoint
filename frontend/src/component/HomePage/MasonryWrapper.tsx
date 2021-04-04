import Masonry from 'react-masonry-css';
import '../../styles/HomePage/MasonryWrapper.css';
import React, { useEffect, useState } from 'react';
import MasonryPoll from './MasonryPoll'
import IPoll from '../../interfaces/IPoll';
import firebase from 'firebase';
import axios from 'axios';
import endpointUrl from '../../constants/Endpoint';

function MasonryWrapper(props) {

	const [polls, setPolls]: [IPoll[], any] = useState([])

	useEffect(() => {
		requestPolls();
	}, [])

	const updatePollArray = (newPolls: IPoll[]) => {
		let tempPolls = polls;
		setPolls([...tempPolls, ...newPolls]);
	}

	const requestPolls = () => {
		let toSend;
		if (props.isLoggedIn) {
			console.log('logged in')
			toSend = firebase.auth().currentUser.getIdToken(true)
				.then(function (idToken) {
					const userData = {
						userIdToken: idToken,
						numPollsRequested: 30,
						seenPollIds: [],
						loggedIn: true
					}
					return userData;
				}).catch(function (error) {
					console.log(error)
				});
		} else {
			console.log('NOT logged in')

			toSend = {
				userIdToken: 'none',
				numPollsRequested: 30,
				seenPollIds: [],
				loggedIn: false
			}
		}
		const config = {
			headers: {
				"Content-Type": "application/json",
				'Access-Control-Allow-Origin': '*',
			}
		}
		console.log(toSend)
		axios.post(
			endpointUrl + '/user/get-suggested', toSend, config)
			.then(response => {
				console.log(response.data.suggestedPolls)
				updatePollArray(response.data.suggestedPolls)
			})
			.catch(e => {
				console.log(e)
			});
	}

	const divItems = polls.map(function (poll) {
		return <MasonryPoll key={poll.id} question={poll.question} emoji={poll.emoji} answerOption={poll.answerOptions} />
	});

	const breakpointColumnsObj = {
		default: 4,
		1700: 4,
		1300: 3,
		1000: 2,
		700: 2,
		600: 1
	};

	return (
		<div className="masonry-wrapper-wrapper">
			<Masonry
				breakpointCols={breakpointColumnsObj}
				className="my-masonry-grid"
				columnClassName="my-masonry-grid_column"
			>
				{divItems}
			</Masonry>
		</div>
	);
}

export default MasonryWrapper;
