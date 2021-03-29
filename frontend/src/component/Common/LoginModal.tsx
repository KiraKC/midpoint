import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

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
		width: 'min(650px, 85vw)',
		height: 'max-content',
		transform: 'translate(-50%, -50%)',
		borderRadius: '40px',
		border: '3px solid black',
		paddingTop: '30px',
		paddingBottom: '30px',
		paddingLeft: '30px',
		backgroundColor: 'rgba(255,255,255, 0.6)',
		backdropFilter: 'blur(20px)'
	}
};

function LoginModal(props: INewPollModal) {
	return (
		<div>
			<Modal
				isOpen={props.isModalOpen}
				// onRequestClose={() => props.setIsModalOpen(false)}
				contentLabel="Example Modal"
				style={customStyles} />
		</div>
	);
}

export default LoginModal;