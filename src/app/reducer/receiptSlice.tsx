import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { CurrentRecord } from '../types/membership';

interface ReceiptState {
	open: boolean;
	current?: CurrentRecord;
}

const initialState: ReceiptState = {
	open: true,
	current: undefined,
};

export const receiptSlice = createSlice({
	name: 'receipt',
	initialState,
	reducers: {
		setOpenReceipt: (state, action: PayloadAction<boolean>) => {
			state.open = action.payload;
		},
		setCurrentReceipt: (state, action: PayloadAction<CurrentRecord>) => {
			state.current = action.payload;
		},
		clearReceipt: (state) => {
			state.current = undefined;
		},
	},
});

export const { setOpenReceipt, setCurrentReceipt, clearReceipt } =
	receiptSlice.actions;
export const selectOpenReceipt = (state: RootState) => state.receipt.open;
export const selectCurrentReceipt = (state: RootState) => state.receipt.current;

export default receiptSlice.reducer;
