import React from "react";
import IPoll from "../../interfaces/IPoll";
import '../../styles/StatsPage/StatsBottomPanel.css'
import BarChart from "./BarChart";
import StatsControlBox from "./StatsControlBox";

interface IStatsBottomPanelProps {
	chartData: any,
  poll: IPoll
}

function StatsBottomPanel(props: IStatsBottomPanelProps) {

	return (
		<div className="stats-bottom-panel-wrapper" style={{backgroundColor: props.poll.color}}>
        <div className="stats-control-panel-wrapper" >
          <StatsControlBox />
        </div>
        <div className="chart-wrapper" >
          {props.chartData ? <BarChart chartData={props.chartData} /> : ''}
        </div>
		</div>
	);
}

export default StatsBottomPanel;