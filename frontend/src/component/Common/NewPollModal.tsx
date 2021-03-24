import Modal from 'react-modal';
import React from "react";
import '../../styles/Common/NewPollModal.css'

interface INewPollModal {
	isModalOpen: boolean,
	setIsModalOpen: any
}

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		width: 'min(1000px, 85vw)',
		// height: 'max-content',
		height: '200px',
		transform: 'translate(-50%, -50%)',
		borderRadius: '20px',
		border: '3px solid black',
		padding: '30px'
	}
};

function NewPollModal(props: INewPollModal) {
	Modal.setAppElement("#root")
	return (
		<div>
			<Modal
				isOpen={props.isModalOpen}
				// onRequestClose={() => props.setIsModalOpen(false)}
				contentLabel="Example Modal"
				style={customStyles}>
				<div className="poll-modal-wrapper-flex">
					<div className="poll-modal-heading">Create New Poll</div>
					<button className="poll-modal-close" onClick={() => props.setIsModalOpen(false)}>
						<span className="material-icons">close</span>
						<div className="poll-modal-close-text">CLOSE</div>
					</button>
				</div>
				<div className="poll-modal-input-module">
				<div className="poll-modal-question-desc">QUESTION</div>
				<input className="poll-modal-question-input" type="text" 
				placeholder="What's in your curious mind?"></input>
				</div>
				
			</Modal>
		</div>
	);
}

export default NewPollModal;
