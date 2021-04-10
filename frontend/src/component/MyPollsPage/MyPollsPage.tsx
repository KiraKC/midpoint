import axios from "axios";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import ReactLoading, { LoadingType } from 'react-loading';
import Masonry from "react-masonry-css";
import endpointUrl from "../../constants/Endpoint";
import IPoll from "../../interfaces/IPoll";
import '../../styles/Common/LoginModal.css'
import Poll from "../HomePage/Poll";

interface IMyPollsPageProps {
	setIsLoginModalOpen: any,
	isLoggedIn: boolean,
}

function MyPollsPage(props: IMyPollsPageProps) {

	const [createdPolls, setCreatedPolls]: [IPoll[], any] = useState([]);
	const [answeredPollIds, setAnsweredPollIds]: [string[], any] = useState([]);
	const [stats, setStats] = useState({});

	useEffect(() => {
		requestPolls();
	}, [])

	const requestPolls = async () => {
		if (localStorage.getItem('userToken') !== null) {
			let toSend = {
				userIdToken: localStorage.getItem('userToken')
			}
			const config = {
				headers: {
					"Content-Type": "application/json",
					'Access-Control-Allow-Origin': '*',
				}
			}
			axios.post(
				endpointUrl + '/user/created-polls', toSend, config)
				.then(response => {
					console.log("CREATEDPOLLS: ")
					console.log(response.data)
					setAnsweredPollIds(response.data.answeredPollIds);
					setStats(response.data.miniStats)
					setCreatedPolls(response.data.createdPolls);
				})
				.catch(e => {
					console.log(e)
				});
		}
	}

	const divItems = createdPolls.map(function (poll) {
		return <Poll key={poll.id} id={poll.id} question={poll.question}
			emoji={poll.emoji} answerOption={poll.answerOptions} isLoggedIn={props.isLoggedIn}
			setIsLoginModalOpen={props.setIsLoginModalOpen} color={poll.color} imageUrl={poll.imageUrl} 
			answered={answeredPollIds.includes(poll.id) ? true : false}
			answeredStats={answeredPollIds.includes(poll.id) ? stats[poll.id] : {}} numClicks={poll.numClicks} />
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

export default MyPollsPage;