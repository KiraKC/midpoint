import { Emoji } from 'emoji-mart';
import React from 'react';
import '../../styles/StatsPage/StatsBottomPanel.css'

interface IStatsControlBoxProps {
	setUserMetaDataGrouping: any
}

function StatsControlBox(props: IStatsControlBoxProps) {

	function handleClick(category: string) {
		props.setUserMetaDataGrouping(category)
	}

	return (
		<div className="stats-control-box-wrapper">
			<div className="insight-heading">
				<div className="control-box-heading">Insights<br />by Metrics</div>
				<div className="vl"></div>
				<div className="control-box-subheading">Powered by the Users</div>
			</div>
			<div className="control-box-button-flex">
				<button onClick={() => handleClick("politicalLeaning")} className="control-box-button">
					<Emoji emoji='classical_building' set='apple' size={20} />
				&nbsp; POLITICAL LEANING</button>
				<button onClick={() => handleClick("age")} className="control-box-button"
					style={{ backgroundColor: '#B33951' }}><Emoji emoji='older_man' set='apple' size={20} />
			&nbsp; AGE</button>
				<button onClick={() => handleClick("gender")} className="control-box-button"
					style={{ backgroundColor: '#344966' }}><Emoji emoji='restroom' set='apple' size={20} />
			&nbsp; GENDER</button>
				<button onClick={() => handleClick("maritalStatus")} className="control-box-button"
					style={{ backgroundColor: '#7F5A83' }}><Emoji emoji='ring' set='apple' size={20} />
			&nbsp; MARITAL STATUS</button>
				<button onClick={() => handleClick("education")} className="control-box-button"
					style={{ backgroundColor: '#12BE8B' }}><Emoji emoji='mortar_board' set='apple' size={20} />
			&nbsp; EDUCATION</button>
			</div>
		</div>
	);
}

export default StatsControlBox;