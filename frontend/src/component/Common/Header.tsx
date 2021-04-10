import React, { useState } from "react";
import { useNavigate } from "react-router";
import '../../styles/Common/Header.css'
import { signOut } from '../../firebase/AuthMethods'
import NewPollModal from "./NewPollModal";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import { useMediaQuery } from 'react-responsive'

function Header(props) {

	const navigate = useNavigate()
	const [isPollModalOpen, setIsPollModalOpen]: [boolean, any] = useState(false);
	const [isSignupModalOpen, setIsSignupModalOpen]: [boolean, any] = useState(false);
	const [isSearchFocused, setIsSearchFocused]: [boolean, any] = useState(false);

	const isSmallScreen = useMediaQuery({
		query: '(max-width: 1100px)'
	})

	const isBigScreen = useMediaQuery({
		query: '(min-width: 1100px)'
	})

	function handleSignInStatus() {
		if (props.isLoggedIn) {
			signOut();
			props.setIsLoggedIn(false);
			props.setClearFeed(!props.clearFeed);
			setTimeout(() => props.setFetchNewPoll(!props.fetchNewPoll), 100)
		} else {
			props.setIsLoginModalOpen(true);
		}
	}

	const fetchNewPollProps = {
		fetchNewPoll: props.fetchNewPoll,
		setFetchNewPoll: props.setFetchNewPoll
	}

	const newPollProps = {
		polls: props.polls,
		setPolls: props.setPolls,
		seenPollIds: props.seenPollIds,
		setSeenPollIds: props.setSeenPollIds
	}

	const handleEnter = (e) => {
		if (e.key === 'Enter') {
			console.log('do validate');
			navigate('search-result')
		}
	}

	return (
		<>
			<NewPollModal isModalOpen={isPollModalOpen} setIsModalOpen={setIsPollModalOpen}
				{...newPollProps} />
			<LoginModal isModalOpen={props.isLoginModalOpen} setIsModalOpen={props.setIsLoginModalOpen}
				setIsSignupModalOpen={setIsSignupModalOpen} {...fetchNewPollProps}
				clearFeed={props.clearFeed} setClearFeed={props.setClearFeed} />
			<SignUpModal setIsLoggedIn={props.setIsLoggedIn} isModalOpen={isSignupModalOpen}
				setIsModalOpen={setIsSignupModalOpen} setIsLoginModalOpen={props.setIsLoginModalOpen} {...fetchNewPollProps}
				clearFeed={props.clearFeed} setClearFeed={props.setClearFeed} />
			<div className="header">
				{
					isSmallScreen &&
					<>
						<div className="header-background"></div>
						<div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
							<a className="header-link" onClick={() => navigate('home')} style={{ cursor: 'pointer' }}>midpoint.</a>
							{/* <div className="nav-text-link" onClick={() => navigate('game')}>Game</div> */}
						</div>
						<div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
							<button className="mobile-nav-link"
								onClick={() => navigate('history')}>
								<span className="material-icons-outlined">
									history</span></button>
							<button className="mobile-nav-link"
								onClick={() => navigate('my-poll')}>
								<span className="material-icons-outlined">
									outbox</span></button>
							<button className="mobile-nav-link"
								onClick={() => { props.isLoggedIn ? setIsPollModalOpen(true) : props.setIsLoginModalOpen(true) }}>
								<span className="material-icons-outlined">
									create</span></button>
							<button className="mobile-nav-link"
								onClick={() => handleSignInStatus()}>
								{props.isLoggedIn ? <span className="material-icons-outlined">exit_to_app</span> :
									<span className="material-icons-outlined">face</span>}
							</button>
						</div>
					</>
				}
				{
					isBigScreen &&
					<>
						<div className="header-background"></div>
						<div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
							<a className="header-link" onClick={() => navigate('home')} style={{ cursor: 'pointer' }}>midpoint.</a>
							<div className="nav-text-link" style={{ marginLeft: '30px' }} onClick={() => { props.isLoggedIn ? navigate('history') : props.setIsLoginModalOpen(true)}}>History</div>
							<div className="nav-text-link" onClick={() => navigate('my-poll')}>My Polls</div>
							{/* <div className="nav-text-link" onClick={() => navigate('game')}>Game</div> */}
						</div>
						<div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
							<button className="nav-link" onClick={() => { props.isLoggedIn ? setIsPollModalOpen(true) : props.setIsLoginModalOpen(true) }}>New Poll</button>
							<button className="nav-link"
								onClick={() => handleSignInStatus()}>{props.isLoggedIn ? 'Log out' : 'Sign in'}</button>
							<button className="nav-search"
								onFocus={() => setIsSearchFocused(true)}
							>
								{
									isSearchFocused ?
										<div className="search-module">
											<span style={{ marginLeft: '6px' }} className="material-icons-outlined">search</span>
											<input autoFocus
												className="search-input"
												type="text" onBlur={() => setIsSearchFocused(false)}
												placeholder="Press ENTER to Search"
												onKeyDown={(e) => handleEnter(e)}
												onChange={(e) => props.setSearchString(e.target.value)}></input>
										</div> :
										<span className="material-icons-outlined">search</span>

								}

							</button>
						</div>
					</>
				}
			</div>
		</>
	);
}

export default Header;
