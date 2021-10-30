import * as React from 'react';
import * as Redux from '../app/hooks';
import * as ReactFinalForm from 'react-final-form';
import * as ReactRouter from 'react-router-dom';
import * as Semantic from 'semantic-ui-react';
import { API } from '../app/service/api';
import { Normalize } from '../app/service/normalize';
import { FormApi } from 'final-form';
import type { ScreenPortalProps, FindFormValues } from './types';

const { Form, Field } = ReactFinalForm;
const {
	TransitionablePortal,
	Segment,
	Grid,
	Header,
	Icon,
	Form: { Input, Button },
} = Semantic;

export const DashboardScreenComponent = {
	Portal: ({
		open = true,
		transition = { animation: 'scale', duration: 500 },
		children = null,
	}: ScreenPortalProps) => (
		<TransitionablePortal open={open} transition={transition}>
			<Segment className='Dashboard'>
				<Grid verticalAlign='middle' centered>
					<Grid.Column className='Dashboard'>{children}</Grid.Column>
				</Grid>
			</Segment>
		</TransitionablePortal>
	),
	Header: () => {
		const { version, name } = Redux.useAppSelector((state) => state.app);
		return (
			<Header inverted as='h1' size='huge' textAlign='left'>
				<Icon color='blue' name='braille' size='massive' />
				<Header.Content>
					{name}
					<Header.Subheader>{`Dashboard ${version}`}</Header.Subheader>
				</Header.Content>
			</Header>
		);
	},
	Form: () => {
		const { push } = ReactRouter.useHistory();
		const onSubmit = async (values: FindFormValues, form: FormApi) => {
			console.log('onSubmit:', { ...values });

			const { membership, memberships } = await API.findMembership(values);

			if (memberships) {
				push({ pathname: '/account', state: { accounts: memberships } });
			} else if (membership) {
				const history = await API.getHistory(membership.account!);
				push({ pathname: '/purchase', state: { membership, history } });
			} else {
				console.log('unable to find membership');
				form.reset();
			}
		};

		React.useEffect(() => {
			document.getElementById('phone')?.focus();
		}, []);

		const {
			Phone,
			Account,
			FirstName,
			LastName,
			FindButton,
			AddButton,
			ReportButton,
			LogoutButton,
		} = DashboardScreenComponent;

		return (
			<Form
				onSubmit={onSubmit}
				subscription={{
					submitting: true,
					valid: true,
					values: true,
				}}
				render={({ handleSubmit }) => (
					<Semantic.Form onSubmit={handleSubmit}>
						<Phone />
						<Account />
						<FirstName />
						<LastName />
						<FindButton />
						<AddButton />
						<ReportButton />
						<LogoutButton />
					</Semantic.Form>
				)}
			/>
		);
	},
	Phone: () => {
		const { batch, change } = ReactFinalForm.useForm();
		return (
			<Field
				name='phone'
				parse={Normalize.phone}
				type='text'
				render={({ input }) => (
					<Input
						id={input.name}
						placeholder='xxx-xxx-xxxx'
						className='blueIcon'
						size='massive'
						name={input.name}
						value={input.value}
						type={input.type}
						spellCheck='false'
						icon='whatsapp'
						iconPosition='left'
						transparent
						onChange={(event, data) => {
							event.preventDefault();
							input.onChange(data.value);
						}}
						onFocus={() =>
							batch(() => {
								change('account', undefined);
								change('first', undefined);
								change('last', undefined);
							})
						}
					/>
				)}
			/>
		);
	},
	Account: () => {
		const { batch, change } = ReactFinalForm.useForm();

		return (
			<Field
				name='account'
				parse={Normalize.account}
				type='text'
				render={({ input }) => (
					<Input
						id={input.name}
						placeholder={`${input.name} #`}
						className='blueIcon'
						size='massive'
						name={input.name}
						value={input.value}
						type={input.type}
						spellCheck='false'
						icon='credit card'
						iconPosition='left'
						transparent
						onChange={(event, data) => {
							event.preventDefault();
							input.onChange(data.value);
						}}
						onFocus={() =>
							batch(() => {
								change('phone', undefined);
								change('first', undefined);
								change('last', undefined);
							})
						}
					/>
				)}
			/>
		);
	},
	FirstName: () => {
		const { batch, change } = ReactFinalForm.useForm();
		return (
			<Field
				name='first'
				parse={Normalize.name}
				type='text'
				render={({ input }) => (
					<Input
						id={input.name}
						placeholder={`${input.name} name`}
						className='blueIcon'
						size='massive'
						name={input.name}
						value={input.value}
						type={input.type}
						spellCheck='false'
						icon='user outline'
						iconPosition='left'
						transparent
						onChange={(event, data) => {
							event.preventDefault();
							input.onChange(data.value);
						}}
						onFocus={() =>
							batch(() => {
								change('phone', undefined);
								change('account', undefined);
							})
						}
					/>
				)}
			/>
		);
	},
	LastName: () => {
		const { batch, change } = ReactFinalForm.useForm();
		return (
			<Field
				name='last'
				parse={Normalize.name}
				type='text'
				render={({ input }) => (
					<Input
						id={input.name}
						placeholder={`${input.name} name`}
						className='blueIcon'
						size='massive'
						name={input.name}
						value={input.value}
						type={input.type}
						spellCheck='false'
						icon='user outline'
						iconPosition='left'
						transparent
						onChange={(event, data) => {
							event.preventDefault();
							input.onChange(data.value);
						}}
						onFocus={() =>
							batch(() => {
								change('phone', undefined);
								change('account', undefined);
							})
						}
					/>
				)}
			/>
		);
	},
	FindButton: () => {
		const { values, submitting } = ReactFinalForm.useFormState();
		return (
			<Button
				content='Find Membership'
				disabled={
					submitting ||
					((!values.phone || values.phone.length < 14) &&
						!values.account &&
						!values.first &&
						!values.last)
				}
				type='submit'
				primary
				fluid
				circular
				icon='search'
				labelPosition='right'
				size='massive'
			/>
		);
	},
	AddButton: () => {
		const { push } = ReactRouter.useHistory();
		return (
			<Button
				content='Add Membership'
				type='button'
				color='teal'
				fluid
				circular
				icon='user plus'
				labelPosition='right'
				size='massive'
				onClick={() => push('/add')}
			/>
		);
	},
	ReportButton: () => {
		const { Form } = Semantic;
		const date = new Date();
		const handlePrintReport = async () => {
			await API.printReport(
				date.toLocaleDateString(),
				date.toLocaleTimeString()
			);
		};

		return (
			<Form.Button
				content={`Daily Report ${date.toDateString()}`}
				size='massive'
				type='button'
				color='yellow'
				icon='file'
				labelPosition='right'
				fluid
				circular
				onClick={handlePrintReport}
				// onClick={async () => {
				// 	await API.printReport(
				// 		date.toLocaleDateString(),
				// 		date.toLocaleTimeString()
				// 	);
				// }}
			/>
		);
	},
	LogoutButton: () => {
		const { push } = ReactRouter.useHistory();
		return (
			<Button
				type='button'
				content='Logout'
				color='black'
				fluid
				circular
				icon='sign out'
				labelPosition='right'
				size='massive'
				onClick={() => push('/')}
			/>
		);
	},
	DashboardScreen: () => {
		const { Portal, Header, Form } = DashboardScreenComponent;
		return (
			<Portal>
				<Header />
				<Form />
			</Portal>
		);
	},
};

export const { DashboardScreen } = DashboardScreenComponent;
export default DashboardScreen;
