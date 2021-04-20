import '../../styles/Game/GameBox.css'
import { Emoji } from "emoji-mart";
import { useEffect, useState } from 'react';

interface IGameOptionProps {
	id: string,
	emoji: string,
	value: string,
	selectedOptionId: string,
	setSelectedOptionId: any,
	correctOptions: string[],
	percentage: number,
	color: string
}

function GameOption(props: IGameOptionProps) {

	const [triggerPercentage, setTriggerPercentage]: [boolean, any] = useState(false);

	useEffect(() => {
		if (triggerPercentage) {
			// trigger something here
		}
	}, [triggerPercentage])

	if (props.selectedOptionId === '') {
		return (
			<button className="game-option-button" onClick={() => props.setSelectedOptionId(props.id)}>
				<div className="game-option-button-info">
					<Emoji emoji={props.emoji} set='apple' size={25} />
					<span
						style={{ marginLeft: '10px', marginTop: '2px', textAlign: 'left', color: `${props.color}` }}>
						{props.value.toUpperCase()}
					</span>
				</div>
			</button>
		);
	} else {
		if ((props.selectedOptionId === props.id && props.correctOptions.includes(props.id)) || props.correctOptions.includes(props.id)) {
			return (
				<button className="answered-option-wrapper" style={{ color: props.color }}>
					<div className="answered-option-white-bar"
						style={{ width: `${props.percentage}%`, zIndex: 0, backgroundColor: 'green', opacity: 0.3 }}></div>
					<div style={{ marginTop: "1px" }}>
						<Emoji emoji="white_check_mark" set='apple' size={26} />
					</div>
					<div className="option-text-answered">
						{props.value.toUpperCase()}
					</div>
					<div className="option-percentage">{props.percentage.toFixed(1)}%</div>
				</button>
			);
		} else if (props.selectedOptionId === props.id && !props.correctOptions.includes(props.id)) {
			return (
				<button className="answered-option-wrapper" style={{ color: props.color }}>
					<div className="answered-option-white-bar"
						style={{ width: `${props.percentage}%`, zIndex: 0, backgroundColor: 'red', opacity: 0.3 }}></div>
					<div style={{ marginTop: "1px" }}>
						<Emoji emoji="no_entry" set='apple' size={26} />
					</div>
					<div className="option-text-answered">
						{props.value.toUpperCase()}
					</div>
					<div className="option-percentage">{props.percentage.toFixed(1)}%</div>
				</button>
			);
		} else {
			return (
				<button className="answered-option-wrapper" style={{ color: props.color }}>
					<div className="answered-option-white-bar"
						style={{ width: `${props.percentage}%` }}></div>
					<div style={{ marginTop: "1px" }}>
						<Emoji emoji={props.emoji} set='apple' size={26} />
					</div>
					<div className="option-text-answered">
						{props.value.toUpperCase()}
					</div>
					<div className="option-percentage">{props.percentage.toFixed(1)}%</div>
				</button>
			);
		}
	}

}

export default GameOption;
