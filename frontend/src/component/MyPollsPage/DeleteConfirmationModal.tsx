import React, { useState } from 'react';
import ReactLoading, { LoadingType } from 'react-loading';
import '../../styles/Common/LoginModal.css'
import Modal from 'react-modal';

interface IDeleteConfirmationModalProps {
	isModalOpen: boolean,
	setIsModalOpen: any,
	setConfirmDelete: any,
	question: string
}

function DeleteConfirmationModal(props: IDeleteConfirmationModalProps) {

	const [pollName, setPollName]: [string, any] = useState('');
	const [hint, setHint]: [string, any] = useState('POLL NAME');
	
	const customStyles = {
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			width: 'min(500px, 85vw)',
			height: 'max-content',
			transform: 'translate(-50%, -50%)',
			borderRadius: '30px',
			paddingTop: '30px',
			paddingBottom: '30px',
			paddingLeft: '30px',
			backgroundColor: 'rgba(255,255,255, 0.1)',
			backdropFilter: 'blur(20px)',
			boxShadow: 'rgb(0 0 0 / 46%) 0px 3px 6px, rgb(255 255 255 / 24%) 0px 3px 12px inset'
		}
	};

	const handleDelete = () => {
		if (pollName === props.question) {
			props.setConfirmDelete(true);
			setHint('POLL NAME')
		} else {
			setHint('INPUT DOES NOT MATCH POLL NAME')
		}
	}

	return (
		<Modal
			isOpen={props.isModalOpen}
			contentLabel="Deletion Modal"
			style={customStyles}>
			<div className="login-modal-heading" style={{fontSize: '1.5rem'}}>Deleting Poll</div>
			<div className="login-modal-description" style={{fontSize: '1.05rem'}}>
				Please enter <b>{props.question}</b> in the textbox below to confirm.
				</div>
			<input className="delete-poll-input" type="text"
				placeholder="Enter requested string"
				onChange={(e) => { setPollName(e.target.value); setHint('POLL NAME') }}></input>
			<div className="delete-input-hint"
				style={{ color: (hint === 'POLL NAME' ? 'black' : '#F24443') }}
			>{hint}</div>
			<div className="delete-button-group">
				<button className="poll-delete-submit" 
				style={{paddingLeft: '15px', paddingRight: '15px'}}
				onClick={() => props.setIsModalOpen(false)}>
					<div className="poll-modal-close-text">Cancel</div>
				</button>
				<button className="poll-delete-submit" onClick={() => handleDelete()}>
					<span className="material-icons-outlined" style={{ marginRight: '3px' }}>delete</span>
					<div className="poll-modal-close-text">Delete</div>
				</button>
			</div>

		</Modal>
	)
}

export default DeleteConfirmationModal;


