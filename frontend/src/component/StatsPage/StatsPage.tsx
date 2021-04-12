import axios from "axios";
import React, { useEffect, useState } from "react";
import endpointUrl from "../../constants/Endpoint";
import IPoll from "../../interfaces/IPoll";
import '../../styles/Common/LoginModal.css'
import { randomUserMetaDataGrouping } from "../../constants/UserMetaData";
import { useParams } from "react-router-dom";
import BarChart from "./BarChart";
import StatsBanner from "./StatsBanner";
import StatsBottomPanel from "./StatsBottomPanel";

interface IStatsPageProps {
	setIsLoginModalOpen: any,
	isLoggedIn: boolean
}

function StatsPage(props: IStatsPageProps) {

	const [description, setDescription]: [string, any] = useState('');
	const [chartData, setChartData]: [string, any] = useState('');
	const [userMetaDataGrouping, setUserMetaDataGrouping]: [string, any] = useState(randomUserMetaDataGrouping());
	const [poll, setPoll]: [IPoll, any] = useState(null)
	
	
	let { pollId } = useParams();

	useEffect(() => {
		requestStats();
	}, [userMetaDataGrouping])

	const requestStats = async () => {
		setDescription('fetching created stats from the server...')
		let toSend = {
			pollId: pollId,
			userMetaDataGrouping: userMetaDataGrouping
		}
		console.log(toSend);
		const config = {
			headers: {
				"Content-Type": "application/json",
				'Access-Control-Allow-Origin': '*',
			}
		}
		axios.post(
			endpointUrl + '/poll/stats', toSend, config)
			.then(response => {
				console.log(response.data);
				
				setChartData(response.data.chartData);
				setPoll(response.data.poll)
				setDescription('');
			})
			.catch(e => {
				console.log(e)
				setDescription('oops, server is sleeping. try again later!');
			});
	}


	return (
		<>
			<div className="page-title-description">{description}</div>
			{poll ? <StatsBanner poll={poll}/> : ''}
      {poll ? <StatsBottomPanel poll={poll} chartData={chartData}/> : ''}
		</>
	);
}

export default StatsPage;