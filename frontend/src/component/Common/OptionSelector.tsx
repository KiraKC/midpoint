
import { FirebaseAuthProvider } from "@react-firebase/auth";
import firebase from "firebase";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import firebaseConfig from "../../firebase/FirebaseIndex";
import '../../styles/Game/GameStart.css'
import { signOut } from '../../firebase/AuthMethods'

interface IOptionSelectorProps {
	optionArray: any[];
}

function OptionSelector(props: IOptionSelectorProps) {

	return (
		<select>
			{props.optionArray.map((e, i) => (
				<option value={e} key={i}>{e}</option>
			))}
		</select>
	);
}

export default OptionSelector;
