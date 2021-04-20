
import '../../styles/Game/GameBox.css'

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
	setSelectedOptionId: any,
	selectedOptionId: string,
	correctOptions: string[],
	miniStats: any
}

function GameBox(props: IGameBoxProps) {

	return (
		<div className="game-wrapper-flex">
			<div className="game-box-rect flex-vertical">
				<div>
					<div className="start-section-heading">Hit the <br /> Midpoint Challenge</div>
					<div className="start-details">Try to choose the most popular option.</div>
				</div>
				<PlayerDashboard currHeart={props.currHeart} currPoint={props.currPoint} />
			</div>
			<div className="game-box-area flex-vertical" style={{backgroundColor: `${props.poll.color}`, color: 'white'}}>
				<div className="game-box-scroll-wrapper">
					<GameQuestionArea relatedCategory={['entertainment', 'sports', 'music']} poll={props.poll} />
					<div className="game-option-grid">
						{console.log(props.miniStats)}
						{props.poll.answerOptions.map((option, index) => (
							<OptionButton key={index} id={option.id} value={option.value}
								emoji={option.emoji} setSelectedOptionId={props.setSelectedOptionId}
								selectedOptionId={props.selectedOptionId} correctOptions={props.correctOptions}
								percentage={props.miniStats[option.id]} color={props.poll.color}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default GameBox;
