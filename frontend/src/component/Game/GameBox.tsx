import { FirebaseAuthProvider } from "@react-firebase/auth";
import firebase from "firebase";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import firebaseConfig from "../../firebase/FirebaseIndex";
import '../../styles/Game/GameBox.css'

import { signOut } from '../../firebase/AuthMethods'
import GameQuestionArea from "../Game/GameQuestionArea"
import OptionButton from "../Game/OptionButton"
import PlayerDashboard from "../Game/PlayerDashboard"

interface IGameBoxProps {

}

function GameBox(props: IGameBoxProps) {

	return (
			<div className="game-wrapper-flex">
				<div className="game-box-rect">
				<div className="game-rect-heading">Hit the <br/> Midpoint Challenge</div>
				<div className="game-rect-details">
				Try to choose the most popular option.
				</div>

				</div>
				<div className="game-box-area">
					<GameQuestionArea />
					<div className="game-option-grid">
					<OptionButton />
					<OptionButton />
					<OptionButton />
					<OptionButton />
					</div>
				</div>
	

			</div>

	);
}

export default GameBox;
