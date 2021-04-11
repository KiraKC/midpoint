import axios from "axios";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import ReactLoading, { LoadingType } from 'react-loading';
import Masonry from "react-masonry-css";
import endpointUrl from "../../constants/Endpoint";
import IPoll from "../../interfaces/IPoll";
import '../../styles/Common/LoginModal.css'
import Poll from "../HomePage/Poll";

interface IHistoryPageProps {
	setIsLoginModalOpen: any,
	isLoggedIn: boolean,
}

function HistoryPage(props: IHistoryPageProps) {

	const [answeredPolls, setAnsweredPolls]: [IPoll[], any] = useState([]);
	const [stats, setStats] = useState({});
	const [description, setDescription]: [string, any] = useState('');

	useEffect(() => {
		requestPolls();
	}, [])

	const requestPolls = async () => {
		setDescription('fetching histories from the server...')
		if (localStorage.getItem('userToken') !== null) {
			let toSend = {
				userIdToken: localStorage.getItem('userToken')
			}
			console.log(toSend)
			const config = {
				headers: {
					"Content-Type": "application/json",
					'Access-Control-Allow-Origin': '*',
				}
			}
			axios.post(
				endpointUrl + '/user/answered-polls', toSend, config)
				.then(response => {
					setStats(response.data.miniStats);
					setAnsweredPolls(response.data.answeredPolls.reverse());
					setDescription("You've answered " + response.data.answeredPolls.length + " polls so far! Check in and see how others have responded.");
				})
				.catch(e => {
					console.log(e)
					setDescription('oops, server is sleeping. try again later!');
				});
		}
	}

	const divItems = answeredPolls.map(function (poll) {
		return <Poll key={poll.id} id={poll.id} question={poll.question}
			emoji={poll.emoji} answerOption={poll.answerOptions} isLoggedIn={props.isLoggedIn}
			setIsLoginModalOpen={props.setIsLoginModalOpen} color={poll.color} imageUrl={poll.imageUrl}
			answeredStats={stats[poll.id]} answered={true} numClicks={poll.numClicks} isCreated={false} />
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
			<div className="page-title-wrapper-flex">
				<div className="page-title">&nbsp;History</div>
				<div className="page-title-description">{description}</div>
			</div>
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

export default HistoryPage;