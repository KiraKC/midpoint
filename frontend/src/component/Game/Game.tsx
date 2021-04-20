
import React, { useEffect, useState } from "react";

import '../../styles/Game/GameBox.css'


import GameStart from "./GameStart";
import GameBox from "./GameBox";
import IPoll from "../../interfaces/IPoll";
import axios from "axios";
import endpointUrl from "../../constants/Endpoint";
import { resolve } from "node:url";
import GameEnd from "./GameEnd";

interface IGameBoxProps {

}

function Game(props: IGameBoxProps) {
	const [gameStarted, setGameStarted]: [boolean, any] = useState(false);
	const [gameEnded, setGameEnded]: [boolean, any] = useState(false);
	const [currPoint, setCurrPoint]: [number, any] = useState(0);
	const [currHeart, setCurrHeart]: [number, any] = useState(2);
	const [poll, setPoll]: [IPoll, any] = useState(null);
	const [miniStats, setMiniStats]: [any, any] = useState(null);
	const [fetchNewPoll, setFetchNewPoll]: [boolean, any] = useState(false);
	const [seenPollIds, setSeenPollIds]: [string[], any] = useState([]);
	const [selectedOptionId, setSelectedOptionId]: [string, any] = useState('');
	const [correctOptions, setCorrectOptions]: [string[], any] = useState([]);
	const [category, setCategory]: [string[], any] = useState([]);

	useEffect(() => {
		if (selectedOptionId !== '') {
			handleOptionSelection();
		}
	}, [selectedOptionId])

	useEffect(() => {
		getNewPoll();
	}, [])

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
			if (sortable[i][1] === sortable[i + 1][1]) {
				viableOptions.push(sortable[i + 1][0])
			} else {
				break;
			}
		}
		setCorrectOptions([...viableOptions])
		// determine correctness of selected option
		if (viableOptions.includes(selectedOptionId)) {
			// correct
			setCurrPoint(currPoint + 1);
			setTimeout(async () => {
				await getNewPoll();
				setCategory([]);
				setSelectedOptionId('');
			}, 2000);
		} else {
			// incorrect
			setCurrHeart(currHeart - 1);
			if (currHeart > 0) {
				setTimeout(async () => {
					await getNewPoll();
					setCategory([]);
					setSelectedOptionId('');
				}, 2000);
			} else {
				setTimeout(async () => {
					setGameEnded(true)
				}, 2000);
			}
		}
	}

	const getNewPoll = async () => {
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
				setCategory(response.data.categoriesRankedByCorrelation)
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
		setSelectedOptionId: setSelectedOptionId,
		selectedOptionId: selectedOptionId,
		correctOptions: correctOptions,
		miniStats: miniStats
	}

	if (gameEnded) {
		return (
			<GameEnd currPoint={currPoint} />
		)
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
