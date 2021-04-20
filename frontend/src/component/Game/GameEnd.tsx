import '../../styles/Game/GameEnd.css'
import { Navigate, useNavigate } from 'react-router';

function GameEnd(props) {

	return (
		<div className="end-wrapper-flex">
			<div className="start-rect">
				<div>
					<div className="start-section-heading">You Finished<br/> A MidPoint Challenge! </div>
					<div className="start-details">
					<b>Highest Score: {props.currPoint}</b> <br/><br/>Becoming a master at guessing the majority answers? Hit the replay 😜
				</div>
				</div>
				<button className="start-button-submit" onClick={() => window.location.reload()}>PLAY AGAIN
				<span className="material-icons-outlined">restart_alt</span></button>
			</div>
				<img className="end-picture" src="https://artprep.weebly.com/uploads/2/8/4/9/28493185/5231829_orig.jpg"></img>
		</div>

	);
}

export default GameEnd;
