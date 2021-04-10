import axios from "axios";
import React from "react";
import ReactLoading, { LoadingType } from 'react-loading';
import Masonry from "react-masonry-css";
import endpointUrl from "../../constants/Endpoint";
import '../../styles/Common/LoginModal.css'

interface ISearchResultProps {
	searchString: string,

}

function SearchResult(props: ISearchResultProps) {
	const requestPolls = async () => {
		let toSend = {
			searchString: props.searchString
		}
		console.log(toSend)
		const config = {
			headers: {
				"Content-Type": "application/json",
				'Access-Control-Allow-Origin': '*',
			}
		}

		axios.post(
			endpointUrl + '/poll/search', toSend, config)
			.then(response => {

				console.log(response.data.suggestedPolls)
			})
			.catch(e => {
				console.log(e)
			});
	}

	// const divItems = polls.map(function (poll) {
	// 	return <MasonryPoll key={poll.id} id={poll.id} question={poll.question}
	// 		emoji={poll.emoji} answerOption={poll.answerOptions} isLoggedIn={props.isLoggedIn}
	// 		setIsLoginModalOpen={props.setIsLoginModalOpen} color={poll.color} imageUrl={poll.imageUrl} />
	// });

	const breakpointColumnsObj = {
		default: 4,
		1700: 4,
		1300: 3,
		1000: 2,
		700: 2,
		600: 1
	};

	return (
		<div className="masonry-wrapper-wrapper">
			{console.log(props.searchString)}

			<Masonry
				breakpointCols={breakpointColumnsObj}
				className="my-masonry-grid"
				columnClassName="my-masonry-grid_column"
			>
				{/* {divItems} */}
			</Masonry>
		</div>
	);
}

export default SearchResult;