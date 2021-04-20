
import '../../styles/Game/GameBox.css'
import { Emoji } from "emoji-mart";
import { findCategoryInfo } from '../../constants/Category';
import CategoryButtonMuted from "../Common/CategoryButtonMuted";
import IPoll from "../../interfaces/IPoll";

interface IGameQuestionAreaProps {
	poll: IPoll,
	category: string[]
}

function GameQuestionArea(props: IGameQuestionAreaProps) {

	const getCategoryButton = () => {
		const selectedCategory = props.category.slice(0, 3);
		const categoryMetaData = [];
		for (let i = 0; i < selectedCategory.length; i++) {
			categoryMetaData.push(findCategoryInfo(selectedCategory[i]));
		}
		return categoryMetaData;
	}

	return (
		<div className="question-area">
			<div className="flex-horizontal wrap">
				<div className="game-question-title-area">
					<div className="question-emojis"><Emoji emoji={props.poll.emoji} set='apple' size={40} /> </div>
					<div>
						<div className="question-title">
							{props.poll.question}
						</div>
						<div className="num-answers"> Number of Responses: {props.poll.numClicks}</div>
						<div className="gamebox-display-flex">
							{getCategoryButton().map((e, i) => {
								return <CategoryButtonMuted
									key={i}
									emoji={e.emoji}
									text={e.text}
									outline={true}
								/>
							})}
						</div>
					</div>
				</div>
				{props.poll.imageUrl !== '' ?
					<img className="game-poll-image"
						src={props.poll.imageUrl}>
					</img> : ''}
			</div>
		</div>

	);
}

export default GameQuestionArea;
