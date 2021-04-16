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
			<div className="flex-horizontal wrap">
				<div className="game-question-title-area">
					<div className="question-emojis"><Emoji emoji={'smile'} set='apple' size={50} /> </div>
					<div className="question-title">
						HERE is where the question will go!
					</div>
				</div>	
					<img className="game-poll-image" src={"https://cdn.searchenginejournal.com/wp-content/uploads/2019/08/c573bf41-6a7c-4927-845c-4ca0260aad6b-760x400.jpeg"}></img>
						{/* {props.imageUrl !== '' ? */}
			</div>
			<div className="gamebox-display-flex">
				{/* props.categories */}
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
				{/* {getCategoryButton().map((e, i) => {
						return <CategoryButtonMuted
							key={i}
							emoji={e.emoji}
							text={e.text}
						/>
					})} */}
			</div>
			<div className="num-answers"> <b>props.number users</b> have answered </div>
		</div>

	);
}

export default GameQuestionArea;
