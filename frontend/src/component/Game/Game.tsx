import { FirebaseAuthProvider } from "@react-firebase/auth";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import firebaseConfig from "../../firebase/FirebaseIndex";
import '../../styles/Game/GameBox.css'

import { signOut } from '../../firebase/AuthMethods'
import GameQuestionArea from "../Game/GameQuestionArea"
import OptionButton from "./GameOption"
import PlayerDashboard from "../Game/PlayerDashboard"
import GameStart from "./GameStart";
import GameBox from "./GameBox";
import IPoll from "../../interfaces/IPoll";
import axios from "axios";
import endpointUrl from "../../constants/Endpoint";
import { resolve } from "node:url";

interface IGameBoxProps {

}

function Game(props: IGameBoxProps) {
	const [gameStarted, setGameStarted]: [boolean, any] = useState(false);
	const [currPoint, setCurrPoint]: [number, any] = useState(0);
	const [currHeart, setCurrHeart]: [number, any] = useState(3);
	const [poll, setPoll]: [IPoll, any] = useState(null);
	const [miniStats, setMiniStats]: [any, any] = useState(null);
	const [fetchNewPoll, setFetchNewPoll]: [boolean, any] = useState(false);
	const [seenPollIds, setSeenPollIds]: [string[], any] = useState([]);
	const [selectedOptionId, setSelectedOptionId]: [string, any] = useState('');

	useEffect(() => {
		getNewPoll();
	}, [fetchNewPoll]);

	useEffect(() => {
		if (selectedOptionId !== '') {
			handleOptionSelection();
		}
	}, [selectedOptionId])

	const handleSeenPollIds = (id: string) => {
		let tempSeenPollIds = seenPollIds;
		tempSeenPollIds.push(id);
		setSeenPollIds([...tempSeenPollIds]);
	}

	const handleOptionSelection = () => {
		// sorting the options
		let sortable = [];
		for (let option in miniStats) {
			sortable.push([option, miniStats[option]]);
		}
		sortable.sort(function (a, b) {
			return b[1] - a[1];
		});
		// selecting viable options
		let viableOptions = [];
		viableOptions.push(sortable[0][0])
		for (let i = 0; i < sortable.length - 1; i++) {
			if (sortable[i][1] === sortable[i+1][1]) {
				viableOptions.push(sortable[i+1][0])
			} else {
				break;
			}
		}
		// determine correctness of selected option
		if (viableOptions.includes(selectedOptionId)) {
			// correct
			setCurrPoint(currPoint + 1);
			setFetchNewPoll(!fetchNewPoll);
		} else {
			// incorrect
			setCurrHeart(currHeart - 1);
			if (currHeart >= 0) {
				setFetchNewPoll(!fetchNewPoll);
			}
		}
	}

	const getNewPoll = () => {
		let toSend;
		toSend = {
			seenPollIds: seenPollIds
		}
		const config = {
			headers: {
				"Content-Type": "application/json",
				'Access-Control-Allow-Origin': '*',
			}
		}
		axios.post(
			endpointUrl + '/game/new-poll', toSend, config)
			.then(response => {
				setPoll(response.data.poll);
				handleSeenPollIds(response.data.poll.id);
				setMiniStats(response.data.miniStats)
			})
			.catch(e => {
				console.log(e)
			});
	}

	const gameBoxProps = {
		setGameStarted: setGameStarted,
		poll: poll,
		fetchNewPoll: fetchNewPoll,
		setFetchNewPoll: setFetchNewPoll,
		currPoint: currPoint,
		currHeart: currHeart,
		setSelectedOptionId: setSelectedOptionId
	}
	
	if (gameStarted) {
		return (
			<GameBox {...gameBoxProps} />
		);
	} else {
		return (
			<GameStart setGameStarted={setGameStarted} />
		)
	}
}

export default Game;
