import '../../styles/HomePage/MasonryPoll.css';
import MasonryOption from './MasonryOption';
import { Emoji } from 'emoji-mart';
import IOption from '../../interfaces/IOption';

interface MasonryPollProps {
	question: string,
	emoji: string,
	answerOption: IOption[]
}

function MasonryPoll(props: MasonryPollProps) {

	const colorBank = ["#2274A5", "#D83282", "#0B5EA9", "#13BE8B", "#494848", "#464D77", "#E26D5A", "#F24343", "#274690", "#7F5A83",
		"#B33951", "#264779", "#B36A5E", "#344966", "#A4303F", "#CF5C36", "#70A288", "#2ABC88", "#86BBEC", "#246A73"]

	const randomColor = () => {
		return colorBank[Math.floor((Math.random() * 100000)) % 20];
	}

	const selectedColor = randomColor();

	return (
		<div className="masonary-poll-wrapper" >
			<div className="masonary-background" style={{
				backgroundColor: `${selectedColor}`
			}}></div>
			<Emoji emoji={props.emoji} set='apple' size={35} />
			<div className="masonary-poll-heading">{props.question}</div>
			{props.answerOption.map((option, index) => (
				<MasonryOption key={index} id={option.id} value={option.value} emoji={option.emoji} textColor={selectedColor} />
			))}
		</div>
	);
}

export default MasonryPoll;
