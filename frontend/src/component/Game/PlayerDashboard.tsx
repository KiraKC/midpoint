import { FirebaseAuthProvider } from "@react-firebase/auth";
import firebase from "firebase";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import firebaseConfig from "../../firebase/FirebaseIndex";
import '../../styles/Game/GameBox.css'

import { signOut } from '../../firebase/AuthMethods'
import { Emoji } from "emoji-mart";

interface IGameBoxProps {
	currHeart: number,
	currPoint: number
}

function PlayerDashboard(props: IGameBoxProps) {
	//props.numLives store in i or smth
	return (
			<div className="dashboard">
				<div className="userName">
				props.userName
				</div>

				<hr/>
				<div className="flex-horizontal">
					<div className="current-score">current score: </div>
					<div> {props.currPoint} </div>
				</div>
				<div className="flex-horizontal">
					<div className="lives-left"> lives left: </div>
					{props.currHeart}
					{/* <Emoji emoji={'heart'} set='apple' size={20} /> */}
				</div>
			</div>

	);
}

export default PlayerDashboard;
