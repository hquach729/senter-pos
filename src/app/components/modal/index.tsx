import * as React from 'react';
import * as Semantic from 'semantic-ui-react';
import * as Redux from '../../hooks';
import * as ReactRouter from 'react-router-dom';
import type { Membership } from '../../reducer/membershipSlice';
import { API } from '../../service/api';
import { setOpenReceipt } from '../../reducer/receiptSlice';

function exampleReducer(
	state: any,
	action: {
		type: 'OPEN_MODAL' | 'CLOSE_MODAL';
		dimmer?: 'blurring' | 'inverted';
	}
) {
	switch (action.type) {
		case 'OPEN_MODAL':
			return { open: true, dimmer: action.dimmer };
		case 'CLOSE_MODAL':
			return { open: false };
		default:
			throw new Error();
	}
}

interface ModalProps {
	member: Membership;
	setError: React.Dispatch<React.SetStateAction<string | boolean>>;
	error: boolean | string;
	deleteAccount: (member: Membership, password: string) => Promise<boolean>;
}

export const Modal = {
	DeleteConfirmation: function ({
		member,
		deleteAccount,
		error,
		setError,
	}: ModalProps) {
		const { Button, Modal, Table, Input, Message } = Semantic;
		const [password, setPassword] = React.useState('');
		const [state, dispatch] = React.useReducer(exampleReducer, {
			open: false,
			dimmer: undefined,
		});
		const { open, dimmer } = state;

		return (
			<Modal
				// basic
				trigger={
					<Button
						content='Delete'
						size='huge'
						negative
						onClick={() => {
							console.log('open modal');
							dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' });
						}}
					/>
				}
				dimmer={dimmer}
				open={open}
				onOpen={() => {
					console.log('onOpen');
					setTimeout(() => {
						document.getElementById(member.account!)?.focus();
					}, 100);
				}}
				onClose={() => {
					setError(false);
					dispatch({ type: 'CLOSE_MODAL' });
				}}
			>
				{/* <Modal.Header>{member.account}</Modal.Header> */}
				<Modal.Content>
					<Table color='red' celled size='large'>
						<Table.Header>
							<Table.Row textAlign='center' style={{ fontSize: '20px' }}>
								<Table.HeaderCell>Account</Table.HeaderCell>
								<Table.HeaderCell>MemberSince</Table.HeaderCell>
								<Table.HeaderCell>Phone</Table.HeaderCell>
								<Table.HeaderCell>Name</Table.HeaderCell>
								{/* <Table.HeaderCell>Type</Table.HeaderCell> */}
								{/* <Table.HeaderCell>Gallon Remain</Table.HeaderCell> */}
								{/* <Table.HeaderCell>Date</Table.HeaderCell> */}
							</Table.Row>
						</Table.Header>
						<Table.Body>
							<Table.Row textAlign='center' style={{ fontSize: '20px' }}>
								<Table.Cell content={member.account} />
								<Table.Cell content={member.since} />
								<Table.Cell content={member.phone} />
								<Table.Cell content={member.first + ' ' + member.last} />
								{/* <Table.Cell content={member.type} /> */}
								{/* <Table.Cell content={member.remain} /> */}
								{/* <Table.Cell content={member.date + ' ' + member.time} /> */}
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
					<Input
						id={member.account}
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
					<Button
						secondary
						onClick={() => {
							setError(false);
							dispatch({ type: 'CLOSE_MODAL' });
						}}
					>
						Cancel
					</Button>
					<Button
						primary
						onClick={async () => {
							const successful = await deleteAccount(member, password);
							console.log(successful);
							if (successful) {
								setError(false);
								dispatch({ type: 'CLOSE_MODAL' });
							} else {
								setError(true);
								// document.getElementById('password')?.focus();
								document.getElementById(member.account!)?.focus();
							}
						}}
					>
						Delete
					</Button>
				</Modal.Actions>
			</Modal>
		);
	},
	AccountDeleteConfirmation: () => {
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
					// basic
					onOpen={() => {
						setOpen(true);
						setTimeout(() => {
							dispatch(setOpenReceipt(true));
						}, 500);
					}}
					trigger={<Button content='Delete' size='huge' negative circular />}
				>
					{/* <Modal.Header>{current.account}</Modal.Header> */}
					<Modal.Content>
						<Table color='red' celled size='large'>
							<Table.Header>
								<Table.Row textAlign='center' style={{ fontSize: '20px' }}>
									<Table.HeaderCell>Account</Table.HeaderCell>
									<Table.HeaderCell>MemberSince</Table.HeaderCell>
									<Table.HeaderCell>Phone</Table.HeaderCell>
									<Table.HeaderCell>Name</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								<Table.Row textAlign='center' style={{ fontSize: '20px' }}>
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
};
