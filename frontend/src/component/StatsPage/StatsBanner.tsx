import axios from "axios";
import React, { useEffect, useState } from "react";
import endpointUrl from "../../constants/Endpoint";
import IPoll from "../../interfaces/IPoll";
import '../../styles/StatsPage/StatsBanner.css'
import { randomUserMetaDataGrouping } from "../../constants/UserMetaData";
import { useParams } from "react-router-dom";
import BarChart from "./BarChart";
import CategoryButtonMuted from "../Common/CategoryButtonMuted";

interface IStatsBannerProps {

}

function StatsBanner() {

	return (
		<div className="banner-wrapper">
			<div className="banner-left">
				<div className="banner-supplement-heading">DETAILED STATISTICS FOR</div>
				<div className="banner-main-heading">Should the Ratty Discontinue CHICKEN-FINGER Friday?</div>
				<div className="category-flex-wrapper">
					<div className="category-text">Strongly correlated with: </div>
					<CategoryButtonMuted text='hello' emoji='cop' />
					<CategoryButtonMuted text='hello' emoji='cop' />
					<CategoryButtonMuted text='hello' emoji='cop' />
					{/* {
						categories.map()
					} */}
				</div>
			</div>

			<button className="banner-icon">
				<span className="material-icons-outlined">share</span>
			</button>

			<div className="banner-statics">
				<div className="banner-number">6400</div>
				<div className="banner-stats-text">Users have answered this question</div>
			</div>
		</div>
	);
}

export default StatsBanner;