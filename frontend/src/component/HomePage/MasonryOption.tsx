import '../../styles/HomePage/MasonryOption.css';
import React from 'react';
import { Emoji } from 'emoji-mart'

interface MasonryOptionProps {
	id: string,
	emoji: string,
	value: string,
	textColor: string,
  isLoggedIn: boolean,
  setIsLoginModalOpen: any,
  setAnswered: any
}

function MasonryOption(props: MasonryOptionProps) {

  function buttonPressed() {
    if (props.isLoggedIn) {
      props.setAnswered(props.id);
    } else {
      props.setIsLoginModalOpen(true);
    }
  }

	return (
		<button
			className="option-wrapper"
			style={{ color: `${props.textColor}` }}
      onClick={buttonPressed}>
			<div style={{ marginTop: "1px" }}>
				<Emoji emoji={props.emoji} set='apple' size={26} />
			</div>
			<div className="option-text">{props.value.toUpperCase()}</div>
		</button>
	);
}

export default MasonryOption;
