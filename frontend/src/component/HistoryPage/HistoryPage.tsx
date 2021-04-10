import axios from "axios";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import ReactLoading, { LoadingType } from 'react-loading';
import Masonry from "react-masonry-css";
import endpointUrl from "../../constants/Endpoint";
import IPoll from "../../interfaces/IPoll";
import '../../styles/Common/LoginModal.css'
import MasonryPoll from "../HomePage/Poll";

interface IHistoryPageProps {
	setIsLoginModalOpen: any,
	isLoggedIn: boolean,
}

function HistoryPage(props: IHistoryPageProps) {
	
	const [answeredPolls, setAnsweredPolls]: [IPoll[], any] = useState([]);

  useEffect(() => {
    requestPolls();
  }, [])

	const requestPolls = async () => {
		let toSend;
		if (props.isLoggedIn) {
			const token = await firebase.auth().currentUser.getIdToken(true);
			toSend = {
				userIdToken: token
			}
		
      console.log(toSend)
      const config = {
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
        }
      }
      axios.post(
        endpointUrl + '/user/answered-polls', toSend, config)
        .then(response => {
          console.log("ANSWEREDPOLLS: ")
          console.log(response.data)
          setAnsweredPolls(response.data.answeredPolls);
        })
        .catch(e => {
          console.log(e)
        });
    }
	}

	const divItems = answeredPolls.map(function (poll) {
		return <MasonryPoll key={poll.id} id={poll.id} question={poll.question}
			emoji={poll.emoji} answerOption={poll.answerOptions} isLoggedIn={props.isLoggedIn}
			setIsLoginModalOpen={props.setIsLoginModalOpen} color={poll.color} imageUrl={poll.imageUrl} answered={false}/>
	});

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
			<Masonry
				breakpointCols={breakpointColumnsObj}
				className="my-masonry-grid"
				columnClassName="my-masonry-grid_column"
			>
				{divItems}
			</Masonry>
		</div>
	);
}

export default HistoryPage;