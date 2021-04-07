import React from "react";
import ReactLoading, { LoadingType } from 'react-loading';
import '../../styles/Common/LoginModal.css'


function SuccessScreen() {
	return (
		<>
			<div className="loading-overlay"></div>
			<span className="loader material-icons success-icon">how_to_reg</span>
			<span className="loader success-text">Authentication successful, redirecting...</span>
		</>
	)
}

export default SuccessScreen;