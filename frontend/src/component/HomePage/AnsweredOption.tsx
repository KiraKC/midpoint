import '../../styles/HomePage/PollOption.css';
import { Emoji } from 'emoji-mart'

interface IAnsweredOptionProps {
	id: string,
	emoji: string,
	value: string,
	textColor: string,
	percentage: number
}

function AnsweredOption(props: IAnsweredOptionProps) {

	return (
		<button
			className="answered-option-wrapper"
			style={{ color: `${props.textColor}` }}>
			<div className="answered-option-white-bar"
			style={{width: `${props.percentage}%`}}></div>
			<div style={{ marginTop: "1px" }}>
				<Emoji emoji={props.emoji} set='apple' size={26} />
			</div>
			<div className="option-text-answered">{props.value.toUpperCase()}</div>
			<div className="option-percentage">{props.percentage.toFixed(1)}%</div>
		</button>
	);
}

export default AnsweredOption;
