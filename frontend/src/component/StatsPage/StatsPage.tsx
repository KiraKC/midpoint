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

	const requestStats = async () => {
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
				setStatistics(response.data)
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
			{statistics ? <StatsBanner statistics={statistics} /> : ''}
			{statistics ? <StatsBottomPanel
				chartData={statistics.chartData} poll={statistics.poll}
				setUserMetaDataGrouping={setUserMetaDataGrouping} 
				grouping={userMetaDataGrouping} /> : ''}
		</>
	);
}

export default StatsPage;