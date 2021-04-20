import { Emoji } from "emoji-mart";
import { useState } from "react";
import '../../styles/Common/CategoryButton.css'

interface ICategoryButtonProps {
	emoji: string,
	text: string,
	highlightColor: string,
	categories: string[],
	setCategories: any
}

function CategoryButton(props: ICategoryButtonProps) {

	const [selected, setSelected]: [boolean, any] = useState(false)

	const selectedStyle = {
		backgroundColor: props.highlightColor,
		color: 'white',
		border: '2px solid',
		borderColor: props.highlightColor
	};

	const defaultStyle = {
		backgroundColor: 'transparent'
	}

	const handleSelect = () => {
		let tempCategories;
		if (!selected) {
			tempCategories = props.categories;
			tempCategories.push(props.text)
			props.setCategories([...tempCategories])
		} else {
			const index = props.categories.indexOf(props.text);
			if (index > -1) {
				tempCategories = props.categories;
				tempCategories.splice(index, 1);
			}
			props.setCategories([...tempCategories]);
		}
		console.log(props.categories)
		setSelected(!selected);
	}
	return (
		<button className="category-button"
			style={selected ? selectedStyle : defaultStyle}
			onClick={() => handleSelect()}>
			<div style={{ marginTop: '3px' }}><Emoji emoji={props.emoji} set='apple' size={16} /></div>
			<div style={{ marginLeft: '5px' }}>{props.text}</div>
		</button>
	);
}

export default CategoryButton;
