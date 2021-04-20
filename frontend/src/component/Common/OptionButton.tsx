import '../../styles/Common/OptionPanel.css'

interface IOptionButtonProps {
	text: string,
	handler: any
}

function OptionButton(props: IOptionButtonProps) {
	return (
		<button className="option-panel-button" onClick={(e) => {props.handler()}}>
			<span className="material-icons" style={{ marginRight: '3px', fontSize: '35px' }}>{props.text}</span>
		</button>
	);
}

export default OptionButton;

