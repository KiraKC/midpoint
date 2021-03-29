import React from "react";
import '../../styles/Common/Header.css'

interface IHeaderProps {
	setIsModalOpen: any
}
function Header(props: IHeaderProps) {
	return (
		<div className="header">
			<div className="header-background"></div>
			<a className="header-link" href="./app.tsx">midpoint.</a>
			<div style={{position: 'relative'}}>
				<button className="nav-link">Log in</button>
				<button className="nav-link" onClick={() => props.setIsModalOpen(true)}>New Poll</button>
			</div>
		</div>
	);
}

export default Header;
