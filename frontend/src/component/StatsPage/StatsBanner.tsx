import '../../styles/StatsPage/StatsBanner.css'
import CategoryButtonMuted from "../Common/CategoryButtonMuted";
import { findCategoryInfo } from "../../constants/Category";
import { Emoji } from "emoji-mart";
import { useMediaQuery } from 'react-responsive'
import React from 'react';
import MutedPollOption from './MutedPollOption';

interface IStatsBannerProps {
	statistics: any
}

function StatsBanner(props: IStatsBannerProps) {

	const getCategoryButton = () => {
		const selectedCategory = props.statistics.categoriesRankedByCorrelation.slice(0, 3);
		const categoryMetaData = [];
		for (let i = 0; i < selectedCategory.length; i++) {
			console.log(findCategoryInfo(selectedCategory[i]))
			categoryMetaData.push(findCategoryInfo(selectedCategory[i]));
		}
		console.log(categoryMetaData)
		return categoryMetaData;
	}

	const isSmallScreen = useMediaQuery({
		query: '(max-width: 1100px)'
	})

	const isBigScreen = useMediaQuery({
		query: '(min-width: 1100px)'
	})

	return (
		<div className="banner-wrapper" style={{ backgroundColor: props.statistics.poll.color }}>
			<div className="banner-left">
				<div className="banner-supplement-heading">DETAILED STATISTICS FOR ...</div>
				<Emoji emoji={props.statistics.poll.emoji} set='apple' size={34} />
				<div className="banner-main-heading">
					{props.statistics.poll.question}</div>
				<div className="banner-options-wrapper">
					{props.statistics.poll.answerOptions.map((option, index) => (
						<MutedPollOption key={index} id={option.id} value={option.value}
							emoji={option.emoji} textColor={props.statistics.poll.color}
						/>
					))}
				</div>
				<div className="category-flex-wrapper">
					<div className="category-text">Strongly correlated with: </div>
					{getCategoryButton().map((e, i) => {
						return <CategoryButtonMuted
							key={i}
							emoji={e.emoji}
							text={e.text}
						/>
					})}
				</div>
			</div>
			<button className="banner-icon">
				<span className="material-icons-outlined">share</span>
			</button>
			<div className="banner-statics">
				<div className="banner-number">{props.statistics.poll.numClicks}</div>
				{isSmallScreen &&
					<div className="banner-stats-text">Responses </div>
				}
				{isBigScreen &&
					<div className="banner-stats-text">Users have answered this question</div>
				}
			</div>
		</div>
	);
}

export default StatsBanner;