import '../../styles/Game/GameStart.css'

interface IOptionSelectorProps {
	optionArray: any[],
	setOptionValue: any
}

function OptionSelector(props: IOptionSelectorProps) {

	return (
			<select className="option-selector"
			onChange={(e) => {props.setOptionValue(e.target.value)}}>
				{props.optionArray.map((e, i) => (
					<option value={e} key={i}>{e}</option>
				))}
			</select>
	);
}

export default OptionSelector;
