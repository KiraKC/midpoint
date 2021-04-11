import axios from "axios";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import ReactLoading, { LoadingType } from 'react-loading';
import Masonry from "react-masonry-css";
import endpointUrl from "../../constants/Endpoint";
import IPoll from "../../interfaces/IPoll";
import '../../styles/Common/LoginModal.css'
import Poll from "../HomePage/Poll";

interface ISearchPageProps {
	searchString: string,
	setIsLoginModalOpen: any,
	isLoggedIn: boolean,
}

function SearchPage(props: ISearchPageProps) {

	const [validPolls, setValidPolls]: [IPoll[], any] = useState([]);
	const [answeredPollIds, setAnsweredPollIds]: [string[], any] = useState([]);
	const [stats, setStats] = useState({});
	const [description, setDescription]: [string, any] = useState('');

	useEffect(() => {
		requestPolls();
	}, [props.searchString])

	const requestPolls = async () => {
		setDescription('querying ' + props.searchString + ' from the server...')
		let toSend;
		if (props.isLoggedIn) {
			const token = await firebase.auth().currentUser.getIdToken(true);
			toSend = {
				searchString: props.searchString,
				userIdToken: token,
				loggedIn: true
			}
		} else {
			toSend = {
				searchString: props.searchString,
				userIdToken: 'none',
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
		axios.post(
			endpointUrl + '/poll/search', toSend, config)
			.then(response => {
				console.log(response.data)
				const returnedPolls: IPoll[] = response.data.searchResults;
				setAnsweredPollIds(response.data.answeredPollIds);
				setStats(response.data.miniStats)
				setValidPolls(returnedPolls)
				let respLength = response.data.searchResults.length;
				if (respLength === 0) {
					setDescription("didn't find anything with keyword " + props.searchString)
				} else {
					setDescription('displaying ' + response.data.searchResults.length 
					+ ' results related to "' + props.searchString + '"')
				}
				
			})
			.catch(e => {
				console.log(e)
				setDescription('oops, an error occurred when querying, try again later!')

			});
	}

	const divItems = validPolls.map(function (poll) {
		console.log(stats[poll.id])
		return <Poll key={poll.id} id={poll.id} question={poll.question}
			emoji={poll.emoji} answerOption={poll.answerOptions} isLoggedIn={props.isLoggedIn}
			setIsLoginModalOpen={props.setIsLoginModalOpen} color={poll.color}
			imageUrl={poll.imageUrl} answered={answeredPollIds.includes(poll.id) ? true : false}
			answeredStats={answeredPollIds.includes(poll.id) ? stats[poll.id] : {}} numClicks={poll.numClicks}
		/>
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
				<div className="page-title">&nbsp;Search</div>
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

export default SearchPage;