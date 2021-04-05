import { FirebaseAuthProvider } from "@react-firebase/auth";
import firebase from "firebase";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import firebaseConfig from "../../firebase/FirebaseIndex";
import '../../styles/Game/GameBox.css'
import { signOut } from '../../firebase/AuthMethods'
import { Emoji } from "emoji-mart";
import CategoryButton from "../Common/CategoryButton";
import categoryArray from '../../constants/Category';

interface IGameBoxProps {

}

function GameQuestionArea(props: IGameBoxProps) {

	const [categories, setCategories]: [string[], any] = useState([])

	return (
			<div className="question-area">
				<div className="game-question-title-area">
					<div className="question-emojis"><Emoji emoji={'smile'} set='apple' size={50} /> </div>
				
					<div className="question-title">
					HERE is where the question will go! 
					</div>
				</div>
				<div className="display-flex">
						{categoryArray.map((e, i) => (
							<CategoryButton
								key={i}
								emoji={e.emoji}
								text={e.text}
								highlightColor={e.highlightColor}
								categories={categories}
								setCategories={setCategories}
							/>
						))}
					</div>
				<div className="num-answers"> <b>props.number users</b> have answered </div>
			</div>

	);
}

export default GameQuestionArea;
