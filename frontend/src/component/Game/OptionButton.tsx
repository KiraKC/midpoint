import { FirebaseAuthProvider } from "@react-firebase/auth";
import firebase from "firebase";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import firebaseConfig from "../../firebase/FirebaseIndex";
import '../../styles/Game/GameBox.css'

import { signOut } from '../../firebase/AuthMethods'
import { Emoji } from "emoji-mart";

interface IGameBoxProps {

}

function OptionButton(props) {

	return (
			<button className="game-option-button">
				<Emoji emoji={'earth_asia'} set='apple' size={50} />
				OPTION 1
			</button>
			

	);
}

export default OptionButton;
