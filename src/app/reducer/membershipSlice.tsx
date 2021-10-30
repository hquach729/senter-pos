import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type PurchaseType = 'BUY' | 'RENEW' | 'NEW';

export interface Membership {
	record?: number;
	account?: string;
	phone?: string;
	first?: string;
	last?: string;
	since?: string;
	fee?: number;
	gallon?: number;
	buy?: number;
	remain?: number;
	previous?: number;
	type?: PurchaseType;
	date?: string;
	time?: string;
	note?: string;
}

// Define a type for the slice state
export interface MembershipState {
	record?: Membership;
	records?: Membership[];
	history?: Membership[];
}

// Define the initial state using that type
const initialState: MembershipState = {
	record: undefined,
	records: undefined,
	history: undefined,
};

// Define the action and reducer
export const membershipSlice = createSlice({
	name: 'membership',
	initialState,
	reducers: {
		setRecord: (state, action: PayloadAction<Membership>) => {
			state.record = action.payload;
		},
		setRecords: (state, action: PayloadAction<Membership[]>) => {
			state.records = action.payload;
		},
		setHistory: (state, action: PayloadAction<Membership[]>) => {
			state.history = action.payload;
		},
		clearAll: (state) => {
			state = {};
		},
	},
});

// Action to set the state of the membership reducer
export const { setRecord, setRecords, setHistory, clearAll } =
	membershipSlice.actions;

// Get the state of the reducer
export const selectRecord = (state: RootState) => state.membership.record;
export const selectRecords = (state: RootState) => state.membership.records;
export const selectHistory = (state: RootState) => state.membership.history;

// Export this configuration to our store
export default membershipSlice.reducer;
