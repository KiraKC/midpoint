import { Emoji } from "emoji-mart";
import '../../styles/Common/CategoryButton.css'

interface ICategoryButtonMutedProps {
	emoji: string,
	text: string,
}

function CategoryButtonMuted(props: ICategoryButtonMutedProps) {

	return (
		<button className="category-button-muted">
			<div style={{ marginTop: '3px' }}><Emoji emoji={props.emoji} set='apple' size={16} /></div>
			<div style={{ marginLeft: '5px' }}>{props.text}</div>
		</button>
	);
}

export default CategoryButtonMuted;
