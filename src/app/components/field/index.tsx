import * as React from 'react';
import * as Semantic from 'semantic-ui-react';
import * as ReactFinal from 'react-final-form';
import * as Redux from '../../hooks';
import * as Action from '../../reducer/loginSlice';
import { Normalize } from '../../service/normalize';

const required = (value: string) => (value ? undefined : 'Required');

type NewAccountFieldProps = {
	error: boolean | string;
	edit?: boolean;
};

export const LoginScreenField = {
	Username: (): JSX.Element => {
		const { input } = ReactFinal.useField('username');

		const error = Redux.useAppSelector((state) => state.login.error);
		const dispatch = Redux.useAppDispatch();

		const clearError = (
			event: React.ChangeEvent<HTMLInputElement>,
			data: Semantic.InputOnChangeData
		) => {
			event.preventDefault();
			input.onChange(data.value);
			if (error) dispatch(Action.setError({ error: false }));
		};

		const { Field } = ReactFinal;
		const { Form } = Semantic;

		return (
			<Field
				name={input.name}
				validate={required}
				render={() => (
					<Form.Input
						id={input.name}
						placeholder={input.name}
						name={input.name}
						value={input.value}
						className='blueIcon'
						size='massive'
						icon='user'
						iconPosition='left'
						spellCheck='false'
						transparent
						focus
						onChange={clearError}
					/>
				)}
			/>
		);
	},
	Password: (): JSX.Element => {
		const { input } = ReactFinal.useField('password');

		const error = Redux.useAppSelector((state) => state.login.error);
		const dispatch = Redux.useAppDispatch();

		const clearError = (
			event: React.ChangeEvent<HTMLInputElement>,
			data: Semantic.InputOnChangeData
		) => {
			event.preventDefault();
			input.onChange(data.value);
			if (error) dispatch(Action.setError({ error: false }));
		};

		const { Field } = ReactFinal;
		const { Form } = Semantic;

		return (
			<Field
				name={input.name}
				validate={required}
				render={() => (
					<Form.Input
						id={input.name}
						placeholder={input.name}
						name={input.name}
						value={input.value}
						type='password'
						className='blueIcon'
						size='massive'
						icon='sign-in'
						transparent
						iconPosition='left'
						focus
						onChange={clearError}
					/>
				)}
			/>
		);
	},
};
export const BuyScreenField = {
	Date: (): JSX.Element => {
		const { edit } = Redux.useAppSelector((state) => state.editInfo);

		const { Field } = ReactFinal;
		const { Form } = Semantic;

		return (
			<Field
				name='date'
				render={({ input }) => (
					<Form.Input
						disabled={edit}
						fluid
						id='date'
						label='Date'
						className='Name'
						placeholder='mm/dd/yyyy'
						size='huge'
						inverted
						readOnly
						{...input}
						width={2}
					/>
				)}
			/>
		);
	},
	Time: (): JSX.Element => {
		const { edit } = Redux.useAppSelector((state) => state.editInfo);

		const { Field } = ReactFinal;
		const { Form } = Semantic;
		return (
			<Field
				name='time'
				render={({ input }) => (
					<Form.Input
						disabled={edit}
						id='time'
						label='Time'
						className='Name'
						placeholder='xx:xx:xx'
						{...input}
						size='huge'
						inverted
						readOnly
						width={2}
					/>
				)}
			/>
		);
	},
	Since: (): JSX.Element => {
		const { edit } = Redux.useAppSelector((state) => state.editInfo);

		const { Field } = ReactFinal;
		const { Form } = Semantic;

		return (
			<Field
				name='since'
				render={({ input }) => (
					<Form.Input
						disabled={edit}
						className='Name'
						id='memberSince'
						label='Member Since'
						size='huge'
						inverted
						readOnly
						width={2}
						{...input}
					/>
				)}
			/>
		);
	},
	Account: (): JSX.Element => {
		const { edit, error } = Redux.useAppSelector((state) => state.editInfo);
		const { Field } = ReactFinal;
		const { Form } = Semantic;

		return (
			<Field
				name='account'
				parse={Normalize.account}
				render={({ input }) => (
					<Form.Input
						id='account'
						error={error ? error : edit}
						readOnly={!edit}
						className='Name'
						label='Account'
						placeholder='xxxxxxx'
						{...input}
						size='huge'
						inverted
						width={2}
					/>
				)}
			/>
		);
	},
	Phone: (): JSX.Element => {
		const { edit } = Redux.useAppSelector((state) => state.editInfo);

		const { Field } = ReactFinal;
		const { Form } = Semantic;
		const { Input } = Form;

		return (
			<Field
				name='phone'
				parse={Normalize.phone}
				render={({ input }) => (
					<Input
						readOnly={!edit}
						error={edit}
						id='phone'
						label='Phone Number'
						className='Phone'
						placeholder='xxx-xxx-xxxx'
						{...input}
						size='huge'
						inverted
						width={2}
					/>
				)}
			/>
		);
	},
	FirstName: (): JSX.Element => {
		const { edit } = Redux.useAppSelector((state) => state.editInfo);
		const { Field } = ReactFinal;
		const { Form } = Semantic;
		const { Input } = Form;

		return (
			<Field
				name='first'
				parse={Normalize.name}
				render={({ input }) => (
					<Input
						readOnly={!edit}
						error={edit}
						id='firstName'
						label='First Name'
						className='Name'
						spellCheck='false'
						placeholder='First Name'
						size='huge'
						inverted
						{...input}
						width={2}
					/>
				)}
			/>
		);
	},
	LastName: (): JSX.Element => {
		const { edit } = Redux.useAppSelector((state) => state.editInfo);
		const { Field } = ReactFinal;
		const { Form } = Semantic;
		const { Input } = Form;
		return (
			<Field
				name='last'
				parse={Normalize.name}
				render={({ input }) => (
					<Input
						id='lastName'
						{...input}
						error={edit}
						label='Last Name'
						className='Name'
						placeholder='Last Name'
						spellCheck='false'
						size='huge'
						inverted
						readOnly={!edit}
						width={2}
					/>
				)}
			/>
		);
	},
	RenewFee: (): JSX.Element => {
		const { edit } = Redux.useAppSelector(({ editInfo }) => editInfo);
		const { Field } = ReactFinal;
		const { Form } = Semantic;

		// React Final Form Hooks
		const { change } = ReactFinal.useForm();

		return (
			<Field
				name='fee'
				parse={Normalize.fee}
				render={({ input }) => (
					<Form.Input
						id='fee'
						className='Amount'
						label='Fee'
						size='huge'
						inverted
						width={2}
						disabled={edit}
						{...input}
						onFocus={() => {
							change('buy', 0);
						}}
					/>
				)}
			/>
		);
	},
	RenewGallon: (): JSX.Element => {
		const { edit } = Redux.useAppSelector((state) => state.editInfo);
		const { change } = ReactFinal.useForm();
		const { Field } = ReactFinal;
		const { Form } = Semantic;

		return (
			<Field
				name='gallon'
				parse={Normalize.gallon}
				render={({ input }) => (
					<Form.Input
						id='gallon'
						label='Gallon'
						className='Amount'
						size='huge'
						inverted
						width={2}
						disabled={edit}
						{...input}
						onFocus={() => {
							change('buy', 0);
						}}
					/>
				)}
			/>
		);
	},
	Note: (): JSX.Element => {
		const edit = Redux.useAppSelector((state) => state.editInfo.edit);
		const { Field } = ReactFinal;
		const { Form } = Semantic;
		return (
			<Field
				name='note'
				render={({ input }) => (
					<Form.Input
						readOnly={!edit}
						error={edit}
						label='Note'
						id='note'
						className='AddNote'
						size='huge'
						placeholder='Add Note'
						{...input}
						spellCheck='false'
						inverted
						width={16}
					/>
				)}
			/>
		);
	},
	AmountBuy: (): JSX.Element => {
		const { edit } = Redux.useAppSelector((state) => state.editInfo);

		const { change } = ReactFinal.useForm();
		const { Field } = ReactFinal;
		const { Form } = Semantic;

		return (
			<Field
				id='buy'
				name='buy'
				parse={Normalize.gallon}
				render={({ input }) => (
					<Form.Input
						{...input}
						disabled={edit}
						className='Amount'
						id='buy'
						label='Buy'
						inverted
						size='huge'
						width={2}
						onFocus={() => {
							change('fee', 0);
							change('gallon', 0);
						}}
					/>
				)}
			/>
		);
	},
	Remain: (): JSX.Element => {
		const { edit } = Redux.useAppSelector((state) => state.editInfo);

		const { Field } = ReactFinal;
		const { Form } = Semantic;

		return (
			<Field
				name='remain'
				render={({ input }) => (
					<Form.Input
						error={input.value <= 0 ? true : false}
						disabled={edit}
						className='Amount'
						inverted
						id='remain'
						label='Remain'
						readOnly
						{...input}
						size='huge'
						width={2}
					/>
				)}
			/>
		);
	},
};
export const AddScreenField = {
	Date: (): JSX.Element => {
		const { Field } = ReactFinal;
		const { Form } = Semantic;

		return (
			<Field
				name='date'
				render={({ input }) => (
					<Form.Input
						fluid
						id='date'
						label='Date'
						className='Name'
						placeholder='mm/dd/yyyy'
						// icon='calendar'
						size='huge'
						inverted
						readOnly
						{...input}
						width={2}
					/>
				)}
			/>
		);
	},
	Time: (): JSX.Element => {
		const { Field } = ReactFinal;
		const { Form } = Semantic;
		return (
			<Field
				name='time'
				render={({ input }) => (
					<Form.Input
						id='time'
						label='Time'
						className='Name'
						placeholder='xx:xx:xx'
						{...input}
						size='huge'
						inverted
						readOnly
						width={2}
					/>
				)}
			/>
		);
	},
	Account: ({ error }: NewAccountFieldProps): JSX.Element => {
		const { Field } = ReactFinal;
		const { Form } = Semantic;
		return (
			<Field
				name='account'
				parse={Normalize.account}
				render={({ input }) => (
					<Form.Input
						error={error ? error : false}
						id='account'
						className='Name'
						label='Account'
						placeholder='xxxxxxx'
						{...input}
						size='huge'
						inverted
						width={2}
					/>
				)}
			/>
		);
	},
	Phone: (): JSX.Element => {
		const { Field } = ReactFinal;
		const { Form } = Semantic;
		return (
			<Field
				name='phone'
				parse={Normalize.phone}
				render={({ input }) => (
					<Form.Input
						id='phone'
						label='Phone Number'
						className='Name'
						placeholder='xxx-xxx-xxxx'
						{...input}
						size='huge'
						inverted
						width={2}
					/>
				)}
			/>
		);
	},
	FirstName: (): JSX.Element => {
		const { Field } = ReactFinal;
		const { Form } = Semantic;
		return (
			<Field
				name='first'
				parse={Normalize.name}
				render={({ input }) => (
					<Form.Input
						id='firstName'
						label='First Name'
						className='Name'
						spellCheck='false'
						placeholder='First Name'
						size='huge'
						inverted
						{...input}
						width={2}
					/>
				)}
			/>
		);
	},
	LastName: (): JSX.Element => {
		const { Field } = ReactFinal;
		const { Form } = Semantic;
		return (
			<Field
				name='last'
				parse={Normalize.name}
				render={({ input }) => (
					<Form.Input
						id='lastName'
						label='Last Name'
						className='Name'
						placeholder='Last Name'
						{...input}
						spellCheck='false'
						size='huge'
						inverted
						width={2}
					/>
				)}
			/>
		);
	},
	Fee: (): JSX.Element => {
		const { Field } = ReactFinal;
		const { Form } = Semantic;
		return (
			<Field
				name='fee'
				parse={Normalize.fee}
				render={({ input }) => (
					<Form.Input
						id='fee'
						className='TodayDate'
						label='Fee'
						{...input}
						size='huge'
						inverted
						width={1}
					/>
				)}
			/>
		);
	},
	Gallon: (): JSX.Element => {
		const { Field } = ReactFinal;
		const { change } = ReactFinal.useForm();
		const { Form } = Semantic;

		return (
			<Field
				name='gallon'
				parse={Normalize.gallon}
				render={({ input }) => (
					<Form.Input
						id='gallon'
						label='Gallon'
						className='TodayDate'
						name={input.name}
						value={input.value}
						size='huge'
						inverted
						width={1}
						onChange={(event, data) => {
							event.preventDefault();
							input.onChange(data.value);
							change('remain', data.value);
						}}
					/>
				)}
			/>
		);
	},
	Note: (): JSX.Element => {
		const { Field } = ReactFinal;
		const { Form } = Semantic;
		return (
			<Field
				name='note'
				render={({ input }) => (
					<Form.Input
						label='Note'
						id='note'
						className='AddNote'
						size='huge'
						placeholder='Add Note'
						{...input}
						spellCheck='false'
						inverted
						width={16}
					/>
				)}
			/>
		);
	},
};
export const DashboardScreenField = {
	Phone: (): JSX.Element => {
		const error = Redux.useAppSelector((state) => state.login.error);
		const dispatch = Redux.useAppDispatch();
		const { change } = ReactFinal.useForm();

		const { Field } = ReactFinal;
		const { Form } = Semantic;

		return (
			<Field
				name='phone'
				parse={Normalize.phone}
				render={({ input }) => (
					<Form.Input
						id='phone'
						placeholder='xxx-xxx-xxxx'
						name={input.name}
						value={input.value}
						className='blueIcon'
						size='massive'
						icon='whatsapp'
						transparent
						iconPosition='left'
						// focus
						onFocus={() => {
							change('account', undefined);
							change('first', undefined);
							change('last', undefined);
						}}
						onChange={(event, data) => {
							event.preventDefault();
							input.onChange(data.value);
							if (error) dispatch(Action.setError({ error: false }));
						}}
					/>
				)}
			/>
		);
	},
	Account: (): JSX.Element => {
		const error = Redux.useAppSelector((state) => state.login.error);
		const dispatch = Redux.useAppDispatch();
		const { change } = ReactFinal.useForm();

		const { Field } = ReactFinal;
		const { Form } = Semantic;

		return (
			<Field
				name='account'
				parse={Normalize.account}
				render={({ input }) => (
					<Form.Input
						className='blueIcon'
						id={input.name}
						placeholder='account #'
						size='massive'
						icon='credit card'
						transparent
						iconPosition='left'
						spellCheck='false'
						name={input.name}
						value={input.value}
						onFocus={() => {
							change('phone', undefined);
							change('first', undefined);
							change('last', undefined);
						}}
						onChange={(event, data) => {
							event.preventDefault();
							input.onChange(data.value);
							if (error) dispatch(Action.setError({ error: false }));
						}}
					/>
				)}
			/>
		);
	},
	FirstName: (): JSX.Element => {
		const error = Redux.useAppSelector((state) => state.login.error);
		const dispatch = Redux.useAppDispatch();
		const { change } = ReactFinal.useForm();

		const { Field } = ReactFinal;
		const { Form } = Semantic;

		return (
			<Field
				name='first'
				parse={Normalize.name}
				render={({ input }) => (
					<Form.Input
						id={input.name}
						name={input.name}
						value={input.value}
						placeholder='first name'
						className='blueIcon'
						size='massive'
						icon='user'
						transparent
						iconPosition='left'
						// focus
						onFocus={() => {
							change('phone', undefined);
							change('account', undefined);
						}}
						onChange={(event, data) => {
							event.preventDefault();
							input.onChange(data.value);
							if (error) dispatch(Action.setError({ error: false }));
						}}
					/>
				)}
			/>
		);
	},
	LastName: (): JSX.Element => {
		const error = Redux.useAppSelector((state) => state.login.error);
		const dispatch = Redux.useAppDispatch();
		const { change } = ReactFinal.useForm();

		const { Field } = ReactFinal;
		const { Form } = Semantic;

		return (
			<Field
				name='last'
				parse={Normalize.name}
				render={({ input }) => (
					<Form.Input
						id={input.name}
						name={input.name}
						value={input.value}
						placeholder='last name'
						className='blueIcon'
						size='massive'
						icon='user'
						transparent
						iconPosition='left'
						// focus
						onFocus={() => {
							change('phone', undefined);
							change('account', undefined);
						}}
						onChange={(event, data) => {
							event.preventDefault();
							input.onChange(data.value);
							if (error) dispatch(Action.setError({ error: false }));
						}}
					/>
				)}
			/>
		);
	},
};
