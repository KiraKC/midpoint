import '../../styles/HomePage/MasonryPoll.css';
import React from 'react';

interface MasonryPollProps {
  height: number;
  backgroundColor: string;
  text: string;
}

function MasonryPoll(props: MasonryPollProps) {

	return (
		<>
			<div className="MasonryPollWrapper" style={{ height: `${props.height}px`,
                                                   backgroundColor: `${props.backgroundColor}`}}>
        {props.text}
      </div>
		</>
	);
}
 
export default MasonryPoll;
