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
	const [userMetaDataGrouping, setUserMetaDataGrouping]: [string, any] = useState(randomUserMetaDataGrouping());
	const [statistics, setStatistics]: [any, any] = useState(null)


	let { pollId } = useParams();

	useEffect(() => {
		requestStats();
	}, [userMetaDataGrouping])

	const processAnswerOptions = (data: any) => {
		const stats = data.chartData.stats;
		for (let i = 0; i < stats.length; i++) {
			let currOptions: string = stats[i].answerOptionValue;
			if (currOptions.length > 10) {
				stats[i].answerOptionValue = currOptions.substring(0, 9) + '...';

			} 
		}
	}

	const requestStats = async () => {
		setDescription('Fetching poll statistics from the server...');
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
				console.log(response.data.chartData);
				processAnswerOptions(response.data)
				setStatistics(response.data)
				setDescription('View user statistics of the selected poll.');
			})
			.catch(e => {
				console.log(e)
				setDescription('Oops, server is sleeping. Come back later or try re-authenticate!');
			});
	}


	return (
		<>
		<div className="page-title-wrapper-flex">
				<div className="page-title">&nbsp;Statistics</div>
				<div className="page-title-description">{description}</div>
			</div>
			{statistics ? <StatsBanner statistics={statistics} /> : ''}
			{statistics ? <StatsBottomPanel
				chartData={statistics.chartData} poll={statistics.poll}
				setUserMetaDataGrouping={setUserMetaDataGrouping} 
				grouping={userMetaDataGrouping} /> : ''}
		</>
	);
}

export default StatsPage;