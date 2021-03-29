import React from "react";
import { useNavigate } from "react-router";
import '../../styles/Common/Header.css'

interface IHeaderProps {
	setIsPollModalOpen: any,
	setIsLoginModalOpen: any
}

function Header(props: IHeaderProps) {
	const navigate = useNavigate()

	return (
		<div className="header">
			<div className="header-background"></div>
			<div style={{display: 'flex', alignItems: 'center', position: 'relative'}}>
				<a className="header-link" onClick={() => navigate('home')} style={{ cursor: 'pointer' }}>midpoint.</a>
				<div className="nav-text-link" style={{marginLeft: '45px'}} onClick={() => navigate('answer')}>Answer</div>
				<div className="nav-text-link" onClick={() => navigate('game')}>Game</div>
				
			</div>
			<div style={{ position: 'relative' }}>
				<button className="nav-link" onClick={() => props.setIsLoginModalOpen(true)}>Log in</button>
				<button className="nav-link" onClick={() => props.setIsPollModalOpen(true)}>New Poll</button>
			</div>
		</div>
	);
}

export default Header;
