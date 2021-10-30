import * as React from 'react';
import * as Semantic from 'semantic-ui-react';
import * as Redux from '../app/hooks';
import * as ReactRouter from 'react-router-dom';
import * as ReactFinal from 'react-final-form';
import * as Senter from '../app/components';
import { API } from '../app/service/api';
import { getDate, getTime } from '../app/utilities/formHelper';
import { Normalize } from '../app/service/normalize';
import { FormApi } from 'final-form';
import type {
	Membership,
	SenterPurchaseFieldsProps,
	EditButtonProps,
	CancelEditButtonProps,
	BuyButtonProps,
	RenewButtonProps,
	DoneButtonProps,
	PurchaseScreenFormProps,
	PurchaseScreenPortalProps,
	AccountHeaderTableProps,
	HistoryTableProps,
	HistoryModalProps,
	CurrentReceiptProps,
	DeleteAccountModalProps,
	LastReceiptProps,
	PrintReceiptPropsBtn,
	ReceiptModalProps,
	BuyReceiptProps,
} from './types';

const enum Receipt {
	NEW = 'NEW',
	BUY = 'BUY',
	RENEW = 'RENEW',
}
const historyHeaderCells = [
	'Type',
	'Fee',
	'Gallon',
	'Prev',
	'Buy',
	'Remain',
	'Date',
	'Time',
];
// Need to check for renew
const receiptHeaderCells = [
	'Type',
	'Fee',
	'Gallon',
	'Prev',
	'Buy',
	'Remain',
	'Date',
	'Time',
];
const {
	TransitionablePortal,
	Segment,
	Grid,
	Header,
	Icon,
	Form,
	Divider,
	Table,
} = Semantic;
export const PurchaseComponent = {
	Field: {
		Note: ({ edit }: SenterPurchaseFieldsProps) => (
			<ReactFinal.Field
				name='note'
				render={({ input }) => (
					<Semantic.Form.Input
						id='note'
						label='Note'
						placeholder='Add Note'
						className='AddNote'
						size='massive'
						spellCheck='false'
						inverted
						readOnly={!edit}
						error={edit}
						width={13}
						{...input}
					/>
				)}
			/>
		),
		Account: ({ edit, error }: SenterPurchaseFieldsProps) => (
			<ReactFinal.Field
				name='account'
				parse={Normalize.account}
				render={({ input }) => (
					<Semantic.Form.Input
						id='account'
						label='Account'
						placeholder='xxxxxxx'
						error={error ? error : edit}
						readOnly={!edit}
						className='Name'
						{...input}
						size='massive'
						inverted
						width={2}
					/>
				)}
			/>
		),
		Since: ({ edit }: SenterPurchaseFieldsProps) => (
			<ReactFinal.Field
				name='since'
				render={({ input }) => (
					<Semantic.Form.Input
						disabled={edit}
						className='Name'
						id='memberSince'
						label='Member Since'
						size='massive'
						inverted
						readOnly
						width={2}
						{...input}
					/>
				)}
			/>
		),
		Phone: ({ edit }: SenterPurchaseFieldsProps) => (
			<ReactFinal.Field
				name='phone'
				parse={Normalize.phone}
				render={({ input }) => (
					<Semantic.Form.Input
						id='phone'
						label='Phone Number'
						readOnly={!edit}
						error={edit}
						className='Phone'
						placeholder='xxx-xxx-xxxx'
						{...input}
						size='massive'
						inverted
						width={3}
					/>
				)}
			/>
		),
		FirstName: ({ edit }: SenterPurchaseFieldsProps) => (
			<ReactFinal.Field
				name='first'
				parse={Normalize.name}
				render={({ input }) => (
					<Semantic.Form.Input
						readOnly={!edit}
						error={edit}
						id='firstName'
						label='First Name'
						className='Name'
						spellCheck='false'
						placeholder='First Name'
						size='massive'
						inverted
						{...input}
						width={3}
					/>
				)}
			/>
		),
		LastName: ({ edit }: SenterPurchaseFieldsProps) => (
			<ReactFinal.Field
				name='last'
				parse={Normalize.name}
				render={({ input }) => (
					<Semantic.Form.Input
						id='lastName'
						{...input}
						error={edit}
						label='Last Name'
						className='Name'
						placeholder='Last Name'
						spellCheck='false'
						size='massive'
						inverted
						readOnly={!edit}
						width={3}
					/>
				)}
			/>
		),
		Date: ({ edit }: SenterPurchaseFieldsProps) => (
			<ReactFinal.Field
				name='date'
				render={({ input }) => (
					<Semantic.Form.Input
						disabled={edit}
						fluid
						id='date'
						label='Date'
						className='Name'
						placeholder='mm/dd/yyyy'
						size='massive'
						inverted
						readOnly
						{...input}
						width={2}
					/>
				)}
			/>
		),
		Time: ({ edit }: SenterPurchaseFieldsProps) => (
			<ReactFinal.Field
				name='time'
				render={({ input }) => (
					<Semantic.Form.Input
						disabled={edit}
						id='time'
						label='Time'
						className='Name'
						placeholder='xx:xx:xx'
						{...input}
						size='massive'
						inverted
						readOnly
						width={2}
					/>
				)}
			/>
		),
		Buy: ({ edit, callback }: SenterPurchaseFieldsProps) => (
			<ReactFinal.Field
				id='buy'
				name='buy'
				parse={Normalize.gallon}
				render={({ input }) => (
					<Semantic.Form.Input
						{...input}
						disabled={edit}
						className='Amount'
						id='buy'
						label='Buy'
						inverted
						size='massive'
						width={2}
						onFocus={callback}
					/>
				)}
			/>
		),
		Remain: ({ edit }: SenterPurchaseFieldsProps) => (
			<ReactFinal.Field
				name='remain'
				render={({ input }) => (
					<Semantic.Form.Input
						error={input.value <= 0 ? true : false}
						disabled={edit}
						className='Amount'
						inverted
						id='remain'
						label='Remain'
						readOnly
						{...input}
						size='massive'
						width={2}
					/>
				)}
			/>
		),
		Fee: ({ edit, callback }: SenterPurchaseFieldsProps) => (
			<ReactFinal.Field
				name='fee'
				parse={Normalize.fee}
				render={({ input }) => (
					<Semantic.Form.Input
						id='fee'
						className='Amount'
						label='Fee'
						size='massive'
						inverted
						width={2}
						disabled={edit}
						{...input}
						onFocus={callback}
					/>
				)}
			/>
		),
		Gallon: ({ edit, callback, keyPress }: SenterPurchaseFieldsProps) => (
			<ReactFinal.Field
				name='gallon'
				parse={Normalize.gallon}
				render={({ input }) => (
					<Semantic.Form.Input
						id='gallon'
						label='Gallon'
						className='Amount'
						size='massive'
						inverted
						width={2}
						disabled={edit}
						{...input}
						onFocus={callback}
						onKeyPress={keyPress}
					/>
				)}
			/>
		),
	},
	Portal: {
		Purchase: ({
			open = true,
			transition = { animation: 'fade', duration: 500 },
			children = null,
		}: PurchaseScreenPortalProps): JSX.Element => (
			<TransitionablePortal
				open={open}
				transition={transition}
				closeOnDocumentClick={false}
				closeOnEscape={false}
				closeOnDimmerClick={false}
				closeOnPortalMouseLeave={false}
			>
				<Segment className='Buy'>
					<Grid>
						<Grid.Column className='Buy'>{children}</Grid.Column>
					</Grid>
				</Segment>
			</TransitionablePortal>
		),
		Receipt: ({ open, receipt }: CurrentReceiptProps) => {
			const { Table } = PurchaseComponent;
			return (
				<TransitionablePortal
					open={open}
					transition={{ animation: 'vertical flip', duration: 700 }}
					closeOnDocumentClick={false}
					closeOnEscape={false}
					closeOnDimmerClick={false}
					closeOnPortalMouseLeave={false}
				>
					<Segment
						style={{
							paddingRight: 14,
							paddingLeft: 14,
							paddingTop: 20,
							left: '0%',
							right: '0%',
							top: '0%',
							zIndex: 1000,
							backgroundColor: '#002b487d',
						}}
					>
						{receipt && <Table.LastReceipt record={receipt} />}
						{/* {receipt && (
							<Table.LastReceipt
								record={receipt}
								// open={false}
								// setOpen={() => {}}
							/>
						)} */}
					</Segment>
				</TransitionablePortal>
			);
		},
	},
	Header: {
		Purchase: (): JSX.Element => {
			const { name, version } = Redux.useAppSelector((state) => state.app);
			return (
				<Segment className='Buy'>
					<Header inverted as='h1' size='huge' textAlign='left'>
						<Icon color='blue' name='braille' />
						<Header.Content>
							{name}
							<Header.Subheader>Purchase Screen: {version}</Header.Subheader>
						</Header.Content>
					</Header>
				</Segment>
			);
		},
		Account: ({ receipt }: AccountHeaderTableProps) => {
			const { Table } = Semantic;
			return (
				<Table color='blue' inverted size='large'>
					<Table.Header fullWidth>
						<Table.Row style={{ fontSize: '20px', fontWeight: 'bold' }}>
							<Table.HeaderCell>Name</Table.HeaderCell>
							<Table.HeaderCell>Phone Number</Table.HeaderCell>
							<Table.HeaderCell>Account #</Table.HeaderCell>
							<Table.HeaderCell>Member Since</Table.HeaderCell>
						</Table.Row>
						<Table.Row style={{ fontSize: '20px', fontWeight: 'bold' }}>
							<Table.Cell>{receipt.first + ' ' + receipt.last}</Table.Cell>
							<Table.Cell>{receipt.phone}</Table.Cell>
							<Table.Cell>{receipt.account}</Table.Cell>
							<Table.Cell>{receipt.since}</Table.Cell>
						</Table.Row>
					</Table.Header>
				</Table>
			);
		},
	},
	Form: {
		Purchase: ({
			onSubmit,
			initialValues,
			edit,
			error,
			handleEditAccount,
			handleCancelEdit,
			children,
			receipt,
		}: PurchaseScreenFormProps): JSX.Element => {
			const { Field, Button } = PurchaseComponent;
			const [openRenewModal, setOpenRenewModal] = React.useState(false);

			const handleRenewGallonKeyPress = (
				event: KeyboardEvent,
				values: Membership,
				form: FormApi
			) =>
				(event.key === 'Enter' || event.keyCode === 13) &&
				values.fee! > 0 &&
				values.gallon! > 0
					? form.submit()?.then((response) => {
							form.initialize({
								...response,
								previous: response!.remain,
								type: 'BUY',
								buy: 0,
								fee: 0,
								gallon: 0,
								date: getDate(),
								time: getTime(),
							});
							console.log('Renew Button Press');
							setOpenRenewModal(true);
							document.getElementById('buy')?.focus();
					  })
					: null;

			return (
				<ReactFinal.Form
					initialValuesEqual={() => true}
					onSubmit={onSubmit}
					initialValues={initialValues}
					render={({
						handleSubmit,
						submitting,
						initialValues,
						values,
						form,
					}) => (
						<Form onSubmit={handleSubmit}>
							<Form.Group>
								<Field.Note edit={edit} />
								<Field.Date edit={edit} />
								<Field.Time edit={edit} />
							</Form.Group>
							<Divider hidden />
							<Form.Group>
								<Field.Account edit={edit} error={error} />
								<Field.Since edit={edit} />
								<Field.Phone edit={edit} />
								<Field.FirstName edit={edit} />
								<Field.LastName edit={edit} />
								<Button.Edit
									edit={edit}
									submitting={submitting}
									values={values}
									callback={(event) => {
										event.preventDefault();
										handleEditAccount(initialValues, values, form);
									}}
								/>
								<Button.Cancel
									edit={edit}
									callback={(event) => {
										event.preventDefault();
										handleCancelEdit(form, values, initialValues);
									}}
								/>
							</Form.Group>
							<Divider hidden />
							<Form.Group>
								<Form.Input type='hidden' width={14} />
								<Field.Buy
									edit={edit}
									callback={() => {
										form.batch(() => {
											form.change('fee', 0);
											form.change('gallon', 0);
										});
									}}
								/>
								<Field.Remain edit={edit} />
								<Button.Buy edit={edit} values={values} receipt={receipt} />
							</Form.Group>
							<Form.Group>
								<Form.Input type='hidden' width={14} />
								<Field.Fee edit={edit} callback={() => form.change('buy', 0)} />
								<Field.Gallon
									edit={edit}
									keyPress={(event) =>
										handleRenewGallonKeyPress(event, values, form)
									}
									callback={() => form.change('buy', 0)}
								/>
								<Button.Renew
									values={values}
									edit={edit}
									receipt={receipt}
									open={openRenewModal}
									setOpen={setOpenRenewModal}
								/>
							</Form.Group>
							<Divider hidden />
							<Divider hidden />
							<Divider hidden />
							<Form.Group>
								<Form.Input type='hidden' width={14} />
								{children}
							</Form.Group>
						</Form>
					)}
				/>
			);
		},
	},
	Button: {
		Edit: ({ submitting, values, edit, callback }: EditButtonProps) => (
			<Semantic.Form.Button
				content={!edit ? 'Edit' : 'Save'}
				type='button'
				disabled={
					submitting ||
					!values.first ||
					!values.last ||
					!values.phone ||
					!values.account ||
					values.phone.length < 14
				}
				color={edit ? 'google plus' : 'vk'}
				size='massive'
				circular
				fluid
				width={2}
				style={{ marginTop: '30px' }}
				onClick={(event) => callback(event)}
			/>
		),
		Cancel: ({ edit, callback }: CancelEditButtonProps) => (
			<Semantic.Form.Button
				content='Cancel'
				type='button'
				secondary
				fluid
				disabled={!edit}
				style={{ marginTop: '30px' }}
				size='massive'
				circular
				width={2}
				onClick={(event) => callback(event)}
			/>
		),
		Buy: ({ values, edit, receipt }: BuyButtonProps) => {
			// const { Modal } = PurchaseComponent;
			// const [open, setOpen] = React.useState(false);
			return (
				<>
					<Semantic.Form.Button
						content='Buy'
						type='submit'
						positive
						fluid
						disabled={!values.buy || edit}
						style={{ marginTop: '30px' }}
						circular
						size='massive'
						width={3}
						// onClick={() => {
						// 	setOpen(true);
						// }}
					/>
					{/* <Modal.Receipt open={open} setOpen={setOpen} receipt={receipt} /> */}
					{/* <Modal.ConfirmPrint open={open} setOpen={setOpen} receipt={receipt} /> */}
				</>
			);
		},
		Renew: ({ values, edit, receipt, setOpen, open }: RenewButtonProps) => {
			// const { Modal } = PurchaseComponent;
			// const [open, setOpen] = React.useState(false);
			return (
				<>
					<Semantic.Form.Button
						content='Renew'
						type='submit'
						size='massive'
						primary
						fluid
						circular
						disabled={!values.gallon || !values.fee || edit}
						style={{ marginTop: '30px' }}
						width={3}
						// onClick={() => {
						// 	setOpen(true);
						// }}
					/>
					{/* <Modal.ConfirmPrint open={open} setOpen={setOpen} receipt={receipt} /> */}
				</>
			);
		},
		Done: ({ onClick }: DoneButtonProps) => {
			const {
				Form: { Button },
			} = Semantic;
			return (
				<Button
					fluid
					width={2}
					content='Done'
					color='black'
					size='massive'
					circular
					type='button'
					onClick={onClick}
				/>
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
					fluid
					circular
					onClick={print}
				/>
			);
		},
	},
	Modal: {
		History: ({
			open,
			receipt,
			handleOpenHistoryModal,
			setOpenHistoryModal,
			history,
		}: HistoryModalProps) => {
			const {
				Modal,
				Form: { Button },
			} = Semantic;

			const { Table } = PurchaseComponent;

			return (
				<>
					<Button
						width={3}
						content='History'
						color='teal'
						size='massive'
						circular
						fluid
						onClick={handleOpenHistoryModal}
					/>
					<Modal dimmer='blurring' open={open}>
						<Modal.Header>
							<Table.AccountHeader receipt={receipt} />
						</Modal.Header>
						<Modal.Content>
							<Table.History
								history={history}
								setOpenHistoryModal={setOpenHistoryModal}
							/>
						</Modal.Content>
					</Modal>
				</>
			);
		},
		Delete: ({
			open,
			receipt,
			deleteError,
			handleOpenDeleteModal,
			cancelAccountDelete,
			setDeleteError,
		}: DeleteAccountModalProps) => {
			const { push } = ReactRouter.useHistory();
			const {
				Form: { Button, Input },
				Modal,
				Table,
				Message,
			} = Semantic;

			const [password, setPassword] = React.useState('');
			const [error, setError] = React.useState<boolean | string>(false);

			const deleteAccount = async (
				member: Membership,
				password: string
			): Promise<void> => {
				const { status } = await API.deleteMembership(
					member.account!,
					password
				);
				console.log(status);
				if (status) {
					push('/dashboard');
				} else {
					setDeleteError('invalid password');
				}
			};

			return (
				<>
					<Button
						width={2}
						fluid
						content='Delete'
						size='massive'
						negative
						circular
						onClick={handleOpenDeleteModal}
					/>
					{receipt && (
						<Modal
							open={open}
							// basic
							closeOnDimmerClick={false}
							closeOnEscape={false}
							closeOnPortalMouseLeave={false}
							closeOnDocumentClick={false}
							closeOnTriggerClick={false}
						>
							{/* <Modal.Header>{receipt!.account}</Modal.Header> */}
							<Modal.Content>
								<Table color='blue' celled size='large' inverted>
									<Table.Header>
										<Table.Row textAlign='center' style={{ fontSize: '20px' }}>
											<Table.HeaderCell>Name</Table.HeaderCell>
											<Table.HeaderCell>Phone</Table.HeaderCell>
											<Table.HeaderCell>Account</Table.HeaderCell>
											<Table.HeaderCell>MemberSince</Table.HeaderCell>
										</Table.Row>
									</Table.Header>
									<Table.Body>
										<Table.Row textAlign='center' style={{ fontSize: '20px' }}>
											<Table.Cell
												content={receipt!.first + ' ' + receipt!.last}
											/>
											<Table.Cell content={receipt!.phone} />
											<Table.Cell content={receipt!.account} />
											<Table.Cell content={receipt!.since} />
										</Table.Row>
									</Table.Body>
								</Table>
							</Modal.Content>
							<Modal.Actions>
								{deleteError && (
									<Message negative>
										<Message.Header>
											Please enter a valid password to delete account
										</Message.Header>
									</Message>
								)}
								<Button
									content='Cancel'
									floated='right'
									size='huge'
									circular
									secondary
									onClick={cancelAccountDelete}
								/>
								<Button
									floated='right'
									circular
									size='huge'
									negative
									onClick={() => deleteAccount(receipt!, password)}
								>
									Delete
								</Button>
								<Input
									fluid
									id={receipt!.account}
									size='huge'
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
					)}
				</>
			);
		},
		Receipt: ({ open, setOpen, receipt }: ReceiptModalProps) => {
			const { Modal, Button } = Semantic;
			const { Table } = PurchaseComponent;
			return (
				<Modal basic open={open} size='fullscreen'>
					<Modal.Content>
						<Table.LastReceipt record={receipt} />
					</Modal.Content>
					<Modal.Actions>
						<Button
							content='Print'
							color='yellow'
							circular
							// width={2}
							size='massive'
							onClick={() => {
								console.log('print click');
							}}
						/>
						<Button
							content='Close'
							// width={2}
							circular
							color='black'
							size='massive'
							onClick={() => {
								setOpen(false);
							}}
						/>
					</Modal.Actions>
				</Modal>
			);
		},
		ConfirmPrint: ({ open, receipt, setOpen }: ReceiptModalProps) => {
			const { Modal, Button } = Semantic;

			const handlePrint = async () => {
				if (receipt!.type === 'BUY') {
					const fullname = `${receipt!.first} ${receipt!.last} -- ${
						receipt!.phone
					}`;
					const prevGallon = `Gallon Prev: ${receipt!.previous}`;
					const gallonBuy = `Gallon Buy : ${receipt!.buy}`;
					const blank = '';
					const gallonLeft = `Gallon Left: ${receipt!.remain}`;
					const message = `Thank You                [Account#: ${
						receipt!.account
					}]`;
					const store = 'V&J Senter Pure Water';
					const phone = '(408) 427-6146';
					const date = `${receipt!.date}`;
					const time = `${receipt!.time}`;
					const type = `${receipt!.type}`;

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

					const response = await API.escposPrint(buyReceipt);
					console.log('print:response', response);
					setOpen(false);
				} else {
					const renewGallon = `Gallon Renew: ${receipt!.gallon}`;
					const renewFee = `Renew Fee   : $${receipt!.fee}`;
					const fullname = `${receipt!.first} ${receipt!.last} -- ${
						receipt!.phone
					}`;
					const totalGallon = `Gallon Left : ${receipt!.remain}`;
					const message = `Thank You                [Account#: ${
						receipt!.account
					}]`;
					const blank = '';
					const store = 'V&J Senter Pure Water';
					const phone = '(408) 427-6146';
					const previous = `${receipt!.previous}`;
					const date = `${receipt!.date}`;
					const time = `${receipt!.time}`;
					const type = `${receipt!.type}`;

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
					const response = await API.escposPrint(renewReceipt);
					setOpen(false);
					console.log('print:response', response);
				}
			};

			return (
				<Modal basic open={open} dimmer='blurring'>
					<Modal.Content>
						{receipt && (
							<Table celled color='blue' compact inverted>
								<Table.Header fullWidth>
									<Table.Row textAlign='center' style={{ fontSize: '20px' }}>
										{receiptHeaderCells.map((data, index) => (
											<Table.HeaderCell content={data} key={index} />
										))}
									</Table.Row>
								</Table.Header>
								<Table.Body>
									<Table.Row textAlign='center' style={{ fontSize: '24px' }}>
										<Table.Cell>{receipt.type}</Table.Cell>
										<Table.Cell>{'$' + receipt.fee}</Table.Cell>
										<Table.Cell>{receipt.gallon}</Table.Cell>
										<Table.Cell>{receipt.previous}</Table.Cell>
										<Table.Cell>{receipt.buy}</Table.Cell>
										<Table.Cell>{receipt.remain}</Table.Cell>
										<Table.Cell>{receipt.date}</Table.Cell>
										<Table.Cell>{receipt.time}</Table.Cell>
									</Table.Row>
								</Table.Body>
								<Table.Footer>
									<Table.Row>
										<Table.HeaderCell colSpan={receiptHeaderCells.length}>
											<Button
												content='Close'
												floated='right'
												circular
												color='black'
												size='massive'
												onClick={() => {
													setOpen(false);
												}}
											/>
											<Button
												content='Print'
												color='yellow'
												circular
												floated='right'
												size='massive'
												onClick={handlePrint}
											/>
										</Table.HeaderCell>
									</Table.Row>
								</Table.Footer>
							</Table>
						)}
					</Modal.Content>
				</Modal>
			);
		},
	},
	Table: {
		AccountHeader: ({ receipt }: AccountHeaderTableProps) => (
			<Table color='blue' inverted size='large' celled>
				<Table.Header fullWidth>
					<Table.Row style={{ fontSize: '20px', fontWeight: 'bold' }}>
						<Table.HeaderCell>Name</Table.HeaderCell>
						<Table.HeaderCell>Phone Number</Table.HeaderCell>
						<Table.HeaderCell>Account #</Table.HeaderCell>
						<Table.HeaderCell>Member Since</Table.HeaderCell>
					</Table.Row>
					<Table.Row style={{ fontSize: '24px', fontWeight: 'bold' }}>
						<Table.Cell>{receipt.first + ' ' + receipt.last}</Table.Cell>
						<Table.Cell>{receipt.phone}</Table.Cell>
						<Table.Cell>{receipt.account}</Table.Cell>
						<Table.Cell>{receipt.since}</Table.Cell>
					</Table.Row>
				</Table.Header>
			</Table>
		),
		History: ({ history, setOpenHistoryModal }: HistoryTableProps) => {
			// Pagination State Configuration
			const itemPerPage = 8;
			const [activePage, setActivePage] = React.useState(1);
			const [totalPages, setTotalPages] = React.useState(0);

			const handlePagination = (
				event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
				{ activePage }: Semantic.PaginationProps
			) => {
				event.preventDefault();
				if (activePage && typeof activePage === 'number') {
					setActivePage(activePage);
				}
			};

			const handleCloseHistoryModal = () => {
				setActivePage(1);
				setOpenHistoryModal(false);
				// document.getElementById('buy')?.focus();
			};

			// Semantic Components
			const {
				Table,
				Pagination,
				Form: { Button },
			} = Semantic;

			React.useEffect(() => {
				setTotalPages(Math.ceil(history.length / itemPerPage));
			}, [history]);

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
							.map((item, index) => (
								<Table.Row
									textAlign='center'
									key={index}
									warning={item.type === 'NEW'}
									style={{ fontSize: '20px' }}
								>
									{/* <Table.Cell>{index + 1}</Table.Cell> */}
									<Table.Cell>{item.type}</Table.Cell>
									<Table.Cell>{'$' + item.fee}</Table.Cell>
									<Table.Cell>{item.gallon}</Table.Cell>
									<Table.Cell>{item.previous}</Table.Cell>
									<Table.Cell>{item.buy}</Table.Cell>
									<Table.Cell>{item.remain}</Table.Cell>
									<Table.Cell>{item.date}</Table.Cell>
									<Table.Cell>{item.time}</Table.Cell>
									{/* <Table.Cell>{item.record}</Table.Cell> */}
								</Table.Row>
							))
							.slice((activePage - 1) * itemPerPage, activePage * itemPerPage)}
					</Table.Body>
					<Table.Footer>
						<Table.Row>
							<Table.HeaderCell colSpan={historyHeaderCells.length}>
								<Button
									floated='right'
									negative
									circular
									size='huge'
									content='Close'
									onClick={handleCloseHistoryModal}
								/>
							</Table.HeaderCell>
						</Table.Row>
					</Table.Footer>
				</Table>
			);
		},
		LastNewReceipt: ({
			record,
		}: // open,
		// setOpen,
		LastReceiptProps): JSX.Element | null => {
			const { Header, Row, HeaderCell, Body, Cell } = Table;
			const {
				Button: { Print },
			} = PurchaseComponent;

			// Data sent to Printer
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
								<HeaderCell textAlign='center'>Type</HeaderCell>
								<HeaderCell textAlign='center'>Fee</HeaderCell>
								<HeaderCell textAlign='center'>Gallon</HeaderCell>
								<HeaderCell textAlign='center'>Prev</HeaderCell>
								<HeaderCell textAlign='center'>Buy</HeaderCell>
								<HeaderCell textAlign='center'>Remain</HeaderCell>
								<HeaderCell>Date</HeaderCell>
								<HeaderCell>Time</HeaderCell>
								<HeaderCell>Actions</HeaderCell>
								{/* {!open && <HeaderCell>Actions</HeaderCell>} */}
							</Row>
						</Header>
						<Body>
							<Row textAlign='left' style={{ fontSize: '20px' }}>
								<Cell content={record.account} />
								<Cell content={record.since} />
								<Cell content={record.phone} />
								<Cell content={record.first + ' ' + record.last} />
								<Cell
									content={record.type + ' Membership'}
									textAlign='center'
								/>
								<Cell content={'$' + record.fee} textAlign='center' />
								<Cell content={record.gallon} textAlign='center' />
								<Cell content={record.previous} textAlign='center' />
								<Cell content={record.buy} textAlign='center' />
								<Cell content={record.remain} textAlign='center' />
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
		LastBuyReceipt: ({
			record,
		}: // open,
		// setOpen,
		LastReceiptProps): JSX.Element | null => {
			// Semantic React UI
			const { Header, HeaderCell, Row, Body, Cell } = Table;
			const {
				Button: { Print },
			} = PurchaseComponent;

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
								<HeaderCell>Since</HeaderCell>
								<HeaderCell>Phone</HeaderCell>
								<HeaderCell>Name</HeaderCell>
								<HeaderCell textAlign='center'>Type</HeaderCell>
								<HeaderCell textAlign='center'>Prev</HeaderCell>
								<HeaderCell textAlign='center'>Buy</HeaderCell>
								<HeaderCell textAlign='center'>Remain</HeaderCell>
								<HeaderCell>Date</HeaderCell>
								<HeaderCell>Time</HeaderCell>
								<HeaderCell>Actions</HeaderCell>
								{/* {!open && <HeaderCell>Actions</HeaderCell>} */}
							</Row>
						</Header>
						<Body>
							<Row textAlign='left' style={{ fontSize: '20px' }}>
								<Cell content={record.account} />
								<Cell content={record.since} />
								<Cell content={record.phone} />
								<Cell content={record.first + ' ' + record.last} />
								<Cell content={record.type} textAlign='center' />
								<Cell content={record.previous} textAlign='center' />
								<Cell content={record.buy} textAlign='center' />
								<Cell content={record.remain} textAlign='center' />
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
		LastRenewReceipt: ({
			record,
		}: // open,
		// setOpen,
		LastReceiptProps): JSX.Element | null => {
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
								<HeaderCell textAlign='center'>Type</HeaderCell>
								<HeaderCell textAlign='center'>Fee</HeaderCell>
								<HeaderCell textAlign='center'>Renew Gallon</HeaderCell>
								<HeaderCell textAlign='center'>Prev</HeaderCell>
								<HeaderCell textAlign='center'>Remain</HeaderCell>
								<HeaderCell>Date</HeaderCell>
								<HeaderCell>Time</HeaderCell>
								<HeaderCell>Actions</HeaderCell>
								{/* {!open && <HeaderCell>Actions</HeaderCell>} */}
							</Row>
						</Header>
						<Body>
							<Row textAlign='left' style={{ fontSize: '20px' }}>
								<Cell content={record.account} />
								<Cell content={record.since} />
								<Cell content={record.phone} />
								<Cell content={record.first + ' ' + record.last} />
								<Cell content={record.type} textAlign='center' />
								<Cell content={'$' + record.fee} textAlign='center' />
								<Cell content={record.gallon} textAlign='center' />
								<Cell content={record.previous} textAlign='center' />
								<Cell content={record.remain} textAlign='center' />
								<Cell content={record.date} />
								<Cell content={record.time} />
								<Cell>
									<Print receipt={renewReceipt} />
								</Cell>
							</Row>
						</Body>
					</Table>
				)) ||
				null
			);
		},
		LastReceipt: ({
			record,
		}: // open,
		// setOpen,
		LastReceiptProps): JSX.Element | null => {
			const { Table } = PurchaseComponent;
			switch (record.type) {
				case Receipt.NEW:
					return (
						<Table.LastNewReceipt
							record={record}
							// open={open}
							// setOpen={setOpen}
						/>
					);
				case Receipt.BUY:
					return (
						<Table.LastBuyReceipt
							record={record}
							// open={open}
							// setOpen={setOpen}
						/>
					);
				case Receipt.RENEW:
					return (
						<Table.LastRenewReceipt
							record={record}
							// open={open}
							// setOpen={setOpen}
						/>
					);
				default:
					return null;
			}
		},
		BuyReceipt: ({ receipt, setOpen }: BuyReceiptProps) => (
			<Table celled color='blue' compact inverted>
				<Table.Header fullWidth>
					<Table.Row textAlign='center' style={{ fontSize: '20px' }}>
						{receiptHeaderCells.map((data, index) => (
							<Table.HeaderCell content={data} key={index} />
						))}
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<Table.Row textAlign='center' style={{ fontSize: '24px' }}>
						<Table.Cell>{receipt.type}</Table.Cell>
						<Table.Cell>{'$' + receipt.fee}</Table.Cell>
						<Table.Cell>{receipt.gallon}</Table.Cell>
						<Table.Cell>{receipt.previous}</Table.Cell>
						<Table.Cell>{receipt.buy}</Table.Cell>
						<Table.Cell>{receipt.remain}</Table.Cell>
						<Table.Cell>{receipt.date}</Table.Cell>
						<Table.Cell>{receipt.time}</Table.Cell>
					</Table.Row>
				</Table.Body>
				<Table.Footer>
					<Table.Row>
						<Table.HeaderCell colSpan={receiptHeaderCells.length}>
							<Semantic.Button
								content='Close'
								floated='right'
								circular
								color='black'
								size='massive'
								onClick={() => {
									setOpen(false);
								}}
							/>
							<Semantic.Button
								content='Print'
								color='yellow'
								circular
								floated='right'
								size='massive'
								onClick={async () => {
									// Data to be sent to printer
								}}
							/>
						</Table.HeaderCell>
					</Table.Row>
				</Table.Footer>
			</Table>
		),
	},
	Screen: {
		Purchase: (): JSX.Element => {
			// React Router Hooks
			const { state } = ReactRouter.useLocation<{
				membership: Membership;
				history: Membership[];
			}>();

			const { push } = ReactRouter.useHistory();

			// Receipt
			const [openReceipt, setOpenReceipt] = React.useState(true);
			const [receipt, setReceipt] = React.useState<Membership | undefined>();

			// History Modal State and Event Handler
			const [history, setHistory] = React.useState<Membership[]>([]);
			const [openHistoryModal, setOpenHistoryModal] = React.useState(false);
			const handleOpenHistoryModel = async () => {
				if (receipt && receipt.account) {
					const response = await API.getHistory(receipt.account);
					setHistory(response);
					setOpenHistoryModal(true);
					setOpenReceipt(true);
				}
			};
			// Delete Modal State and Handler
			const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
			const [deleteError, setDeleteError] = React.useState<boolean | string>(
				false
			);
			const handleOpenDeleteModal = async () => {
				if (receipt && receipt.account) {
					const lastRecord = await API.fetchMemberLatestRecord(receipt.account);
					setReceipt(lastRecord);
					setOpenReceipt(false);
					setOpenReceipt(true);
					setOpenDeleteModal(true);
				}
			};
			const cancelAccountDelete = () => {
				setDeleteError(false);
				setOpenDeleteModal(false);
			};
			const [edit, setEdit] = React.useState(false);
			const [error, setError] = React.useState<boolean | string>(false);
			const handleEditAccount = async (
				initialValues: Membership,
				values: Membership,
				form: FormApi
			) => {
				setEdit(true);
				if (edit) {
					const { duplicate, updatedRecord } = await API.editMembership(
						initialValues,
						values
					);

					if (duplicate) {
						setError(`${values.account} already existed`);
						setEdit(true);
						return;
					}

					if (updatedRecord) {
						const { note, account, phone, first, last } = updatedRecord;
						setReceipt(updatedRecord);

						setOpenReceipt(false);
						setOpenReceipt(true);

						form.initialize({
							...initialValues,
							note,
							account,
							first,
							last,
							phone,
							remain: values.remain,
							buy: values.buy,
							fee: values.fee,
							gallon: values.gallon,
						});
						setError(false);
						setEdit(false);
						return;
					}
				}
			};
			const handleCancelEdit = (
				form: FormApi,
				values: Membership,
				initialValues: Membership
			) => {
				setEdit(!edit);

				if (edit) {
					// Save Edit Here
					setError(false);
					if (initialValues) {
						form.reset(initialValues);
						form.change('remain', values.remain);
						form.change('buy', values.buy);
						form.change('fee', values.fee);
						form.change('gallon', values.gallon);
					}
				}
			};
			const handleDone = () => {
				setEdit(false);
				setError(false);
				push('/dashboard');
			};
			const onSubmit = async (
				values: Membership,
				form: FormApi
			): Promise<Membership> => {
				const { fee, buy, previous, gallon } = values;
				setOpenReceipt(false);

				// Membership Water Purchase by Gallon, update remain
				if (buy) {
					const updatedReceipt = await API.buyMembership({
						...values,
						record: undefined,
						remain: previous! - buy,
						type: 'BUY',
					});

					console.log({ ...updatedReceipt });

					setReceipt(updatedReceipt);
					setOpenReceipt(true);

					form.initialize({
						...updatedReceipt,
						previous: updatedReceipt.remain,
						type: 'BUY',
						buy: 0,
						fee: 0,
						gallon: 0,
						date: getDate(),
						time: getTime(),
					});
				}

				// Membership Water Renew Fee
				if (fee) {
					const updatedReceipt = await API.renewMembership({
						...values,
						record: undefined,
						remain: gallon! + previous!,
						type: 'RENEW',
					});
					console.log({ ...updatedReceipt });

					form.initialize({
						...updatedReceipt,
						previous: updatedReceipt.remain,
						type: 'BUY',
						buy: 0,
						fee: 0,
						gallon: 0,
						date: getDate(),
						time: getTime(),
					});

					setReceipt(updatedReceipt);
					setOpenReceipt(true);
					return updatedReceipt;
				}

				return values;
			};
			const { membership } = state || {
				membership: {
					note: '',
					account: '',
					since: '',
					phone: '',
					first: '',
					last: '',
					previous: 0,
					type: undefined,
					buy: 0,
					remain: 0,
					fee: 0,
					gallon: 0,
					date: getDate(),
					time: getTime(),
				},
			};
			const initialValues = {
				note: membership.note,
				account: membership.account,
				since: membership.since,
				phone: membership.phone,
				first: membership.first,
				last: membership.last,
				previous: membership.remain,
				type: membership.type,
				buy: 0,
				remain: membership.remain,
				fee: 0,
				gallon: 0,
				date: getDate(),
				time: getTime(),
			};
			const { Modal, Portal, Header, Form, Button } = PurchaseComponent;

			React.useEffect(() => {
				if (!state) {
					push('/dashboard');
				} else {
					setReceipt(state.membership);
					setHistory(state.history);
				}
			}, [push, state]);

			return (
				<>
					<Header.Purchase />
					<Portal.Receipt open={openReceipt} receipt={receipt} />
					<Portal.Purchase>
						<Form.Purchase
							receipt={receipt!}
							edit={edit}
							error={error}
							onSubmit={onSubmit}
							initialValues={initialValues}
							handleEditAccount={handleEditAccount}
							handleCancelEdit={handleCancelEdit}
							handleDone={handleDone}
						>
							<Modal.History
								open={openHistoryModal}
								history={history}
								receipt={receipt!}
								handleOpenHistoryModal={handleOpenHistoryModel}
								setOpenHistoryModal={setOpenHistoryModal}
							/>
							<Modal.Delete
								setDeleteError={setDeleteError}
								cancelAccountDelete={cancelAccountDelete}
								deleteError={deleteError}
								receipt={receipt!}
								open={openDeleteModal}
								handleOpenDeleteModal={handleOpenDeleteModal}
							/>
							<Button.Done onClick={handleDone} />
						</Form.Purchase>
					</Portal.Purchase>
				</>
			);
		},
	},
};

export const { Purchase } = PurchaseComponent.Screen;
export default Purchase;
