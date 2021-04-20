import { FirebaseAuthProvider } from "@react-firebase/auth";
import firebase from "firebase";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import firebaseConfig from "../../firebase/FirebaseIndex";
import '../../styles/Game/GameBox.css'

import { signOut } from '../../firebase/AuthMethods'
import GameQuestionArea from "../Game/GameQuestionArea"
import OptionButton from "./GameOption"
import PlayerDashboard from "../Game/PlayerDashboard"
import IPoll from "../../interfaces/IPoll";

interface IGameBoxProps {
	setGameStarted: any,
	currHeart: number,
	currPoint: number,
	poll: IPoll,
	fetchNewPoll: boolean,
	setFetchNewPoll: any,
	setSelectedOptionId: any
}

function GameBox(props: IGameBoxProps) {

	return (
		<div className="game-wrapper-flex">
			<div className="game-box-rect flex-vertical">
				<div>
					<div className="game-rect-heading">Hit the <br /> Midpoint Challenge</div>
					<div className="game-rect-details">Try to choose the most popular option.</div>
				</div>
				<PlayerDashboard currHeart={props.currHeart} currPoint={props.currPoint} />
			</div>
			<div className="game-box-area flex-vertical">
				<div className="game-box-scroll-wrapper">
					<GameQuestionArea relatedCategory={['entertainment', 'sports', 'music']} poll={props.poll} />
					<div className="game-option-grid">
						{props.poll.answerOptions.map((option, index) => (
							<OptionButton key={index} id={option.id} value={option.value}
								emoji={option.emoji} setSelectedOptionId={props.setSelectedOptionId}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default GameBox;
