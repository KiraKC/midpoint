import '../../styles/Game/GameEnd.css'
import { Navigate, useNavigate } from 'react-router';

function GameEnd(props) {

	const navigate = useNavigate()

	return (
		<div className="end-wrapper-flex">
			<div className="end-rect" >
				<div className="end-section-heading">TEARS OF JOY </div>
				<div className="end-section-score">You finished a MidPoint Challenge!</div>
				<div className="end-section-score"><b>score:</b> props.currScore
				</div>
				<button className="end-button-submit" onClick={() => navigate('/game')}> Replay</button>
			</div>
				<img className="end-picture" src="https://www.invaluable.com/blog/wp-content/uploads/2017/10/Invaluable-Roy-Lichtenstein-Hero.jpg"></img>
		</div>

	);
}

export default GameEnd;
