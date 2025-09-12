import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(() => {
		const savedUser = localStorage.getItem('user');
		return savedUser ? JSON.parse(savedUser) : null;
	});

	const login = async (email, password) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const mockUser = {
			id: '1',
			email,
			name: email.split('@')[0],
		};

		setUser(mockUser);
		localStorage.setItem('user', JSON.stringify(mockUser));
	};

	const signup = async (email, password, name) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const mockUser = {
			id: '1',
			email,
			name,
		};

		setUser(mockUser);
		localStorage.setItem('user', JSON.stringify(mockUser));
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem('user');
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				login,
				signup,
				logout,
				isAuthenticated: !!user,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
