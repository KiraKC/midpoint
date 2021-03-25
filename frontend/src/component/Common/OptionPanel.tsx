import React from "react";
import '../../styles/Common/OptionPanel.css'
import OptionButton from "./OptionButton";
import OptionItem from "./OptionItem";

interface IOptionPanelProps {
	numOfOptions: number,
	setNumOfOptions: any,
	pollEmojiArray: string[],
	setPollEmojiArray: any,
	isEmojiOpenArray: boolean[],
	setIsEmojiOpenArray: any,
	textFieldValue: string[],
	setTextFieldValue: any
}

function OptionPanel(props: IOptionPanelProps) {

	const range = (from: number, to: number, step: number) =>
		[...Array(Math.floor((to - from) / step) + 1)].map((_, i) => from + i * step);

	const itemProps = {
		pollEmojiArray: props.pollEmojiArray,
		setPollEmojiArray: props.setPollEmojiArray,
		isEmojiOpenArray: props.isEmojiOpenArray,
		setIsEmojiOpenArray: props.setIsEmojiOpenArray,
		textFieldValue: props.textFieldValue,
		setTextFieldValue: props.setTextFieldValue,
	}



	return (
		<div>
			{range(0, props.numOfOptions - 1, 1).map((option) => (
				<OptionItem key={option} optionIndex={option} {...itemProps} />
			))}
			<div className="option-botton-wrapper">
			
			</div>
		</div>
	);
}

export default OptionPanel;
