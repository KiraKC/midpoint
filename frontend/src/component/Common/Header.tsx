import React from "react";
import '../../styles/Common/Header.css'

interface IHeaderProps {
	setIsModalOpen: any
}
function Header(props: IHeaderProps) {
	return (
		<div className="header">
			<a className="header-link" href="./app.tsx">Peak.io</a>
			<div>
				<button className="nav-link">Log in</button>
				<button className="nav-link" onClick={() => props.setIsModalOpen(true)}>New Poll</button>
			</div>
		</div>
	);
}

export default Header;
