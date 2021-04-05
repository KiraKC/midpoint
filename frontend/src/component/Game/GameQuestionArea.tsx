import { FirebaseAuthProvider } from "@react-firebase/auth";
import firebase from "firebase";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import firebaseConfig from "../../firebase/FirebaseIndex";
import '../../styles/Game/GameBox.css'
import { signOut } from '../../firebase/AuthMethods'

interface IGameBoxProps {

}

function GameQuestionArea(props: IGameBoxProps) {

	return (
			<div className="start-wrapper-flex">
				<div className="game-box-rect">
				<div className="start-section-heading">Hit the <br/> Midpoint Challenge</div>
				<div className="start-details">
				Try to choose the most popular option.
				</div>

				</div>
				<div className="game-box-area">

					details go here
				</div>
	

			</div>

	);
}

export default GameQuestionArea;
