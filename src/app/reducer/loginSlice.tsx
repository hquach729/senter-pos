import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { Auth } from '../types/api';

// Define a type for the slice state
export interface LoginState extends Auth {
	error?: boolean;
}

// Define the initial state using that type
const initialState: LoginState = {
	authenticated: undefined,
	error: undefined,
};

export const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		setAuth: (state, action: PayloadAction<Auth>) => {
			state.authenticated = action.payload.authenticated;
		},
		setError: (state, action: PayloadAction<{ error: boolean }>) => {
			state.error = action.payload.error;
		},
	},
});

export const { setAuth, setError } = loginSlice.actions;

export const selectAuthenticated = (state: RootState) =>
	state.login.authenticated;
export const selectLoginError = (state: RootState) => state.login.error;

export default loginSlice.reducer;
