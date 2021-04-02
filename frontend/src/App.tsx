import React from 'react';
import './App.css';
import Header from './component/Common/Header';
import MasonryWrapper from './component/HomePage/MasonryWrapper'
import Modal from 'react-modal';
import { useState, useContext } from 'react';
import SignUplModal from './component/Common/SignUpModal';
import NewPollModal from './component/Common/NewPollModal';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import LoginModal from './component/Common/LoginModal';
import "firebase/auth";
import firebase from "firebase/app";
import firebaseConfig from "./firebase/FirebaseIndex"
import {
	FirebaseAuthProvider,
	FirebaseAuthConsumer
} from "@react-firebase/auth";
import SignUpModal from './component/Common/SignUpModal';
import GameStart from './component/Game/GameStart';

function App() {


	return (
		<>
			<BrowserRouter>
				<FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
					<div id="website-wrapper">
						<Header />
						<Routes>
							<Route element={<Navigate to="home" />} />
							<Route path="/home" element={<MasonryWrapper />} />
							<Route path="/game" element={<GameStart />} />
						</Routes>
					</div>
				</FirebaseAuthProvider>

			</BrowserRouter>
		</>
	);
}

export default App;