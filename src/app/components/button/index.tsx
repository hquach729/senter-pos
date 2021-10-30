import * as React from 'react';
import * as Semantic from 'semantic-ui-react';
import * as ReactFinal from 'react-final-form';
import * as Redux from '../../hooks';
import * as Senter from '../index';
import * as ReactRouter from 'react-router-dom';
import * as Action from '../../reducer/loginSlice';
import { setError, setEdit } from '../../reducer/editSlice';
import { setHistory } from '../../reducer/membershipSlice';
import {
	setCurrentReceipt,
	setOpenReceipt,
	clearReceipt,
} from '../../reducer/receiptSlice';
import {
	FindValues,
	BuyValues,
	MembershipValues,
	CancelBtnProps,
	Membership,
} from '../../types/membership';
import type { BuyReceipt, RenewReceipt, NewReceipt } from '../table/';
import { API } from '../../service/api';

interface PrintReceiptPropsBtn {
	receipt: BuyReceipt | RenewReceipt | NewReceipt;
}

export const LoginScreenButton = {
	Login: () => {
		const { submitting } = ReactFinal.useFormState();
		const { reset } = ReactFinal.useForm();

		const { error } = Redux.useAppSelector(({ login }) => login);
		const dispatch = Redux.useAppDispatch();

		const { Button } = Semantic.Form;
		const { setAuth } = Action;

		React.useEffect(() => {
			if (error) {
				dispatch(setAuth({ authenticated: undefined }));
				reset(); // Clear the form field, after form submission
			}
		}, [error, reset, dispatch, setAuth]);

		return (
			<Button
				id='loginBtn'
				type='submit'
				content={!error ? 'Login' : 'Invalid Login'}
				size='huge'
				negative={error ? true : false}
				disabled={submitting}
				icon={error ? 'warning' : 'lock'}
				labelPosition='right'
				circular
				primary
				fluid
				onClick={() => {
					document.getElementById('username')?.focus();
				}}
			/>
		);
	},
	Close: () => {
		const { Button } = Semantic.Form;
		return (
			<Button
				size='huge'
				content='Close'
				color='black'
				icon='close'
				labelPosition='right'
				fluid
				circular
				onClick={API.quitApp}
			/>
		);
	},
	Backup: () => {
		const [loading, setLoading] = React.useState(false);
		const [fileSave, setFileSave] = React.useState({
			status: false,
			date: '',
		});

		const { Button } = Semantic.Form;

		const backupDB = async (
			event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
			data: Semantic.ButtonProps
		) => {
			event.preventDefault();
			setLoading(true);
			const { status, date } = await API.backupDB();
			setFileSave({ status, date });
			setLoading(false);
		};

		return (
			<Button
				loading={loading}
				content={fileSave.status ? fileSave.date : 'Backup'}
				size='huge'
				color='pink'
				icon='database'
				labelPosition='right'
				circular
				fluid
				onClick={backupDB}
			/>
		);
	},
	Print: () => {
		const { Button } = Semantic.Form;

		const print = async () => {
			// const response = await API.escposPrint(undefined);
			// console.log('print:response', response);
		};

		return (
			<Button
				size='huge'
				content='Print'
				type='button'
				color='yellow'
				icon='print'
				labelPosition='right'
				fluid
				circular
				onClick={print}
			/>
		);
	},
};
export const DashboardScreenButton = {
	Find: () => {
		const { Form } = Semantic;
		const { values, submitting } = ReactFinal.useFormState<FindValues>();
		const { reset } = ReactFinal.useForm();

		React.useEffect(() => {
			if (submitting) {
				reset();
			}
		}, [submitting, reset]);

		return (
			<Form.Button
				size='huge'
				disabled={
					submitting ||
					((!values.phone || values.phone.length < 14) &&
						!values.account &&
						!values.first &&
						!values.last)
				}
				type='submit'
				content='Find Membership'
				color='blue'
				icon='search'
				labelPosition='right'
				fluid
				circular
			/>
		);
	},
	Add: () => {
		const history = ReactRouter.useHistory();
		const { Form } = Semantic;
		return (
			<Form.Button
				size='huge'
				content='Add'
				type='button'
				color='teal'
				icon='plus circle'
				labelPosition='right'
				fluid
				circular
				onClick={() => history.push('/add')}
			/>
		);
	},
	Report: () => {
		const { Form } = Semantic;
		const date = new Date();

		return (
			<Form.Button
				content={`Daily Report ${date.toDateString()}`}
				size='huge'
				type='button'
				color='yellow'
				icon='file'
				labelPosition='right'
				fluid
				circular
				onClick={async () => {
					const response = await API.printReport(
						date.toLocaleDateString(),
						date.toLocaleTimeString()
					);
					console.log({ response });
				}}
			/>
		);
	},
	Logout: () => {
		const history = ReactRouter.useHistory();
		const { Form } = Semantic;

		return (
			<Form.Button
				content='Logout'
				color='black'
				size='huge'
				fluid
				circular
				icon='sign-out'
				labelPosition='right'
				type='button'
				onClick={() => history.push('/')}
			/>
		);
	},
};
export const AddScreenButton = {
	AddNewMember: () => {
		const { submitting, values } = ReactFinal.useFormState();

		const { Form } = Semantic;
		return (
			<Form.Button
				disabled={
					!values.phone ||
					values.phone.length < 14 ||
					!values.account ||
					!values.first ||
					!values.last ||
					!values.fee ||
					!values.gallon ||
					submitting
				}
				type='submit'
				primary
				loading={submitting}
				fluid
				style={{ marginTop: '30px' }}
				size='huge'
				content='Add'
			/>
		);
	},
	Cancel: ({ disable = false }: CancelBtnProps) => {
		const { push } = ReactRouter.useHistory();
		const { Form } = Semantic;
		return (
			<Form.Button
				type='button'
				secondary
				fluid
				disabled={disable}
				style={{ marginTop: '30px' }}
				size='huge'
				content='Cancel'
				onClick={() => push('/dashboard')}
			/>
		);
	},
};
export const BuyScreenButton = {
	Edit: () => {
		const { edit } = Redux.useAppSelector((state) => state.editInfo);
		const dispatch = Redux.useAppDispatch();
		const { Form } = Semantic;
		const { values, submitting, initialValues } =
			ReactFinal.useFormState<BuyValues>();

		return (
			<Form.Button
				type='button'
				disabled={
					submitting ||
					!values.first ||
					!values.last ||
					!values.phone ||
					!values.account ||
					values.phone.length < 14
				}
				content={edit ? 'Save' : 'Edit'}
				color={edit ? 'google plus' : 'vk'}
				size='huge'
				circular
				style={{ marginTop: '30px' }}
				onClick={async (event, data) => {
					event.preventDefault();
					dispatch(setEdit(!edit));
					if (edit) {
						const { duplicate, updatedRecord } = await API.editMembership(
							initialValues,
							values
						);
						if (duplicate) {
							dispatch(setError(`${values.account} already existed`));
							dispatch(setEdit(true));
						} else {
							dispatch(setError(false));

							// Update Record
							if (updatedRecord) {
								dispatch(setOpenReceipt(false));
								dispatch(setCurrentReceipt(updatedRecord));
								dispatch(setOpenReceipt(true));
							}
						}
					}
				}}
			/>
		);
	},
	Cancel: () => {
		const { edit } = Redux.useAppSelector((state) => state.editInfo);
		const dispatch = Redux.useAppDispatch();

		const { reset, change } = ReactFinal.useForm();
		const { initialValues, values } =
			ReactFinal.useFormState<MembershipValues>();

		const handleCancelEdit = () => {
			dispatch(setEdit(!edit));

			if (edit) {
				// Save Edit Here
				dispatch(setError(false));
				reset(initialValues);
				change('remain', values.remain);
				change('buy', values.buy);
				change('fee', values.fee);
				change('gallon', values.gallon);
			}
			// document.getElementById('buy')?.focus();
		};

		const { Button } = Semantic.Form;

		return (
			<Button
				type='button'
				secondary
				fluid
				disabled={!edit}
				style={{ marginTop: '30px' }}
				size='huge'
				content='Cancel'
				circular
				onClick={handleCancelEdit}
			/>
		);
	},
	Buy: () => {
		const { edit } = Redux.useAppSelector((state) => state.editInfo);
		const { Form } = Semantic;
		const { values } = ReactFinal.useFormState<MembershipValues>();

		return (
			<Form.Button
				type='submit'
				positive
				fluid
				disabled={!values.buy || edit}
				style={{ marginTop: '30px' }}
				circular
				size='huge'
				content='Buy'
				width={3}
			/>
		);
	},
	Renew: () => {
		const { edit } = Redux.useAppSelector((state) => state.editInfo);
		const { Form } = Semantic;
		const { values } = ReactFinal.useFormState<MembershipValues>();

		return (
			<Form.Button
				type='submit'
				primary
				fluid
				circular
				disabled={!values.gallon || !values.fee || edit}
				style={{ marginTop: '30px' }}
				size='huge'
				content='Renew'
				width={3}
			/>
		);
	},
	Done: () => {
		const { push } = ReactRouter.useHistory();
		const dispatch = Redux.useAppDispatch();
		const { Button } = Semantic.Form;
		return (
			<Button
				content='Done'
				color='black'
				size='huge'
				circular
				fluid
				type='button'
				onClick={() => {
					dispatch(clearReceipt());
					dispatch(setEdit(false));
					dispatch(setError(false));
					push('/dashboard');
				}}
			/>
		);
	},
	Delete: () => {
		// Redux Store
		const { current } = Redux.useAppSelector((state) => state.receipt);
		const { Modal, Table, Message, Input } = Semantic;
		const dispatch = Redux.useAppDispatch();
		const { Button } = Semantic.Form;
		const [open, setOpen] = React.useState(false);
		const [password, setPassword] = React.useState('');

		const [error, setError] = React.useState<boolean | string>(false);
		const { push } = ReactRouter.useHistory();

		const deleteAccount = async (
			member: Membership,
			password: string
		): Promise<void> => {
			const { status } = await API.deleteMembership(member.account!, password);
			if (status) {
				setTimeout(() => {
					push('/dashboard');
				}, 200);
			} else {
				setError('invalid password');
			}
		};

		const cancelAccountDelete = () => {
			setError(false);
			setOpen(false);
		};

		return (
			(current && (
				<Modal
					open={open}
					basic
					onOpen={() => {
						setOpen(true);
						setTimeout(() => {
							dispatch(setOpenReceipt(true));
						}, 500);
					}}
					trigger={<Button content='Delete' size='huge' negative circular />}
				>
					<Modal.Header>{current.account}</Modal.Header>
					<Modal.Content>
						<Table color='red' celled size='large'>
							<Table.Header>
								<Table.Row textAlign='center'>
									<Table.HeaderCell>Account</Table.HeaderCell>
									<Table.HeaderCell>MemberSince</Table.HeaderCell>
									<Table.HeaderCell>Phone</Table.HeaderCell>
									<Table.HeaderCell>Name</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								<Table.Row textAlign='center'>
									<Table.Cell content={current.account} />
									<Table.Cell content={current.since} />
									<Table.Cell content={current.phone} />
									<Table.Cell content={current.first + ' ' + current.last} />
								</Table.Row>
							</Table.Body>
						</Table>
					</Modal.Content>
					<Modal.Actions>
						{error && (
							<Message negative>
								<Message.Header>
									Please enter a valid password to delete account
								</Message.Header>
							</Message>
						)}

						<Button
							content='Cancel'
							floated='right'
							secondary
							onClick={cancelAccountDelete}
						/>
						<Button
							floated='right'
							primary
							onClick={() => deleteAccount(current, password)}
						>
							Delete
						</Button>
						<Input
							id={current.account}
							name='password'
							type='password'
							error={error ? true : false}
							placeholder='password'
							onChange={(event, data) => {
								event.preventDefault();
								if (error) {
									setError(false);
								}
								setPassword(data.value);
							}}
						/>
					</Modal.Actions>
				</Modal>
			)) || (
				<Button
					content='Delete'
					size='huge'
					negative
					circular
					onClick={() => {
						console.log();
						dispatch(setOpenReceipt(true));
					}}
				/>
			)
		);
	},
	History: () => {
		const { Table } = Senter;
		const { Modal, Icon, Header } = Semantic;
		const { Button } = Semantic.Form;

		const dispatch = Redux.useAppDispatch();
		const { current } = Redux.useAppSelector((state) => state.receipt);
		const [openModal, setOpenModal] = React.useState(false);

		const handleOpenHistoryModel = async () => {
			if (current && current.account) {
				const response = await API.getHistory(current.account);
				dispatch(setHistory(response));
				setOpenModal(true);
			}
			dispatch(setOpenReceipt(true));
		};

		const handleCloseHistoryModal = () => {
			setOpenModal(false);
		};

		return (
			<>
				<Button
					content='History'
					color='teal'
					size='huge'
					circular
					fluid
					onClick={handleOpenHistoryModel}
				/>
				<Modal
					dimmer='blurring'
					open={openModal}
					closeOnDimmerClick={false}
					closeOnEscape={false}
					closeOnPortalMouseLeave={false}
					closeOnDocumentClick={false}
					closeOnTriggerClick={false}
				>
					<Modal.Header>
						<Header as='h1' block color='blue'>
							<Icon name='user circle' color='blue' />
							<Header.Content>
								{current?.first + ' ' + current?.last + ' ' + current?.phone}
								<Header.Subheader
									style={{ fontSize: '24px', fontWeight: 'bold' }}
								>
									Account #: {current?.account}
								</Header.Subheader>
							</Header.Content>
						</Header>
					</Modal.Header>
					<Modal.Content>
						<Table.History />
					</Modal.Content>
					<Modal.Actions>
						<Button
							negative
							circular
							size='huge'
							content='Close'
							onClick={handleCloseHistoryModal}
						/>
					</Modal.Actions>
				</Modal>
			</>
		);
	},
	Print: ({ receipt }: PrintReceiptPropsBtn) => {
		const { Button } = Semantic.Form;

		const print = async () => {
			const response = await API.escposPrint(receipt);
			console.log('print:response', response);
		};

		return (
			<Button
				size='huge'
				content='Print'
				type='button'
				color='yellow'
				// icon='print'
				// labelPosition='right'
				fluid
				circular
				onClick={print}
			/>
		);
	},
};
export const AccountScreenButton = {
	Select: () => {},
	Delete: () => {},
	Done: () => {
		const history = ReactRouter.useHistory();
		const { Button } = Semantic;
		return (
			<Button
				content='Done'
				color='black'
				size='huge'
				fluid
				circular
				icon='sign-out'
				labelPosition='right'
				type='button'
				onClick={() => history.push('/dashboard')}
			/>
		);
	},
};
