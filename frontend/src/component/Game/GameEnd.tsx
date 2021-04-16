import '../../styles/Game/GameEnd.css'
import { Navigate, useNavigate } from 'react-router';

function GameStart(props) {

	const navigate = useNavigate()

	return (
		<div className="end-wrapper-flex">
			<div className="end-rect" >
				<div className="end-section-heading">TEARS OF JOY </div>
				<div className="end-section-score">You finished a Midpoint Challenge!</div>
				<div className="end-section-score"><b>score:</b> props.currScore
				</div>
				<button className="end-button-submit" onClick={() => navigate('/game')}> Replay</button>
			</div>
			<div className="pic-area" >
				<img className="end-picture" src="https://publicdelivery.b-cdn.net/wp-content/uploads/2019/04/Roy-Lichtenstein-%E2%80%93-Crying-Girl-1964-porcelain-enamel-on-steel-116.8-x-116.8-cm-feat.jpg"></img>
				<div className="end-details">
					<b>Your score:</b> props.currscore <br/><br/>
					<b>Your best score:</b> props.userBestScore <br/><br/>
				</div>
			</div>

		</div>

	);
}

export default GameStart;
