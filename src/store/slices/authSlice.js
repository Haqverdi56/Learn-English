import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: JSON.parse(localStorage.getItem('user')) || null,
	isAuthenticated: !!localStorage.getItem('user'),
	loading: false,
	error: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginStart: (state) => {
			state.loading = true;
			state.error = null;
		},
		loginSuccess: (state, action) => {
			state.loading = false;
			state.user = action.payload;
			state.isAuthenticated = true;
			localStorage.setItem('user', JSON.stringify(action.payload));
		},
		loginFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		logout: (state) => {
			state.user = null;
			state.isAuthenticated = false;
			state.loading = false;
			state.error = null;
			localStorage.removeItem('user');
		},
	},
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

// Async thunks
export const loginUser = (email, password) => async (dispatch) => {
	dispatch(loginStart());
	try {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		const user = {
			id: '1',
			email,
			name: email.split('@')[0],
		};
		dispatch(loginSuccess(user));
	} catch (error) {
		dispatch(loginFailure(error.message));
	}
};

export const signupUser = (email, password, name) => async (dispatch) => {
	dispatch(loginStart());
	try {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		const user = {
			id: '1',
			email,
			name,
		};
		dispatch(loginSuccess(user));
	} catch (error) {
		dispatch(loginFailure(error.message));
	}
};

export default authSlice.reducer;
