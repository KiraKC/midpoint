import Masonry from 'react-masonry-css';
import '../../styles/HomePage/MasonryWrapper.css';
import React, { useEffect, useState } from 'react';
import MasonryPoll from './MasonryPoll'
import IPoll from '../../interfaces/IPoll';
import firebase from 'firebase';
import axios from 'axios';
import endpointUrl from '../../constants/Endpoint';

interface MasonryWrapperProps {
	isLoggedIn: boolean,
	fetchNewPoll: boolean,
	setFetchNewPoll: any,
	polls: IPoll[],
	setPolls: any,
	seenPollIds: string[],
	setSeenPollIds: any
}

function MasonryWrapper(props: MasonryWrapperProps) {

	let polls = props.polls;
	let setPolls = props.setPolls;
	let seenPollIds = props.seenPollIds;
	let setSeenPollIds = props.setSeenPollIds;

	useEffect(() => {
		async function pollHandler() {
			await requestPolls();
		}
		pollHandler();
	}, [props.fetchNewPoll])

	const updatePollArray = (newPolls: IPoll[]) => {
		let tempPolls = polls;
		setPolls([...tempPolls, ...newPolls]);
	}

	const updateSeenPollIds = (newPolls: IPoll[]) => {
		let newPollIds = [];
		for (let i = 0; i < newPolls.length; i++) {
			newPollIds.push(newPolls[i].id)
		}
		let tempPollIds = seenPollIds;
		setSeenPollIds([...tempPollIds, ...newPollIds]);
	}

	const requestPolls = async () => {
		let toSend;
		if (props.isLoggedIn) {
			// TODO: JINOO, example of getting user id token
			const idToken = await firebase.auth().currentUser.getIdToken(true);
			toSend = {
				userIdToken: idToken,
				numPollsRequested: 10,
				seenPollIds: seenPollIds,
				loggedIn: true
			}
		} else {
			toSend = {
				userIdToken: 'none',
				numPollsRequested: 10,
				seenPollIds: seenPollIds,
				loggedIn: false
			}
		}
		console.log(toSend)
		const config = {
			headers: {
				"Content-Type": "application/json",
				'Access-Control-Allow-Origin': '*',
			}
		}
		
		// TODO: JINOO, example POST request
		axios.post(
			endpointUrl + '/user/get-suggested', toSend, config)
			.then(response => {
				updateSeenPollIds(response.data.suggestedPolls)
				updatePollArray(response.data.suggestedPolls);
				console.log("RETURNED RESULT:");
				console.log(response.data.suggestedPolls)
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
