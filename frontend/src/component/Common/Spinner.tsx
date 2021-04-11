import ReactLoading, { LoadingType } from 'react-loading';
import '../../styles/Common/LoginModal.css'

interface ISpinnerProps {
	type: LoadingType,
	color: string
}

function Spinner(props: ISpinnerProps) {
	return (
		<div className="loading-overlay">
			<ReactLoading type={props.type} color={props.color} height={'50px'} width={'50px'} className="loader" />
		</div>
	)
}

export default Spinner;