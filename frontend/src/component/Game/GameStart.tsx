import '../../styles/Game/GameStart.css'
import { Navigate, useNavigate } from 'react-router';

function GameStart(props) {

	const navigate = useNavigate()

	return (
		<div className="start-wrapper-flex">
			<div className="start-rect">
				<div className="start-section-heading">Hit the <br /> Midpoint Challenge</div>
				<div className="start-details">
					Midpoint is a platform where you can create custom surveys.
					The statistics help you learn  about the ideas and opintions of the wider community.
				</div>
				<button className="start-button-submit" onClick={() => navigate('/play')}> Start</button>
			</div>
			<img className="start-picture" src="https://www.invaluable.com/blog/wp-content/uploads/2017/10/Invaluable-Roy-Lichtenstein-Hero.jpg"></img>
		</div>

	);
}

export default GameStart;
