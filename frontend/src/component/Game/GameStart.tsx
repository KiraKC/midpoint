import '../../styles/Game/GameStart.css'
import { Navigate, useNavigate } from 'react-router';

function GameStart(props) {

	return (
		<div className="start-wrapper-flex">
			<div className="start-rect">
				<div>
					<div className="start-section-heading">Hit the <br /> MidPoint <br /> Challenge</div>
					<div className="start-details">
						Midpoint is a platform where you can create custom surveys.
						The statistics help you learn about the ideas and opinions of the wider community.
				</div>
				</div>
				<button className="start-button-submit" onClick={() => props.setGameStarted(true)}>START
				<span className="material-icons-outlined">flag</span></button>
			</div>
			<img className="start-picture" src="https://www.invaluable.com/blog/wp-content/uploads/2017/10/Invaluable-Roy-Lichtenstein-Hero.jpg"></img>
		</div>

	);
}

export default GameStart;
