import React, { useContext } from 'react';
import { createContext } from "react";


interface IFirebaseAuth {
	auth: any
}

export const AuthContext = React.createContext<IFirebaseAuth>({} as IFirebaseAuth);

export function useAuth() {
	return useContext(AuthContext);
}

function AuthProvider(props) {
	const handleSignup = () => {
		// middle man between firebase and signup
	}
	return (
		<AuthContext.Provider value={{ auth: 'handleSignup' }}>
			{props.children}
		</AuthContext.Provider>
	);
}



export default AuthProvider;
