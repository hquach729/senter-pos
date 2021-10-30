import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { AppInfo } from '../types/api';

interface AppState extends AppInfo {}

const initialState: AppState = {
	name: '',
	version: '`',
};

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		updateInfo: (state, action: PayloadAction<AppState>) => {
			state.name = action.payload.name;
			state.version = action.payload.version;
		},
	},
});

export const { updateInfo } = appSlice.actions;
export const selectName = (state: RootState) => state.app.name;
export const selectVersion = (state: RootState) => state.app.version;

export default appSlice.reducer;
