import * as React from 'react';
import * as Semantic from 'semantic-ui-react';
import * as ReactFinal from 'react-final-form';
import * as ReactRouter from 'react-router-dom';
import * as Redux from '../../hooks';
import * as Senter from '../index';
import { API } from '../../service/api';
import {
	setRecord,
	setRecords,
	setHistory,
} from '../../reducer/membershipSlice';
import { setError, setAuth } from '../../reducer/loginSlice';
import { setCurrentReceipt, setOpenReceipt } from '../../reducer/receiptSlice';
import { getDate, getTime } from '../../utilities/formHelper';
import {
	MembershipValues,
	FindValues,
	LoginValues,
} from '../../types/membership';

export const Form = {
	Login: () => {
		const dispatch = Redux.useAppDispatch();
		const { push } = ReactRouter.useHistory();
		const { Form } = Semantic;
		const { Group } = Form;
		const { Username, Password } = Senter.LoginScreenField;
		const { Login, Close, Backup } = Senter.LoginScreenButton;

		const onSubmit = async (values: LoginValues): Promise<void> => {
			const { authenticated } = await API.verifyLogin(values);

			if (!authenticated) {
				dispatch(setError({ error: true }));
				dispatch(setAuth({ authenticated }));
			} else {
				dispatch(setError({ error: false }));
				push('/dashboard');
			}
		};

		React.useEffect(() => {
			setTimeout(() => {
				document.getElementById('username')!.focus();
			}, 200);
		}, []);

		return (
			<ReactFinal.Form
				onSubmit={onSubmit}
				subscription={{ valid: true, submitting: true }}
				render={({ handleSubmit }) => (
					<Form onSubmit={handleSubmit}>
						<Username />
						<Password />
						<Login />
						<Group widths={2}>
							<Close />
							<Backup />
						</Group>
					</Form>
				)}
			/>
		);
	},
	Find: () => {
		const dispatch = Redux.useAppDispatch();
		const { push } = ReactRouter.useHistory();

		const onSubmit = async (values: FindValues): Promise<void> => {
			const { memberships, membership } = await API.findMembership(values);

			// Go to Account Page if we find many account with query
			if (memberships) {
				dispatch(setRecords(memberships));
				push('/account');
			}

			if (membership && membership.account) {
				const data = await API.fetchMemberLatestRecord(membership.account);
				dispatch(setRecord(data));
				dispatch(setCurrentReceipt(data));
				const records = await API.getHistory(data.account!);
				dispatch(setHistory(records));
				push('/buy');
				return;
			}
		};

		React.useEffect(() => {
			setTimeout(() => {
				document.getElementById('phone')?.focus();
			}, 200);
		}, []);

		const { Form } = Semantic;
		const { Phone, Account, FirstName, LastName } = Senter.DashboardScreenField;
		const { Find, Add, Report, Logout } = Senter.DashboardScreenButton;

		return (
			<ReactFinal.Form
				onSubmit={onSubmit}
				subscription={{ valid: true, submitting: true }}
				render={({ handleSubmit }) => (
					<Form onSubmit={handleSubmit}>
						<Phone />
						<Account />
						<FirstName />
						<LastName />
						<Find />
						<Add />
						<Report />
						<Logout />
					</Form>
				)}
			/>
		);
	},
	Add: () => {
		const dispatch = Redux.useAppDispatch();
		const [error, setError] = React.useState<boolean | string>(false);
		const { push } = ReactRouter.useHistory();

		const onSubmit = async (values: MembershipValues) => {
			console.log('onSubmit:add', { ...values });
			const { duplicate, membership, account } = await API.addMembership(
				values
			);
			if (duplicate) {
				setError(`Account ${account} already existed`);
			} else {
				dispatch(setRecord(membership!));
				dispatch(setCurrentReceipt(membership));
				push('buy');
			}
		};

		React.useEffect(() => {
			setTimeout(() => {
				document.getElementById('account')?.focus();
			}, 200);
		}, []);

		const { Cancel, AddNewMember } = Senter.AddScreenButton;
		const {
			Date,
			Time,
			Account,
			Phone,
			FirstName,
			LastName,
			Fee,
			Gallon,
			Note,
		} = Senter.AddScreenField;
		const { Form } = Semantic;
		const { Group } = Form;

		return (
			<ReactFinal.Form
				initialValuesEqual={() => true}
				onSubmit={onSubmit}
				initialValues={{
					account: null,
					phone: null,
					first: null,
					last: null,
					note: null,
					fee: 0,
					gallon: 0,
					buy: 0,
					remain: 0,
					previous: 0,
					type: 'NEW',
					since: getDate(),
					date: getDate(),
					time: getTime(),
				}}
				subscription={{ valid: true, submitting: true }}
				render={({ handleSubmit }) => (
					<Form onSubmit={handleSubmit} size='small'>
						<Group>
							<Date />
							<Time />
							<Account error={error} />
							<Phone />
							<FirstName />
							<LastName />
							<Fee />
							<Gallon />
							<AddNewMember />
							<Cancel />
						</Group>
						<Group>
							<Note />
						</Group>
					</Form>
				)}
			/>
		);
	},
	Buy: () => {
		// Redux Store
		const { current } = Redux.useAppSelector(({ receipt }) => receipt);
		const dispatch = Redux.useAppDispatch();

		// React Router
		const { push } = ReactRouter.useHistory();

		const onSubmit = async (values: MembershipValues) => {
			const { fee, buy, previous, gallon } = values;
			dispatch(setOpenReceipt(false));

			// Membership Water Purchase by Gallon, update remain
			if (buy) {
				const updatedReceipt = await API.buyMembership({
					...values,
					remain: previous! - buy,
					type: 'BUY',
				});

				dispatch(setCurrentReceipt(updatedReceipt));
				dispatch(setOpenReceipt(true));
			}

			// Membership Water Renew Fee
			if (fee) {
				const updatedReceipt = await API.renewMembership({
					...values,
					remain: gallon! + previous!,
					type: 'RENEW',
				});
				dispatch(setCurrentReceipt(updatedReceipt));
				dispatch(setOpenReceipt(true));
			}
		};

		React.useEffect(() => {
			if (!current) push('/dashboard');

			setTimeout(() => {
				document.getElementById('buy')?.focus();
			}, 200);
		}, [current, push]);

		const {
			BuyScreenField: {
				Note,
				Account,
				Since,
				Phone,
				FirstName,
				LastName,
				Date,
				Time,
				AmountBuy,
				Remain,
				RenewFee,
				RenewGallon,
			},
			BuyScreenButton: { Edit, Cancel, Buy, Renew, Done, History },
			Modal: { AccountDeleteConfirmation },
		} = Senter;

		const { Form, Divider } = Semantic;
		const { Group, Input } = Form;

		return (
			<ReactFinal.Form
				onSubmit={onSubmit}
				initialValues={{
					note: current?.note,
					account: current?.account,
					since: current?.since,
					phone: current?.phone,
					first: current?.first,
					last: current?.last,
					previous: current?.remain,
					type: current?.type,
					buy: 0,
					remain: current?.remain,
					fee: 0,
					gallon: 0,
					date: getDate(),
					time: getTime(),
				}}
				subscription={{
					values: true,
					submitting: true,
				}}
				render={({ handleSubmit }) => (
					<Form onSubmit={handleSubmit}>
						<Group>
							<Note />
						</Group>
						<Group>
							<Account />
							<Since />
							<Phone />
							<FirstName />
							<LastName />
							<Edit />
							<Cancel />
							<Date />
							<Time />
						</Group>
						<Group>
							<Input type='hidden' width={14} />
							<AmountBuy />
							<Remain />
							<Buy />
						</Group>
						<Group>
							<Input type='hidden' width={14} />
							<RenewFee />
							<RenewGallon />
							<Renew />
						</Group>
						<Divider hidden />
						<Divider hidden />
						<Divider />
						<Divider hidden />
						<Group>
							<Input type='hidden' width={14} />
							<History />
							<AccountDeleteConfirmation />
							<Done />
						</Group>
					</Form>
				)}
			/>
		);
	},
};

export default Form;
