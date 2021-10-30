import { InputOnChangeData } from 'semantic-ui-react';
import * as ReactFinal from 'react-final-form';
import * as React from 'react';

export const getDate = () => new Date().toLocaleDateString();
export const getTime = () => new Date().toLocaleTimeString();

export const required = (value: string) => (value ? undefined : 'Required');
export const clearError = (
	input: ReactFinal.FieldInputProps<string, HTMLElement>,
	callback?: () => void
) => {
	return (
		event: React.ChangeEvent<HTMLInputElement>,
		data: InputOnChangeData
	) => {
		event.preventDefault();
		input.onChange(data.value);
		if (callback) callback();
	};
};
