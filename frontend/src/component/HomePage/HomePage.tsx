import Masonry from 'react-masonry-css';
import '../../styles/HomePage/HomePage.css';
import React, { useEffect, useState } from 'react';
import Poll from './Poll'
import IPoll from '../../interfaces/IPoll';
import firebase from 'firebase';
import axios from 'axios';
import endpointUrl from '../../constants/Endpoint';
import { isLoggedIn } from '../../firebase/AuthMethods';
import { wait } from '@testing-library/dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReactLoading, { LoadingType } from 'react-loading';
import { Emoji } from 'emoji-mart';

interface HomePageProps {
	isLoggedIn: boolean,
	fetchNewPoll: boolean,
	setFetchNewPoll: any,
	polls: IPoll[],
	setPolls: any,
	seenPollIds: string[],
	setSeenPollIds: any,
	setIsLoginModalOpen: any,
	clearFeed: boolean,
	setClearFeed: any
}

function HomePage(props: HomePageProps) {

	let polls = props.polls;
	let setPolls = props.setPolls;
	let seenPollIds = props.seenPollIds;
	let setSeenPollIds = props.setSeenPollIds;
	const [hasMore, setHasMore]: [boolean, any] = useState(true);

	useEffect(() => {
		async function pollHandler() {
			await requestPolls();
		}
		pollHandler();
	}, [props.fetchNewPoll])

	useEffect(() => {
		setPolls([]);
		setSeenPollIds([]);
	}, [props.clearFeed])

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
			const idToken = await firebase.auth().currentUser.getIdToken(true);
			toSend = {
				userIdToken: idToken,
				numPollsRequested: 15,
				seenPollIds: seenPollIds,
				loggedIn: true
			}
		} else {
			if (localStorage.getItem('userToken') === null) {
				toSend = {
					userIdToken: 'none',
					numPollsRequested: 15,
					seenPollIds: seenPollIds,
					loggedIn: false
				}
			} else {
				toSend = {
					userIdToken: localStorage.getItem('userToken'),
					numPollsRequested: 15,
					seenPollIds: seenPollIds,
					loggedIn: true
				}
			}
		}
		console.log(toSend)
		const config = {
			headers: {
				"Content-Type": "application/json",
				'Access-Control-Allow-Origin': '*',
			}
		}

		axios.post(
			endpointUrl + '/user/get-suggested', toSend, config)
			.then(response => {
				updateSeenPollIds(response.data.suggestedPolls)
				updatePollArray(response.data.suggestedPolls);
				if (response.data.suggestedPolls.length === 0) {
					setHasMore(false)
				}
			})
			.catch(e => {
				console.log(e)
			});
	}

	const divItems = polls.map(function (poll) {
		return <Poll key={poll.id} id={poll.id} question={poll.question}
			emoji={poll.emoji} answerOption={poll.answerOptions} isLoggedIn={props.isLoggedIn}
			setIsLoginModalOpen={props.setIsLoginModalOpen} color={poll.color} imageUrl={poll.imageUrl}
			answered={false} numClicks={poll.numClicks} />
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
		<div className="masonry-overall-wrapper">
			<InfiniteScroll
				dataLength={polls.length}
				next={() => props.setFetchNewPoll(!props.fetchNewPoll)}
				hasMore={hasMore}
				loader={''}
				style={{ overflow: 'show' }}>
				<Masonry
					breakpointCols={breakpointColumnsObj}
					className="my-masonry-grid"
					columnClassName="my-masonry-grid_column"
				>
					{divItems}
				</Masonry>
			</InfiniteScroll>
			{hasMore ? '' : <div className="ending-words">this is the end, thank you for everything <Emoji emoji='heart' set='apple' size={20} /></div>}
		</div >
	);
}

export default HomePage;
