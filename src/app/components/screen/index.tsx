import * as React from 'react';
import * as Semantic from 'semantic-ui-react';
import * as Senter from '../index';
import * as ReactRouter from 'react-router-dom';
import * as Redux from '../../hooks';

export const Screen = {
	Login: (): JSX.Element => {
		const { Form, Header, Portal } = Senter;

		React.useEffect(() => {
			document.title = 'Login';
		}, []);

		return (
			<Portal.Login>
				<Header.Login />
				<Form.Login />
			</Portal.Login>
		);
	},
	Dashboard: (): JSX.Element => {
		const { Form, Header, Portal } = Senter;

		React.useEffect((): void => {
			document.title = 'Dashboard';
		}, []);

		return (
			<Portal.Dashboard>
				<Header.Dashboard />
				<Form.Find />
			</Portal.Dashboard>
		);
	},
	Account: (): JSX.Element => {
		const { Divider } = Semantic;
		const { Portal, Header, Table } = Senter;

		// React Router
		const { push } = ReactRouter.useHistory();

		// Get records from the Redux Store
		const records = Redux.useAppSelector((state) => state.membership.records);

		React.useEffect((): void => {
			!records ? push('/dashboard') : (document.title = 'Account');
		}, [push, records]);

		return (
			<Portal.Account>
				<Header.Account />
				<Divider />
				<Table.Account />
			</Portal.Account>
		);
	},
	Add: (): JSX.Element => {
		const { Divider } = Semantic;
		const { Form, Header, Portal } = Senter;

		React.useEffect((): void => {
			document.title = 'Add Membership';
		}, []);

		return (
			<Portal.Add>
				<Header.Add />
				<Divider hidden />
				<Divider hidden />
				<Form.Add />
				<Divider hidden />
			</Portal.Add>
		);
	},
	Buy: (): JSX.Element => {
		const { Divider } = Semantic;
		const { Form, Header, Portal, Table } = Senter;
		const { open } = Redux.useAppSelector((state) => state.receipt);

		React.useEffect((): void => {
			document.title = ' Water Purchase';
		}, []);

		return (
			<>
				<Header.Buy />
				<Portal.Receipt open={open}>
					<Table.Receipt />
				</Portal.Receipt>
				<Portal.Buy>
					<Divider />
					<Form.Buy />
				</Portal.Buy>
			</>
		);
	},
};

export default Screen;
