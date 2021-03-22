import React from "react";
import './Header.css'
function Header(props) {
	return (
		<div className="Header">
				<a
					className="Header-link" 
					href="./app.tsx"
					target="_blank"
					>
					Peak.io
				</a>

				<div>
				<a 
				href="app.tsx"
				className="Account-link">
					log in
				</a>
				<a 
				href="app.tsx"
				className="Account-link">
					settings
				</a>
				</div>	
		</div>
	);
}

export default Header;
