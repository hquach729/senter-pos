import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface EditState {
	error: boolean | string;
	edit: boolean;
}

const initialState: EditState = {
	error: false,
	edit: false,
};

export const editInfoSlice = createSlice({
	name: 'editInfo',
	initialState,
	reducers: {
		setError: (state, action: PayloadAction<boolean | string>) => {
			state.error = action.payload;
		},
		setEdit: (state, action: PayloadAction<boolean>) => {
			state.edit = action.payload;
		},
		clearEdit: (state) => {
			state.edit = false;
			state.error = false;
		},
	},
});

export const { setError, setEdit, clearEdit } = editInfoSlice.actions;
export const selectError = (state: RootState) => state.editInfo.error;
export const selectEdit = (state: RootState) => state.editInfo.edit;

export default editInfoSlice.reducer;
