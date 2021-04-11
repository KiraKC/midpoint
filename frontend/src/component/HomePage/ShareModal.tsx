import Modal from 'react-modal';
import '../../styles/Common/LoginModal.css'

interface IShareModal {
	pollId: string,
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
		borderRadius: '30px',
		paddingTop: '30px',
		paddingBottom: '30px',
		paddingLeft: '30px',
		backgroundColor: 'rgba(255,255,255, 0.6)',
		backdropFilter: 'blur(20px)',
		boxShadow: 'rgb(0 0 0 / 46%) 0px 3px 6px, rgb(255 255 255 / 24%) 0px 3px 12px inset'
	}
};

function ShareModal(props: IShareModal) {
	return (
		<Modal
			isOpen={props.isModalOpen}
			onRequestClose={props.setIsModalOpen(false)}
			contentLabel="Share Modal"
			style={customStyles}>
		</Modal >
	);
}

export default ShareModal;