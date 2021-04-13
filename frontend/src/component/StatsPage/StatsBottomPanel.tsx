import React from "react";
import IPoll from "../../interfaces/IPoll";
import '../../styles/StatsPage/StatsBottomPanel.css'
import BarChart from "./BarChart";
import StatsControlBox from "./StatsControlBox";

interface IStatsBottomPanelProps {
	chartData: any,
	poll: IPoll,
	setUserMetaDataGrouping: any,
	grouping: string
}

function StatsBottomPanel(props: IStatsBottomPanelProps) {

	return (
		<div className="stats-bottom-panel-wrapper">
			<StatsControlBox setUserMetaDataGrouping={props.setUserMetaDataGrouping} />
			{props.chartData ? <BarChart chartData={props.chartData} grouping={props.grouping} /> : ''}
		</div>
	);
}

export default StatsBottomPanel;