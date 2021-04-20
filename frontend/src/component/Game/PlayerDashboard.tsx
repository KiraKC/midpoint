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
	currPoint: number,
}

function PlayerDashboard(props: IGameBoxProps) {
	//props.numLives store in i or smth
	let user = firebase.auth().currentUser.email;

	const range = (from: number, to: number, step: number) =>
		[...Array(Math.floor((to - from) / step) + 1)].map((_, i) => from + i * step);

	return (
		<div className="dashboard">
			<div className="userName">
				{user}
			</div>
			<hr style={{borderStyle: 'solid'}}/>
			<div className="flex-horizontal-center">
				<div className="dashboard-detail">Current Score: </div>
				<div className="dashboard-detail"> {props.currPoint} </div>
			</div>
			<div className="flex-horizontal-center">
				<div className="dashboard-detail"> Lives Left: </div>
				<div>
				{range(0, props.currHeart, 1).map((option, i) => (
					<Emoji key={i} emoji={'heart'} set='apple' size={20} />
				))}
				</div>
			</div>
		</div>
	);
}

export default PlayerDashboard;
