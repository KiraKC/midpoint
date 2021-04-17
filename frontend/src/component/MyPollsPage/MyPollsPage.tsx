import axios from "axios";
import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import endpointUrl from "../../constants/Endpoint";
import IPoll from "../../interfaces/IPoll";
import '../../styles/Common/LoginModal.css'
import Poll from "../HomePage/Poll";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

interface IMyPollsPageProps {
	setIsLoginModalOpen: any,
	isLoggedIn: boolean,
}

function MyPollsPage(props: IMyPollsPageProps) {

	const [createdPolls, setCreatedPolls]: [IPoll[], any] = useState([]);
	const [answeredPollIds, setAnsweredPollIds]: [string[], any] = useState([]);
	const [stats, setStats] = useState({});
	const [description, setDescription]: [string, any] = useState('');
	const [refresh, setRefresh]: [boolean, any] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen]: [boolean, any] = useState(false);
	const [confirmDelete, setConfirmDelete]: [boolean, any] = useState(false);
	const [selectedPollId, setSelectedPollId]: [string, any] = useState('');
	const [selectedPollQuestion, setSelectedPollQuestion]: [string, any] = useState('');

	useEffect(() => {
		requestPolls();
	}, [refresh])

	const requestPolls = async () => {
		setDescription('fetching created polls from the server...')
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
					setAnsweredPollIds(response.data.answeredPollIds);
					setStats(response.data.miniStats)
					setCreatedPolls(response.data.createdPolls.reverse());
					if (response.data.createdPolls.length === 0) {
						setDescription("Didn't find polls that was created by you, create a poll first!");
					} else {
						setDescription('Posted a poll before? Check the results here!');
					}
				})
				.catch(e => {
					console.log(e)
					setDescription('oops, server is sleeping. come back later or try re-authenticate!');
				});
		}
	}

	const divItems = createdPolls.map(function (poll) {
		return <Poll key={poll.id} id={poll.id} question={poll.question}
			emoji={poll.emoji} answerOption={poll.answerOptions} isLoggedIn={props.isLoggedIn}
			setIsLoginModalOpen={props.setIsLoginModalOpen} color={poll.color} imageUrl={poll.imageUrl}
			answered={answeredPollIds.includes(poll.id) ? true : false}
			answeredStats={answeredPollIds.includes(poll.id) ? stats[poll.id] : {}} numClicks={poll.numClicks}
			isCreated={true} refreshCreatedPage={refresh} setRefreshCreatedPage={setRefresh} 
			setIsDeleteModalOpen={setIsDeleteModalOpen} confirmDelete={confirmDelete} 
			selectedPollId={selectedPollId} setSelectedPollId={setSelectedPollId} setSelectedPollQuestion={setSelectedPollQuestion} />
	});

	const breakpointColumnsObj = {
		default: 7,
		2450: 6,
		2200: 5,
		1950: 4,
		1500: 3,
		1050: 2,
		600: 1
	};

	return (
		<>
			<DeleteConfirmationModal isModalOpen={isDeleteModalOpen} setIsModalOpen={setIsDeleteModalOpen}
			setConfirmDelete={setConfirmDelete} question={selectedPollQuestion}/>
			<div className="masonry-overall-wrapper">
				<div className="page-title-wrapper-flex">
					<div className="page-title">&nbsp;Created</div>
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
		</>
	);
}

export default MyPollsPage;