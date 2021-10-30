import * as React from 'react';
import * as Redux from '../app/hooks';
import * as ReactFinalForm from 'react-final-form';
import * as ReactRouter from 'react-router-dom';
import * as Semantic from 'semantic-ui-react';
import * as Helpers from './helpers';
import { API } from '../app/service/api';
import { FormApi } from 'final-form';
import type {
	ScreenPortalProps,
	LoginScreenFieldProps,
	LoginButtonProps,
	LoginFormValues,
} from './types';

const { required } = Helpers;
const { Form, Field } = ReactFinalForm;
const {
	TransitionablePortal,
	Segment,
	Grid,
	Header,
	Icon,
	Form: { Group, Input, Button },
} = Semantic;

export const LoginScreenComponent = {
	Portal: ({
		open = true,
		transition = { animation: 'scale', duration: 500 },
		children = null,
	}: ScreenPortalProps) => (
		<TransitionablePortal open={open} transition={transition}>
			<Segment className='Login'>
				<Grid verticalAlign='middle' centered>
					<Grid.Column className='Login'>{children}</Grid.Column>
				</Grid>
			</Segment>
		</TransitionablePortal>
	),
	Header: () => {
		const { version, name } = Redux.useAppSelector((state) => state.app);
		return (
			<Header inverted as='h1' size='huge' textAlign='left'>
				<Icon color='blue' name='braille' size='massive' />
				{/* <Icon color='blue' name='braille' /> */}
				<Header.Content>
					{name}
					<Header.Subheader>{`version: ${version}`}</Header.Subheader>
				</Header.Content>
			</Header>
		);
	},
	Form: () => {
		const { push } = ReactRouter.useHistory();
		const [error, setError] = React.useState<boolean | string>(false);
		const handleOnChange = (
			event: React.ChangeEvent<HTMLInputElement>,
			data: Semantic.InputOnChangeData,
			input: ReactFinalForm.FieldInputProps<string, HTMLElement>
		) => {
			if (error) setError(false);
			event.preventDefault();
			input.onChange(data.value);
		};
		const onSubmit = async (values: LoginFormValues, form: FormApi) => {
			const { authenticated } = await API.verifyLogin({ ...values });

			if (authenticated) {
				push({ pathname: '/dashboard', state: { open: true } });
			} else {
				setError('Invalid Login');
				form.reset();
				document.getElementById('username')?.focus();
			}
		};
		const { Username, Password, LoginButton, CloseButton, BackupButton } =
			LoginScreenComponent;

		React.useEffect(() => {
			document.getElementById('username')?.focus();
		}, []);

		return (
			<Form
				onSubmit={onSubmit}
				subscription={{
					submitting: true,
					valid: true,
				}}
				render={({ handleSubmit }) => (
					<Semantic.Form onSubmit={handleSubmit}>
						<Username handleOnChange={handleOnChange} />
						<Password handleOnChange={handleOnChange} />
						<LoginButton error={error} />
						<Group widths={2}>
							<CloseButton />
							<BackupButton />
						</Group>
					</Semantic.Form>
				)}
			/>
		);
	},
	Username: ({ handleOnChange }: LoginScreenFieldProps) => (
		<Field
			name='username'
			type='text'
			validate={required}
			render={({ input }) => (
				<Input
					id={input.name}
					placeholder={input.name}
					className='blueIcon'
					size='massive'
					name={input.name}
					value={input.value}
					type={input.type}
					spellCheck='false'
					icon='user'
					iconPosition='left'
					transparent
					focus
					onChange={(event, data) => handleOnChange(event, data, input)}
				/>
			)}
		/>
	),
	Password: ({ handleOnChange }: LoginScreenFieldProps) => (
		<Field
			name='password'
			type='password'
			validate={required}
			render={({ input }) => (
				<Input
					id={input.name}
					placeholder={input.name}
					className='blueIcon'
					size='massive'
					name={input.name}
					value={input.value}
					type={input.type}
					spellCheck='false'
					icon='sign-in'
					iconPosition='left'
					transparent
					focus
					onChange={(event, data) => handleOnChange(event, data, input)}
				/>
			)}
		/>
	),
	CloseButton: () => (
		<Button
			content='Close'
			secondary
			fluid
			icon='close'
			labelPosition='right'
			circular
			size='massive'
			onClick={API.quitApp}
		/>
	),
	LoginButton: ({ error }: LoginButtonProps) => (
		<Button
			content={error ? 'Invalid Login' : 'Login'}
			type='submit'
			negative={error ? true : false}
			primary
			fluid
			circular
			icon='sign in'
			labelPosition='right'
			size='massive'
		/>
	),
	BackupButton: () => {
		const [loading, setLoading] = React.useState(false);
		const [fileSave, setFileSave] = React.useState({
			status: false,
			date: '',
		});

		const backupDB = async (
			event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
			data: Semantic.ButtonProps
		) => {
			event.preventDefault();
			setLoading(true);
			const { status, date } = await API.backupDB();
			setFileSave({ status, date });
			setLoading(false);
			document.getElementById('username')?.focus();
		};

		return (
			<Button
				loading={loading}
				content={fileSave.status ? fileSave.date : 'Backup'}
				size='massive'
				color='pink'
				icon='database'
				labelPosition='right'
				circular
				fluid
				onClick={backupDB}
			/>
		);
	},
	LoginScreen: () => {
		const { Portal, Header, Form } = LoginScreenComponent;
		return (
			<Portal>
				<Header />
				<Form />
			</Portal>
		);
	},
};

export const LoginComponent = {
	Screen: {
		LoginScreen: () => {
			const { Portal, Header, Form } = LoginScreenComponent;
			return (
				<Portal>
					<Header />
					<Form />
				</Portal>
			);
		},
	},
	Portal: {
		Login: ({
			open = true,
			transition = { animation: 'scale', duration: 500 },
			children = null,
		}: ScreenPortalProps) => (
			<TransitionablePortal open={open} transition={transition}>
				<Segment className='Login'>
					<Grid verticalAlign='middle' centered>
						<Grid.Column className='Login'>{children}</Grid.Column>
					</Grid>
				</Segment>
			</TransitionablePortal>
		),
	},
	Header: {
		Login: () => {
			const { version, name } = Redux.useAppSelector((state) => state.app);
			return (
				<Header inverted as='h1' size='huge' textAlign='left'>
					<Icon color='blue' name='braille' size='massive' />
					{/* <Icon color='blue' name='braille' /> */}
					<Header.Content>
						{name}
						<Header.Subheader>{`version: ${version}`}</Header.Subheader>
					</Header.Content>
				</Header>
			);
		},
	},
	Form: {
		Login: () => {
			const { push } = ReactRouter.useHistory();
			const [error, setError] = React.useState<boolean | string>(false);
			const handleOnChange = (
				event: React.ChangeEvent<HTMLInputElement>,
				data: Semantic.InputOnChangeData,
				input: ReactFinalForm.FieldInputProps<string, HTMLElement>
			) => {
				if (error) setError(false);
				event.preventDefault();
				input.onChange(data.value);
			};
			const onSubmit = async (values: LoginFormValues, form: FormApi) => {
				const { authenticated } = await API.verifyLogin({ ...values });

				if (authenticated) {
					push({ pathname: '/dashboard', state: { open: true } });
				} else {
					setError('Invalid Login');
					form.reset();
					document.getElementById('username')?.focus();
				}
			};
			const { Username, Password, LoginButton, CloseButton, BackupButton } =
				LoginScreenComponent;

			React.useEffect(() => {
				document.getElementById('username')?.focus();
			}, []);

			return (
				<Form
					onSubmit={onSubmit}
					subscription={{
						submitting: true,
						valid: true,
					}}
					render={({ handleSubmit }) => (
						<Semantic.Form onSubmit={handleSubmit}>
							<Username handleOnChange={handleOnChange} />
							<Password handleOnChange={handleOnChange} />
							<LoginButton error={error} />
							<Group widths={2}>
								<CloseButton />
								<BackupButton />
							</Group>
						</Semantic.Form>
					)}
				/>
			);
		},
	},
	Field: {
		Username: ({ handleOnChange }: LoginScreenFieldProps) => (
			<Field
				name='username'
				type='text'
				validate={required}
				render={({ input }) => (
					<Input
						id={input.name}
						placeholder={input.name}
						className='blueIcon'
						size='massive'
						name={input.name}
						value={input.value}
						type={input.type}
						spellCheck='false'
						icon='user'
						iconPosition='left'
						transparent
						focus
						onChange={(event, data) => handleOnChange(event, data, input)}
					/>
				)}
			/>
		),
		Password: ({ handleOnChange }: LoginScreenFieldProps) => (
			<Field
				name='password'
				type='password'
				validate={required}
				render={({ input }) => (
					<Input
						id={input.name}
						placeholder={input.name}
						className='blueIcon'
						size='massive'
						name={input.name}
						value={input.value}
						type={input.type}
						spellCheck='false'
						icon='sign-in'
						iconPosition='left'
						transparent
						focus
						onChange={(event, data) => handleOnChange(event, data, input)}
					/>
				)}
			/>
		),
	},
	Button: {
		Close: () => (
			<Button
				content='Close'
				secondary
				fluid
				icon='close'
				labelPosition='right'
				circular
				size='massive'
				onClick={API.quitApp}
			/>
		),
		Login: ({ error }: LoginButtonProps) => (
			<Button
				content={error ? 'Invalid Login' : 'Login'}
				type='submit'
				negative={error ? true : false}
				primary
				fluid
				circular
				icon='sign in'
				labelPosition='right'
				size='massive'
			/>
		),
		Backup: () => {
			const [loading, setLoading] = React.useState(false);
			const [fileSave, setFileSave] = React.useState({
				status: false,
				date: '',
			});

			const backupDB = async (
				event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
				data: Semantic.ButtonProps
			) => {
				event.preventDefault();
				setLoading(true);
				const { status, date } = await API.backupDB();
				setFileSave({ status, date });
				setLoading(false);
				document.getElementById('username')?.focus();
			};

			return (
				<Button
					loading={loading}
					content={fileSave.status ? fileSave.date : 'Backup'}
					size='massive'
					color='pink'
					icon='database'
					labelPosition='right'
					circular
					fluid
					onClick={backupDB}
				/>
			);
		},
	},
};

export const { LoginScreen } = LoginScreenComponent;
export default LoginScreen;
