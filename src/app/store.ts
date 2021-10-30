import * as ReduxToolKit from '@reduxjs/toolkit';
import type { ThunkAction, Action } from '@reduxjs/toolkit';
import loginReducer from './reducer/loginSlice';
import appReducer from './reducer/appSlice';
import membershipReducer from './reducer/membershipSlice';
import editReducer from './reducer/editSlice';
import receiptReducer from './reducer/receiptSlice';

const { configureStore } = ReduxToolKit;

export const store = configureStore({
	reducer: {
		app: appReducer,
		login: loginReducer,
		membership: membershipReducer,
		editInfo: editReducer,
		receipt: receiptReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
