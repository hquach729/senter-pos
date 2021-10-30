import * as React from 'react';
import * as Semantic from 'semantic-ui-react';
import * as Redux from '../app/hooks';
import * as ReactRouter from 'react-router-dom';
import * as ReactFinal from 'react-final-form';
import * as Helpers from './helpers';
import { API } from '../app/service/api';
import { getDate, getTime } from '../app/utilities/formHelper';
import { Normalize } from '../app/service/normalize';
import { FormApi, FormSubscription } from 'final-form';
import type {
	ScreenPortalProps,
	LoginFormValues,
	FindFormValues,
	LoginScreenFieldProps,
	LoginButtonProps,
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
	AddScreenHeaderProps,
	AddScreenFormProps,
	AccountFieldProps,
	AddButtonProps,
	CancelButtonProps,
	PurchaseType,
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

const { Field } = ReactFinal;

interface HeaderProps {
	name?: string;
	version?: string;
}

interface DashboardFormProps {
	children?: React.ReactNode;
}
interface DashboardPortalProps {
	children: React.ReactNode;
}

export const SenterComponents = {
	Login: {
		Header: ({ name, version }: HeaderProps) => (
			<Header inverted as='h1' size='huge' textAlign='left'>
				<Icon color='blue' name='braille' size='massive' />
				<Header.Content>
					{name}
					<Header.Subheader>{`version: ${version}`}</Header.Subheader>
				</Header.Content>
			</Header>
		),
		Form: () => {
			const { push } = ReactRouter.useHistory();
			const [error, setError] = React.useState<boolean | string>(false);

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

			const handleOnChange = (
				event: React.ChangeEvent<HTMLInputElement>,
				data: Semantic.InputOnChangeData,
				input: ReactFinal.FieldInputProps<string, HTMLElement>
			) => {
				if (error) setError(false);
				event.preventDefault();
				input.onChange(data.value);
			};

			const { Field, Button } = SenterComponents.Login;

			return (
				<ReactFinal.Form
					onSubmit={onSubmit}
					subscription={{
						submitting: true,
						valid: true,
					}}
					render={({ handleSubmit }) => (
						<Semantic.Form onSubmit={handleSubmit}>
							<Field.Username handleOnChange={handleOnChange} />
							<Field.Password handleOnChange={handleOnChange} />
							<Button.Login error={error} />
							<Semantic.Form.Group widths={2}>
								<Button.Close />
								<Button.Backup />
							</Semantic.Form.Group>
						</Semantic.Form>
					)}
				/>
			);
		},
		Field: {
			Username: ({ handleOnChange }: LoginScreenFieldProps) => (
				<ReactFinal.Field
					name='username'
					type='text'
					validate={Helpers.required}
					render={({ input }) => (
						<Semantic.Form.Input
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
				<ReactFinal.Field
					name='password'
					type='password'
					validate={Helpers.required}
					render={({ input }) => (
						<Semantic.Form.Input
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
				<Semantic.Form.Button
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
				<Semantic.Form.Button
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
					<Semantic.Form.Button
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
		Screen: ({
			open = true,
			transition = { animation: 'scale', duration: 500 },
		}: ScreenPortalProps) => {
			// Redux Store State:
			const { name, version } = Redux.useAppSelector((state) => state.app);
			const { Header, Form } = SenterComponents.Login;

			React.useEffect(() => {
				document.getElementById('username')?.focus();
			}, []);

			return (
				<TransitionablePortal open={open} transition={transition}>
					<Segment className='Login'>
						<Grid verticalAlign='middle' centered>
							<Grid.Column className='Login'>
								<Header name={name} version={version} />
								<Form />
							</Grid.Column>
						</Grid>
					</Segment>
				</TransitionablePortal>
			);
		},
	},
	Dashboard: {
		Header: () => {
			const { name, version } = Redux.useAppSelector((state) => state.app);
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
		Form: ({ children }: DashboardFormProps) => {
			const { push } = ReactRouter.useHistory();
			const subscription: FormSubscription = {
				valid: true,
				values: true,
				submitting: true,
			};
			const onSubmit = async (
				values: FindFormValues,
				form: FormApi
			): Promise<void> => {
				const { membership, memberships } = await API.findMembership(values);

				if (memberships) {
					push({ pathname: '/account', state: { accounts: memberships } });
				} else if (membership) {
					const history = await API.getHistory(membership.account!);
					push({ pathname: '/purchase', state: { membership, history } });
				} else {
					form.reset();
				}
			};

			React.useEffect(() => {
				document.getElementById('phone')?.focus();
			}, []);

			return (
				<ReactFinal.Form
					onSubmit={onSubmit}
					subscription={subscription}
					render={({ handleSubmit }) => (
						<Semantic.Form onSubmit={handleSubmit}>{children}</Semantic.Form>
					)}
				/>
			);
		},
		Field: {
			Phone: () => {
				// React Final Hooks
				const { Field, useForm } = ReactFinal;
				const { batch, change } = useForm();

				// Semantic React Component
				const { Input } = Semantic.Form;

				// Event Handler
				const handleOnFocus = () => {
					batch(() => {
						change('account', undefined);
						change('first', undefined);
						change('last', undefined);
					});
				};

				return (
					<Field
						name='phone'
						parse={Normalize.phone}
						type='text'
						render={({ input }) => (
							<Input
								{...input}
								id={input.name}
								placeholder='xxx-xxx-xxxx'
								className='blueIcon'
								size='massive'
								spellCheck='false'
								icon='whatsapp'
								iconPosition='left'
								transparent
								onFocus={handleOnFocus}
							/>
						)}
					/>
				);
			},
			Account: () => {
				const { Field, useForm } = ReactFinal;
				const { batch, change } = useForm();
				const { Input } = Semantic.Form;

				const handleOnFocus = () => {
					batch(() => {
						change('phone', undefined);
						change('first', undefined);
						change('last', undefined);
					});
				};

				return (
					<Field
						name='account'
						parse={Normalize.account}
						type='text'
						render={({ input }) => (
							<Input
								{...input}
								id={input.name}
								placeholder={`${input.name} #`}
								className='blueIcon'
								size='massive'
								spellCheck='false'
								icon='credit card'
								iconPosition='left'
								transparent
								onFocus={handleOnFocus}
							/>
						)}
					/>
				);
			},
			FirstName: () => {
				// React Component
				const { Field } = ReactFinal;
				const { Input } = Semantic.Form;

				// React Hooks
				const { batch, change } = ReactFinal.useForm();

				const handleOnFocus = () => {
					batch(() => {
						change('phone', undefined);
						change('account', undefined);
					});
				};

				return (
					<Field
						name='first'
						parse={Normalize.name}
						type='text'
						render={({ input }) => (
							<Input
								{...input}
								id={input.name}
								className='blueIcon'
								placeholder={`${input.name} name`}
								size='massive'
								spellCheck='false'
								icon='user outline'
								iconPosition='left'
								transparent
								onFocus={handleOnFocus}
							/>
						)}
					/>
				);
			},
			LastName: () => {
				const { Field, useForm } = ReactFinal;
				const { batch, change } = useForm();
				const { Input } = Semantic.Form;

				const handleOnFocus = () => {
					batch(() => {
						change('phone', undefined);
						change('account', undefined);
					});
				};

				return (
					<Field
						name='last'
						parse={Normalize.name}
						type='text'
						render={({ input }) => (
							<Input
								{...input}
								id={input.name}
								placeholder={`${input.name} name`}
								className='blueIcon'
								size='massive'
								spellCheck='false'
								icon='user outline'
								iconPosition='left'
								transparent
								onFocus={handleOnFocus}
							/>
						)}
					/>
				);
			},
		},
		Button: {
			Find: () => {
				const { values, submitting } = ReactFinal.useFormState();
				return (
					<Semantic.Form.Button
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
			Add: () => {
				const { push } = ReactRouter.useHistory();
				return (
					<Semantic.Form.Button
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
			Report: () => {
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
					/>
				);
			},
			Logout: () => {
				const { push } = ReactRouter.useHistory();
				return (
					<Semantic.Form.Button
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
		},
		Portal: {
			Dashboard: ({ children }: DashboardPortalProps) => {
				return (
					<TransitionablePortal
						open={true}
						transition={{ animation: 'scale', duration: 500 }}
					>
						<Segment className='Dashboard'>
							<Grid verticalAlign='middle' centered>
								<Grid.Column className='Dashboard'>{children}</Grid.Column>
							</Grid>
						</Segment>
					</TransitionablePortal>
				);
			},
		},
		Screen: () => {
			const { Header, Form, Field, Button, Portal } =
				SenterComponents.Dashboard;

			return (
				<Portal.Dashboard>
					<Header />
					<Form>
						<Field.Phone />
						<Field.Account />
						<Field.FirstName />
						<Field.LastName />
						<Button.Find />
						<Button.Add />
						<Button.Report />
						<Button.Logout />
					</Form>
				</Portal.Dashboard>
			);
		},
	},
	Account: {
		Header: () => {
			const { name, version } = Redux.useAppSelector((state) => state.app);
			const { Header, Divider } = Semantic;
			return (
				<Header inverted as='h1' size='huge' textAlign='left'>
					<Icon color='blue' name='braille' />
					<Header.Content>
						{name}
						<Header.Subheader>
							Member Account: version {version}
						</Header.Subheader>
					</Header.Content>
					<Divider hidden />
					<Divider hidden />
				</Header>
			);
		},
		Screen: () => {
			// React Router state and hooks
			const { state } = ReactRouter.useLocation<{ accounts: Membership[] }>();
			const { push } = ReactRouter.useHistory();

			// React Local State
			const [accounts, setAccounts] = React.useState(
				state ? state.accounts : []
			);

			// Confirm Delete Modal
			const [open, setOpenDeleteModal] = React.useState(false);
			const [password, setPassword] = React.useState('');
			const [account, setDeleteAccount] = React.useState<string | undefined>();
			const [phone, setDeletePhone] = React.useState<string | undefined>();
			const [name, setDeleteName] = React.useState<string | undefined>();
			const [error, setError] = React.useState(false);

			const handleDeleteAccount = async (password: string, account: string) => {
				const { status } = await API.deleteMembership(account, password);

				if (status) {
					setError(false);
					setOpenDeleteModal(false);
					setPassword('');
					setAccounts((preAccounts) =>
						preAccounts.filter((membership) => membership.account !== account)
					);
				} else {
					setError(true);
					setPassword('');
					document.getElementById('password')?.focus();
				}
			};

			const handleCancelDelete = () => {
				setOpenDeleteModal(false);
				setError(false);
				setPassword('');
			};

			const handleChange = (
				event: React.ChangeEvent<HTMLInputElement>,
				data: Semantic.InputOnChangeData
			) => {
				event.preventDefault();
				setPassword(data.value);
			};

			const handleOpenDeleteAccount = (item: Membership) => {
				console.log('Delete Account', item.account);
				if (item && item.account) {
					setDeleteAccount(item.account);
					setDeleteName(item.first + ' ' + item.last);
					setDeletePhone(item.phone);
					setOpenDeleteModal(true);
					setTimeout(() => {
						document.getElementById(`${item.account}`)?.focus();
					}, 500);
				}
			};

			// Custom Components
			const {
				TransitionablePortal,
				Pagination,
				Menu,
				List,
				Label,
				TransitionGroup,
				Form,
				Modal,
				Button,
				Input,
			} = Semantic;
			const { Header } = SenterComponents.Account;

			const handlePortalOnClose = () => {
				console.log('onClose');
			};
			const handlePortalOnOpen = () => {
				console.log('onOpen');
			};
			const handlePortalOnHide = () => {
				console.log('onHide');
			};
			const handlePortalOnStart = () => {
				console.log('onStart');
			};

			// Pagination
			const itemPerPage = 6;
			const [activePage, setActivePage] = React.useState(1);
			const [totalPages, setTotalPages] = React.useState(
				Math.ceil(state ? state.accounts.length / itemPerPage : 0 / itemPerPage)
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

			const handleSelectAccount = async (item: Membership) => {
				if (item && item.account) {
					const history = await API.getHistory(item.account);
					push({ pathname: '/purchase', state: { membership: item, history } });
				}
			};

			React.useEffect(() => {
				if (!state) {
					push('/dashboard');
				}
			}, [state, push]);

			// Switch to new Active Page, if we deleted all the content for the current page
			React.useEffect(() => {
				setTotalPages(Math.ceil(accounts.length / itemPerPage));
				if (totalPages < activePage) {
					setActivePage(totalPages);
				}
			}, [accounts, totalPages, activePage]);

			return (
				<TransitionablePortal
					open={true}
					transition={{ animation: 'fade', duration: 500 }}
					onClose={handlePortalOnClose}
					onOpen={handlePortalOnOpen}
					onHide={handlePortalOnHide}
					onStart={handlePortalOnStart}
				>
					<Segment className='Account'>
						<Header />
						<Grid>
							<Grid.Column>
								<Pagination
									boundaryRange={10}
									defaultActivePage={activePage}
									ellipsisItem={null}
									firstItem={null}
									lastItem={null}
									totalPages={totalPages ? totalPages : 1}
									onPageChange={handlePagination}
								/>
								<TransitionGroup
									as={List}
									verticalAlign='middle'
									animation='fly right'
									duration={800}
								>
									<List.Item>
										<Menu
											// text
											compact
											inverted
											fluid
											color='blue'
											size='massive'
											style={{ fontSize: '25px' }}
											widths={6}
										>
											<Menu.Item name='Account' active={true} icon='hashtag' />
											<Menu.Item name='Member Since' icon='calendar outline' />
											<Menu.Item name='Name' icon='user outline' />
											<Menu.Item name='Phone' icon='whatsapp' />
											<Menu.Item name='Gallon Remain' icon='tint' />
											<Menu.Item name='Action' />
										</Menu>
									</List.Item>
									{accounts
										.map((item) => (
											<List.Item key={item.record}>
												<Menu
													compact
													widths={6}
													size='massive'
													style={{ fontSize: '20px' }}
												>
													<Menu.Item color='blue' active>
														<Label circular size='massive' color='blue'>
															{item.account}
														</Label>
													</Menu.Item>
													<Menu.Item>
														<Label circular size='massive' color='blue'>
															{item.since}
															{/* {item.account} */}
														</Label>
													</Menu.Item>
													<Menu.Item>
														<Label size='massive' color='blue' circular>
															{item.first + ' ' + item.last}
														</Label>
													</Menu.Item>
													<Menu.Item>
														<Label size='massive' color='blue' circular>
															{item.phone}
														</Label>
													</Menu.Item>
													<Menu.Item>
														<Label size='massive' color='blue' circular>
															{item.remain}
														</Label>
													</Menu.Item>
													<Menu.Item>
														<Form.Button
															primary
															content='Select'
															size='massive'
															circular
															onClick={() => handleSelectAccount(item)}
														/>
														<Form.Button
															negative
															circular
															size='massive'
															content='Delete'
															onClick={() => handleOpenDeleteAccount(item)}
														/>
													</Menu.Item>
												</Menu>
											</List.Item>
										))
										.slice(
											(activePage - 1) * itemPerPage,
											activePage * itemPerPage
										)}
								</TransitionGroup>
								<Button
									color='black'
									content='Done'
									fluid
									circular
									size='massive'
									onClick={() => push('/dashboard')}
								/>
								<Modal
									open={open}
									dimmer='blurring'
									size='large'
									onMount={() => document.getElementById('password')?.focus()}
								>
									<Modal.Header>
										<List.Item>
											<Menu
												compact
												inverted
												fluid
												widths={3}
												color='blue'
												size='massive'
												style={{ fontSize: '25px' }}
											>
												<Menu.Item
													name='Account'
													active={true}
													icon='hashtag'
												/>
												<Menu.Item name='Name' icon='user outline' />
												<Menu.Item name='Phone' icon='whatsapp' />
											</Menu>
										</List.Item>
										<List.Item>
											<Menu fluid widths={3} size='massive' compact>
												<Menu.Item active={true}>
													<Label size='massive' color='red' circular>
														{account}
													</Label>
												</Menu.Item>
												<Menu.Item>
													<Label size='massive' color='red' circular>
														{name}
													</Label>
												</Menu.Item>
												<Menu.Item>
													<Label size='massive' color='red' circular>
														{phone}
													</Label>
												</Menu.Item>
											</Menu>
										</List.Item>
									</Modal.Header>
									<Modal.Actions>
										{error && (
											<Label size='huge' basic color='red' pointing='right'>
												Wrong password, Please try again.
											</Label>
										)}
										<Input
											id='password'
											name='password'
											type='password'
											size='massive'
											placeholder='enter password'
											error={error}
											focus
											onChange={handleChange}
										/>
										<Button
											content='Delete'
											circular
											size='massive'
											negative
											onClick={() => handleDeleteAccount(password, account!)}
										/>
										<Button
											content='Cancel'
											circular
											size='massive'
											secondary
											onClick={handleCancelDelete}
										/>
									</Modal.Actions>
								</Modal>
							</Grid.Column>
						</Grid>
					</Segment>
				</TransitionablePortal>
			);
		},
	},
	Add: {
		Portal: ({
			open = true,
			transition = { animation: 'fade', duration: 500 },
			children,
		}: ScreenPortalProps) => (
			<TransitionablePortal open={open} transition={transition}>
				<Segment className='Add'>
					<Grid>
						<Grid.Column className='Add'>{children}</Grid.Column>
					</Grid>
				</Segment>
			</TransitionablePortal>
		),
		Header: ({ name = '', version = '' }: AddScreenHeaderProps) => (
			<Header inverted as='h1' size='huge' textAlign='left'>
				<Icon color='blue' name='braille' />
				<Header.Content>
					{name}
					<Header.Subheader>New Membership: version {version}</Header.Subheader>
				</Header.Content>
			</Header>
		),
		Form: ({
			onSubmit,
			error,
			subscription,
			initialValues,
		}: AddScreenFormProps) => {
			const { push } = ReactRouter.useHistory();
			const { Field, Button } = SenterComponents.Add;

			const handleCancelClick = () => push('/dashboard');

			return (
				<ReactFinal.Form
					initialValuesEqual={() => true}
					subscription={subscription}
					initialValues={initialValues}
					onSubmit={onSubmit}
					render={({ handleSubmit, values, submitting }) => (
						<Semantic.Form onSubmit={handleSubmit}>
							<Form.Group>
								<Field.Note />
								<Field.Date />
								<Field.Time />
							</Form.Group>
							<Form.Group>
								<Field.Account error={error} />
								<Field.Phone />
								<Field.FirstName />
								<Field.LastName />
								<Field.Fee />
								<Field.Gallon />
								<Button.Add values={values} submitting={submitting} />
								<Button.Cancel onClick={handleCancelClick} />
							</Form.Group>
						</Semantic.Form>
					)}
				/>
			);
		},
		Field: {
			Date: () => (
				<Field
					name='date'
					render={({ input }) => (
						<Form.Input
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
			Time: () => (
				<Field
					name='time'
					render={({ input }) => (
						<Form.Input
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
			Note: () => (
				<Field
					name='note'
					render={({ input }) => (
						<Form.Input
							label='Note'
							id='note'
							className='AddNote'
							size='massive'
							placeholder='Add Note'
							{...input}
							spellCheck='false'
							inverted
							width={15}
						/>
					)}
				/>
			),
			Account: ({ error }: AccountFieldProps) => (
				<Field
					name='account'
					parse={Normalize.account}
					render={({ input }) => (
						<Form.Input
							id='account'
							className='Name'
							label='Account'
							placeholder='xxxxxxx'
							error={error ? error : false}
							size='massive'
							inverted
							{...input}
							width={3}
						/>
					)}
				/>
			),
			Phone: () => (
				<Field
					name='phone'
					parse={Normalize.phone}
					render={({ input }) => (
						<Form.Input
							id='phone'
							className='Name'
							label='Phone Number'
							placeholder='xxx-xxx-xxxx'
							size='massive'
							inverted
							{...input}
							width={2}
						/>
					)}
				/>
			),
			FirstName: () => (
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
							size='massive'
							inverted
							{...input}
							width={3}
						/>
					)}
				/>
			),
			LastName: () => (
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
							size='massive'
							inverted
							width={3}
						/>
					)}
				/>
			),
			Fee: () => (
				<Field
					name='fee'
					parse={Normalize.fee}
					render={({ input }) => (
						<Form.Input
							id='fee'
							className='TodayDate'
							label='Fee'
							{...input}
							size='massive'
							inverted
							width={1}
						/>
					)}
				/>
			),
			Gallon: () => {
				const { change } = ReactFinal.useForm();

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
								size='massive'
								inverted
								onChange={(event, data) => {
									event.preventDefault();
									input.onChange(data.value);
									change('remain', parseInt(data.value));
								}}
								width={1}
							/>
						)}
					/>
				);
			},
		},
		Button: {
			Add: ({ values, submitting }: AddButtonProps) => (
				<Form.Button
					id='AddMember'
					content='Add'
					type='submit'
					size='massive'
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
					primary
					fluid
					width={2}
					circular
					style={{ marginTop: '30px' }}
				/>
			),
			Cancel: ({ handleClick, onClick }: CancelButtonProps) => (
				<Form.Button
					id='CancelAdd'
					content='Cancel'
					type='button'
					size='massive'
					secondary
					fluid
					circular
					style={{ marginTop: '30px' }}
					// onClick={handleClick}
					onClick={onClick}
				/>
			),
		},
		Screen: () => {
			// Custom Semantic Component
			const { Header, Portal, Form } = SenterComponents.Add;

			// Redux Store
			const { name, version } = Redux.useAppSelector((state) => state.app);

			// React Router State and Hooks
			const { push } = ReactRouter.useHistory();

			// React Form onSubmit handler
			const [error, setError] = React.useState<boolean | string>(false);
			const onSubmit = async (values: Membership) => {
				const response = await API.addMembership(values);
				const { duplicate, membership, account } = response;

				if (duplicate) {
					setError(`Account ${account} already existed`);
				} else {
					const history = await API.getHistory(account!);
					push({ pathname: '/purchase', state: { membership, history } });
				}
			};

			const subscription = {
				submitting: true,
				valid: true,
				values: true,
			};

			const initialValues = {
				account: undefined,
				phone: undefined,
				first: undefined,
				last: undefined,
				note: undefined,
				fee: 0,
				gallon: 0,
				buy: 0,
				remain: 0,
				previous: 0,
				type: 'NEW' as PurchaseType,
				since: getDate(),
				date: getDate(),
				time: getTime(),
			};

			React.useEffect(() => {
				document.getElementById('account')?.focus();
			}, []);

			return (
				<Portal>
					<Header name={name} version={version} />
					<Form
						error={error}
						onSubmit={onSubmit}
						subscription={subscription}
						initialValues={initialValues}
					/>
				</Portal>
			);
		},
	},
	Purchase: {
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
				const { Table } = SenterComponents.Purchase;
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
				const { Field, Button } = SenterComponents.Purchase;
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
									<Field.Fee
										edit={edit}
										callback={() => form.change('buy', 0)}
									/>
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

				const { Table } = SenterComponents.Purchase;

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
											<Table.Row
												textAlign='center'
												style={{ fontSize: '20px' }}
											>
												<Table.HeaderCell>Name</Table.HeaderCell>
												<Table.HeaderCell>Phone</Table.HeaderCell>
												<Table.HeaderCell>Account</Table.HeaderCell>
												<Table.HeaderCell>MemberSince</Table.HeaderCell>
											</Table.Row>
										</Table.Header>
										<Table.Body>
											<Table.Row
												textAlign='center'
												style={{ fontSize: '20px' }}
											>
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
				const { Table } = SenterComponents.Purchase;
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
								.slice(
									(activePage - 1) * itemPerPage,
									activePage * itemPerPage
								)}
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
				} = SenterComponents.Purchase;

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
				} = SenterComponents.Purchase;

				// Data to be sent to printer
				const fullname = `${record!.first} ${record!.last} -- ${record!.phone}`;
				const prevGallon = `Gallon Prev: ${record!.previous}`;
				const gallonBuy = `Gallon Buy : ${record!.buy}`;
				const blank = '';
				const gallonLeft = `Gallon Left: ${record!.remain}`;
				const message = `Thank You                [Account#: ${
					record!.account
				}]`;
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
				const { Print } = SenterComponents.Purchase.Button;

				const renewGallon = `Gallon Renew: ${record!.gallon}`;
				const renewFee = `Renew Fee   : $${record!.fee}`;
				const fullname = `${record!.first} ${record!.last} -- ${record!.phone}`;
				const totalGallon = `Gallon Left : ${record!.remain}`;
				const message = `Thank You                [Account#: ${
					record!.account
				}]`;
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
				const { Table } = SenterComponents.Purchase;
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
		Screen: (): JSX.Element => {
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
			const { Modal, Portal, Header, Form, Button } = SenterComponents.Purchase;

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

export default SenterComponents;
