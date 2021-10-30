import * as React from 'react';
import * as Semantic from 'semantic-ui-react';
import * as Senter from '../index';
import * as ReactRouter from 'react-router-dom';
import * as Redux from '../../hooks';
import * as ReduxAction from '../../reducer/actions';
import { API } from '../../service/api';
import { Receipt, Membership, CurrentRecord } from '../../types/membership';
import { setHistory } from '../../reducer/membershipSlice';

const historyHeaderCells = [
	// 'Record #',
	// 'Account',
	// 'Since',
	// 'Name',
	// 'Phone',
	'Type',
	'Fee',
	'Gallon',
	'Prev',
	'Buy',
	'Remain',
	'Date',
	'Time',
	// 'Action',
];

export interface BuyReceipt {
	fullname: string;
	prevGallon: string;
	gallonBuy: string;
	blank: string;
	gallonLeft: string;
	message: string;
	store: string;
	phone: string;
	date: string;
	time: string;
	type: string;
}
export interface RenewReceipt {
	fullname: string;
	renewFee: string;
	renewGallon: string;
	totalGallon: string;
	blank: string;
	message: string;
	store: string;
	phone: string;
	previous: string;
	date: string;
	time: string;
	type: string;
}
export interface NewReceipt {
	fullname: string;
	renewFee: string;
	blank: string;
	gallonLeft: string;
	message: string;
	store: string;
	phone: string;
	time: string;
	type: string;
}
interface LastReceiptProps {
	record: Membership;
}
export const Table = {
	History: () => {
		const itemPerPage = 8;

		const history = Redux.useAppSelector(
			(state) => state.membership.history || []
		);

		const [activePage, setActivePage] = React.useState(1);
		const [totalPages, setTotalPages] = React.useState(
			Math.ceil(history.length / itemPerPage)
		);

		const handlePagination = (
			event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
			data: Semantic.PaginationProps
		) => {
			event.preventDefault();
			const { activePage } = data;
			if (activePage && typeof activePage === 'number') {
				setActivePage(activePage);
			}
		};

		React.useEffect(() => {
			setTotalPages(Math.ceil(history.length / itemPerPage));
			if (totalPages < activePage) {
				setActivePage(totalPages);
			}
		}, [history, totalPages, activePage]);

		const { Table, Pagination } = Semantic;

		return (
			<Table celled color='blue' compact>
				<Table.Header fullWidth>
					<Table.Row>
						<Table.HeaderCell />
						<Table.HeaderCell colSpan={historyHeaderCells.length}>
							<Pagination
								defaultActivePage={activePage}
								ellipsisItem={null}
								firstItem={null}
								lastItem={null}
								totalPages={totalPages ? totalPages : 1}
								onPageChange={handlePagination}
							/>
						</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Header fullWidth>
					<Table.Row textAlign='center'>
						{historyHeaderCells.map((data, index) => (
							<Table.HeaderCell content={data} key={index} />
						))}
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{history
						?.map((item, index) => (
							<Table.Row
								textAlign='center'
								key={index}
								warning={item.type === 'NEW'}
								// negative={item.type === 'BUY'}
								// positive={item.type === 'RENEW'}
								style={{ fontSize: '20px' }}
							>
								{/* <Table.Cell>{item.record}</Table.Cell> */}
								{/* <Table.Cell>{item.account}</Table.Cell> */}
								{/* <Table.Cell>{item.since}</Table.Cell> */}
								{/* <Table.Cell>{item.first + ' ' + item.last}</Table.Cell> */}
								{/* <Table.Cell>{item.phone}</Table.Cell> */}
								<Table.Cell>{item.type}</Table.Cell>
								<Table.Cell>{'$' + item.fee}</Table.Cell>
								<Table.Cell>{item.gallon}</Table.Cell>
								<Table.Cell>{item.previous}</Table.Cell>
								<Table.Cell>{item.buy}</Table.Cell>
								<Table.Cell>{item.remain}</Table.Cell>
								<Table.Cell>{item.date}</Table.Cell>
								<Table.Cell>{item.time}</Table.Cell>
								{/* <Table.Cell>
									{item.type !== 'NEW' && (
										<>
											<Button
												negative
												size='huge'
												content='Void'
												onClick={async () => {
													const { status } = await API.deleteRecord(
														item.record!
													);
													if (status) {
														const history = await API.getHistory(item.account!);
														dispatch(setHistory(history));
														const current = await API.fetchMemberLatestRecord(
															item.account!
														);
														dispatch(setCurrentReceipt(current));
													}
												}}
											/>
										</>
									)}
								</Table.Cell> */}
							</Table.Row>
						))
						.slice((activePage - 1) * itemPerPage, activePage * itemPerPage)}
				</Table.Body>
			</Table>
		);
	},
	Account: () => {
		const itemPerPage = 8;

		// Redux Store
		const dispatch = Redux.useAppDispatch();

		const records = Redux.useAppSelector(
			(state) => state.membership.records || []
		);
		const { setCurrentReceipt } = ReduxAction.Receipt;
		const { setRecords } = ReduxAction.Membership;

		// React Router
		const { push } = ReactRouter.useHistory();

		// React Component State
		const [error, setError] = React.useState<boolean | string>(false);
		const [activePage, setActivePage] = React.useState(1);
		const [totalPages, setTotalPages] = React.useState(
			Math.ceil(records.length / itemPerPage)
		);

		const goToBuyScreen = (member: CurrentRecord) => {
			// dispatch(setCurrentReceipt(member));
			// setTimeout(() => {
			// 	// push('/buy');
			// }, 200);
			// push('/buy');
			dispatch(setCurrentReceipt(member));
			push('/buy');
		};

		const deleteAccount = async (
			member: Membership,
			password: string
		): Promise<boolean> => {
			const { status } = await API.deleteMembership(member.account!, password);
			if (status) {
				const updatedRecords = records.filter(
					({ account }) => member.account !== account
				);
				// Update the Current Account Record found
				setTimeout(() => {
					dispatch(setRecords(updatedRecords));
				}, 200);
				return true;
			} else {
				setError('invalid password');
				return false;
			}
		};

		React.useEffect(() => {
			setTotalPages(Math.ceil(records.length / itemPerPage));
			if (totalPages < activePage) {
				setActivePage(totalPages);
			}
		}, [records, totalPages, activePage]);

		const handlePagination = (
			event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
			data: Semantic.PaginationProps
		) => {
			event.preventDefault();
			const { activePage } = data;
			if (activePage && typeof activePage === 'number') {
				setActivePage(activePage);
			}
		};

		// Semantic and Senter Custom Component
		const { DeleteConfirmation } = Senter.Modal;
		const { Table, Button, Icon, Pagination } = Semantic;
		const { Header, HeaderCell, Cell, Row, Body, Footer } = Table;

		return (
			<Table celled definition color='blue' striped size='large'>
				<Header fullWidth>
					<Row>
						<HeaderCell />
						<HeaderCell colSpan='8'>
							<Pagination
								boundaryRange={0}
								defaultActivePage={activePage}
								ellipsisItem={null}
								firstItem={null}
								lastItem={null}
								// siblingRange={totalPages}
								totalPages={totalPages ? totalPages : 1}
								onPageChange={handlePagination}
							/>
						</HeaderCell>
					</Row>
				</Header>
				<Header fullWidth>
					<Row>
						<HeaderCell />
						<HeaderCell>Account</HeaderCell>
						<HeaderCell>Member Since</HeaderCell>
						<HeaderCell>Phone</HeaderCell>
						<HeaderCell>Name</HeaderCell>
						<HeaderCell>Type</HeaderCell>
						<HeaderCell>Gallon Remain</HeaderCell>
						<HeaderCell>Date</HeaderCell>
						<HeaderCell>Action</HeaderCell>
					</Row>
				</Header>
				<Body>
					{records
						.map((member: Membership, index: number) => (
							<Row key={member.account} style={{ fontSize: '20px' }}>
								<Cell content={index + 1} />
								<Cell>{member.account}</Cell>
								<Cell>{member.since}</Cell>
								<Cell>{member.phone}</Cell>
								<Cell>{member.first + ' ' + member.last}</Cell>
								<Cell>{member.type}</Cell>
								<Cell>{member.remain}</Cell>
								<Cell>{member.date + ' ' + member.time}</Cell>
								<Cell collapsing>
									<Button
										primary
										size='huge'
										content='Select'
										onClick={async () => {
											const records = await API.getHistory(member.account!);
											dispatch(setHistory(records));
											goToBuyScreen(member);
										}}
									/>
									<DeleteConfirmation
										setError={setError}
										error={error}
										member={member}
										deleteAccount={deleteAccount}
									/>
								</Cell>
							</Row>
						))
						.slice((activePage - 1) * itemPerPage, activePage * itemPerPage)}
				</Body>
				<Footer fullWidth>
					<Row>
						<HeaderCell />
						<HeaderCell colSpan='8'>
							<Button
								fluid
								floated='right'
								icon
								size='huge'
								labelPosition='left'
								secondary
								onClick={() => push('/dashboard')}
							>
								<Icon name='sign out alternate' />
								Done
							</Button>
						</HeaderCell>
					</Row>
				</Footer>
			</Table>
		);
	},
	Test: ({ records }: any) => {
		console.log(records);
		// Semantic and Senter Custom Component

		return <div>Test</div>;
	},
	NewReceipt: (): JSX.Element | null => {
		const { current } = Redux.useAppSelector((state) => state.receipt);

		const { Table } = Semantic;
		const { Header, Row, HeaderCell, Body, Cell } = Table;
		const { Print } = Senter.BuyScreenButton;

		const store = 'V&J Senter Pure Water';
		const phone = '(408) 427-6146';
		const renewFee = `Membership Fee: $${current!.fee}`;
		const fullname = `${current!.first} ${current!.last} -- ${current!.phone}`;
		const gallonLeft = `Gallon Total  : ${current!.gallon}`;
		const blank = '';
		const time = `${current!.date}  ${current!.time}`;
		const message = `Thank You                [Account#: ${current!.account}]`;
		const type = `${current!.type}`;

		const newReceipt = {
			fullname,
			renewFee,
			blank,
			gallonLeft,
			message,
			store,
			phone,
			time,
			type,
		};

		return (
			(current && (
				<Table color='blue' inverted celled>
					<Header>
						<Row textAlign='left'>
							<HeaderCell>Account</HeaderCell>
							<HeaderCell>MemberSince</HeaderCell>
							<HeaderCell>Phone</HeaderCell>
							<HeaderCell>Name</HeaderCell>
							<HeaderCell>Type</HeaderCell>
							<HeaderCell>Fee</HeaderCell>
							<HeaderCell>Remain</HeaderCell>
							<HeaderCell>Date</HeaderCell>
							<HeaderCell>Time</HeaderCell>
							<HeaderCell>Actions</HeaderCell>
						</Row>
					</Header>
					<Body>
						<Row textAlign='left' style={{ fontSize: '20px' }}>
							<Cell content={current.account} />
							<Cell content={current.since} />
							<Cell content={current.phone} />
							<Cell content={current.first + ' ' + current.last} />
							<Cell content={current.type + ' Membership'} />
							<Cell content={'$' + current.fee} />
							<Cell content={current.remain} />
							<Cell content={current.date} />
							<Cell content={current.time} />
							<Cell content={<Print receipt={newReceipt} />} />
						</Row>
					</Body>
				</Table>
			)) ||
			null
		);
	},
	BuyReceipt: (): JSX.Element | null => {
		// Redux Store: current customer receipt record
		const { current } = Redux.useAppSelector((state) => state.receipt);

		// Semantic React UI
		const { Table } = Semantic;
		const { Header, HeaderCell, Row, Body, Cell } = Table;

		// Senter Custom Print Button Component
		// const { Print } = Senter.Button.LoginScreen;
		const { Print } = Senter.BuyScreenButton;

		// Data to be sent to printer
		const fullname = `${current!.first} ${current!.last} -- ${current!.phone}`;
		const prevGallon = `Gallon Prev: ${current!.previous}`;
		const gallonBuy = `Gallon Buy : ${current!.buy}`;
		const blank = '';
		const gallonLeft = `Gallon Left: ${current!.remain}`;
		const message = `Thank You                [Account#: ${current!.account}]`;
		const store = 'V&J Senter Pure Water';
		const phone = '(408) 427-6146';
		const date = `${current!.date}`;
		const time = `${current!.time}`;
		const type = `${current!.type}`;

		const buyReceipt = {
			fullname,
			prevGallon,
			gallonBuy,
			blank,
			gallonLeft,
			message,
			store,
			phone,
			date,
			time,
			type,
		};

		return (
			(current! && (
				<Table color='blue' inverted celled>
					<Header>
						<Row textAlign='left'>
							<HeaderCell>Account</HeaderCell>
							<HeaderCell>MemberSince</HeaderCell>
							<HeaderCell>Phone</HeaderCell>
							<HeaderCell>Name</HeaderCell>
							<HeaderCell>Type</HeaderCell>
							<HeaderCell>Previous</HeaderCell>
							<HeaderCell>Buy</HeaderCell>
							<HeaderCell>Remain</HeaderCell>
							<HeaderCell>Date</HeaderCell>
							<HeaderCell>Time</HeaderCell>
							<HeaderCell>Actions</HeaderCell>
						</Row>
					</Header>
					<Body>
						<Row textAlign='left' style={{ fontSize: '20px' }}>
							<Cell content={current.account} />
							<Cell content={current.since} />
							<Cell content={current.phone} />
							<Cell content={current.first + ' ' + current.last} />
							<Cell content={current.type} />
							<Cell content={current.previous} />
							<Cell content={current.buy} />
							<Cell content={current.remain} />
							<Cell content={current.date} />
							<Cell content={current.time} />
							<Cell content={<Print receipt={buyReceipt} />} />
						</Row>
					</Body>
				</Table>
			)) ||
			null
		);
	},
	RenewReceipt: (): JSX.Element | null => {
		const { current } = Redux.useAppSelector((state) => state.receipt);

		const { Table } = Semantic;
		const { Header, Row, HeaderCell, Body, Cell } = Table;
		const { Print } = Senter.BuyScreenButton;

		const renewGallon = `Gallon Renew: ${current!.gallon}`;
		const renewFee = `Renew Fee   : $${current!.fee}`;
		const fullname = `${current!.first} ${current!.last} -- ${current!.phone}`;
		const totalGallon = `Gallon Left : ${current!.remain}`;
		const message = `Thank You                [Account#: ${current!.account}]`;
		const blank = '';
		const store = 'V&J Senter Pure Water';
		const phone = '(408) 427-6146';
		const previous = `${current!.previous}`;
		const date = `${current!.date}`;
		const time = `${current!.time}`;
		const type = `${current!.type}`;

		const renewReceipt = {
			fullname,
			renewFee,
			renewGallon,
			totalGallon,
			blank,
			message,
			store,
			phone,
			previous,
			date,
			time,
			type,
		};

		return (
			(current && (
				<Table color='blue' inverted celled>
					<Header>
						<Row textAlign='left'>
							<HeaderCell>Account</HeaderCell>
							<HeaderCell>MemberSince</HeaderCell>
							<HeaderCell>Phone</HeaderCell>
							<HeaderCell>Name</HeaderCell>
							<HeaderCell>Type</HeaderCell>
							<HeaderCell>Fee</HeaderCell>
							<HeaderCell>Renew Gallon</HeaderCell>
							<HeaderCell>Previous</HeaderCell>
							<HeaderCell>Remain</HeaderCell>
							<HeaderCell>Date</HeaderCell>
							<HeaderCell>Time</HeaderCell>
							<HeaderCell>Actions</HeaderCell>
						</Row>
					</Header>
					<Body>
						<Row textAlign='left' style={{ fontSize: '20px' }}>
							<Cell content={current.account} />
							<Cell content={current.since} />
							<Cell content={current.phone} />
							<Cell content={current.first + ' ' + current.last} />
							<Cell content={current.type} />
							<Cell content={'$' + current.fee} />
							<Cell content={current.gallon} />
							<Cell content={current.previous} />
							<Cell content={current.remain} />
							<Cell content={current.date} />
							<Cell content={current.time} />
							<Cell content={<Print receipt={renewReceipt} />} />
						</Row>
					</Body>
				</Table>
			)) ||
			null
		);
	},
	Receipt: (): JSX.Element | null => {
		const { current } = Redux.useAppSelector((state) => state.receipt);
		if (current) {
			switch (current.type) {
				case Receipt.NEW:
					return <Table.NewReceipt />;
				case Receipt.BUY:
					return <Table.BuyReceipt />;
				case Receipt.RENEW:
					return <Table.RenewReceipt />;
				default:
					return null;
			}
		} else {
			return null;
		}
	},
	LastNewReceipt: ({ record }: LastReceiptProps): JSX.Element | null => {
		// const { current } = Redux.useAppSelector((state) => state.receipt);

		const { Table } = Semantic;
		const { Header, Row, HeaderCell, Body, Cell } = Table;
		const { Print } = Senter.BuyScreenButton;

		const store = 'V&J Senter Pure Water';
		const phone = '(408) 427-6146';
		const renewFee = `Membership Fee: $${record.fee}`;
		const fullname = `${record.first} ${record.last} -- ${record.phone}`;
		const gallonLeft = `Gallon Total  : ${record.gallon}`;
		const blank = '';
		const time = `${record.date}  ${record.time}`;
		const message = `Thank You                [Account#: ${record.account}]`;
		const type = `${record.type}`;

		const newReceipt = {
			fullname,
			renewFee,
			blank,
			gallonLeft,
			message,
			store,
			phone,
			time,
			type,
		};

		return (
			(record && (
				<Table color='blue' inverted celled>
					<Header>
						<Row textAlign='left'>
							<HeaderCell>Account</HeaderCell>
							<HeaderCell>MemberSince</HeaderCell>
							<HeaderCell>Phone</HeaderCell>
							<HeaderCell>Name</HeaderCell>
							<HeaderCell>Type</HeaderCell>
							<HeaderCell>Fee</HeaderCell>
							<HeaderCell>Remain</HeaderCell>
							<HeaderCell>Date</HeaderCell>
							<HeaderCell>Time</HeaderCell>
							<HeaderCell>Actions</HeaderCell>
						</Row>
					</Header>
					<Body>
						<Row textAlign='left' style={{ fontSize: '20px' }}>
							<Cell content={record.account} />
							<Cell content={record.since} />
							<Cell content={record.phone} />
							<Cell content={record.first + ' ' + record.last} />
							<Cell content={record.type + ' Membership'} />
							<Cell content={'$' + record.fee} />
							<Cell content={record.remain} />
							<Cell content={record.date} />
							<Cell content={record.time} />
							<Cell content={<Print receipt={newReceipt} />} />
						</Row>
					</Body>
				</Table>
			)) ||
			null
		);
	},
	LastBuyReceipt: ({ record }: LastReceiptProps): JSX.Element | null => {
		// Redux Store: record customer receipt record
		// const { record } = Redux.useAppSelector((state) => state.receipt);

		// Semantic React UI
		const { Table } = Semantic;
		const { Header, HeaderCell, Row, Body, Cell } = Table;

		// Senter Custom Print Button Component
		// const { Print } = Senter.Button.LoginScreen;
		const { Print } = Senter.BuyScreenButton;

		// Data to be sent to printer
		const fullname = `${record!.first} ${record!.last} -- ${record!.phone}`;
		const prevGallon = `Gallon Prev: ${record!.previous}`;
		const gallonBuy = `Gallon Buy : ${record!.buy}`;
		const blank = '';
		const gallonLeft = `Gallon Left: ${record!.remain}`;
		const message = `Thank You                [Account#: ${record!.account}]`;
		const store = 'V&J Senter Pure Water';
		const phone = '(408) 427-6146';
		const date = `${record!.date}`;
		const time = `${record!.time}`;
		const type = `${record!.type}`;

		const buyReceipt = {
			fullname,
			prevGallon,
			gallonBuy,
			blank,
			gallonLeft,
			message,
			store,
			phone,
			date,
			time,
			type,
		};

		return (
			(record! && (
				<Table color='blue' inverted celled>
					<Header>
						<Row textAlign='left'>
							<HeaderCell>Account</HeaderCell>
							<HeaderCell>MemberSince</HeaderCell>
							<HeaderCell>Phone</HeaderCell>
							<HeaderCell>Name</HeaderCell>
							<HeaderCell>Type</HeaderCell>
							<HeaderCell>Previous</HeaderCell>
							<HeaderCell>Buy</HeaderCell>
							<HeaderCell>Remain</HeaderCell>
							<HeaderCell>Date</HeaderCell>
							<HeaderCell>Time</HeaderCell>
							<HeaderCell>Actions</HeaderCell>
						</Row>
					</Header>
					<Body>
						<Row textAlign='left' style={{ fontSize: '20px' }}>
							<Cell content={record.account} />
							<Cell content={record.since} />
							<Cell content={record.phone} />
							<Cell content={record.first + ' ' + record.last} />
							<Cell content={record.type} />
							<Cell content={record.previous} />
							<Cell content={record.buy} />
							<Cell content={record.remain} />
							<Cell content={record.date} />
							<Cell content={record.time} />
							<Cell content={<Print receipt={buyReceipt} />} />
						</Row>
					</Body>
				</Table>
			)) ||
			null
		);
	},
	LastRenewReceipt: ({ record }: LastReceiptProps): JSX.Element | null => {
		// const { record } = Redux.useAppSelector((state) => state.receipt);

		const { Table } = Semantic;
		const { Header, Row, HeaderCell, Body, Cell } = Table;
		const { Print } = Senter.BuyScreenButton;

		const renewGallon = `Gallon Renew: ${record!.gallon}`;
		const renewFee = `Renew Fee   : $${record!.fee}`;
		const fullname = `${record!.first} ${record!.last} -- ${record!.phone}`;
		const totalGallon = `Gallon Left : ${record!.remain}`;
		const message = `Thank You                [Account#: ${record!.account}]`;
		const blank = '';
		const store = 'V&J Senter Pure Water';
		const phone = '(408) 427-6146';
		const previous = `${record!.previous}`;
		const date = `${record!.date}`;
		const time = `${record!.time}`;
		const type = `${record!.type}`;

		const renewReceipt = {
			fullname,
			renewFee,
			renewGallon,
			totalGallon,
			blank,
			message,
			store,
			phone,
			previous,
			date,
			time,
			type,
		};

		return (
			(record && (
				<Table color='blue' inverted celled>
					<Header>
						<Row textAlign='left'>
							<HeaderCell>Account</HeaderCell>
							<HeaderCell>MemberSince</HeaderCell>
							<HeaderCell>Phone</HeaderCell>
							<HeaderCell>Name</HeaderCell>
							<HeaderCell>Type</HeaderCell>
							<HeaderCell>Fee</HeaderCell>
							<HeaderCell>Renew Gallon</HeaderCell>
							<HeaderCell>Previous</HeaderCell>
							<HeaderCell>Remain</HeaderCell>
							<HeaderCell>Date</HeaderCell>
							<HeaderCell>Time</HeaderCell>
							<HeaderCell>Actions</HeaderCell>
						</Row>
					</Header>
					<Body>
						<Row textAlign='left' style={{ fontSize: '20px' }}>
							<Cell content={record.account} />
							<Cell content={record.since} />
							<Cell content={record.phone} />
							<Cell content={record.first + ' ' + record.last} />
							<Cell content={record.type} />
							<Cell content={'$' + record.fee} />
							<Cell content={record.gallon} />
							<Cell content={record.previous} />
							<Cell content={record.remain} />
							<Cell content={record.date} />
							<Cell content={record.time} />
							<Cell content={<Print receipt={renewReceipt} />} />
						</Row>
					</Body>
				</Table>
			)) ||
			null
		);
	},

	LastReceipt: ({ record }: LastReceiptProps): JSX.Element | null => {
		switch (record.type) {
			case Receipt.NEW:
				return <Table.LastNewReceipt record={record} />;
			case Receipt.BUY:
				return <Table.LastBuyReceipt record={record} />;
			case Receipt.RENEW:
				return <Table.LastRenewReceipt record={record} />;
			default:
				return null;
		}
	},
};

export default Table;
