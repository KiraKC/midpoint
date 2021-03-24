import Modal from 'react-modal';
import React from "react";
import '../../styles/Common/Header.css'

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
		height: 'max-content',
		transform: 'translate(-50%, -50%)',
		borderRadius: '20px',
		border: '3px solid black',
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
				<div className="poll-model-close">CLOSE</div>
			</Modal>
		</div>
	);
}

export default NewPollModal;
