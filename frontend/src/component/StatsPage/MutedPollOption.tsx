import '../../styles/HomePage/PollOption.css';
import { Emoji } from 'emoji-mart'

interface MutedPollOptionProps {
	id: string,
	emoji: string,
	value: string,
	textColor: string,
}

function MutedPollOption(props: MutedPollOptionProps) {

	return (
		<button
			className={'option-wrapper-flex'}
			style={{ color: `${props.textColor}`, cursor: 'auto' }}>
			<div style={{ marginTop: "1px" }}>
				<Emoji emoji={props.emoji} set='apple' size={26} />
			</div>
			<div className="option-text">{props.value.toUpperCase()}</div>
		</button>
	);
}

export default MutedPollOption;
