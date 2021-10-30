import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { useRef, useEffect } from 'react';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Customer Hooks
export function usePrev<T>(value: T): T {
	const ref = useRef(value);

	console.log(ref.current);

	// Check if the value pass in is different from the the value we have,
	// If so, we, update the value
	useEffect(() => {
		ref.current = value;
		console.log(ref.current);
	}, [value]); // Check if value is change

	return ref.current;
}
