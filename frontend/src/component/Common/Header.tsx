import React from "react";
import '../../styles/Common/Header.css'

function Header() {
	return (
		<div className="header">
			<a className="header-link" href="./app.tsx" target="_blank">Peak.io</a>
			<div>
				<button className="nav-link">Log in</button>
				<button className="nav-link">New Poll</button>
			</div>
		</div>
	);
}

export default Header;
