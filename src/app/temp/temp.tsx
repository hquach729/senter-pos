export {};

// const LoginScreenButtons = {
// 	CloseButton: () => {
// 		const {
// 			Form: { Button },
// 		} = Semantic;
// 		return (
// 			<Button
// 				content='Close'
// 				secondary
// 				fluid
// 				icon='close'
// 				labelPosition='right'
// 				circular
// 				size='huge'
// 				onClick={API.quitApp}
// 			/>
// 		);
// 	},
// 	LoginButton: ({ error }: LoginButtonProps) => {
// 		const {
// 			Form: { Button },
// 		} = Semantic;

// 		return (
// 			<Button
// 				content={error ? 'Invalid Login' : 'Login'}
// 				type='submit'
// 				negative={error ? true : false}
// 				primary
// 				fluid
// 				circular
// 				icon='sign in'
// 				labelPosition='right'
// 				size='huge'
// 			/>
// 		);
// 	},
// 	BackupButton: () => {
// 		const [loading, setLoading] = React.useState(false);
// 		const [fileSave, setFileSave] = React.useState({
// 			status: false,
// 			date: '',
// 		});

// 		const { Button } = Semantic.Form;

// 		const backupDB = async (
// 			event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
// 			data: Semantic.ButtonProps
// 		) => {
// 			event.preventDefault();
// 			setLoading(true);
// 			const { status, date } = await API.backupDB();
// 			setFileSave({ status, date });
// 			setLoading(false);
// 		};

// 		return (
// 			<Button
// 				loading={loading}
// 				content={fileSave.status ? fileSave.date : 'Backup'}
// 				size='huge'
// 				color='pink'
// 				icon='database'
// 				labelPosition='right'
// 				circular
// 				fluid
// 				onClick={backupDB}
// 			/>
// 		);
// 	},
// };
// const LoginScreenFields = {
// 	Username: ({ handleOnChange }: LoginScreenFieldProps) => {
// 		const { Field } = ReactFinalForm;
// 		const { Input } = Semantic.Form;
// 		return (
// 			<Field
// 				name='username'
// 				type='text'
// 				validate={required}
// 				render={({ input }) => (
// 					<Input
// 						id={input.name}
// 						placeholder={input.name}
// 						className='blueIcon'
// 						size='massive'
// 						name={input.name}
// 						value={input.value}
// 						type={input.type}
// 						spellCheck='false'
// 						icon='user'
// 						iconPosition='left'
// 						transparent
// 						focus
// 						onChange={(event, data) => handleOnChange(event, data, input)}
// 					/>
// 				)}
// 			/>
// 		);
// 	},
// 	Password: ({ handleOnChange }: LoginScreenFieldProps) => {
// 		const { Field } = ReactFinalForm;
// 		const { Input } = Semantic.Form;
// 		return (
// 			<Field
// 				name='password'
// 				type='password'
// 				validate={required}
// 				render={({ input }) => (
// 					<Input
// 						id={input.name}
// 						placeholder={input.name}
// 						className='blueIcon'
// 						size='massive'
// 						name={input.name}
// 						value={input.value}
// 						type={input.type}
// 						spellCheck='false'
// 						icon='sign-in'
// 						iconPosition='left'
// 						transparent
// 						focus
// 						onChange={(event, data) => handleOnChange(event, data, input)}
// 					/>
// 				)}
// 			/>
// 		);
// 	},
// };
// const LoginScreenForm = () => {
// 	const { push } = ReactRouter.useHistory();
// 	const [error, setError] = React.useState<boolean | string>(false);
// 	const handleOnChange = (
// 		event: React.ChangeEvent<HTMLInputElement>,
// 		data: Semantic.InputOnChangeData,
// 		input: ReactFinalForm.FieldInputProps<string, HTMLElement>
// 	) => {
// 		if (error) setError(false);
// 		event.preventDefault();
// 		input.onChange(data.value);
// 	};
// 	const { Form } = ReactFinalForm;
// 	const onSubmit = async (values: LoginFormValues, form: FormApi) => {
// 		const { authenticated } = await API.verifyLogin({ ...values });

// 		if (authenticated) {
// 			push({ pathname: '/dashboard', state: { open: true } });
// 		} else {
// 			setError('Invalid Login');
// 			form.reset();
// 			document.getElementById('username')?.focus();
// 		}
// 	};
// 	const { CloseButton, LoginButton, BackupButton } = LoginScreenButtons;
// 	const { Username, Password } = LoginScreenFields;
// 	const { Group } = Semantic.Form;

// 	React.useEffect(() => {
// 		document.getElementById('username')?.focus();
// 	}, []);

// 	return (
// 		<Form
// 			onSubmit={onSubmit}
// 			subscription={{
// 				submitting: true,
// 				valid: true,
// 			}}
// 			render={({ handleSubmit }) => (
// 				<Semantic.Form onSubmit={handleSubmit}>
// 					<Username handleOnChange={handleOnChange} />
// 					<Password handleOnChange={handleOnChange} />
// 					<LoginButton error={error} />
// 					<Group widths={2}>
// 						<CloseButton />
// 						<BackupButton />
// 					</Group>
// 				</Semantic.Form>
// 			)}
// 		/>
// 	);
// };
// const LoginScreenHeader = () => {
// 	const { version, name } = Redux.useAppSelector((state) => state.app);

// 	const { Header, Icon } = Semantic;
// 	return (
// 		<Header inverted as='h1' size='huge' textAlign='left'>
// 			<Icon color='blue' name='braille' />
// 			<Header.Content>
// 				{name}
// 				<Header.Subheader>{`version: ${version}`}</Header.Subheader>
// 			</Header.Content>
// 		</Header>
// 	);
// };

// const LoginScreenPortal = ({
// 	open = true,
// 	transition = {
// 		animation: 'scale',
// 		duration: 500,
// 	},
// 	children = null,
// }: LoginScreenPortalProps) => {
// 	return (
// 		<TransitionablePortal open={open} transition={transition}>
// 			<Segment className='Login'>
// 				<Grid verticalAlign='middle' centered>
// 					<Grid.Column className='Login'>{children}</Grid.Column>
// 				</Grid>
// 			</Segment>
// 		</TransitionablePortal>
// 	);
// };

// export const DashboardScreen = () => {
// 	const { push } = ReactRouter.useHistory();

// 	const {
// 		Header,
// 		TransitionablePortal,
// 		Segment,
// 		Grid,
// 		Icon,
// 		Form: { Input, Button },
// 	} = Semantic;
// 	const { Form, Field } = ReactFinalForm;

// 	const [name, setName] = React.useState('');

// 	React.useEffect(() => {
// 		// TODO: Get App version from package.json
// 		const getAppVersion = async () => {
// 			setName('Senter Water POS');
// 		};
// 		getAppVersion();
// 		document.getElementById('phone')?.focus();
// 	}, []);

// 	const onSubmit = async (values: FindFormValues, form: FormApi) => {
// 		console.log('onSubmit:', { ...values });

// 		const { membership, memberships } = await API.findMembership(values);

// 		if (memberships) {
// 			console.log({ memberships });
// 			push({ pathname: '/account', state: { accounts: memberships } });
// 		} else if (membership) {
// 			console.log({ membership });
// 			const history = await API.getHistory(membership.account!);

// 			// push({ pathname: '/buy', state: { membership } });
// 			push({ pathname: '/purchase', state: { membership, history } });
// 		} else {
// 			console.log('unable to find membership');
// 			form.reset();
// 		}
// 	};

// 	return (
// 		<TransitionablePortal
// 			open={true}
// 			transition={{ animation: 'scale', duration: 500 }}
// 		>
// 			<Segment className='Login'>
// 				<Grid verticalAlign='middle' centered>
// 					<Grid.Column className='Login'>
// 						<Header inverted as='h1' size='huge' textAlign='left'>
// 							<Icon color='blue' name='braille' />
// 							<Header.Content>
// 								{name}
// 								<Header.Subheader>Dashboard</Header.Subheader>
// 							</Header.Content>
// 						</Header>
// 						<Form
// 							onSubmit={onSubmit}
// 							subscription={{
// 								submitting: true,
// 								valid: true,
// 								values: true,
// 							}}
// 							render={({
// 								handleSubmit,
// 								form: { change, batch },
// 								values,
// 								submitting,
// 							}) => (
// 								<Semantic.Form onSubmit={handleSubmit}>
// 									<Field
// 										name='phone'
// 										parse={Normalize.phone}
// 										type='text'
// 										render={({ input }) => (
// 											<Input
// 												id={input.name}
// 												placeholder='xxx-xxx-xxxx'
// 												className='blueIcon'
// 												size='massive'
// 												name={input.name}
// 												value={input.value}
// 												type={input.type}
// 												spellCheck='false'
// 												icon='whatsapp'
// 												iconPosition='left'
// 												transparent
// 												onChange={(event, data) => {
// 													event.preventDefault();
// 													input.onChange(data.value);
// 												}}
// 												onFocus={() =>
// 													batch(() => {
// 														change('account', undefined);
// 														change('first', undefined);
// 														change('last', undefined);
// 													})
// 												}
// 											/>
// 										)}
// 									/>
// 									<Field
// 										name='account'
// 										parse={Normalize.account}
// 										type='text'
// 										render={({ input }) => (
// 											<Input
// 												id={input.name}
// 												placeholder={`${input.name} #`}
// 												className='blueIcon'
// 												size='massive'
// 												name={input.name}
// 												value={input.value}
// 												type={input.type}
// 												spellCheck='false'
// 												icon='credit card'
// 												iconPosition='left'
// 												transparent
// 												// focus
// 												onChange={(event, data) => {
// 													event.preventDefault();
// 													input.onChange(data.value);
// 												}}
// 												onFocus={() =>
// 													batch(() => {
// 														change('phone', undefined);
// 														change('first', undefined);
// 														change('last', undefined);
// 													})
// 												}
// 											/>
// 										)}
// 									/>
// 									<Field
// 										name='first'
// 										parse={Normalize.name}
// 										type='text'
// 										render={({ input }) => (
// 											<Input
// 												id={input.name}
// 												placeholder={`${input.name} name`}
// 												className='blueIcon'
// 												size='massive'
// 												name={input.name}
// 												value={input.value}
// 												type={input.type}
// 												spellCheck='false'
// 												icon='user outline'
// 												iconPosition='left'
// 												transparent
// 												onChange={(event, data) => {
// 													event.preventDefault();
// 													input.onChange(data.value);
// 												}}
// 												onFocus={() =>
// 													batch(() => {
// 														change('phone', undefined);
// 														change('account', undefined);
// 													})
// 												}
// 											/>
// 										)}
// 									/>
// 									<Field
// 										name='last'
// 										parse={Normalize.name}
// 										type='text'
// 										render={({ input }) => (
// 											<Input
// 												id={input.name}
// 												placeholder={`${input.name} name`}
// 												className='blueIcon'
// 												size='massive'
// 												name={input.name}
// 												value={input.value}
// 												type={input.type}
// 												spellCheck='false'
// 												icon='user outline'
// 												iconPosition='left'
// 												transparent
// 												onChange={(event, data) => {
// 													event.preventDefault();
// 													input.onChange(data.value);
// 												}}
// 												onFocus={() =>
// 													batch(() => {
// 														change('phone', undefined);
// 														change('account', undefined);
// 													})
// 												}
// 											/>
// 										)}
// 									/>
// 									<Button
// 										content='Find Membership'
// 										disabled={
// 											submitting ||
// 											((!values.phone || values.phone.length < 14) &&
// 												!values.account &&
// 												!values.first &&
// 												!values.last)
// 										}
// 										type='submit'
// 										primary
// 										fluid
// 										circular
// 										icon='sign in'
// 										labelPosition='right'
// 										size='huge'
// 									/>
// 									<Button
// 										content='Add Membership'
// 										type='button'
// 										color='teal'
// 										fluid
// 										circular
// 										icon='user plus'
// 										labelPosition='right'
// 										size='huge'
// 										onClick={() => push('/add')}
// 									/>
// 									<Button
// 										content='Daily Report'
// 										type='button'
// 										color='yellow'
// 										fluid
// 										circular
// 										icon='user plus'
// 										labelPosition='right'
// 										size='huge'
// 										onClick={() => {
// 											const date = new Date();
// 											console.log({ date });
// 										}}
// 									/>
// 									<Button
// 										type='button'
// 										content='Logout'
// 										color='black'
// 										fluid
// 										circular
// 										icon='sign out'
// 										labelPosition='right'
// 										size='huge'
// 										onClick={() => push('/')}
// 									/>
// 									{/* <Spy /> */}
// 								</Semantic.Form>
// 							)}
// 						/>
// 					</Grid.Column>
// 				</Grid>
// 			</Segment>
// 		</TransitionablePortal>
// 	);
// };

// export const AccountScreen = () => {
// 	const itemPerPage = 7;
// 	const { state } = ReactRouter.useLocation<{ accounts: Membership[] }>();
// 	const { push } = ReactRouter.useHistory();
// 	const {
// 		Header,
// 		TransitionablePortal,
// 		Segment,
// 		Grid,
// 		Icon,
// 		List,
// 		Button,
// 		Pagination,
// 		Divider,
// 		TransitionGroup,
// 		Menu,
// 		Form,
// 		Modal,
// 		Label,
// 	} = Semantic;
// 	const [name, setName] = React.useState('');
// 	const [version, setVersion] = React.useState('');
// 	const [accounts, setAccounts] = React.useState(state ? state.accounts : []);

// 	const [activePage, setActivePage] = React.useState(1);
// 	const [totalPages, setTotalPages] = React.useState(
// 		Math.ceil(state ? state.accounts.length / itemPerPage : 0 / itemPerPage)
// 	);

// 	// Confirm Delete Modal
// 	const [open, setOpenModal] = React.useState(false);
// 	const [password, setPassword] = React.useState('');
// 	const [account, setDeleteAccount] = React.useState<string | undefined>(
// 		undefined
// 	);
// 	const [error, setError] = React.useState(false);

// 	// Pagination event handler
// 	const handlePagination = (
// 		event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
// 		data: Semantic.PaginationProps
// 	) => {
// 		event.preventDefault();
// 		const { activePage } = data;
// 		if (activePage && typeof activePage === 'number') {
// 			setActivePage(activePage);
// 		}
// 	};

// 	const handleDeleteAccount = async (password: string, account: string) => {
// 		const { status } = await API.deleteMembership(account, password);

// 		if (status) {
// 			setError(false);
// 			setOpenModal(false);
// 			setPassword('');
// 			setTimeout(() => {
// 				setAccounts((preAccounts) =>
// 					preAccounts.filter((membership) => membership.account !== account)
// 				);
// 			}, 800);
// 		} else {
// 			setError(true);
// 			setPassword('');
// 			document.getElementById('password')?.focus();
// 		}
// 	};

// 	const handleCancelDelete = () => {
// 		setOpenModal(false);
// 		setError(false);
// 		setPassword('');
// 	};

// 	React.useEffect(() => {
// 		const getAppInfo = async () => {
// 			const { name, version } = await API.fetchAppInfo();
// 			setName(name || '');
// 			setVersion(version || '');
// 		};

// 		!state ? push('/dashboard') : getAppInfo();
// 	}, [push, state]);

// 	// Switch to new Active Page, if we deleted all the content for the current page
// 	React.useEffect(() => {
// 		setTotalPages(Math.ceil(accounts.length / itemPerPage));
// 		if (totalPages < activePage) {
// 			setActivePage(totalPages);
// 		}
// 	}, [accounts, totalPages, activePage]);

// 	return (
// 		<>
// 			<TransitionablePortal
// 				open={true}
// 				transition={{ animation: 'fade', duration: 500 }}
// 			>
// 				<Segment className='Login'>
// 					<Grid>
// 						<Grid.Column>
// 							<Header inverted as='h1' size='huge' textAlign='left'>
// 								<Icon color='blue' name='braille' />
// 								<Header.Content>
// 									{name}
// 									<Header.Subheader>
// 										Account: version {version}
// 									</Header.Subheader>
// 								</Header.Content>
// 								<Divider hidden />
// 								<Divider hidden />
// 								<Pagination
// 									boundaryRange={0}
// 									defaultActivePage={activePage}
// 									ellipsisItem={null}
// 									firstItem={null}
// 									lastItem={null}
// 									totalPages={totalPages ? totalPages : 1}
// 									onPageChange={handlePagination}
// 								/>
// 								<TransitionGroup
// 									as={List}
// 									verticalAlign='middle'
// 									animation='fly left'
// 									duration={800}
// 								>
// 									<List.Item>
// 										<Menu inverted fluid widths={6} color='blue' size='massive'>
// 											<Menu.Item name='Account' active={true} />
// 											<Menu.Item name='Since' />
// 											<Menu.Item name='Phone' />
// 											<Menu.Item name='Name' />
// 											<Menu.Item name='Gallon Remain' />
// 											<Menu.Item name='Action' />
// 										</Menu>
// 									</List.Item>

// 									{accounts
// 										.map((item) => (
// 											<List.Item key={item.record}>
// 												<Menu
// 													widths={6}
// 													size='massive'
// 													style={{ fontSize: '20px' }}
// 												>
// 													<Menu.Item color='blue' active>
// 														<Label circular size='massive' color='blue'>
// 															{item.account}
// 														</Label>
// 													</Menu.Item>
// 													<Menu.Item>{item.since}</Menu.Item>
// 													<Menu.Item>
// 														<Label size='massive' color='blue' circular>
// 															{item.phone}
// 														</Label>
// 													</Menu.Item>
// 													<Menu.Item name={item.first + ' ' + item.last} />
// 													<Menu.Item>{item.remain}</Menu.Item>
// 													<Menu.Item>
// 														<Form.Button
// 															primary
// 															content='Select'
// 															size='huge'
// 															circular
// 															onClick={() => {
// 																push({
// 																	pathname: '/buy',
// 																	state: { membership: item },
// 																});
// 															}}
// 														/>
// 														<Form.Button
// 															negative
// 															circular
// 															size='huge'
// 															content='Delete'
// 															onClick={() => {
// 																console.log('Delete Account');
// 																setDeleteAccount(item.account);
// 																setOpenModal(true);
// 																setTimeout(() => {
// 																	document
// 																		.getElementById(`${account}`)
// 																		?.focus();
// 																}, 500);
// 															}}
// 														/>
// 													</Menu.Item>
// 												</Menu>
// 											</List.Item>
// 										))
// 										.slice(
// 											(activePage - 1) * itemPerPage,
// 											activePage * itemPerPage
// 										)}
// 								</TransitionGroup>
// 							</Header>
// 							<Button
// 								circular
// 								color='black'
// 								content='Done'
// 								fluid
// 								size='massive'
// 								onClick={() => push('/dashboard')}
// 							/>
// 						</Grid.Column>
// 					</Grid>
// 				</Segment>
// 			</TransitionablePortal>
// 			<Modal
// 				open={open}
// 				dimmer='blurring'
// 				onMount={() => document.getElementById('password')?.focus()}
// 			>
// 				<Modal.Header>Confirm Account Delete: {account}</Modal.Header>
// 				<Modal.Actions>
// 					{error && (
// 						<Label basic color='red' pointing='right'>
// 							Wrong password, Please try again.
// 						</Label>
// 					)}
// 					<Semantic.Input
// 						id='password'
// 						error={error}
// 						type='password'
// 						name='password'
// 						focus
// 						placeholder='enter password'
// 						onChange={(event, data) => {
// 							event.preventDefault();
// 							setPassword(data.value);
// 						}}
// 					/>
// 					<Button
// 						negative
// 						content='Delete'
// 						onClick={() => handleDeleteAccount(password, account!)}
// 					/>
// 					<Button content='Cancel' secondary onClick={handleCancelDelete} />
// 				</Modal.Actions>
// 			</Modal>
// 		</>
// 	);
// };

// export const AddScreen = () => {
// 	const { push } = ReactRouter.useHistory();
// 	const { Form, Field } = ReactFinalForm;
// 	const {
// 		Header,
// 		TransitionablePortal,
// 		Segment,
// 		Grid,
// 		Icon,
// 		Form: { Input, Group, Button },
// 	} = Semantic;
// 	const [name, setName] = React.useState('');
// 	const [version, setVersion] = React.useState('');
// 	const [error, setError] = React.useState<boolean | string>(false);
// 	const onSubmit = async (values: Membership) => {
// 		const { duplicate, membership, account } = await API.addMembership(values);

// 		if (duplicate) {
// 			setError(`Account ${account} already existed`);
// 		} else {
// 			const history = await API.getHistory(account!);
// 			// push({ pathname: '/buy', state: { membership, history } });
// 			push({ pathname: '/purchase', state: { membership, history } });
// 		}
// 	};

// 	React.useEffect(() => {
// 		const getAppVersion = async () => {
// 			const { name, version } = await API.fetchAppInfo();
// 			setName((prevState) => (name ? name : prevState));
// 			setVersion((prevState) => (version ? version : prevState));
// 		};
// 		getAppVersion();
// 		document.getElementById('account')?.focus();
// 	}, []);

// 	return (
// 		<TransitionablePortal
// 			open={true}
// 			transition={{ animation: 'fade', duration: 500 }}
// 		>
// 			<Segment className='Add'>
// 				<Grid>
// 					<Grid.Column className='Add'>
// 						<Header inverted as='h1' size='huge' textAlign='left'>
// 							<Icon color='blue' name='braille' />
// 							<Header.Content>
// 								{name}
// 								<Header.Subheader>
// 									New Membership: version {version}
// 								</Header.Subheader>
// 							</Header.Content>
// 						</Header>
// 						<Form
// 							initialValuesEqual={() => true}
// 							subscription={{
// 								submitting: true,
// 								valid: true,
// 								values: true,
// 							}}
// 							initialValues={{
// 								account: null,
// 								phone: null,
// 								first: null,
// 								last: null,
// 								note: null,
// 								fee: 0,
// 								gallon: 0,
// 								buy: 0,
// 								remain: 0,
// 								previous: 0,
// 								type: 'NEW',
// 								since: getDate(),
// 								date: getDate(),
// 								time: getTime(),
// 							}}
// 							onSubmit={onSubmit}
// 							render={({
// 								handleSubmit,
// 								form: { change },
// 								values,
// 								submitting,
// 							}) => (
// 								<Semantic.Form onSubmit={handleSubmit}>
// 									<Group>
// 										<Field
// 											name='date'
// 											render={({ input }) => (
// 												<Input
// 													fluid
// 													id='date'
// 													label='Date'
// 													className='Name'
// 													placeholder='mm/dd/yyyy'
// 													size='huge'
// 													inverted
// 													readOnly
// 													{...input}
// 													width={2}
// 												/>
// 											)}
// 										/>
// 										<Field
// 											name='time'
// 											render={({ input }) => (
// 												<Input
// 													id='time'
// 													label='Time'
// 													className='Name'
// 													placeholder='xx:xx:xx'
// 													{...input}
// 													size='huge'
// 													inverted
// 													readOnly
// 													width={2}
// 												/>
// 											)}
// 										/>
// 										<Field
// 											name='account'
// 											parse={Normalize.account}
// 											render={({ input }) => (
// 												<Input
// 													error={error ? error : false}
// 													id='account'
// 													className='Name'
// 													label='Account'
// 													placeholder='xxxxxxx'
// 													{...input}
// 													size='huge'
// 													inverted
// 													width={2}
// 												/>
// 											)}
// 										/>
// 										<Field
// 											name='phone'
// 											parse={Normalize.phone}
// 											render={({ input }) => (
// 												<Input
// 													id='phone'
// 													label='Phone Number'
// 													className='Name'
// 													placeholder='xxx-xxx-xxxx'
// 													{...input}
// 													size='huge'
// 													inverted
// 													width={2}
// 												/>
// 											)}
// 										/>
// 										<Field
// 											name='first'
// 											parse={Normalize.name}
// 											render={({ input }) => (
// 												<Input
// 													id='firstName'
// 													label='First Name'
// 													className='Name'
// 													spellCheck='false'
// 													placeholder='First Name'
// 													size='huge'
// 													inverted
// 													{...input}
// 													width={2}
// 												/>
// 											)}
// 										/>
// 										<Field
// 											name='last'
// 											parse={Normalize.name}
// 											render={({ input }) => (
// 												<Input
// 													id='lastName'
// 													label='Last Name'
// 													className='Name'
// 													placeholder='Last Name'
// 													{...input}
// 													spellCheck='false'
// 													size='huge'
// 													inverted
// 													width={2}
// 												/>
// 											)}
// 										/>
// 										<Field
// 											name='fee'
// 											parse={Normalize.fee}
// 											render={({ input }) => (
// 												<Input
// 													id='fee'
// 													className='TodayDate'
// 													label='Fee'
// 													{...input}
// 													size='huge'
// 													inverted
// 													width={1}
// 												/>
// 											)}
// 										/>
// 										<Field
// 											name='gallon'
// 											parse={Normalize.gallon}
// 											render={({ input }) => (
// 												<Input
// 													id='gallon'
// 													label='Gallon'
// 													className='TodayDate'
// 													name={input.name}
// 													value={input.value}
// 													size='huge'
// 													inverted
// 													width={1}
// 													onChange={(event, data) => {
// 														event.preventDefault();
// 														input.onChange(data.value);
// 														change('remain', parseInt(data.value));
// 													}}
// 												/>
// 											)}
// 										/>
// 										<Button
// 											disabled={
// 												!values.phone ||
// 												values.phone.length < 14 ||
// 												!values.account ||
// 												!values.first ||
// 												!values.last ||
// 												!values.fee ||
// 												!values.gallon ||
// 												submitting
// 											}
// 											type='submit'
// 											primary
// 											fluid
// 											style={{ marginTop: '30px' }}
// 											size='huge'
// 											content='Add'
// 										/>
// 										<Button
// 											type='button'
// 											secondary
// 											fluid
// 											style={{ marginTop: '30px' }}
// 											size='huge'
// 											content='Cancel'
// 											onClick={() => push('/dashboard')}
// 										/>
// 									</Group>
// 									<Group>
// 										<Field
// 											name='note'
// 											render={({ input }) => (
// 												<Input
// 													label='Note'
// 													id='note'
// 													className='AddNote'
// 													size='huge'
// 													placeholder='Add Note'
// 													{...input}
// 													spellCheck='false'
// 													inverted
// 													width={16}
// 												/>
// 											)}
// 										/>
// 									</Group>
// 								</Semantic.Form>
// 							)}
// 						/>
// 					</Grid.Column>
// 				</Grid>
// 			</Segment>
// 		</TransitionablePortal>
// 	);
// };

// import { FormApi } from 'final-form';
// import * as React from 'react';
// import * as ReactFinalForm from 'react-final-form';
// import * as ReactRouter from 'react-router-dom';
// import * as Semantic from 'semantic-ui-react';
// import * as Senter from '../app/components';
// import { API } from '../app/service/api';
// import { Normalize } from '../app/service/normalize';
// import { getDate, getTime } from '../app/utilities/formHelper';

// export type PurchaseType = 'BUY' | 'RENEW' | 'NEW' | undefined;
// export interface Membership {
// 	record?: number;
// 	account?: string;
// 	phone?: string;
// 	first?: string;
// 	last?: string;
// 	since?: string;
// 	fee?: number;
// 	gallon?: number;
// 	buy?: number;
// 	remain?: number;
// 	previous?: number;
// 	type?: PurchaseType;
// 	date?: string;
// 	time?: string;
// 	note?: string;
// }
// const historyHeaderCells = [
// 	'Type',
// 	'Fee',
// 	'Gallon',
// 	'Prev',
// 	'Buy',
// 	'Remain',
// 	'Date',
// 	'Time',
// ];
// const {
// 	Header,
// 	TransitionablePortal,
// 	Segment,
// 	Grid,
// 	Icon,
// 	Form: { Input, Button, Group },
// 	Divider,
// 	Modal,
// 	Table,
// 	Pagination,
// 	Message,
// } = Semantic;
// const { Form, Field } = ReactFinalForm;
// /**
//  * Purchase Header Component
//  * @param { string } - name of the application
//  * @returns { JSX.Element}
//  */
// export const PurchaseHeader = ({ name }: { name: string }) => (
// 	<Segment className='Buy'>
// 		<Header inverted as='h1' size='huge' textAlign='left'>
// 			<Icon color='blue' name='braille' />
// 			<Header.Content>
// 				{name}
// 				<Header.Subheader>Water Purchase and Renew</Header.Subheader>
// 			</Header.Content>
// 		</Header>
// 	</Segment>
// );
// /**
//  *
//  * @param param0
//  * @returns
//  */
// export const CurrentReceipt = ({
// 	openReceipt,
// 	receipt,
// }: {
// 	openReceipt: boolean;
// 	receipt?: Membership;
// }) => (
// 	<TransitionablePortal
// 		open={openReceipt}
// 		transition={{ animation: 'vertical flip', duration: 700 }}
// 		closeOnDocumentClick={false}
// 		closeOnEscape={false}
// 		closeOnDimmerClick={false}
// 		closeOnPortalMouseLeave={false}
// 	>
// 		<Segment
// 			style={{
// 				paddingRight: 14,
// 				paddingLeft: 14,
// 				paddingTop: 20,
// 				left: '0%',
// 				right: '0%',
// 				top: '0%',
// 				zIndex: 1000,
// 				backgroundColor: '#002b487d',
// 			}}
// 		>
// 			{receipt && <Senter.Table.LastReceipt record={receipt} />}
// 		</Segment>
// 	</TransitionablePortal>
// );
// export const PurchaseForm = ({
// 	onSubmit,
// 	initialValues,
// 	edit,
// 	error,
// 	history,
// 	password,
// 	setEdit,
// 	setError,
// 	setOpenReceipt,
// 	setReceipt,
// 	handleOpenHistoryModel,
// 	openHistoryModal,
// 	receipt,
// 	handlePagination,
// 	activePage,
// 	totalPages,
// 	itemPerPage,
// 	handleCloseHistoryModal,
// 	// setOpenHistoryModal,
// 	deleteError,
// 	setOpenDeleteModal,
// 	deleteAccount,
// 	openDeleteModal,
// 	cancelAccountDelete,
// 	setPassword,
// 	push,
// }: {
// 	push: (path: string, state?: unknown) => void;
// 	setPassword: (password: string) => void;
// 	deleteAccount: (receipt: Membership, password: string) => void;
// 	onSubmit: () => void;
// 	initialValues: Membership;
// 	edit: boolean;
// 	deleteError: boolean;
// 	receipt: Membership;
// 	activePage: number;
// 	totalPages: number;
// 	itemPerPage: number;
// 	error: boolean | string;
// 	history: Membership[];
// 	setEdit: (edit: boolean) => void;
// 	setError: (error: boolean | string) => void;
// 	setOpenReceipt: (open: boolean) => void;
// 	setReceipt: (receipt: Membership) => void;
// 	openHistoryModal: boolean;
// 	password: string;
// 	cancelAccountDelete: () => void;
// 	// setOpenHistoryModal: boolean;
// 	setOpenDeleteModal: (open: boolean) => void;
// 	openDeleteModal: boolean;
// 	handleCloseHistoryModal:
// 		| ((
// 				event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
// 				data: Semantic.ButtonProps
// 		  ) => void)
// 		| undefined;
// 	handlePagination:
// 		| ((
// 				event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
// 				data: Semantic.PaginationProps
// 		  ) => void)
// 		| undefined;
// 	handleOpenHistoryModel:
// 		| ((
// 				event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
// 				data: Semantic.ButtonProps
// 		  ) => void)
// 		| undefined;
// }) => (
// 	<Form
// 		onSubmit={onSubmit}
// 		initialValues={initialValues}
// 		subscription={{
// 			values: true,
// 			initialValues: true,
// 			submitting: true,
// 			valid: true,
// 		}}
// 		render={({
// 			handleSubmit,
// 			submitting,
// 			values,
// 			initialValues,
// 			form: { reset, change },
// 		}) => (
// 			<Semantic.Form onSubmit={handleSubmit}>
// 				<Group>
// 					<Field
// 						name='note'
// 						render={({ input }) => (
// 							<Input
// 								readOnly={!edit}
// 								error={edit}
// 								label='Note'
// 								id='note'
// 								className='AddNote'
// 								size='huge'
// 								placeholder='Add Note'
// 								{...input}
// 								spellCheck='false'
// 								inverted
// 								width={16}
// 							/>
// 						)}
// 					/>
// 				</Group>
// 				<Group>
// 					<Field
// 						name='account'
// 						parse={Normalize.account}
// 						render={({ input }) => (
// 							<Input
// 								id='account'
// 								error={error ? error : edit}
// 								readOnly={!edit}
// 								className='Name'
// 								label='Account'
// 								placeholder='xxxxxxx'
// 								{...input}
// 								size='huge'
// 								inverted
// 								width={2}
// 							/>
// 						)}
// 					/>
// 					<Field
// 						name='since'
// 						render={({ input }) => (
// 							<Input
// 								disabled={edit}
// 								className='Name'
// 								id='memberSince'
// 								label='Member Since'
// 								size='huge'
// 								inverted
// 								readOnly
// 								width={2}
// 								{...input}
// 							/>
// 						)}
// 					/>
// 					<Field
// 						name='phone'
// 						parse={Normalize.phone}
// 						render={({ input }) => (
// 							<Input
// 								readOnly={!edit}
// 								error={edit}
// 								id='phone'
// 								label='Phone Number'
// 								className='Phone'
// 								placeholder='xxx-xxx-xxxx'
// 								{...input}
// 								size='huge'
// 								inverted
// 								width={2}
// 							/>
// 						)}
// 					/>
// 					<Field
// 						name='first'
// 						parse={Normalize.name}
// 						render={({ input }) => (
// 							<Input
// 								readOnly={!edit}
// 								error={edit}
// 								id='firstName'
// 								label='First Name'
// 								className='Name'
// 								spellCheck='false'
// 								placeholder='First Name'
// 								size='huge'
// 								inverted
// 								{...input}
// 								width={2}
// 							/>
// 						)}
// 					/>
// 					<Field
// 						name='last'
// 						parse={Normalize.name}
// 						render={({ input }) => (
// 							<Input
// 								id='lastName'
// 								{...input}
// 								error={edit}
// 								label='Last Name'
// 								className='Name'
// 								placeholder='Last Name'
// 								spellCheck='false'
// 								size='huge'
// 								inverted
// 								readOnly={!edit}
// 								width={2}
// 							/>
// 						)}
// 					/>
// 					<Button
// 						content={edit ? 'Save' : 'Edit'}
// 						type='button'
// 						disabled={
// 							submitting ||
// 							!values.first ||
// 							!values.last ||
// 							!values.phone ||
// 							!values.account ||
// 							values.phone.length < 14
// 						}
// 						color={edit ? 'google plus' : 'vk'}
// 						size='huge'
// 						circular
// 						style={{ marginTop: '30px' }}
// 						onClick={async (event, data) => {
// 							event.preventDefault();
// 							// setEdit((prevEdit) => !prevEdit);
// 							setEdit(!edit);
// 							if (edit && initialValues) {
// 								const { duplicate, updatedRecord } = await API.editMembership(
// 									initialValues,
// 									values
// 								);
// 								if (duplicate) {
// 									setError(`${values.account} already existed`);
// 									setEdit(true);
// 								} else {
// 									setError(false);

// 									// Update Record
// 									if (updatedRecord) {
// 										setOpenReceipt(false);
// 										setReceipt(updatedRecord);
// 										setOpenReceipt(true);
// 									}
// 								}
// 							}
// 						}}
// 					/>
// 					<Button
// 						content='Cancel'
// 						type='button'
// 						secondary
// 						fluid
// 						disabled={!edit}
// 						style={{ marginTop: '30px' }}
// 						size='huge'
// 						circular
// 						onClick={() => {
// 							setEdit(!edit);

// 							if (edit) {
// 								// Save Edit Here
// 								setError(false);
// 								if (initialValues) {
// 									reset(initialValues);
// 									change('remain', values.remain);
// 									change('buy', values.buy);
// 									change('fee', values.fee);
// 									change('gallon', values.gallon);
// 								}
// 							}
// 						}}
// 					/>
// 					<Field
// 						name='date'
// 						render={({ input }) => (
// 							<Input
// 								disabled={edit}
// 								fluid
// 								id='date'
// 								label='Date'
// 								className='Name'
// 								placeholder='mm/dd/yyyy'
// 								size='huge'
// 								inverted
// 								readOnly
// 								{...input}
// 								width={2}
// 							/>
// 						)}
// 					/>
// 					<Field
// 						name='time'
// 						render={({ input }) => (
// 							<Input
// 								disabled={edit}
// 								id='time'
// 								label='Time'
// 								className='Name'
// 								placeholder='xx:xx:xx'
// 								{...input}
// 								size='huge'
// 								inverted
// 								readOnly
// 								width={2}
// 							/>
// 						)}
// 					/>
// 				</Group>
// 				{/* Water Purchase by Gallon */}
// 				<Group>
// 					<Input type='hidden' width={14} />
// 					<Field
// 						id='buy'
// 						name='buy'
// 						parse={Normalize.gallon}
// 						render={({ input }) => (
// 							<Input
// 								{...input}
// 								disabled={edit}
// 								className='Amount'
// 								id='buy'
// 								label='Buy'
// 								inverted
// 								size='huge'
// 								width={2}
// 								onFocus={() => {
// 									change('fee', 0);
// 									change('gallon', 0);
// 								}}
// 							/>
// 						)}
// 					/>
// 					<Field
// 						name='remain'
// 						render={({ input }) => (
// 							<Input
// 								error={input.value <= 0 ? true : false}
// 								disabled={edit}
// 								className='Amount'
// 								inverted
// 								id='remain'
// 								label='Remain'
// 								readOnly
// 								{...input}
// 								size='huge'
// 								width={2}
// 							/>
// 						)}
// 					/>
// 					<Button
// 						type='submit'
// 						positive
// 						fluid
// 						disabled={!values.buy || edit}
// 						style={{ marginTop: '30px' }}
// 						circular
// 						size='huge'
// 						content='Buy'
// 						width={3}
// 					/>
// 				</Group>
// 				{/* Water Renew Fee and Gallon Amount */}
// 				<Group>
// 					<Input type='hidden' width={14} />
// 					<Field
// 						name='fee'
// 						parse={Normalize.fee}
// 						render={({ input }) => (
// 							<Input
// 								id='fee'
// 								className='Amount'
// 								label='Fee'
// 								size='huge'
// 								inverted
// 								width={2}
// 								disabled={edit}
// 								{...input}
// 								onFocus={() => {
// 									change('buy', 0);
// 								}}
// 							/>
// 						)}
// 					/>
// 					<Field
// 						name='gallon'
// 						parse={Normalize.gallon}
// 						render={({ input }) => (
// 							<Input
// 								id='gallon'
// 								label='Gallon'
// 								className='Amount'
// 								size='huge'
// 								inverted
// 								width={2}
// 								disabled={edit}
// 								{...input}
// 								onFocus={() => {
// 									change('buy', 0);
// 								}}
// 							/>
// 						)}
// 					/>
// 					<Button
// 						content='Renew'
// 						size='huge'
// 						type='submit'
// 						primary
// 						fluid
// 						circular
// 						disabled={!values.gallon || !values.fee || edit}
// 						style={{ marginTop: '30px' }}
// 						width={3}
// 					/>
// 				</Group>
// 				<Divider hidden />
// 				<Divider hidden />
// 				<Divider />
// 				<Divider hidden />
// 				<Group>
// 					<Input type='hidden' width={14} />
// 					<Button
// 						content='History'
// 						color='teal'
// 						size='huge'
// 						circular
// 						fluid
// 						onClick={handleOpenHistoryModel}
// 					/>
// 					<Modal
// 						dimmer='blurring'
// 						open={openHistoryModal}
// 						closeOnDimmerClick={false}
// 						closeOnEscape={false}
// 						closeOnPortalMouseLeave={false}
// 						closeOnDocumentClick={false}
// 						closeOnTriggerClick={false}
// 					>
// 						<Modal.Header>
// 							<Header as='h1' block color='blue'>
// 								<Icon name='user circle' color='blue' />
// 								<Header.Content>
// 									{receipt?.first + ' ' + receipt?.last + ' ' + receipt?.phone}
// 									<Header.Subheader
// 										style={{ fontSize: '24px', fontWeight: 'bold' }}
// 									>
// 										Account #: {receipt?.account}
// 									</Header.Subheader>
// 								</Header.Content>
// 							</Header>
// 						</Modal.Header>
// 						<Modal.Content>
// 							<Table celled color='blue' compact>
// 								<Table.Header fullWidth>
// 									<Table.Row>
// 										<Table.HeaderCell />
// 										<Table.HeaderCell colSpan={historyHeaderCells.length}>
// 											<Pagination
// 												defaultActivePage={activePage}
// 												ellipsisItem={null}
// 												firstItem={null}
// 												lastItem={null}
// 												totalPages={totalPages ? totalPages : 1}
// 												onPageChange={handlePagination}
// 											/>
// 										</Table.HeaderCell>
// 									</Table.Row>
// 								</Table.Header>
// 								<Table.Header fullWidth>
// 									<Table.Row textAlign='center'>
// 										{historyHeaderCells.map((data, index) => (
// 											<Table.HeaderCell content={data} key={index} />
// 										))}
// 									</Table.Row>
// 								</Table.Header>

// 								<Table.Body>
// 									{history
// 										.map((item, index) => (
// 											<Table.Row
// 												textAlign='center'
// 												key={index}
// 												warning={item.type === 'NEW'}
// 												style={{ fontSize: '20px' }}
// 											>
// 												<Table.Cell>{item.type}</Table.Cell>
// 												<Table.Cell>{'$' + item.fee}</Table.Cell>
// 												<Table.Cell>{item.gallon}</Table.Cell>
// 												<Table.Cell>{item.previous}</Table.Cell>
// 												<Table.Cell>{item.buy}</Table.Cell>
// 												<Table.Cell>{item.remain}</Table.Cell>
// 												<Table.Cell>{item.date}</Table.Cell>
// 												<Table.Cell>{item.time}</Table.Cell>
// 											</Table.Row>
// 										))
// 										.slice(
// 											(activePage - 1) * itemPerPage,
// 											activePage * itemPerPage
// 										)}
// 								</Table.Body>
// 							</Table>
// 						</Modal.Content>
// 						<Modal.Actions>
// 							<Button
// 								negative
// 								circular
// 								size='huge'
// 								content='Close'
// 								onClick={handleCloseHistoryModal}
// 							/>
// 						</Modal.Actions>
// 					</Modal>
// 					<Button
// 						content='Delete'
// 						size='huge'
// 						negative
// 						circular
// 						onClick={() => {
// 							setOpenDeleteModal(true);
// 							setOpenReceipt(true);
// 						}}
// 					/>
// 					{receipt && (
// 						<Modal open={openDeleteModal} basic>
// 							<Modal.Header>{receipt!.account}</Modal.Header>
// 							<Modal.Content>
// 								<Table color='red' celled size='large'>
// 									<Table.Header>
// 										<Table.Row textAlign='center'>
// 											<Table.HeaderCell>Account</Table.HeaderCell>
// 											<Table.HeaderCell>MemberSince</Table.HeaderCell>
// 											<Table.HeaderCell>Phone</Table.HeaderCell>
// 											<Table.HeaderCell>Name</Table.HeaderCell>
// 										</Table.Row>
// 									</Table.Header>
// 									<Table.Body>
// 										<Table.Row textAlign='center'>
// 											<Table.Cell content={receipt!.account} />
// 											<Table.Cell content={receipt!.since} />
// 											<Table.Cell content={receipt!.phone} />
// 											<Table.Cell
// 												content={receipt!.first + ' ' + receipt!.last}
// 											/>
// 										</Table.Row>
// 									</Table.Body>
// 								</Table>
// 							</Modal.Content>
// 							<Modal.Actions>
// 								{deleteError && (
// 									<Message negative>
// 										<Message.Header>
// 											Please enter a valid password to delete account
// 										</Message.Header>
// 									</Message>
// 								)}

// 								<Button
// 									content='Cancel'
// 									floated='right'
// 									secondary
// 									onClick={cancelAccountDelete}
// 								/>
// 								<Button
// 									floated='right'
// 									primary
// 									onClick={() => deleteAccount(receipt!, password)}
// 								>
// 									Delete
// 								</Button>
// 								<Input
// 									id={receipt!.account}
// 									name='password'
// 									type='password'
// 									error={error ? true : false}
// 									placeholder='password'
// 									onChange={(event, data) => {
// 										event.preventDefault();
// 										if (error) {
// 											setError(false);
// 										}
// 										setPassword(data.value);
// 									}}
// 								/>
// 							</Modal.Actions>
// 						</Modal>
// 					)}
// 					<Button
// 						content='Done'
// 						color='black'
// 						size='huge'
// 						circular
// 						fluid
// 						type='button'
// 						onClick={() => {
// 							setEdit(false);
// 							setError(false);
// 							push('/dashboard');
// 						}}
// 					/>
// 				</Group>
// 			</Semantic.Form>
// 		)}
// 	/>
// );
// export const BuyRenewForm = () => {
// 	// Pagination Configuration
// 	const itemPerPage = 8;

// 	// React Router
// 	const { push } = ReactRouter.useHistory();
// 	const { state } = ReactRouter.useLocation<{ membership: Membership }>();

// 	// React Final Form
// 	const { Form, Field } = ReactFinalForm;
// 	const [name, setName] = React.useState('');
// 	const [edit, setEdit] = React.useState(false);
// 	const [error, setError] = React.useState<boolean | string>(false);
// 	const [receipt, setReceipt] = React.useState<Membership | null>(null);
// 	const [openReceipt, setOpenReceipt] = React.useState(true);
// 	const [history, setHistory] = React.useState<Membership[]>([]);
// 	const [openHistoryModal, setOpenHistoryModal] = React.useState(false);
// 	const [activePage, setActivePage] = React.useState(1);
// 	const [totalPages, setTotalPages] = React.useState(0);
// 	const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
// 	const [password, setPassword] = React.useState('');
// 	const [deleteError, setDeleteError] = React.useState<boolean | string>(false);

// 	const initialValues = receipt
// 		? {
// 				note: receipt.note,
// 				account: receipt.account,
// 				since: receipt.since,
// 				phone: receipt.phone,
// 				first: receipt.first,
// 				last: receipt.last,
// 				previous: receipt.remain,
// 				type: receipt.type,
// 				buy: 0,
// 				remain: receipt.remain,
// 				fee: 0,
// 				gallon: 0,
// 				date: getDate(),
// 				time: getTime(),
// 		  }
// 		: null;

// 	const handlePagination = (
// 		event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
// 		data: Semantic.PaginationProps
// 	) => {
// 		event.preventDefault();
// 		const { activePage } = data;
// 		if (activePage && typeof activePage === 'number') {
// 			setActivePage(activePage);
// 		}
// 	};

// 	const handleOpenHistoryModel = async () => {
// 		if (state && state.membership.account) {
// 			const response = await API.getHistory(state.membership.account);
// 			setHistory(response);
// 			setTotalPages(Math.ceil(history.length / itemPerPage));
// 			setOpenHistoryModal(true);
// 		}
// 		setOpenReceipt(true);
// 	};

// 	const handleCloseHistoryModal = () => {
// 		setActivePage(1);
// 		setOpenHistoryModal(false);
// 	};

// 	React.useEffect(() => {
// 		const getAppVersion = async () => {
// 			setName('Senter Water POS');
// 		};

// 		const getHistory = async (account: string) => {
// 			const response = await API.getHistory(account);
// 			setHistory(response);
// 		};

// 		if (!state) {
// 			push('/dashboard');
// 		} else {
// 			setReceipt(state.membership);
// 			getHistory(state.membership.account!);
// 			getAppVersion();
// 		}
// 	}, [push, state]);

// 	const deleteAccount = async (
// 		member: Membership,
// 		password: string
// 	): Promise<void> => {
// 		const { status } = await API.deleteMembership(member.account!, password);
// 		console.log(status);
// 		if (status) {
// 			push('/dashboard');
// 		} else {
// 			setDeleteError('invalid password');
// 		}
// 	};

// 	const cancelAccountDelete = () => {
// 		setDeleteError(false);
// 		setOpenDeleteModal(false);
// 	};

// 	const onSubmit = async (values: Membership) => {
// 		const { fee, buy, previous, gallon } = values;
// 		setOpenReceipt(false);

// 		// Membership Water Purchase by Gallon, update remain
// 		if (buy) {
// 			const updatedReceipt = await API.buyMembership({
// 				...values,
// 				remain: previous! - buy,
// 				type: 'BUY',
// 			});

// 			setReceipt(updatedReceipt);
// 			setOpenReceipt(true);
// 		}

// 		// Membership Water Renew Fee
// 		if (fee) {
// 			const updatedReceipt = await API.renewMembership({
// 				...values,
// 				remain: gallon! + previous!,
// 				type: 'RENEW',
// 			});
// 			setReceipt(updatedReceipt);
// 			setOpenReceipt(true);
// 		}
// 	};

// 	const {
// 		Header,
// 		TransitionablePortal,
// 		Segment,
// 		Grid,
// 		Icon,
// 		Form: { Input, Button, Group },
// 		Divider,
// 		Modal,
// 		Table,
// 		Pagination,
// 		Message,
// 	} = Semantic;

// 	return (
// 		<TransitionablePortal
// 			open={true}
// 			transition={{ animation: 'fade', duration: 500 }}
// 		>
// 			<Segment className='Buy'>
// 				<Grid>
// 					<Grid.Column className='Buy'>
// 						<Form
// 							onSubmit={onSubmit}
// 							initialValues={initialValues}
// 							subscription={{
// 								values: true,
// 								initialValues: true,
// 								submitting: true,
// 								valid: true,
// 							}}
// 							render={({
// 								handleSubmit,
// 								submitting,
// 								values,
// 								initialValues,
// 								form: { reset, change },
// 							}) => (
// 								<Semantic.Form onSubmit={handleSubmit}>
// 									<Group>
// 										<Field
// 											name='note'
// 											render={({ input }) => (
// 												<Input
// 													readOnly={!edit}
// 													error={edit}
// 													label='Note'
// 													id='note'
// 													className='AddNote'
// 													size='huge'
// 													placeholder='Add Note'
// 													{...input}
// 													spellCheck='false'
// 													inverted
// 													width={16}
// 												/>
// 											)}
// 										/>
// 									</Group>
// 									<Group>
// 										<Field
// 											name='account'
// 											parse={Normalize.account}
// 											render={({ input }) => (
// 												<Input
// 													id='account'
// 													error={error ? error : edit}
// 													readOnly={!edit}
// 													className='Name'
// 													label='Account'
// 													placeholder='xxxxxxx'
// 													{...input}
// 													size='huge'
// 													inverted
// 													width={2}
// 												/>
// 											)}
// 										/>
// 										<Field
// 											name='since'
// 											render={({ input }) => (
// 												<Input
// 													disabled={edit}
// 													className='Name'
// 													id='memberSince'
// 													label='Member Since'
// 													size='huge'
// 													inverted
// 													readOnly
// 													width={2}
// 													{...input}
// 												/>
// 											)}
// 										/>
// 										<Field
// 											name='phone'
// 											parse={Normalize.phone}
// 											render={({ input }) => (
// 												<Input
// 													readOnly={!edit}
// 													error={edit}
// 													id='phone'
// 													label='Phone Number'
// 													className='Phone'
// 													placeholder='xxx-xxx-xxxx'
// 													{...input}
// 													size='huge'
// 													inverted
// 													width={2}
// 												/>
// 											)}
// 										/>
// 										<Field
// 											name='first'
// 											parse={Normalize.name}
// 											render={({ input }) => (
// 												<Input
// 													readOnly={!edit}
// 													error={edit}
// 													id='firstName'
// 													label='First Name'
// 													className='Name'
// 													spellCheck='false'
// 													placeholder='First Name'
// 													size='huge'
// 													inverted
// 													{...input}
// 													width={2}
// 												/>
// 											)}
// 										/>
// 										<Field
// 											name='last'
// 											parse={Normalize.name}
// 											render={({ input }) => (
// 												<Input
// 													id='lastName'
// 													{...input}
// 													error={edit}
// 													label='Last Name'
// 													className='Name'
// 													placeholder='Last Name'
// 													spellCheck='false'
// 													size='huge'
// 													inverted
// 													readOnly={!edit}
// 													width={2}
// 												/>
// 											)}
// 										/>
// 										<Button
// 											content={edit ? 'Save' : 'Edit'}
// 											type='button'
// 											disabled={
// 												submitting ||
// 												!values.first ||
// 												!values.last ||
// 												!values.phone ||
// 												!values.account ||
// 												values.phone.length < 14
// 											}
// 											color={edit ? 'google plus' : 'vk'}
// 											size='huge'
// 											circular
// 											style={{ marginTop: '30px' }}
// 											onClick={async (event, data) => {
// 												event.preventDefault();
// 												setEdit((prevEdit) => !prevEdit);
// 												if (edit && initialValues) {
// 													const { duplicate, updatedRecord } =
// 														await API.editMembership(initialValues, values);
// 													if (duplicate) {
// 														setError(`${values.account} already existed`);
// 														setEdit(true);
// 													} else {
// 														setError(false);

// 														// Update Record
// 														if (updatedRecord) {
// 															setOpenReceipt(false);
// 															setReceipt(updatedRecord);
// 															setOpenReceipt(true);
// 														}
// 													}
// 												}
// 											}}
// 										/>
// 										<Button
// 											content='Cancel'
// 											type='button'
// 											secondary
// 											fluid
// 											disabled={!edit}
// 											style={{ marginTop: '30px' }}
// 											size='huge'
// 											circular
// 											onClick={() => {
// 												setEdit(!edit);

// 												if (edit) {
// 													// Save Edit Here
// 													setError(false);
// 													if (initialValues) {
// 														reset(initialValues);
// 														change('remain', values.remain);
// 														change('buy', values.buy);
// 														change('fee', values.fee);
// 														change('gallon', values.gallon);
// 													}
// 												}
// 											}}
// 										/>
// 										<Field
// 											name='date'
// 											render={({ input }) => (
// 												<Input
// 													disabled={edit}
// 													fluid
// 													id='date'
// 													label='Date'
// 													className='Name'
// 													placeholder='mm/dd/yyyy'
// 													size='huge'
// 													inverted
// 													readOnly
// 													{...input}
// 													width={2}
// 												/>
// 											)}
// 										/>
// 										<Field
// 											name='time'
// 											render={({ input }) => (
// 												<Input
// 													disabled={edit}
// 													id='time'
// 													label='Time'
// 													className='Name'
// 													placeholder='xx:xx:xx'
// 													{...input}
// 													size='huge'
// 													inverted
// 													readOnly
// 													width={2}
// 												/>
// 											)}
// 										/>
// 									</Group>
// 									{/* Water Purchase by Gallon */}
// 									<Group>
// 										<Input type='hidden' width={14} />
// 										<Field
// 											id='buy'
// 											name='buy'
// 											parse={Normalize.gallon}
// 											render={({ input }) => (
// 												<Input
// 													{...input}
// 													disabled={edit}
// 													className='Amount'
// 													id='buy'
// 													label='Buy'
// 													inverted
// 													size='huge'
// 													width={2}
// 													onFocus={() => {
// 														change('fee', 0);
// 														change('gallon', 0);
// 													}}
// 												/>
// 											)}
// 										/>
// 										<Field
// 											name='remain'
// 											render={({ input }) => (
// 												<Input
// 													error={input.value <= 0 ? true : false}
// 													disabled={edit}
// 													className='Amount'
// 													inverted
// 													id='remain'
// 													label='Remain'
// 													readOnly
// 													{...input}
// 													size='huge'
// 													width={2}
// 												/>
// 											)}
// 										/>
// 										<Button
// 											type='submit'
// 											positive
// 											fluid
// 											disabled={!values.buy || edit}
// 											style={{ marginTop: '30px' }}
// 											circular
// 											size='huge'
// 											content='Buy'
// 											width={3}
// 										/>
// 									</Group>
// 									{/* Water Renew Fee and Gallon Amount */}
// 									<Group>
// 										<Input type='hidden' width={14} />
// 										<Field
// 											name='fee'
// 											parse={Normalize.fee}
// 											render={({ input }) => (
// 												<Input
// 													id='fee'
// 													className='Amount'
// 													label='Fee'
// 													size='huge'
// 													inverted
// 													width={2}
// 													disabled={edit}
// 													{...input}
// 													onFocus={() => {
// 														change('buy', 0);
// 													}}
// 												/>
// 											)}
// 										/>
// 										<Field
// 											name='gallon'
// 											parse={Normalize.gallon}
// 											render={({ input }) => (
// 												<Input
// 													id='gallon'
// 													label='Gallon'
// 													className='Amount'
// 													size='huge'
// 													inverted
// 													width={2}
// 													disabled={edit}
// 													{...input}
// 													onFocus={() => {
// 														change('buy', 0);
// 													}}
// 												/>
// 											)}
// 										/>
// 										<Button
// 											content='Renew'
// 											size='huge'
// 											type='submit'
// 											primary
// 											fluid
// 											circular
// 											disabled={!values.gallon || !values.fee || edit}
// 											style={{ marginTop: '30px' }}
// 											width={3}
// 										/>
// 									</Group>
// 									<Divider hidden />
// 									<Divider hidden />
// 									<Divider />
// 									<Divider hidden />
// 									<Group>
// 										<Input type='hidden' width={14} />
// 										<Button
// 											content='History'
// 											color='teal'
// 											size='huge'
// 											circular
// 											fluid
// 											onClick={handleOpenHistoryModel}
// 										/>
// 										<Modal
// 											dimmer='blurring'
// 											open={openHistoryModal}
// 											closeOnDimmerClick={false}
// 											closeOnEscape={false}
// 											closeOnPortalMouseLeave={false}
// 											closeOnDocumentClick={false}
// 											closeOnTriggerClick={false}
// 										>
// 											<Modal.Header>
// 												<Header as='h1' block color='blue'>
// 													<Icon name='user circle' color='blue' />
// 													<Header.Content>
// 														{receipt?.first +
// 															' ' +
// 															receipt?.last +
// 															' ' +
// 															receipt?.phone}
// 														<Header.Subheader
// 															style={{ fontSize: '24px', fontWeight: 'bold' }}
// 														>
// 															Account #: {receipt?.account}
// 														</Header.Subheader>
// 													</Header.Content>
// 												</Header>
// 											</Modal.Header>
// 											<Modal.Content>
// 												<Table celled color='blue' compact>
// 													<Table.Header fullWidth>
// 														<Table.Row>
// 															<Table.HeaderCell />
// 															<Table.HeaderCell
// 																colSpan={historyHeaderCells.length}
// 															>
// 																<Pagination
// 																	defaultActivePage={activePage}
// 																	ellipsisItem={null}
// 																	firstItem={null}
// 																	lastItem={null}
// 																	totalPages={totalPages ? totalPages : 1}
// 																	onPageChange={handlePagination}
// 																/>
// 															</Table.HeaderCell>
// 														</Table.Row>
// 													</Table.Header>
// 													<Table.Header fullWidth>
// 														<Table.Row textAlign='center'>
// 															{historyHeaderCells.map((data, index) => (
// 																<Table.HeaderCell content={data} key={index} />
// 															))}
// 														</Table.Row>
// 													</Table.Header>

// 													<Table.Body>
// 														{history
// 															.map((item, index) => (
// 																<Table.Row
// 																	textAlign='center'
// 																	key={index}
// 																	warning={item.type === 'NEW'}
// 																	style={{ fontSize: '20px' }}
// 																>
// 																	<Table.Cell>{item.type}</Table.Cell>
// 																	<Table.Cell>{'$' + item.fee}</Table.Cell>
// 																	<Table.Cell>{item.gallon}</Table.Cell>
// 																	<Table.Cell>{item.previous}</Table.Cell>
// 																	<Table.Cell>{item.buy}</Table.Cell>
// 																	<Table.Cell>{item.remain}</Table.Cell>
// 																	<Table.Cell>{item.date}</Table.Cell>
// 																	<Table.Cell>{item.time}</Table.Cell>
// 																</Table.Row>
// 															))
// 															.slice(
// 																(activePage - 1) * itemPerPage,
// 																activePage * itemPerPage
// 															)}
// 													</Table.Body>
// 												</Table>
// 											</Modal.Content>
// 											<Modal.Actions>
// 												<Button
// 													negative
// 													circular
// 													size='huge'
// 													content='Close'
// 													onClick={handleCloseHistoryModal}
// 												/>
// 											</Modal.Actions>
// 										</Modal>
// 										<Button
// 											content='Delete'
// 											size='huge'
// 											negative
// 											circular
// 											onClick={() => {
// 												setOpenDeleteModal(true);
// 												setOpenReceipt(true);
// 											}}
// 										/>
// 										{receipt && (
// 											<Modal open={openDeleteModal} basic>
// 												<Modal.Header>{receipt!.account}</Modal.Header>
// 												<Modal.Content>
// 													<Table color='red' celled size='large'>
// 														<Table.Header>
// 															<Table.Row textAlign='center'>
// 																<Table.HeaderCell>Account</Table.HeaderCell>
// 																<Table.HeaderCell>MemberSince</Table.HeaderCell>
// 																<Table.HeaderCell>Phone</Table.HeaderCell>
// 																<Table.HeaderCell>Name</Table.HeaderCell>
// 															</Table.Row>
// 														</Table.Header>
// 														<Table.Body>
// 															<Table.Row textAlign='center'>
// 																<Table.Cell content={receipt!.account} />
// 																<Table.Cell content={receipt!.since} />
// 																<Table.Cell content={receipt!.phone} />
// 																<Table.Cell
// 																	content={receipt!.first + ' ' + receipt!.last}
// 																/>
// 															</Table.Row>
// 														</Table.Body>
// 													</Table>
// 												</Modal.Content>
// 												<Modal.Actions>
// 													{deleteError && (
// 														<Message negative>
// 															<Message.Header>
// 																Please enter a valid password to delete account
// 															</Message.Header>
// 														</Message>
// 													)}

// 													<Button
// 														content='Cancel'
// 														floated='right'
// 														secondary
// 														onClick={cancelAccountDelete}
// 													/>
// 													<Button
// 														floated='right'
// 														primary
// 														onClick={() => deleteAccount(receipt!, password)}
// 													>
// 														Delete
// 													</Button>
// 													<Input
// 														id={receipt!.account}
// 														name='password'
// 														type='password'
// 														error={error ? true : false}
// 														placeholder='password'
// 														onChange={(event, data) => {
// 															event.preventDefault();
// 															if (error) {
// 																setError(false);
// 															}
// 															setPassword(data.value);
// 														}}
// 													/>
// 												</Modal.Actions>
// 											</Modal>
// 										)}
// 										<Button
// 											content='Done'
// 											color='black'
// 											size='huge'
// 											circular
// 											fluid
// 											type='button'
// 											onClick={() => {
// 												setEdit(false);
// 												setError(false);
// 												push('/dashboard');
// 											}}
// 										/>
// 									</Group>
// 								</Semantic.Form>
// 							)}
// 						/>
// 					</Grid.Column>
// 				</Grid>
// 			</Segment>
// 		</TransitionablePortal>
// 	);
// };
// export const BuyScreenForm = () => {
// 	// Pagination Configuration
// 	const itemPerPage = 8;

// 	// React Router
// 	const { push } = ReactRouter.useHistory();
// 	const { state } = ReactRouter.useLocation<{ membership: Membership }>();

// 	// React Final Form
// 	const { Form, Field } = ReactFinalForm;
// 	const [name, setName] = React.useState('');
// 	const [edit, setEdit] = React.useState(false);
// 	const [error, setError] = React.useState<boolean | string>(false);
// 	const [receipt, setReceipt] = React.useState<Membership | null>(null);
// 	const [openReceipt, setOpenReceipt] = React.useState(true);
// 	const [history, setHistory] = React.useState<Membership[]>([]);
// 	const [openHistoryModal, setOpenHistoryModal] = React.useState(false);
// 	const [activePage, setActivePage] = React.useState(1);
// 	const [totalPages, setTotalPages] = React.useState(0);
// 	const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
// 	const [password, setPassword] = React.useState('');
// 	const [deleteError, setDeleteError] = React.useState<boolean | string>(false);

// 	const initialValues = receipt
// 		? {
// 				note: receipt.note,
// 				account: receipt.account,
// 				since: receipt.since,
// 				phone: receipt.phone,
// 				first: receipt.first,
// 				last: receipt.last,
// 				previous: receipt.remain,
// 				type: receipt.type,
// 				buy: 0,
// 				remain: receipt.remain,
// 				fee: 0,
// 				gallon: 0,
// 				date: getDate(),
// 				time: getTime(),
// 		  }
// 		: null;

// 	const handlePagination = (
// 		event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
// 		data: Semantic.PaginationProps
// 	) => {
// 		event.preventDefault();
// 		const { activePage } = data;
// 		if (activePage && typeof activePage === 'number') {
// 			setActivePage(activePage);
// 		}
// 	};

// 	const handleOpenHistoryModel = async () => {
// 		if (state && state.membership.account) {
// 			const response = await API.getHistory(state.membership.account);
// 			setHistory(response);
// 			setTotalPages(Math.ceil(history.length / itemPerPage));
// 			setOpenHistoryModal(true);
// 		}
// 		setOpenReceipt(true);
// 	};

// 	const handleCloseHistoryModal = () => {
// 		setActivePage(1);
// 		setOpenHistoryModal(false);
// 	};

// 	React.useEffect(() => {
// 		const getAppVersion = async () => {
// 			setName('Senter Water POS');
// 		};

// 		const getHistory = async (account: string) => {
// 			const response = await API.getHistory(account);
// 			setHistory(response);
// 		};

// 		if (!state) {
// 			push('/dashboard');
// 		} else {
// 			setReceipt(state.membership);
// 			getHistory(state.membership.account!);
// 			getAppVersion();
// 		}
// 	}, [push, state]);

// 	const deleteAccount = async (
// 		member: Membership,
// 		password: string
// 	): Promise<void> => {
// 		const { status } = await API.deleteMembership(member.account!, password);
// 		console.log(status);
// 		if (status) {
// 			push('/dashboard');
// 		} else {
// 			setDeleteError('invalid password');
// 		}
// 	};

// 	const cancelAccountDelete = () => {
// 		setDeleteError(false);
// 		setOpenDeleteModal(false);
// 	};

// 	const onSubmit = async (values: Membership) => {
// 		const { fee, buy, previous, gallon } = values;
// 		setOpenReceipt(false);

// 		// Membership Water Purchase by Gallon, update remain
// 		if (buy) {
// 			const updatedReceipt = await API.buyMembership({
// 				...values,
// 				remain: previous! - buy,
// 				type: 'BUY',
// 			});

// 			setReceipt(updatedReceipt);
// 			setOpenReceipt(true);
// 		}

// 		// Membership Water Renew Fee
// 		if (fee) {
// 			const updatedReceipt = await API.renewMembership({
// 				...values,
// 				remain: gallon! + previous!,
// 				type: 'RENEW',
// 			});
// 			setReceipt(updatedReceipt);
// 			setOpenReceipt(true);
// 		}
// 	};

// 	const {
// 		Header,
// 		Icon,
// 		Form: { Input, Button, Group },
// 		Divider,
// 		Modal,
// 		Table,
// 		Pagination,
// 		Message,
// 	} = Semantic;

// 	return (
// 		<Form
// 			onSubmit={onSubmit}
// 			initialValues={initialValues}
// 			subscription={{
// 				values: true,
// 				initialValues: true,
// 				submitting: true,
// 				valid: true,
// 			}}
// 			render={({
// 				handleSubmit,
// 				submitting,
// 				values,
// 				initialValues,
// 				form: { reset, change },
// 			}) => (
// 				<Semantic.Form onSubmit={handleSubmit}>
// 					<Group>
// 						<Field
// 							name='note'
// 							render={({ input }) => (
// 								<Input
// 									readOnly={!edit}
// 									error={edit}
// 									label='Note'
// 									id='note'
// 									className='AddNote'
// 									size='huge'
// 									placeholder='Add Note'
// 									{...input}
// 									spellCheck='false'
// 									inverted
// 									width={16}
// 								/>
// 							)}
// 						/>
// 					</Group>
// 					<Group>
// 						<Field
// 							name='account'
// 							parse={Normalize.account}
// 							render={({ input }) => (
// 								<Input
// 									id='account'
// 									error={error ? error : edit}
// 									readOnly={!edit}
// 									className='Name'
// 									label='Account'
// 									placeholder='xxxxxxx'
// 									{...input}
// 									size='huge'
// 									inverted
// 									width={2}
// 								/>
// 							)}
// 						/>
// 						<Field
// 							name='since'
// 							render={({ input }) => (
// 								<Input
// 									disabled={edit}
// 									className='Name'
// 									id='memberSince'
// 									label='Member Since'
// 									size='huge'
// 									inverted
// 									readOnly
// 									width={2}
// 									{...input}
// 								/>
// 							)}
// 						/>
// 						<Field
// 							name='phone'
// 							parse={Normalize.phone}
// 							render={({ input }) => (
// 								<Input
// 									readOnly={!edit}
// 									error={edit}
// 									id='phone'
// 									label='Phone Number'
// 									className='Phone'
// 									placeholder='xxx-xxx-xxxx'
// 									{...input}
// 									size='huge'
// 									inverted
// 									width={2}
// 								/>
// 							)}
// 						/>
// 						<Field
// 							name='first'
// 							parse={Normalize.name}
// 							render={({ input }) => (
// 								<Input
// 									readOnly={!edit}
// 									error={edit}
// 									id='firstName'
// 									label='First Name'
// 									className='Name'
// 									spellCheck='false'
// 									placeholder='First Name'
// 									size='huge'
// 									inverted
// 									{...input}
// 									width={2}
// 								/>
// 							)}
// 						/>
// 						<Field
// 							name='last'
// 							parse={Normalize.name}
// 							render={({ input }) => (
// 								<Input
// 									id='lastName'
// 									{...input}
// 									error={edit}
// 									label='Last Name'
// 									className='Name'
// 									placeholder='Last Name'
// 									spellCheck='false'
// 									size='huge'
// 									inverted
// 									readOnly={!edit}
// 									width={2}
// 								/>
// 							)}
// 						/>
// 						<Button
// 							content={edit ? 'Save' : 'Edit'}
// 							type='button'
// 							disabled={
// 								submitting ||
// 								!values.first ||
// 								!values.last ||
// 								!values.phone ||
// 								!values.account ||
// 								values.phone.length < 14
// 							}
// 							color={edit ? 'google plus' : 'vk'}
// 							size='huge'
// 							circular
// 							style={{ marginTop: '30px' }}
// 							onClick={async (event, data) => {
// 								event.preventDefault();
// 								setEdit((prevEdit) => !prevEdit);
// 								if (edit && initialValues) {
// 									const { duplicate, updatedRecord } = await API.editMembership(
// 										initialValues,
// 										values
// 									);
// 									if (duplicate) {
// 										setError(`${values.account} already existed`);
// 										setEdit(true);
// 									} else {
// 										setError(false);

// 										// Update Record
// 										if (updatedRecord) {
// 											setOpenReceipt(false);
// 											setReceipt(updatedRecord);
// 											setOpenReceipt(true);
// 										}
// 									}
// 								}
// 							}}
// 						/>
// 						<Button
// 							content='Cancel'
// 							type='button'
// 							secondary
// 							fluid
// 							disabled={!edit}
// 							style={{ marginTop: '30px' }}
// 							size='huge'
// 							circular
// 							onClick={() => {
// 								setEdit(!edit);

// 								if (edit) {
// 									// Save Edit Here
// 									setError(false);
// 									if (initialValues) {
// 										reset(initialValues);
// 										change('remain', values.remain);
// 										change('buy', values.buy);
// 										change('fee', values.fee);
// 										change('gallon', values.gallon);
// 									}
// 								}
// 							}}
// 						/>
// 						<Field
// 							name='date'
// 							render={({ input }) => (
// 								<Input
// 									disabled={edit}
// 									fluid
// 									id='date'
// 									label='Date'
// 									className='Name'
// 									placeholder='mm/dd/yyyy'
// 									size='huge'
// 									inverted
// 									readOnly
// 									{...input}
// 									width={2}
// 								/>
// 							)}
// 						/>
// 						<Field
// 							name='time'
// 							render={({ input }) => (
// 								<Input
// 									disabled={edit}
// 									id='time'
// 									label='Time'
// 									className='Name'
// 									placeholder='xx:xx:xx'
// 									{...input}
// 									size='huge'
// 									inverted
// 									readOnly
// 									width={2}
// 								/>
// 							)}
// 						/>
// 					</Group>
// 					{/* Water Purchase by Gallon */}
// 					<Group>
// 						<Input type='hidden' width={14} />
// 						<Field
// 							id='buy'
// 							name='buy'
// 							parse={Normalize.gallon}
// 							render={({ input }) => (
// 								<Input
// 									{...input}
// 									disabled={edit}
// 									className='Amount'
// 									id='buy'
// 									label='Buy'
// 									inverted
// 									size='huge'
// 									width={2}
// 									onFocus={() => {
// 										change('fee', 0);
// 										change('gallon', 0);
// 									}}
// 								/>
// 							)}
// 						/>
// 						<Field
// 							name='remain'
// 							render={({ input }) => (
// 								<Input
// 									error={input.value <= 0 ? true : false}
// 									disabled={edit}
// 									className='Amount'
// 									inverted
// 									id='remain'
// 									label='Remain'
// 									readOnly
// 									{...input}
// 									size='huge'
// 									width={2}
// 								/>
// 							)}
// 						/>
// 						<Button
// 							type='submit'
// 							positive
// 							fluid
// 							disabled={!values.buy || edit}
// 							style={{ marginTop: '30px' }}
// 							circular
// 							size='huge'
// 							content='Buy'
// 							width={3}
// 						/>
// 					</Group>
// 					{/* Water Renew Fee and Gallon Amount */}
// 					<Group>
// 						<Input type='hidden' width={14} />
// 						<Field
// 							name='fee'
// 							parse={Normalize.fee}
// 							render={({ input }) => (
// 								<Input
// 									id='fee'
// 									className='Amount'
// 									label='Fee'
// 									size='huge'
// 									inverted
// 									width={2}
// 									disabled={edit}
// 									{...input}
// 									onFocus={() => {
// 										change('buy', 0);
// 									}}
// 								/>
// 							)}
// 						/>
// 						<Field
// 							name='gallon'
// 							parse={Normalize.gallon}
// 							render={({ input }) => (
// 								<Input
// 									id='gallon'
// 									label='Gallon'
// 									className='Amount'
// 									size='huge'
// 									inverted
// 									width={2}
// 									disabled={edit}
// 									{...input}
// 									onFocus={() => {
// 										change('buy', 0);
// 									}}
// 								/>
// 							)}
// 						/>
// 						<Button
// 							content='Renew'
// 							size='huge'
// 							type='submit'
// 							primary
// 							fluid
// 							circular
// 							disabled={!values.gallon || !values.fee || edit}
// 							style={{ marginTop: '30px' }}
// 							width={3}
// 						/>
// 					</Group>
// 					<Divider hidden />
// 					<Divider hidden />
// 					<Divider />
// 					<Divider hidden />
// 					<Group>
// 						<Input type='hidden' width={14} />
// 						<Button
// 							content='History'
// 							color='teal'
// 							size='huge'
// 							circular
// 							fluid
// 							onClick={handleOpenHistoryModel}
// 						/>
// 						<Modal
// 							dimmer='blurring'
// 							open={openHistoryModal}
// 							closeOnDimmerClick={false}
// 							closeOnEscape={false}
// 							closeOnPortalMouseLeave={false}
// 							closeOnDocumentClick={false}
// 							closeOnTriggerClick={false}
// 						>
// 							<Modal.Header>
// 								<Header as='h1' block color='blue'>
// 									<Icon name='user circle' color='blue' />
// 									<Header.Content>
// 										{receipt?.first +
// 											' ' +
// 											receipt?.last +
// 											' ' +
// 											receipt?.phone}
// 										<Header.Subheader
// 											style={{ fontSize: '24px', fontWeight: 'bold' }}
// 										>
// 											Account #: {receipt?.account}
// 										</Header.Subheader>
// 									</Header.Content>
// 								</Header>
// 							</Modal.Header>
// 							<Modal.Content>
// 								<Table celled color='blue' compact>
// 									<Table.Header fullWidth>
// 										<Table.Row>
// 											<Table.HeaderCell />
// 											<Table.HeaderCell colSpan={historyHeaderCells.length}>
// 												<Pagination
// 													defaultActivePage={activePage}
// 													ellipsisItem={null}
// 													firstItem={null}
// 													lastItem={null}
// 													totalPages={totalPages ? totalPages : 1}
// 													onPageChange={handlePagination}
// 												/>
// 											</Table.HeaderCell>
// 										</Table.Row>
// 									</Table.Header>
// 									<Table.Header fullWidth>
// 										<Table.Row textAlign='center'>
// 											{historyHeaderCells.map((data, index) => (
// 												<Table.HeaderCell content={data} key={index} />
// 											))}
// 										</Table.Row>
// 									</Table.Header>

// 									<Table.Body>
// 										{history
// 											.map((item, index) => (
// 												<Table.Row
// 													textAlign='center'
// 													key={index}
// 													warning={item.type === 'NEW'}
// 													style={{ fontSize: '20px' }}
// 												>
// 													<Table.Cell>{item.type}</Table.Cell>
// 													<Table.Cell>{'$' + item.fee}</Table.Cell>
// 													<Table.Cell>{item.gallon}</Table.Cell>
// 													<Table.Cell>{item.previous}</Table.Cell>
// 													<Table.Cell>{item.buy}</Table.Cell>
// 													<Table.Cell>{item.remain}</Table.Cell>
// 													<Table.Cell>{item.date}</Table.Cell>
// 													<Table.Cell>{item.time}</Table.Cell>
// 												</Table.Row>
// 											))
// 											.slice(
// 												(activePage - 1) * itemPerPage,
// 												activePage * itemPerPage
// 											)}
// 									</Table.Body>
// 								</Table>
// 							</Modal.Content>
// 							<Modal.Actions>
// 								<Button
// 									negative
// 									circular
// 									size='huge'
// 									content='Close'
// 									onClick={handleCloseHistoryModal}
// 								/>
// 							</Modal.Actions>
// 						</Modal>
// 						<Button
// 							content='Delete'
// 							size='huge'
// 							negative
// 							circular
// 							onClick={() => {
// 								setOpenDeleteModal(true);
// 								setOpenReceipt(true);
// 							}}
// 						/>
// 						{receipt && (
// 							<Modal open={openDeleteModal} basic>
// 								<Modal.Header>{receipt!.account}</Modal.Header>
// 								<Modal.Content>
// 									<Table color='red' celled size='large'>
// 										<Table.Header>
// 											<Table.Row textAlign='center'>
// 												<Table.HeaderCell>Account</Table.HeaderCell>
// 												<Table.HeaderCell>MemberSince</Table.HeaderCell>
// 												<Table.HeaderCell>Phone</Table.HeaderCell>
// 												<Table.HeaderCell>Name</Table.HeaderCell>
// 											</Table.Row>
// 										</Table.Header>
// 										<Table.Body>
// 											<Table.Row textAlign='center'>
// 												<Table.Cell content={receipt!.account} />
// 												<Table.Cell content={receipt!.since} />
// 												<Table.Cell content={receipt!.phone} />
// 												<Table.Cell
// 													content={receipt!.first + ' ' + receipt!.last}
// 												/>
// 											</Table.Row>
// 										</Table.Body>
// 									</Table>
// 								</Modal.Content>
// 								<Modal.Actions>
// 									{deleteError && (
// 										<Message negative>
// 											<Message.Header>
// 												Please enter a valid password to delete account
// 											</Message.Header>
// 										</Message>
// 									)}

// 									<Button
// 										content='Cancel'
// 										floated='right'
// 										secondary
// 										onClick={cancelAccountDelete}
// 									/>
// 									<Button
// 										floated='right'
// 										primary
// 										onClick={() => deleteAccount(receipt!, password)}
// 									>
// 										Delete
// 									</Button>
// 									<Input
// 										id={receipt!.account}
// 										name='password'
// 										type='password'
// 										error={error ? true : false}
// 										placeholder='password'
// 										onChange={(event, data) => {
// 											event.preventDefault();
// 											if (error) {
// 												setError(false);
// 											}
// 											setPassword(data.value);
// 										}}
// 									/>
// 								</Modal.Actions>
// 							</Modal>
// 						)}
// 						<Button
// 							content='Done'
// 							color='black'
// 							size='huge'
// 							circular
// 							fluid
// 							type='button'
// 							onClick={() => {
// 								setEdit(false);
// 								setError(false);
// 								push('/dashboard');
// 							}}
// 						/>
// 					</Group>
// 				</Semantic.Form>
// 			)}
// 		/>
// 	);
// };
// export const NoteField = ({ edit }: { edit: boolean }) => (
// 	// <Group>
// 	<Field
// 		name='note'
// 		render={({ input }) => (
// 			<Input
// 				readOnly={!edit}
// 				error={edit}
// 				label='Note'
// 				id='note'
// 				className='AddNote'
// 				size='huge'
// 				placeholder='Add Note'
// 				{...input}
// 				spellCheck='false'
// 				inverted
// 				width={16}
// 			/>
// 		)}
// 	/>
// 	// </Group>
// );
// export const MemberInfoField = ({
// 	edit,
// 	error,
// }: {
// 	edit: boolean;
// 	error: boolean | string;
// }) => (
// 	<>
// 		<Field
// 			name='account'
// 			parse={Normalize.account}
// 			render={({ input }) => (
// 				<Input
// 					id='account'
// 					label='Account'
// 					placeholder='xxxxxxx'
// 					error={error ? error : edit}
// 					readOnly={!edit}
// 					className='Name'
// 					{...input}
// 					size='huge'
// 					inverted
// 					width={2}
// 				/>
// 			)}
// 		/>
// 		<Field
// 			name='since'
// 			render={({ input }) => (
// 				<Input
// 					disabled={edit}
// 					className='Name'
// 					id='memberSince'
// 					label='Member Since'
// 					size='huge'
// 					inverted
// 					readOnly
// 					width={2}
// 					{...input}
// 				/>
// 			)}
// 		/>
// 		<Field
// 			name='phone'
// 			parse={Normalize.phone}
// 			render={({ input }) => (
// 				<Input
// 					id='phone'
// 					label='Phone Number'
// 					readOnly={!edit}
// 					error={edit}
// 					className='Phone'
// 					placeholder='xxx-xxx-xxxx'
// 					{...input}
// 					size='huge'
// 					inverted
// 					width={2}
// 				/>
// 			)}
// 		/>
// 		<Field
// 			name='first'
// 			parse={Normalize.name}
// 			render={({ input }) => (
// 				<Input
// 					readOnly={!edit}
// 					error={edit}
// 					id='firstName'
// 					label='First Name'
// 					className='Name'
// 					spellCheck='false'
// 					placeholder='First Name'
// 					size='huge'
// 					inverted
// 					{...input}
// 					width={2}
// 				/>
// 			)}
// 		/>
// 		<Field
// 			name='last'
// 			parse={Normalize.name}
// 			render={({ input }) => (
// 				<Input
// 					id='lastName'
// 					{...input}
// 					error={edit}
// 					label='Last Name'
// 					className='Name'
// 					placeholder='Last Name'
// 					spellCheck='false'
// 					size='huge'
// 					inverted
// 					readOnly={!edit}
// 					width={2}
// 				/>
// 			)}
// 		/>
// 	</>
// );
// export const DateTimeField = ({ edit }: { edit: boolean }) => (
// 	<>
// 		<Field
// 			name='date'
// 			render={({ input }) => (
// 				<Input
// 					disabled={edit}
// 					fluid
// 					id='date'
// 					label='Date'
// 					className='Name'
// 					placeholder='mm/dd/yyyy'
// 					size='huge'
// 					inverted
// 					readOnly
// 					{...input}
// 					width={2}
// 				/>
// 			)}
// 		/>
// 		<Field
// 			name='time'
// 			render={({ input }) => (
// 				<Input
// 					disabled={edit}
// 					id='time'
// 					label='Time'
// 					className='Name'
// 					placeholder='xx:xx:xx'
// 					{...input}
// 					size='huge'
// 					inverted
// 					readOnly
// 					width={2}
// 				/>
// 			)}
// 		/>
// 	</>
// );
// interface EditButtonProps {
// 	edit: boolean;
// 	submitting: boolean;
// 	values: Membership;
// 	handleEdit: () => void;
// }
// export const EditButton = ({
// 	edit,
// 	submitting,
// 	values,
// 	handleEdit,
// }: EditButtonProps) => (
// 	<Button
// 		content={!edit ? 'Edit' : 'Save'}
// 		type='button'
// 		disabled={
// 			submitting ||
// 			!values.first ||
// 			!values.last ||
// 			!values.phone ||
// 			!values.account ||
// 			values.phone.length < 14
// 		}
// 		color={edit ? 'google plus' : 'vk'}
// 		size='huge'
// 		circular
// 		style={{ marginTop: '30px' }}
// 		onClick={(event) => {
// 			event.preventDefault();
// 			handleEdit();
// 		}}
// 	/>
// );
// interface HistoryPaginationProps {
// 	activePage: number;
// 	totalPages: number;
// 	handlePagination: () => void;
// }
// export const HistoryPagination = ({
// 	handlePagination,
// 	activePage,
// 	totalPages,
// }: HistoryPaginationProps) => {
// 	return (
// 		<Pagination
// 			defaultActivePage={activePage}
// 			ellipsisItem={null}
// 			firstItem={null}
// 			lastItem={null}
// 			totalPages={totalPages ? totalPages : 1}
// 			onPageChange={handlePagination}
// 		/>
// 	);
// };
// export interface HistoryModalProps {
// 	openHistoryModal: boolean;
// 	receipt: Membership;
// 	activePage: number;
// 	totalPages: number;
// 	handlePagination: () => void;
// }
// interface HistoryTableProps {
// 	activePage: number;
// 	totalPages: number;
// 	handlePagination: () => void;
// 	// history: Membership[];
// 	itemPerPage: number;
// }
// export const HistoryTable = ({
// 	activePage,
// 	totalPages,
// 	handlePagination,
// 	// history,
// 	itemPerPage,
// }: HistoryTableProps) => {
// 	const [history, setHistory] = React.useState<Membership[]>([]);

// 	React.useEffect(() => {
// 		const getHistory = async (account: string) => {
// 			const response = await API.getHistory(account);
// 			setHistory(response);
// 		};
// 	}, []);

// 	return (
// 		<Table celled color='blue' compact>
// 			<Table.Header fullWidth>
// 				<Table.Row>
// 					<Table.HeaderCell />
// 					<Table.HeaderCell colSpan={historyHeaderCells.length}>
// 						<Pagination
// 							defaultActivePage={activePage}
// 							ellipsisItem={null}
// 							firstItem={null}
// 							lastItem={null}
// 							totalPages={totalPages ? totalPages : 1}
// 							onPageChange={handlePagination}
// 						/>
// 					</Table.HeaderCell>
// 				</Table.Row>
// 			</Table.Header>
// 			<Table.Header fullWidth>
// 				<Table.Row textAlign='center'>
// 					{historyHeaderCells.map((data, index) => (
// 						<Table.HeaderCell content={data} key={index} />
// 					))}
// 				</Table.Row>
// 			</Table.Header>

// 			<Table.Body>
// 				{history
// 					.map((item, index) => (
// 						<Table.Row
// 							textAlign='center'
// 							key={index}
// 							warning={item.type === 'NEW'}
// 							style={{ fontSize: '20px' }}
// 						>
// 							<Table.Cell>{item.type}</Table.Cell>
// 							<Table.Cell>{'$' + item.fee}</Table.Cell>
// 							<Table.Cell>{item.gallon}</Table.Cell>
// 							<Table.Cell>{item.previous}</Table.Cell>
// 							<Table.Cell>{item.buy}</Table.Cell>
// 							<Table.Cell>{item.remain}</Table.Cell>
// 							<Table.Cell>{item.date}</Table.Cell>
// 							<Table.Cell>{item.time}</Table.Cell>
// 						</Table.Row>
// 					))
// 					.slice((activePage - 1) * itemPerPage, activePage * itemPerPage)}
// 			</Table.Body>
// 		</Table>
// 	);
// };
// export const HistoryModal = ({
// 	activePage,
// 	openHistoryModal,
// 	receipt,
// 	totalPages,
// 	handlePagination,
// }: HistoryModalProps) => {
// 	return (
// 		<Modal
// 			dimmer='blurring'
// 			open={openHistoryModal}
// 			closeOnDimmerClick={false}
// 			closeOnEscape={false}
// 			closeOnPortalMouseLeave={false}
// 			closeOnDocumentClick={false}
// 			closeOnTriggerClick={false}
// 		>
// 			<Modal.Header>
// 				<Header as='h1' block color='blue'>
// 					<Icon name='user circle' color='blue' />
// 					<Header.Content>
// 						{receipt?.first + ' ' + receipt?.last + ' ' + receipt?.phone}
// 						<Header.Subheader style={{ fontSize: '24px', fontWeight: 'bold' }}>
// 							Account #: {receipt?.account}
// 						</Header.Subheader>
// 					</Header.Content>
// 				</Header>
// 			</Modal.Header>
// 			<Modal.Content>{/* <HistoryTable /> */}</Modal.Content>
// 			<Modal.Actions>
// 				<Button
// 					negative
// 					circular
// 					size='huge'
// 					content='Close'
// 					// onClick={handleCloseHistoryModal}
// 				/>
// 			</Modal.Actions>
// 		</Modal>
// 	);
// };
// export const BuyScreen = () => {
// 	// React Router
// 	const { push } = ReactRouter.useHistory();
// 	const { state } = ReactRouter.useLocation<{ membership: Membership }>();

// 	const [name, setName] = React.useState('');

// 	const [edit, setEdit] = React.useState(false);
// 	const [error, setError] = React.useState<boolean | string>(false);

// 	const [receipt, setReceipt] = React.useState<Membership | null>(null);
// 	const [openReceipt, setOpenReceipt] = React.useState(true);

// 	const [history, setHistory] = React.useState<Membership[]>([]);
// 	const [openHistoryModal, setOpenHistoryModal] = React.useState(false);

// 	// Pagination Configuration
// 	const itemPerPage = 8;
// 	const [activePage, setActivePage] = React.useState(1);
// 	const [totalPages, setTotalPages] = React.useState(0);

// 	// Delete Modal State
// 	const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
// 	const [password, setPassword] = React.useState('');
// 	const [deleteError, setDeleteError] = React.useState<boolean | string>(false);

// 	const handlePagination = (
// 		event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
// 		data: Semantic.PaginationProps
// 	) => {
// 		event.preventDefault();
// 		const { activePage } = data;
// 		if (activePage && typeof activePage === 'number') {
// 			setActivePage(activePage);
// 		}
// 	};

// 	const handleOpenHistoryModel = async () => {
// 		if (receipt && receipt.account) {
// 			const response = await API.getHistory(receipt.account);
// 			setHistory(response);
// 			setTotalPages(Math.ceil(history.length / itemPerPage));
// 			setOpenHistoryModal(true);
// 			// setOpenReceipt(true);
// 		}
// 		setOpenReceipt(true);
// 	};

// 	const handleCloseHistoryModal = () => {
// 		setActivePage(1);
// 		setOpenHistoryModal(false);
// 		document.getElementById('buy')?.focus();
// 	};

// 	const deleteAccount = async (
// 		member: Membership,
// 		password: string
// 	): Promise<void> => {
// 		const { status } = await API.deleteMembership(member.account!, password);
// 		console.log(status);
// 		if (status) {
// 			push('/dashboard');
// 		} else {
// 			setDeleteError('invalid password');
// 		}
// 	};

// 	const cancelAccountDelete = () => {
// 		setDeleteError(false);
// 		setOpenDeleteModal(false);
// 	};

// 	// Edit Button Event handler
// 	const handleEditAccount = async (values: Membership) => {
// 		setEdit((prevEdit) => !prevEdit);

// 		if (edit) {
// 			const { duplicate, updatedRecord } = await API.editMembership(
// 				initialValues!,
// 				values
// 			);

// 			if (duplicate) {
// 				setError(`${values.account} already existed`);
// 				setEdit(true);
// 				return;
// 			}

// 			if (updatedRecord) {
// 				setReceipt(updatedRecord);
// 				setOpenReceipt(false);
// 				setOpenReceipt(true);
// 				setError(false);
// 				setEdit(false);
// 				return;
// 			}
// 		}
// 	};

// 	const handleCancelEdit = (form: FormApi, values: Membership) => {
// 		setEdit(!edit);

// 		if (edit) {
// 			// Save Edit Here
// 			setError(false);
// 			if (initialValues) {
// 				form.reset(initialValues);
// 				form.change('remain', values.remain);
// 				form.change('buy', values.buy);
// 				form.change('fee', values.fee);
// 				form.change('gallon', values.gallon);
// 			}
// 		}
// 	};

// 	const onSubmit = async (values: Membership) => {
// 		const { fee, buy, previous, gallon } = values;
// 		setOpenReceipt(false);

// 		// Membership Water Purchase by Gallon, update remain
// 		if (buy) {
// 			const updatedReceipt = await API.buyMembership({
// 				...values,
// 				remain: previous! - buy,
// 				type: 'BUY',
// 			});

// 			setReceipt(updatedReceipt);
// 			setOpenReceipt(true);
// 		}

// 		// Membership Water Renew Fee
// 		if (fee) {
// 			const updatedReceipt = await API.renewMembership({
// 				...values,
// 				remain: gallon! + previous!,
// 				type: 'RENEW',
// 			});
// 			setReceipt(updatedReceipt);
// 			setOpenReceipt(true);
// 		}
// 	};

// 	const {
// 		Header,
// 		TransitionablePortal,
// 		Segment,
// 		Grid,
// 		Icon,
// 		Form: { Input, Button, Group },
// 		Divider,
// 		Modal,
// 		Table,
// 		Pagination,
// 		Message,
// 	} = Semantic;

// 	// React Final Form
// 	const { Form, Field } = ReactFinalForm;

// 	const subscription = {
// 		values: true,
// 		initialValues: true,
// 		submitting: true,
// 		valid: true,
// 	};

// 	const initialValues = receipt
// 		? {
// 				note: receipt.note,
// 				account: receipt.account,
// 				since: receipt.since,
// 				phone: receipt.phone,
// 				first: receipt.first,
// 				last: receipt.last,
// 				previous: receipt.remain,
// 				type: receipt.type,
// 				buy: 0,
// 				remain: receipt.remain,
// 				fee: 0,
// 				gallon: 0,
// 				date: getDate(),
// 				time: getTime(),
// 		  }
// 		: null;

// 	React.useEffect(() => {
// 		const getAppVersion = async () => {
// 			setName('Senter Water POS');
// 		};

// 		const getHistory = async (account: string) => {
// 			const response = await API.getHistory(account);
// 			setHistory(response);
// 		};

// 		if (!state) {
// 			push('/dashboard');
// 		} else {
// 			console.log('useEffect');
// 			setReceipt(state.membership);
// 			getHistory(state.membership.account!);
// 			getAppVersion();
// 		}
// 	}, [push, state]);

// 	return (
// 		<>
// 			<PurchaseHeader name={name} />
// 			<CurrentReceipt openReceipt={openReceipt} receipt={receipt!} />
// 			<TransitionablePortal
// 				open={true}
// 				transition={{ animation: 'fade', duration: 500 }}
// 			>
// 				<Segment className='Buy'>
// 					<Grid>
// 						<Grid.Column className='Buy'>
// 							<Form
// 								onSubmit={onSubmit}
// 								initialValues={initialValues}
// 								subscription={subscription}
// 								render={({ handleSubmit, submitting, values, form }) => (
// 									<Semantic.Form onSubmit={handleSubmit}>
// 										<Group>
// 											<NoteField edit={edit} />
// 										</Group>
// 										<Group>
// 											<MemberInfoField edit={edit} error={error} />
// 											<EditButton
// 												edit={edit}
// 												submitting={submitting}
// 												values={values}
// 												handleEdit={() => handleEditAccount(values)}
// 											/>
// 											<Button
// 												content='Cancel'
// 												type='button'
// 												secondary
// 												fluid
// 												disabled={!edit}
// 												style={{ marginTop: '30px' }}
// 												size='huge'
// 												circular
// 												onClick={(event) => {
// 													event.preventDefault();
// 													handleCancelEdit(form, values);
// 												}}
// 											/>
// 											<DateTimeField edit={edit} />
// 										</Group>
// 										<Group>
// 											<Input type='hidden' width={14} />
// 											<Field
// 												id='buy'
// 												name='buy'
// 												parse={Normalize.gallon}
// 												render={({ input }) => (
// 													<Input
// 														{...input}
// 														disabled={edit}
// 														className='Amount'
// 														id='buy'
// 														label='Buy'
// 														inverted
// 														size='huge'
// 														width={2}
// 														onFocus={() => {
// 															form.change('fee', 0);
// 															form.change('gallon', 0);
// 														}}
// 													/>
// 												)}
// 											/>
// 											<Field
// 												name='remain'
// 												render={({ input }) => (
// 													<Input
// 														error={input.value <= 0 ? true : false}
// 														disabled={edit}
// 														className='Amount'
// 														inverted
// 														id='remain'
// 														label='Remain'
// 														readOnly
// 														{...input}
// 														size='huge'
// 														width={2}
// 													/>
// 												)}
// 											/>
// 											<Button
// 												type='submit'
// 												positive
// 												fluid
// 												disabled={!values.buy || edit}
// 												style={{ marginTop: '30px' }}
// 												circular
// 												size='huge'
// 												content='Buy'
// 												width={3}
// 											/>
// 										</Group>
// 										{/* Water Renew Fee and Gallon Amount */}
// 										<Group>
// 											<Input type='hidden' width={14} />
// 											<Field
// 												name='fee'
// 												parse={Normalize.fee}
// 												render={({ input }) => (
// 													<Input
// 														id='fee'
// 														className='Amount'
// 														label='Fee'
// 														size='huge'
// 														inverted
// 														width={2}
// 														disabled={edit}
// 														{...input}
// 														onFocus={() => {
// 															form.change('buy', 0);
// 														}}
// 													/>
// 												)}
// 											/>
// 											<Field
// 												name='gallon'
// 												parse={Normalize.gallon}
// 												render={({ input }) => (
// 													<Input
// 														id='gallon'
// 														label='Gallon'
// 														className='Amount'
// 														size='huge'
// 														inverted
// 														width={2}
// 														disabled={edit}
// 														{...input}
// 														onKeyPress={(event: KeyboardEvent) =>
// 															(event.key === 'Enter' || event.keyCode === 13) &&
// 															values.fee! > 0 &&
// 															values.gallon! > 0
// 																? form.submit()?.then(() => {
// 																		document.getElementById('buy')?.focus();
// 																  })
// 																: null
// 														}
// 														onFocus={() => {
// 															form.change('buy', 0);
// 														}}
// 													/>
// 												)}
// 											/>
// 											<Button
// 												type='submit'
// 												content='Renew'
// 												size='huge'
// 												primary
// 												fluid
// 												circular
// 												disabled={!values.gallon || !values.fee || edit}
// 												style={{ marginTop: '30px' }}
// 												width={3}
// 											/>
// 										</Group>
// 										<Divider hidden />
// 										<Divider hidden />
// 										<Divider />
// 										<Divider hidden />
// 										<Group>
// 											<Input type='hidden' width={14} />
// 											<Button
// 												content='History'
// 												color='teal'
// 												size='huge'
// 												circular
// 												fluid
// 												onClick={handleOpenHistoryModel}
// 											/>
// 											<Modal
// 												dimmer='blurring'
// 												open={openHistoryModal}
// 												closeOnDimmerClick={false}
// 												closeOnEscape={false}
// 												closeOnPortalMouseLeave={false}
// 												closeOnDocumentClick={false}
// 												closeOnTriggerClick={false}
// 											>
// 												<Modal.Header>
// 													<Header as='h1' block color='blue'>
// 														<Icon name='user circle' color='blue' />
// 														<Header.Content>
// 															{receipt?.first +
// 																' ' +
// 																receipt?.last +
// 																' ' +
// 																receipt?.phone}
// 															<Header.Subheader
// 																style={{ fontSize: '24px', fontWeight: 'bold' }}
// 															>
// 																Account #: {receipt?.account}
// 															</Header.Subheader>
// 														</Header.Content>
// 													</Header>
// 												</Modal.Header>
// 												<Modal.Content>
// 													<Table celled color='blue' compact>
// 														<Table.Header fullWidth>
// 															<Table.Row>
// 																<Table.HeaderCell />
// 																<Table.HeaderCell
// 																	colSpan={historyHeaderCells.length}
// 																>
// 																	<Pagination
// 																		defaultActivePage={activePage}
// 																		ellipsisItem={null}
// 																		firstItem={null}
// 																		lastItem={null}
// 																		totalPages={totalPages ? totalPages : 1}
// 																		onPageChange={handlePagination}
// 																	/>
// 																</Table.HeaderCell>
// 															</Table.Row>
// 														</Table.Header>
// 														<Table.Header fullWidth>
// 															<Table.Row textAlign='center'>
// 																{historyHeaderCells.map((data, index) => (
// 																	<Table.HeaderCell
// 																		content={data}
// 																		key={index}
// 																	/>
// 																))}
// 															</Table.Row>
// 														</Table.Header>

// 														<Table.Body>
// 															{history
// 																.map((item, index) => (
// 																	<Table.Row
// 																		textAlign='center'
// 																		key={index}
// 																		warning={item.type === 'NEW'}
// 																		style={{ fontSize: '20px' }}
// 																	>
// 																		<Table.Cell>{item.type}</Table.Cell>
// 																		<Table.Cell>{'$' + item.fee}</Table.Cell>
// 																		<Table.Cell>{item.gallon}</Table.Cell>
// 																		<Table.Cell>{item.previous}</Table.Cell>
// 																		<Table.Cell>{item.buy}</Table.Cell>
// 																		<Table.Cell>{item.remain}</Table.Cell>
// 																		<Table.Cell>{item.date}</Table.Cell>
// 																		<Table.Cell>{item.time}</Table.Cell>
// 																	</Table.Row>
// 																))
// 																.slice(
// 																	(activePage - 1) * itemPerPage,
// 																	activePage * itemPerPage
// 																)}
// 														</Table.Body>
// 													</Table>
// 												</Modal.Content>
// 												<Modal.Actions>
// 													<Button
// 														negative
// 														circular
// 														size='huge'
// 														content='Close'
// 														onClick={handleCloseHistoryModal}
// 													/>
// 												</Modal.Actions>
// 											</Modal>
// 											<Button
// 												content='Delete'
// 												size='huge'
// 												negative
// 												circular
// 												onClick={() => {
// 													setOpenDeleteModal(true);
// 													setOpenReceipt(true);
// 												}}
// 											/>
// 											{receipt && (
// 												<Modal open={openDeleteModal} basic>
// 													<Modal.Header>{receipt!.account}</Modal.Header>
// 													<Modal.Content>
// 														<Table color='red' celled size='large'>
// 															<Table.Header>
// 																<Table.Row textAlign='center'>
// 																	<Table.HeaderCell>Account</Table.HeaderCell>
// 																	<Table.HeaderCell>
// 																		MemberSince
// 																	</Table.HeaderCell>
// 																	<Table.HeaderCell>Phone</Table.HeaderCell>
// 																	<Table.HeaderCell>Name</Table.HeaderCell>
// 																</Table.Row>
// 															</Table.Header>
// 															<Table.Body>
// 																<Table.Row textAlign='center'>
// 																	<Table.Cell content={receipt!.account} />
// 																	<Table.Cell content={receipt!.since} />
// 																	<Table.Cell content={receipt!.phone} />
// 																	<Table.Cell
// 																		content={
// 																			receipt!.first + ' ' + receipt!.last
// 																		}
// 																	/>
// 																</Table.Row>
// 															</Table.Body>
// 														</Table>
// 													</Modal.Content>
// 													<Modal.Actions>
// 														{deleteError && (
// 															<Message negative>
// 																<Message.Header>
// 																	Please enter a valid password to delete
// 																	account
// 																</Message.Header>
// 															</Message>
// 														)}

// 														<Button
// 															content='Cancel'
// 															floated='right'
// 															secondary
// 															onClick={cancelAccountDelete}
// 														/>
// 														<Button
// 															floated='right'
// 															primary
// 															onClick={() => deleteAccount(receipt!, password)}
// 														>
// 															Delete
// 														</Button>
// 														<Input
// 															id={receipt!.account}
// 															name='password'
// 															type='password'
// 															error={error ? true : false}
// 															placeholder='password'
// 															onChange={(event, data) => {
// 																event.preventDefault();
// 																if (error) {
// 																	setError(false);
// 																}
// 																setPassword(data.value);
// 															}}
// 														/>
// 													</Modal.Actions>
// 												</Modal>
// 											)}
// 											<Button
// 												content='Done'
// 												color='black'
// 												size='huge'
// 												circular
// 												fluid
// 												type='button'
// 												onClick={() => {
// 													setEdit(false);
// 													setError(false);
// 													push('/dashboard');
// 												}}
// 											/>
// 										</Group>
// 									</Semantic.Form>
// 								)}
// 							/>
// 						</Grid.Column>
// 					</Grid>
// 				</Segment>
// 			</TransitionablePortal>
// 		</>
// 	);
// };
// export default BuyScreen;

// import * as React from 'react';
// import * as Redux from '../app/hooks';
// import * as ReactFinalForm from 'react-final-form';
// import * as ReactRouter from 'react-router-dom';
// import * as Semantic from 'semantic-ui-react';
// import { Membership } from '../app/reducer/membershipSlice';
// import { API } from '../app/service/api';
// import { Normalize } from '../app/service/normalize';
// import { getDate, getTime } from '../app/utilities/formHelper';
// import type {
// 	ScreenPortalProps,
// 	AddScreenHeaderProps,
// 	AddScreenFormProps,
// 	AccountFieldProps,
// 	AddButtonProps,
// 	CancelButtonProps,
// 	PurchaseType,
// } from './types';

// const { Form, Field } = ReactFinalForm;
// const {
// 	Header,
// 	TransitionablePortal,
// 	Segment,
// 	Grid,
// 	Icon,
// 	Form: { Input, Group, Button },
// } = Semantic;

// export const AddScreenComponent = {
// 	Portal: ({
// 		open = true,
// 		transition = { animation: 'fade', duration: 500 },
// 		children,
// 	}: ScreenPortalProps) => (
// 		<TransitionablePortal open={open} transition={transition}>
// 			<Segment className='Add'>
// 				<Grid>
// 					<Grid.Column className='Add'>{children}</Grid.Column>
// 				</Grid>
// 			</Segment>
// 		</TransitionablePortal>
// 	),
// 	Header: ({ name = '', version = '' }: AddScreenHeaderProps) => (
// 		<Header inverted as='h1' size='huge' textAlign='left'>
// 			<Icon color='blue' name='braille' />
// 			<Header.Content>
// 				{name}
// 				<Header.Subheader>New Membership: version {version}</Header.Subheader>
// 			</Header.Content>
// 		</Header>
// 	),
// 	Form: ({
// 		onSubmit,
// 		error,
// 		subscription,
// 		initialValues,
// 	}: AddScreenFormProps) => {
// 		const { push } = ReactRouter.useHistory();
// 		const {
// 			Date,
// 			Time,
// 			Note,
// 			Phone,
// 			Account,
// 			FirstName,
// 			LastName,
// 			Fee,
// 			Gallon,
// 			AddButton,
// 			CancelButton,
// 		} = AddScreenComponent;

// 		return (
// 			<Form
// 				initialValuesEqual={() => true}
// 				subscription={subscription}
// 				initialValues={initialValues}
// 				// initialValues={{
// 				// 	account: null,
// 				// 	phone: null,
// 				// 	first: null,
// 				// 	last: null,
// 				// 	note: null,
// 				// 	fee: 0,
// 				// 	gallon: 0,
// 				// 	buy: 0,
// 				// 	remain: 0,
// 				// 	previous: 0,
// 				// 	type: 'NEW',
// 				// 	since: getDate(),
// 				// 	date: getDate(),
// 				// 	time: getTime(),
// 				// }}
// 				onSubmit={onSubmit}
// 				render={({ handleSubmit, values, submitting }) => (
// 					<Semantic.Form onSubmit={handleSubmit}>
// 						<Group>
// 							<Note />
// 							<Date />
// 							<Time />
// 						</Group>
// 						<Group>
// 							<Account error={error} />
// 							<Phone />
// 							<FirstName />
// 							<LastName />
// 							<Fee />
// 							<Gallon />
// 							<AddButton values={values} submitting={submitting} />
// 							<CancelButton handleClick={() => push('/dashboard')} />
// 						</Group>
// 					</Semantic.Form>
// 				)}
// 			/>
// 		);
// 	},
// 	Date: () => (
// 		<Field
// 			name='date'
// 			render={({ input }) => (
// 				<Input
// 					fluid
// 					id='date'
// 					label='Date'
// 					className='Name'
// 					placeholder='mm/dd/yyyy'
// 					size='massive'
// 					inverted
// 					readOnly
// 					{...input}
// 					width={2}
// 				/>
// 			)}
// 		/>
// 	),
// 	Time: () => (
// 		<Field
// 			name='time'
// 			render={({ input }) => (
// 				<Input
// 					id='time'
// 					label='Time'
// 					className='Name'
// 					placeholder='xx:xx:xx'
// 					{...input}
// 					size='massive'
// 					inverted
// 					readOnly
// 					width={2}
// 				/>
// 			)}
// 		/>
// 	),
// 	Note: () => (
// 		<Field
// 			name='note'
// 			render={({ input }) => (
// 				<Input
// 					label='Note'
// 					id='note'
// 					className='AddNote'
// 					size='massive'
// 					placeholder='Add Note'
// 					{...input}
// 					spellCheck='false'
// 					inverted
// 					width={15}
// 				/>
// 			)}
// 		/>
// 	),
// 	Account: ({ error }: AccountFieldProps) => (
// 		<Field
// 			name='account'
// 			parse={Normalize.account}
// 			render={({ input }) => (
// 				<Input
// 					id='account'
// 					className='Name'
// 					label='Account'
// 					placeholder='xxxxxxx'
// 					error={error ? error : false}
// 					size='massive'
// 					inverted
// 					{...input}
// 					width={3}
// 				/>
// 			)}
// 		/>
// 	),
// 	Phone: () => (
// 		<Field
// 			name='phone'
// 			parse={Normalize.phone}
// 			render={({ input }) => (
// 				<Input
// 					id='phone'
// 					className='Name'
// 					label='Phone Number'
// 					placeholder='xxx-xxx-xxxx'
// 					size='massive'
// 					inverted
// 					{...input}
// 					width={2}
// 				/>
// 			)}
// 		/>
// 	),
// 	FirstName: () => (
// 		<Field
// 			name='first'
// 			parse={Normalize.name}
// 			render={({ input }) => (
// 				<Input
// 					id='firstName'
// 					label='First Name'
// 					className='Name'
// 					spellCheck='false'
// 					placeholder='First Name'
// 					size='massive'
// 					inverted
// 					{...input}
// 					width={3}
// 				/>
// 			)}
// 		/>
// 	),
// 	LastName: () => (
// 		<Field
// 			name='last'
// 			parse={Normalize.name}
// 			render={({ input }) => (
// 				<Input
// 					id='lastName'
// 					label='Last Name'
// 					className='Name'
// 					placeholder='Last Name'
// 					{...input}
// 					spellCheck='false'
// 					size='massive'
// 					inverted
// 					width={3}
// 				/>
// 			)}
// 		/>
// 	),
// 	Fee: () => (
// 		<Field
// 			name='fee'
// 			parse={Normalize.fee}
// 			render={({ input }) => (
// 				<Input
// 					id='fee'
// 					className='TodayDate'
// 					label='Fee'
// 					{...input}
// 					size='massive'
// 					inverted
// 					width={1}
// 				/>
// 			)}
// 		/>
// 	),
// 	Gallon: () => {
// 		const { change } = ReactFinalForm.useForm();

// 		return (
// 			<Field
// 				name='gallon'
// 				parse={Normalize.gallon}
// 				render={({ input }) => (
// 					<Input
// 						id='gallon'
// 						label='Gallon'
// 						className='TodayDate'
// 						name={input.name}
// 						value={input.value}
// 						size='massive'
// 						inverted
// 						onChange={(event, data) => {
// 							event.preventDefault();
// 							input.onChange(data.value);
// 							change('remain', parseInt(data.value));
// 						}}
// 						width={1}
// 					/>
// 				)}
// 			/>
// 		);
// 	},
// 	AddButton: ({ values, submitting }: AddButtonProps) => (
// 		<Button
// 			id='AddMember'
// 			content='Add Member'
// 			type='submit'
// 			size='massive'
// 			disabled={
// 				!values.phone ||
// 				values.phone.length < 14 ||
// 				!values.account ||
// 				!values.first ||
// 				!values.last ||
// 				!values.fee ||
// 				!values.gallon ||
// 				submitting
// 			}
// 			primary
// 			fluid
// 			width={2}
// 			circular
// 			style={{ marginTop: '30px' }}
// 		/>
// 	),
// 	CancelButton: ({ handleClick }: CancelButtonProps) => (
// 		<Button
// 			id='CancelAdd'
// 			content='Cancel'
// 			type='button'
// 			size='massive'
// 			secondary
// 			fluid
// 			circular
// 			style={{ marginTop: '30px' }}
// 			onClick={handleClick}
// 		/>
// 	),
// 	AddScreen: () => {
// 		// Custom Semantic Component
// 		const { Header, Portal, Form } = AddScreenComponent;

// 		// Redux Store
// 		const { name, version } = Redux.useAppSelector((state) => state.app);

// 		// React Router State and Hooks
// 		const { push } = ReactRouter.useHistory();
// 		const [error, setError] = React.useState<boolean | string>(false);

// 		// React Form onSubmit handler
// 		const onSubmit = async (values: Membership) => {
// 			const response = await API.addMembership(values);
// 			const { duplicate, membership, account } = response;

// 			if (duplicate) {
// 				setError(`Account ${account} already existed`);
// 			} else {
// 				const history = await API.getHistory(account!);
// 				push({ pathname: '/purchase', state: { membership, history } });
// 			}
// 		};

// 		const subscription = {
// 			submitting: true,
// 			valid: true,
// 			values: true,
// 		};

// 		const initialValues = {
// 			account: undefined,
// 			phone: undefined,
// 			first: undefined,
// 			last: undefined,
// 			note: undefined,
// 			fee: 0,
// 			gallon: 0,
// 			buy: 0,
// 			remain: 0,
// 			previous: 0,
// 			type: 'NEW' as PurchaseType,
// 			since: getDate(),
// 			date: getDate(),
// 			time: getTime(),
// 		};

// 		React.useEffect(() => {
// 			document.getElementById('account')?.focus();
// 		}, []);

// 		return (
// 			<Portal>
// 				<Header name={name} version={version} />
// 				<Form
// 					error={error}
// 					onSubmit={onSubmit}
// 					subscription={subscription}
// 					initialValues={initialValues}
// 				/>
// 			</Portal>
// 		);
// 	},
// };

// export const { AddScreen } = AddScreenComponent;
// export default AddScreen;

// const PurchaseForm = ({
// 	open = true,
// 	membership,
// 	setOpenReceipt,
// 	setReceipt,
// 	children,
// 	transition = { animation: 'fade', duration: 500 },
// 	initialValues = {
// 		note: membership.note,
// 		account: membership.account,
// 		since: membership.since,
// 		phone: membership.phone,
// 		first: membership.first,
// 		last: membership.last,
// 		previous: membership.remain,
// 		type: membership.type,
// 		buy: 0,
// 		remain: membership.remain,
// 		fee: 0,
// 		gallon: 0,
// 		date: getDate(),
// 		time: getTime(),
// 	},
// }: PurchaseFormProps) => {
// 	const { push } = ReactRouter.useHistory();
// 	const [edit, setEdit] = React.useState(false);
// 	const [error, setError] = React.useState<boolean | string>(false);
// 	const handleEditAccount = async (
// 		initialValues: Membership,
// 		values: Membership,
// 		form: FormApi
// 	) => {
// 		setEdit(true);
// 		if (edit) {
// 			const { duplicate, updatedRecord } = await API.editMembership(
// 				initialValues,
// 				values
// 			);

// 			if (duplicate) {
// 				setError(`${values.account} already existed`);
// 				setEdit(true);
// 				return;
// 			}

// 			if (updatedRecord) {
// 				const { note, account, phone, first, last } = updatedRecord;
// 				setReceipt(updatedRecord);

// 				setOpenReceipt(false);
// 				setOpenReceipt(true);

// 				form.initialize({
// 					...initialValues,
// 					note,
// 					account,
// 					first,
// 					last,
// 					phone,
// 					remain: values.remain,
// 					buy: values.buy,
// 					fee: values.fee,
// 					gallon: values.gallon,
// 				});
// 				setError(false);
// 				setEdit(false);
// 				return;
// 			}
// 		}
// 	};
// 	const handleCancelEdit = (
// 		form: FormApi,
// 		values: Membership,
// 		initialValues: Membership
// 	) => {
// 		setEdit(!edit);

// 		if (edit) {
// 			// Save Edit Here
// 			setError(false);
// 			if (initialValues) {
// 				form.reset(initialValues);
// 				form.change('remain', values.remain);
// 				form.change('buy', values.buy);
// 				form.change('fee', values.fee);
// 				form.change('gallon', values.gallon);
// 			}
// 		}
// 	};
// 	const onSubmit = async (
// 		values: Membership,
// 		form: FormApi
// 	): Promise<Membership> => {
// 		const { fee, buy, previous, gallon } = values;
// 		setOpenReceipt(false);

// 		// Membership Water Purchase by Gallon, update remain
// 		if (buy) {
// 			const updatedReceipt = await API.buyMembership({
// 				...values,
// 				record: undefined,
// 				remain: previous! - buy,
// 				type: 'BUY',
// 			});

// 			console.log({ ...updatedReceipt });

// 			setReceipt(updatedReceipt);
// 			setOpenReceipt(true);

// 			form.initialize({
// 				...updatedReceipt,
// 				previous: updatedReceipt.remain,
// 				type: 'BUY',
// 				buy: 0,
// 				fee: 0,
// 				gallon: 0,
// 				date: getDate(),
// 				time: getTime(),
// 			});
// 		}

// 		// Membership Water Renew Fee
// 		if (fee) {
// 			const updatedReceipt = await API.renewMembership({
// 				...values,
// 				record: undefined,
// 				remain: gallon! + previous!,
// 				type: 'RENEW',
// 			});
// 			console.log({ ...updatedReceipt });

// 			form.initialize({
// 				...updatedReceipt,
// 				previous: updatedReceipt.remain,
// 				type: 'BUY',
// 				buy: 0,
// 				fee: 0,
// 				gallon: 0,
// 				date: getDate(),
// 				time: getTime(),
// 			});

// 			setReceipt(updatedReceipt);
// 			setOpenReceipt(true);
// 			return updatedReceipt;
// 		}

// 		return values;
// 	};
// 	const { Segment, TransitionablePortal, Grid, Form, Divider } = Semantic;
// 	const {
// 		Note,
// 		Account,
// 		Since,
// 		Phone,
// 		FirstName,
// 		LastName,
// 		Date,
// 		Time,
// 		Buy,
// 		Remain,
// 		Fee,
// 		Gallon,
// 	} = SenterPurchaseFields;
// 	const { EditButton, CancelEditButton, BuyButton, RenewButton } =
// 		SenterPurchaseButtons;
// 	const handleRenewGallonKeyPress = (
// 		event: KeyboardEvent,
// 		values: Membership,
// 		form: FormApi
// 	) =>
// 		(event.key === 'Enter' || event.keyCode === 13) &&
// 		values.fee! > 0 &&
// 		values.gallon! > 0
// 			? form.submit()?.then((response) => {
// 					form.initialize({
// 						...response,
// 						previous: response!.remain,
// 						type: 'BUY',
// 						buy: 0,
// 						fee: 0,
// 						gallon: 0,
// 						date: getDate(),
// 						time: getTime(),
// 					});
// 					console.log('Renew Button Press');
// 					document.getElementById('buy')?.focus();
// 			  })
// 			: null;

// 	return (
// 		<TransitionablePortal
// 			open={open}
// 			transition={transition}
// 			closeOnDocumentClick={false}
// 			closeOnEscape={false}
// 			closeOnDimmerClick={false}
// 			closeOnPortalMouseLeave={false}
// 		>
// 			<Segment className='Buy'>
// 				<Grid>
// 					<Grid.Column className='Buy'>
// 						<ReactFinal.Form
// 							initialValuesEqual={() => true}
// 							onSubmit={onSubmit}
// 							initialValues={initialValues}
// 							render={({
// 								handleSubmit,
// 								submitting,
// 								initialValues,
// 								values,
// 								form,
// 							}) => (
// 								<Form onSubmit={handleSubmit}>
// 									<Form.Group>
// 										<Note edit={edit} />
// 										<Date edit={edit} />
// 										<Time edit={edit} />
// 									</Form.Group>
// 									<Divider hidden />
// 									<Form.Group>
// 										<Account edit={edit} error={error} />
// 										<Since edit={edit} />
// 										<Phone edit={edit} />
// 										<FirstName edit={edit} />
// 										<LastName edit={edit} />
// 										<EditButton
// 											edit={edit}
// 											submitting={submitting}
// 											values={values}
// 											callback={(event) => {
// 												event.preventDefault();
// 												handleEditAccount(initialValues, values, form);
// 											}}
// 										/>
// 										<CancelEditButton
// 											edit={edit}
// 											callback={(event) => {
// 												event.preventDefault();
// 												handleCancelEdit(form, values, initialValues);
// 											}}
// 										/>
// 										{/* <Date edit={edit} />
// 										<Time edit={edit} /> */}
// 									</Form.Group>
// 									<Divider hidden />
// 									<Form.Group>
// 										<Form.Input type='hidden' width={14} />
// 										<Buy
// 											edit={edit}
// 											callback={() => {
// 												form.batch(() => {
// 													form.change('fee', 0);
// 													form.change('gallon', 0);
// 												});
// 											}}
// 										/>
// 										<Remain edit={edit} />
// 										<BuyButton edit={edit} values={values} />
// 									</Form.Group>
// 									<Form.Group>
// 										<Form.Input type='hidden' width={14} />
// 										<Fee edit={edit} callback={() => form.change('buy', 0)} />
// 										<Gallon
// 											edit={edit}
// 											keyPress={(event) =>
// 												handleRenewGallonKeyPress(event, values, form)
// 											}
// 											callback={() => form.change('buy', 0)}
// 										/>
// 										<RenewButton values={values} edit={edit} />
// 									</Form.Group>
// 									<Divider hidden />
// 									<Divider hidden />
// 									<Divider hidden />
// 									<Form.Group>
// 										<Form.Input type='hidden' width={14} />
// 										{children}
// 										<Form.Button
// 											fluid
// 											width={2}
// 											content='Done'
// 											color='black'
// 											size='massive'
// 											circular
// 											type='button'
// 											onClick={() => {
// 												setEdit(false);
// 												setError(false);
// 												push('/dashboard');
// 											}}
// 										/>
// 									</Form.Group>
// 								</Form>
// 							)}
// 						/>
// 					</Grid.Column>
// 				</Grid>
// 			</Segment>
// 		</TransitionablePortal>
// 	);
// };

// const SenterTable = {
// 	AccountHeaderTable: ({ receipt }: AccountHeaderTableProps) => {
// 		const { Table } = Semantic;
// 		return (
// 			<Table color='blue' inverted size='large'>
// 				<Table.Header fullWidth>
// 					<Table.Row style={{ fontSize: '20px', fontWeight: 'bold' }}>
// 						<Table.HeaderCell>Name</Table.HeaderCell>
// 						<Table.HeaderCell>Phone Number</Table.HeaderCell>
// 						<Table.HeaderCell>Account #</Table.HeaderCell>
// 						<Table.HeaderCell>Member Since</Table.HeaderCell>
// 					</Table.Row>
// 					<Table.Row style={{ fontSize: '20px', fontWeight: 'bold' }}>
// 						<Table.Cell>{receipt.first + ' ' + receipt.last}</Table.Cell>
// 						<Table.Cell>{receipt.phone}</Table.Cell>
// 						<Table.Cell>{receipt.account}</Table.Cell>
// 						<Table.Cell>{receipt.since}</Table.Cell>
// 					</Table.Row>
// 				</Table.Header>
// 			</Table>
// 		);
// 	},
// 	HistoryTable: ({ history, setOpenHistoryModal }: HistoryTableProps) => {
// 		const itemPerPage = 8;
// 		const [activePage, setActivePage] = React.useState(1);
// 		const [totalPages, setTotalPages] = React.useState(0);

// 		const handlePagination = (
// 			event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
// 			{ activePage }: Semantic.PaginationProps
// 		) => {
// 			event.preventDefault();
// 			if (activePage && typeof activePage === 'number') {
// 				setActivePage(activePage);
// 			}
// 		};

// 		const handleCloseHistoryModal = () => {
// 			setActivePage(1);
// 			setOpenHistoryModal(false);
// 			document.getElementById('buy')?.focus();
// 		};

// 		const {
// 			Table,
// 			Pagination,
// 			Form: { Button },
// 		} = Semantic;

// 		React.useEffect(() => {
// 			setTotalPages(Math.ceil(history.length / itemPerPage));
// 		}, [history]);

// 		return (
// 			<Table celled color='blue' compact>
// 				<Table.Header fullWidth>
// 					<Table.Row>
// 						<Table.HeaderCell />
// 						<Table.HeaderCell colSpan={historyHeaderCells.length}>
// 							<Pagination
// 								defaultActivePage={activePage}
// 								ellipsisItem={null}
// 								firstItem={null}
// 								lastItem={null}
// 								totalPages={totalPages ? totalPages : 1}
// 								onPageChange={handlePagination}
// 							/>
// 						</Table.HeaderCell>
// 					</Table.Row>
// 				</Table.Header>
// 				<Table.Header fullWidth>
// 					<Table.Row textAlign='center'>
// 						{historyHeaderCells.map((data, index) => (
// 							<Table.HeaderCell content={data} key={index} />
// 						))}
// 					</Table.Row>
// 				</Table.Header>
// 				<Table.Body>
// 					{history
// 						.map((item, index) => (
// 							<Table.Row
// 								textAlign='center'
// 								key={index}
// 								warning={item.type === 'NEW'}
// 								style={{ fontSize: '20px' }}
// 							>
// 								<Table.Cell>{index + 1}</Table.Cell>
// 								<Table.Cell>{item.type}</Table.Cell>
// 								<Table.Cell>{'$' + item.fee}</Table.Cell>
// 								<Table.Cell>{item.gallon}</Table.Cell>
// 								<Table.Cell>{item.previous}</Table.Cell>
// 								<Table.Cell>{item.buy}</Table.Cell>
// 								<Table.Cell>{item.remain}</Table.Cell>
// 								<Table.Cell>{item.date}</Table.Cell>
// 								<Table.Cell>{item.time}</Table.Cell>
// 								<Table.Cell>{item.record}</Table.Cell>
// 							</Table.Row>
// 						))
// 						.slice((activePage - 1) * itemPerPage, activePage * itemPerPage)}
// 				</Table.Body>
// 				<Table.Footer>
// 					<Table.Row>
// 						<Table.HeaderCell colSpan={historyHeaderCells.length}>
// 							<Button
// 								floated='right'
// 								negative
// 								circular
// 								size='huge'
// 								content='Close'
// 								onClick={handleCloseHistoryModal}
// 							/>
// 						</Table.HeaderCell>
// 					</Table.Row>
// 				</Table.Footer>
// 			</Table>
// 		);
// 	},
// };
// const SenterModals = {
// 	History: ({
// 		open,
// 		receipt,
// 		handleOpenHistoryModal,
// 		setOpenHistoryModal,
// 		history,
// 	}: HistoryModalProps) => {
// 		const {
// 			Modal,
// 			Form: { Button },
// 		} = Semantic;
// 		const { AccountHeaderTable, HistoryTable } = SenterTable;

// 		return (
// 			<>
// 				<Button
// 					width={3}
// 					content='History'
// 					color='teal'
// 					size='massive'
// 					circular
// 					fluid
// 					onClick={handleOpenHistoryModal}
// 				/>
// 				<Modal dimmer='blurring' open={open}>
// 					<Modal.Header>
// 						<AccountHeaderTable receipt={receipt} />
// 					</Modal.Header>
// 					<Modal.Content>
// 						<HistoryTable
// 							history={history}
// 							setOpenHistoryModal={setOpenHistoryModal}
// 						/>
// 					</Modal.Content>
// 				</Modal>
// 			</>
// 		);
// 	},
// 	Delete: ({
// 		open,
// 		receipt,
// 		deleteError,
// 		handleOpenDeleteModal,
// 		cancelAccountDelete,
// 		setDeleteError,
// 	}: DeleteModalProps) => {
// 		const { push } = ReactRouter.useHistory();
// 		const {
// 			Form: { Button, Input },
// 			Modal,
// 			Table,
// 			Message,
// 		} = Semantic;

// 		// const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
// 		const [password, setPassword] = React.useState('');
// 		const [error, setError] = React.useState<boolean | string>(false);
// 		// const [deleteError, setDeleteError] = React.useState<boolean | string>(
// 		// 	false
// 		// );

// 		const deleteAccount = async (
// 			member: Membership,
// 			password: string
// 		): Promise<void> => {
// 			const { status } = await API.deleteMembership(member.account!, password);
// 			console.log(status);
// 			if (status) {
// 				push('/dashboard');
// 			} else {
// 				setDeleteError('invalid password');
// 			}
// 		};

// 		return (
// 			<>
// 				<Button
// 					width={2}
// 					fluid
// 					content='Delete'
// 					size='massive'
// 					negative
// 					circular
// 					onClick={handleOpenDeleteModal}
// 					// onClick={() => {
// 					// 	console.log('delete modal');
// 					// 	// setOpenReceipt(false);
// 					// 	setOpenReceipt(true);
// 					// 	setOpenDeleteModal(true);
// 					// 	// setOpenReceipt(true);
// 					// }}
// 				/>
// 				{receipt && (
// 					<Modal
// 						// open={openDeleteModal}
// 						open={open}
// 						basic
// 						closeOnDimmerClick={false}
// 						closeOnEscape={false}
// 						closeOnPortalMouseLeave={false}
// 						closeOnDocumentClick={false}
// 						closeOnTriggerClick={false}
// 					>
// 						<Modal.Header>{receipt!.account}</Modal.Header>
// 						<Modal.Content>
// 							<Table color='red' celled size='large'>
// 								<Table.Header>
// 									<Table.Row textAlign='center'>
// 										<Table.HeaderCell>Account</Table.HeaderCell>
// 										<Table.HeaderCell>MemberSince</Table.HeaderCell>
// 										<Table.HeaderCell>Phone</Table.HeaderCell>
// 										<Table.HeaderCell>Name</Table.HeaderCell>
// 									</Table.Row>
// 								</Table.Header>
// 								<Table.Body>
// 									<Table.Row textAlign='center'>
// 										<Table.Cell content={receipt!.account} />
// 										<Table.Cell content={receipt!.since} />
// 										<Table.Cell content={receipt!.phone} />
// 										<Table.Cell
// 											content={receipt!.first + ' ' + receipt!.last}
// 										/>
// 									</Table.Row>
// 								</Table.Body>
// 							</Table>
// 						</Modal.Content>
// 						<Modal.Actions>
// 							{deleteError && (
// 								<Message negative>
// 									<Message.Header>
// 										Please enter a valid password to delete account
// 									</Message.Header>
// 								</Message>
// 							)}
// 							<Button
// 								content='Cancel'
// 								floated='right'
// 								secondary
// 								onClick={cancelAccountDelete}
// 							/>
// 							<Button
// 								floated='right'
// 								primary
// 								onClick={() => deleteAccount(receipt!, password)}
// 							>
// 								Delete
// 							</Button>
// 							<Input
// 								id={receipt!.account}
// 								name='password'
// 								type='password'
// 								error={error ? true : false}
// 								placeholder='password'
// 								onChange={(event, data) => {
// 									event.preventDefault();
// 									if (error) {
// 										setError(false);
// 									}
// 									setPassword(data.value);
// 								}}
// 							/>
// 						</Modal.Actions>
// 					</Modal>
// 				)}
// 			</>
// 		);
// 	},
// };
// export const PurchaseScreen = () => {
// 	// React Router Hooks
// 	const { state } = ReactRouter.useLocation<{
// 		membership: Membership;
// 		history: Membership[];
// 	}>();

// 	const { push } = ReactRouter.useHistory();

// 	// Receipt
// 	const [openReceipt, setOpenReceipt] = React.useState(true);
// 	const [receipt, setReceipt] = React.useState<Membership | undefined>();

// 	// History Modal State and Event Handler
// 	const [history, setHistory] = React.useState<Membership[]>([]);
// 	const [openHistoryModal, setOpenHistoryModal] = React.useState(false);
// 	const handleOpenHistoryModel = async () => {
// 		if (receipt && receipt.account) {
// 			const response = await API.getHistory(receipt.account);
// 			setHistory(response);
// 			setOpenHistoryModal(true);
// 			setOpenReceipt(true);
// 		}
// 	};

// 	// Delete Modal State and Handler
// 	const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
// 	const [deleteError, setDeleteError] = React.useState<boolean | string>(false);
// 	const handleOpenDeleteModal = async () => {
// 		if (receipt && receipt.account) {
// 			const lastRecord = await API.fetchMemberLatestRecord(receipt.account);
// 			setReceipt(lastRecord);
// 			setOpenReceipt(false);
// 			setOpenReceipt(true);
// 			setOpenDeleteModal(true);
// 		}
// 	};
// 	const cancelAccountDelete = () => {
// 		setDeleteError(false);
// 		setOpenDeleteModal(false);
// 	};

// 	React.useEffect(() => {
// 		if (!state) {
// 			push('/dashboard');
// 		} else {
// 			setReceipt(state.membership);
// 			setHistory(state.history);
// 		}
// 	}, [push, state]);

// 	const { History, Delete } = SenterModals;

// 	return (
// 		(state && (
// 			<div>
// 				<PurchaseHeader />
// 				<CurrentReceipt open={openReceipt} receipt={receipt} />
// 				<PurchaseForm
// 					membership={state.membership}
// 					setOpenReceipt={setOpenReceipt}
// 					setReceipt={setReceipt}
// 				>
// 					<History
// 						open={openHistoryModal}
// 						history={history}
// 						receipt={receipt!}
// 						handleOpenHistoryModal={handleOpenHistoryModel}
// 						setOpenHistoryModal={setOpenHistoryModal}
// 					/>
// 					<Delete
// 						setDeleteError={setDeleteError}
// 						cancelAccountDelete={cancelAccountDelete}
// 						deleteError={deleteError}
// 						receipt={receipt!}
// 						open={openDeleteModal}
// 						handleOpenDeleteModal={handleOpenDeleteModal}
// 					/>
// 				</PurchaseForm>
// 			</div>
// 		)) ||
// 		null
// 	);
// };

// const PurchaseHeader = () => {
// 	const [appInfo, setAppInfo] = React.useState<PurchaseHeaderState>({
// 		name: '',
// 		version: '',
// 	});

// 	React.useEffect(() => {
// 		(async function () {
// 			setAppInfo(await API.fetchAppInfo());
// 		})();
// 	}, []);

// 	const { Header, Segment, Icon } = Semantic;

// 	return (
// 		<Segment className='Buy'>
// 			<Header inverted as='h1' size='huge' textAlign='left'>
// 				<Icon color='blue' name='braille' />
// 				<Header.Content>
// 					{appInfo.name}
// 					<Header.Subheader>
// 						Purchase Screen: {appInfo.version}
// 					</Header.Subheader>
// 				</Header.Content>
// 			</Header>
// 		</Segment>
// 	);
// };

// type PurchaseType = 'BUY' | 'RENEW' | 'NEW' | undefined;
// interface Membership {
// 	record?: number;
// 	account?: string;
// 	phone?: string;
// 	first?: string;
// 	last?: string;
// 	since?: string;
// 	fee?: number;
// 	gallon?: number;
// 	buy?: number;
// 	remain?: number;
// 	previous?: number;
// 	type?: PurchaseType;
// 	date?: string;
// 	time?: string;
// 	note?: string;
// }
// interface PurchaseHeaderState {
// 	name?: string;
// 	version?: string;
// }

// interface PurchaseFormProps {
// 	initialValues?: Membership;
// 	open?: boolean;
// 	transition?: Semantic.TransitionProps;
// 	children: React.ReactNode;
// 	membership: Membership;
// 	setOpenReceipt: React.Dispatch<React.SetStateAction<boolean>>;
// 	setReceipt: React.Dispatch<React.SetStateAction<Membership | undefined>>;
// }

// const SenterPurchaseFields = {
// 	Note: ({ edit }: SenterPurchaseFieldsProps) => (
// 		<ReactFinal.Field
// 			name='note'
// 			render={({ input }) => (
// 				<Semantic.Form.Input
// 					id='note'
// 					label='Note'
// 					placeholder='Add Note'
// 					className='AddNote'
// 					size='massive'
// 					spellCheck='false'
// 					inverted
// 					readOnly={!edit}
// 					error={edit}
// 					width={13}
// 					{...input}
// 				/>
// 			)}
// 		/>
// 	),
// 	Account: ({ edit, error }: SenterPurchaseFieldsProps) => (
// 		<ReactFinal.Field
// 			name='account'
// 			parse={Normalize.account}
// 			render={({ input }) => (
// 				<Semantic.Form.Input
// 					id='account'
// 					label='Account'
// 					placeholder='xxxxxxx'
// 					error={error ? error : edit}
// 					readOnly={!edit}
// 					className='Name'
// 					{...input}
// 					size='massive'
// 					inverted
// 					width={2}
// 				/>
// 			)}
// 		/>
// 	),
// 	Since: ({ edit }: SenterPurchaseFieldsProps) => (
// 		<ReactFinal.Field
// 			name='since'
// 			render={({ input }) => (
// 				<Semantic.Form.Input
// 					disabled={edit}
// 					className='Name'
// 					id='memberSince'
// 					label='Member Since'
// 					size='massive'
// 					inverted
// 					readOnly
// 					width={2}
// 					{...input}
// 				/>
// 			)}
// 		/>
// 	),
// 	Phone: ({ edit }: SenterPurchaseFieldsProps) => (
// 		<ReactFinal.Field
// 			name='phone'
// 			parse={Normalize.phone}
// 			render={({ input }) => (
// 				<Semantic.Form.Input
// 					id='phone'
// 					label='Phone Number'
// 					readOnly={!edit}
// 					error={edit}
// 					className='Phone'
// 					placeholder='xxx-xxx-xxxx'
// 					{...input}
// 					size='massive'
// 					inverted
// 					width={3}
// 				/>
// 			)}
// 		/>
// 	),
// 	FirstName: ({ edit }: SenterPurchaseFieldsProps) => (
// 		<ReactFinal.Field
// 			name='first'
// 			parse={Normalize.name}
// 			render={({ input }) => (
// 				<Semantic.Form.Input
// 					readOnly={!edit}
// 					error={edit}
// 					id='firstName'
// 					label='First Name'
// 					className='Name'
// 					spellCheck='false'
// 					placeholder='First Name'
// 					size='massive'
// 					inverted
// 					{...input}
// 					width={3}
// 				/>
// 			)}
// 		/>
// 	),
// 	LastName: ({ edit }: SenterPurchaseFieldsProps) => (
// 		<ReactFinal.Field
// 			name='last'
// 			parse={Normalize.name}
// 			render={({ input }) => (
// 				<Semantic.Form.Input
// 					id='lastName'
// 					{...input}
// 					error={edit}
// 					label='Last Name'
// 					className='Name'
// 					placeholder='Last Name'
// 					spellCheck='false'
// 					size='massive'
// 					inverted
// 					readOnly={!edit}
// 					width={3}
// 				/>
// 			)}
// 		/>
// 	),
// 	Date: ({ edit }: SenterPurchaseFieldsProps) => (
// 		<ReactFinal.Field
// 			name='date'
// 			render={({ input }) => (
// 				<Semantic.Form.Input
// 					disabled={edit}
// 					fluid
// 					id='date'
// 					label='Date'
// 					className='Name'
// 					placeholder='mm/dd/yyyy'
// 					size='massive'
// 					inverted
// 					readOnly
// 					{...input}
// 					width={2}
// 				/>
// 			)}
// 		/>
// 	),
// 	Time: ({ edit }: SenterPurchaseFieldsProps) => (
// 		<ReactFinal.Field
// 			name='time'
// 			render={({ input }) => (
// 				<Semantic.Form.Input
// 					disabled={edit}
// 					id='time'
// 					label='Time'
// 					className='Name'
// 					placeholder='xx:xx:xx'
// 					{...input}
// 					size='massive'
// 					inverted
// 					readOnly
// 					width={2}
// 				/>
// 			)}
// 		/>
// 	),
// 	Buy: ({ edit, callback }: SenterPurchaseFieldsProps) => (
// 		<ReactFinal.Field
// 			id='buy'
// 			name='buy'
// 			parse={Normalize.gallon}
// 			render={({ input }) => (
// 				<Semantic.Form.Input
// 					{...input}
// 					disabled={edit}
// 					className='Amount'
// 					id='buy'
// 					label='Buy'
// 					inverted
// 					size='massive'
// 					width={2}
// 					onFocus={callback}
// 				/>
// 			)}
// 		/>
// 	),
// 	Remain: ({ edit }: SenterPurchaseFieldsProps) => (
// 		<ReactFinal.Field
// 			name='remain'
// 			render={({ input }) => (
// 				<Semantic.Form.Input
// 					error={input.value <= 0 ? true : false}
// 					disabled={edit}
// 					className='Amount'
// 					inverted
// 					id='remain'
// 					label='Remain'
// 					readOnly
// 					{...input}
// 					size='massive'
// 					width={2}
// 				/>
// 			)}
// 		/>
// 	),
// 	Fee: ({ edit, callback }: SenterPurchaseFieldsProps) => (
// 		<ReactFinal.Field
// 			name='fee'
// 			parse={Normalize.fee}
// 			render={({ input }) => (
// 				<Semantic.Form.Input
// 					id='fee'
// 					className='Amount'
// 					label='Fee'
// 					size='massive'
// 					inverted
// 					width={2}
// 					disabled={edit}
// 					{...input}
// 					onFocus={callback}
// 				/>
// 			)}
// 		/>
// 	),
// 	Gallon: ({ edit, callback, keyPress }: SenterPurchaseFieldsProps) => (
// 		<ReactFinal.Field
// 			name='gallon'
// 			parse={Normalize.gallon}
// 			render={({ input }) => (
// 				<Semantic.Form.Input
// 					id='gallon'
// 					label='Gallon'
// 					className='Amount'
// 					size='massive'
// 					inverted
// 					width={2}
// 					disabled={edit}
// 					{...input}
// 					onFocus={callback}
// 					onKeyPress={keyPress}
// 				/>
// 			)}
// 		/>
// 	),
// };
// const SenterPurchaseButtons = {
// 	EditButton: ({ submitting, values, edit, callback }: EditButtonProps) => (
// 		<Semantic.Form.Button
// 			content={!edit ? 'Edit' : 'Save'}
// 			type='button'
// 			disabled={
// 				submitting ||
// 				!values.first ||
// 				!values.last ||
// 				!values.phone ||
// 				!values.account ||
// 				values.phone.length < 14
// 			}
// 			color={edit ? 'google plus' : 'vk'}
// 			size='massive'
// 			circular
// 			fluid
// 			width={2}
// 			style={{ marginTop: '30px' }}
// 			onClick={(event) => callback(event)}
// 		/>
// 	),
// 	CancelEditButton: ({ edit, callback }: CancelEditButtonProps) => (
// 		<Semantic.Form.Button
// 			content='Cancel'
// 			type='button'
// 			secondary
// 			fluid
// 			disabled={!edit}
// 			style={{ marginTop: '30px' }}
// 			size='massive'
// 			circular
// 			width={2}
// 			onClick={(event) => callback(event)}
// 		/>
// 	),
// 	BuyButton: ({ values, edit }: BuyButtonProps) => (
// 		<Semantic.Form.Button
// 			content='Buy'
// 			type='submit'
// 			positive
// 			fluid
// 			disabled={!values.buy || edit}
// 			style={{ marginTop: '30px' }}
// 			circular
// 			size='massive'
// 			width={3}
// 		/>
// 	),
// 	RenewButton: ({ values, edit }: RenewButtonProps) => (
// 		<Semantic.Form.Button
// 			content='Renew'
// 			type='submit'
// 			size='massive'
// 			primary
// 			fluid
// 			circular
// 			disabled={!values.gallon || !values.fee || edit}
// 			style={{ marginTop: '30px' }}
// 			width={3}
// 		/>
// 	),
// 	History: () => {},
// 	Delete: () => {},
// 	Done: ({ handleDone }: DoneButtonProps) => {
// 		const {
// 			Form: { Button },
// 		} = Semantic;
// 		return (
// 			<Button
// 				content='Done'
// 				color='black'
// 				size='huge'
// 				circular
// 				fluid
// 				type='button'
// 				onClick={handleDone}
// 			/>
// 		);
// 	},
// };
// interface DeleteModalProps {
// 	deleteError: boolean | string;
// 	receipt: Membership;
// 	open: boolean;
// 	handleOpenDeleteModal: () => void;
// 	cancelAccountDelete: () => void;
// 	setDeleteError: (error: boolean | string) => void;
// }

// Misc: {
// 	Portal: ({
// 		open = true,
// 		transition = { animation: 'fade', duration: 500 },
// 		children = null,
// 	}: PurchaseScreenPortalProps): JSX.Element => (
// 		<TransitionablePortal
// 			open={open}
// 			transition={transition}
// 			closeOnDocumentClick={false}
// 			closeOnEscape={false}
// 			closeOnDimmerClick={false}
// 			closeOnPortalMouseLeave={false}
// 		>
// 			<Segment className='Buy'>
// 				<Grid>
// 					<Grid.Column className='Buy'>{children}</Grid.Column>
// 				</Grid>
// 			</Segment>
// 		</TransitionablePortal>
// 	),
// 	CurrentReceipt: ({ open, receipt }: CurrentReceiptProps) => (
// 		<TransitionablePortal
// 			open={open}
// 			transition={{ animation: 'vertical flip', duration: 700 }}
// 			closeOnDocumentClick={false}
// 			closeOnEscape={false}
// 			closeOnDimmerClick={false}
// 			closeOnPortalMouseLeave={false}
// 		>
// 			<Segment
// 				style={{
// 					paddingRight: 14,
// 					paddingLeft: 14,
// 					paddingTop: 20,
// 					left: '0%',
// 					right: '0%',
// 					top: '0%',
// 					zIndex: 1000,
// 					backgroundColor: '#002b487d',
// 				}}
// 			>
// 				{receipt && <Senter.Table.LastReceipt record={receipt} />}
// 			</Segment>
// 		</TransitionablePortal>
// 	),
// 	Header: (): JSX.Element => {
// 		const { name, version } = Redux.useAppSelector((state) => state.app);
// 		return (
// 			<Segment className='Buy'>
// 				<Header inverted as='h1' size='huge' textAlign='left'>
// 					<Icon color='blue' name='braille' />
// 					<Header.Content>
// 						{name}
// 						<Header.Subheader>Purchase Screen: {version}</Header.Subheader>
// 					</Header.Content>
// 				</Header>
// 			</Segment>
// 		);
// 	},
// 	Form: ({
// 		onSubmit,
// 		initialValues,
// 		edit,
// 		error,
// 		handleEditAccount,
// 		handleCancelEdit,
// 		handleDone,
// 		children,
// 	}: PurchaseScreenFormProps): JSX.Element => {
// 		const {
// 			Note,
// 			Account,
// 			Since,
// 			Phone,
// 			FirstName,
// 			LastName,
// 			Date,
// 			Time,
// 			Buy,
// 			Remain,
// 			Fee,
// 			Gallon,
// 			EditButton,
// 			CancelEditButton,
// 			BuyButton,
// 			RenewButton,
// 		} = PurchaseScreenComponent;

// 		const handleRenewGallonKeyPress = (
// 			event: KeyboardEvent,
// 			values: Membership,
// 			form: FormApi
// 		) =>
// 			(event.key === 'Enter' || event.keyCode === 13) &&
// 			values.fee! > 0 &&
// 			values.gallon! > 0
// 				? form.submit()?.then((response) => {
// 						form.initialize({
// 							...response,
// 							previous: response!.remain,
// 							type: 'BUY',
// 							buy: 0,
// 							fee: 0,
// 							gallon: 0,
// 							date: getDate(),
// 							time: getTime(),
// 						});
// 						console.log('Renew Button Press');
// 						document.getElementById('buy')?.focus();
// 				  })
// 				: null;

// 		return (
// 			<ReactFinal.Form
// 				initialValuesEqual={() => true}
// 				onSubmit={onSubmit}
// 				initialValues={initialValues}
// 				render={({
// 					handleSubmit,
// 					submitting,
// 					initialValues,
// 					values,
// 					form,
// 				}) => (
// 					<Form onSubmit={handleSubmit}>
// 						<Form.Group>
// 							<Note edit={edit} />
// 							<Date edit={edit} />
// 							<Time edit={edit} />
// 						</Form.Group>
// 						<Divider hidden />
// 						<Form.Group>
// 							<Account edit={edit} error={error} />
// 							<Since edit={edit} />
// 							<Phone edit={edit} />
// 							<FirstName edit={edit} />
// 							<LastName edit={edit} />
// 							<EditButton
// 								edit={edit}
// 								submitting={submitting}
// 								values={values}
// 								callback={(event) => {
// 									event.preventDefault();
// 									handleEditAccount(initialValues, values, form);
// 								}}
// 							/>
// 							<CancelEditButton
// 								edit={edit}
// 								callback={(event) => {
// 									event.preventDefault();
// 									handleCancelEdit(form, values, initialValues);
// 								}}
// 							/>
// 							{/* <Date edit={edit} />
// 								<Time edit={edit} /> */}
// 						</Form.Group>
// 						<Divider hidden />
// 						<Form.Group>
// 							<Form.Input type='hidden' width={14} />
// 							<Buy
// 								edit={edit}
// 								callback={() => {
// 									form.batch(() => {
// 										form.change('fee', 0);
// 										form.change('gallon', 0);
// 									});
// 								}}
// 							/>
// 							<Remain edit={edit} />
// 							<BuyButton edit={edit} values={values} />
// 						</Form.Group>
// 						<Form.Group>
// 							<Form.Input type='hidden' width={14} />
// 							<Fee edit={edit} callback={() => form.change('buy', 0)} />
// 							<Gallon
// 								edit={edit}
// 								keyPress={(event) =>
// 									handleRenewGallonKeyPress(event, values, form)
// 								}
// 								callback={() => form.change('buy', 0)}
// 							/>
// 							<RenewButton values={values} edit={edit} />
// 						</Form.Group>
// 						<Divider hidden />
// 						<Divider hidden />
// 						<Divider hidden />
// 						<Form.Group>
// 							<Form.Input type='hidden' width={14} />
// 							{children}
// 							<Form.Button
// 								fluid
// 								width={2}
// 								content='Done'
// 								color='black'
// 								size='massive'
// 								circular
// 								type='button'
// 								onClick={handleDone}
// 								// onClick={() => {
// 								// 	setEdit(false);
// 								// 	setError(false);
// 								// 	push('/dashboard');
// 								// }}
// 							/>
// 						</Form.Group>
// 					</Form>
// 				)}
// 			/>
// 		);
// 	},
// 	Note: ({ edit }: SenterPurchaseFieldsProps) => (
// 		<ReactFinal.Field
// 			name='note'
// 			render={({ input }) => (
// 				<Semantic.Form.Input
// 					id='note'
// 					label='Note'
// 					placeholder='Add Note'
// 					className='AddNote'
// 					size='massive'
// 					spellCheck='false'
// 					inverted
// 					readOnly={!edit}
// 					error={edit}
// 					width={13}
// 					{...input}
// 				/>
// 			)}
// 		/>
// 	),
// 	Account: ({ edit, error }: SenterPurchaseFieldsProps) => (
// 		<ReactFinal.Field
// 			name='account'
// 			parse={Normalize.account}
// 			render={({ input }) => (
// 				<Semantic.Form.Input
// 					id='account'
// 					label='Account'
// 					placeholder='xxxxxxx'
// 					error={error ? error : edit}
// 					readOnly={!edit}
// 					className='Name'
// 					{...input}
// 					size='massive'
// 					inverted
// 					width={2}
// 				/>
// 			)}
// 		/>
// 	),
// 	Since: ({ edit }: SenterPurchaseFieldsProps) => (
// 		<ReactFinal.Field
// 			name='since'
// 			render={({ input }) => (
// 				<Semantic.Form.Input
// 					disabled={edit}
// 					className='Name'
// 					id='memberSince'
// 					label='Member Since'
// 					size='massive'
// 					inverted
// 					readOnly
// 					width={2}
// 					{...input}
// 				/>
// 			)}
// 		/>
// 	),
// 	Phone: ({ edit }: SenterPurchaseFieldsProps) => (
// 		<ReactFinal.Field
// 			name='phone'
// 			parse={Normalize.phone}
// 			render={({ input }) => (
// 				<Semantic.Form.Input
// 					id='phone'
// 					label='Phone Number'
// 					readOnly={!edit}
// 					error={edit}
// 					className='Phone'
// 					placeholder='xxx-xxx-xxxx'
// 					{...input}
// 					size='massive'
// 					inverted
// 					width={3}
// 				/>
// 			)}
// 		/>
// 	),
// 	FirstName: ({ edit }: SenterPurchaseFieldsProps) => (
// 		<ReactFinal.Field
// 			name='first'
// 			parse={Normalize.name}
// 			render={({ input }) => (
// 				<Semantic.Form.Input
// 					readOnly={!edit}
// 					error={edit}
// 					id='firstName'
// 					label='First Name'
// 					className='Name'
// 					spellCheck='false'
// 					placeholder='First Name'
// 					size='massive'
// 					inverted
// 					{...input}
// 					width={3}
// 				/>
// 			)}
// 		/>
// 	),
// 	LastName: ({ edit }: SenterPurchaseFieldsProps) => (
// 		<ReactFinal.Field
// 			name='last'
// 			parse={Normalize.name}
// 			render={({ input }) => (
// 				<Semantic.Form.Input
// 					id='lastName'
// 					{...input}
// 					error={edit}
// 					label='Last Name'
// 					className='Name'
// 					placeholder='Last Name'
// 					spellCheck='false'
// 					size='massive'
// 					inverted
// 					readOnly={!edit}
// 					width={3}
// 				/>
// 			)}
// 		/>
// 	),
// 	Date: ({ edit }: SenterPurchaseFieldsProps) => (
// 		<ReactFinal.Field
// 			name='date'
// 			render={({ input }) => (
// 				<Semantic.Form.Input
// 					disabled={edit}
// 					fluid
// 					id='date'
// 					label='Date'
// 					className='Name'
// 					placeholder='mm/dd/yyyy'
// 					size='massive'
// 					inverted
// 					readOnly
// 					{...input}
// 					width={2}
// 				/>
// 			)}
// 		/>
// 	),
// 	Time: ({ edit }: SenterPurchaseFieldsProps) => (
// 		<ReactFinal.Field
// 			name='time'
// 			render={({ input }) => (
// 				<Semantic.Form.Input
// 					disabled={edit}
// 					id='time'
// 					label='Time'
// 					className='Name'
// 					placeholder='xx:xx:xx'
// 					{...input}
// 					size='massive'
// 					inverted
// 					readOnly
// 					width={2}
// 				/>
// 			)}
// 		/>
// 	),
// 	Buy: ({ edit, callback }: SenterPurchaseFieldsProps) => (
// 		<ReactFinal.Field
// 			id='buy'
// 			name='buy'
// 			parse={Normalize.gallon}
// 			render={({ input }) => (
// 				<Semantic.Form.Input
// 					{...input}
// 					disabled={edit}
// 					className='Amount'
// 					id='buy'
// 					label='Buy'
// 					inverted
// 					size='massive'
// 					width={2}
// 					onFocus={callback}
// 				/>
// 			)}
// 		/>
// 	),
// 	Remain: ({ edit }: SenterPurchaseFieldsProps) => (
// 		<ReactFinal.Field
// 			name='remain'
// 			render={({ input }) => (
// 				<Semantic.Form.Input
// 					error={input.value <= 0 ? true : false}
// 					disabled={edit}
// 					className='Amount'
// 					inverted
// 					id='remain'
// 					label='Remain'
// 					readOnly
// 					{...input}
// 					size='massive'
// 					width={2}
// 				/>
// 			)}
// 		/>
// 	),
// 	Fee: ({ edit, callback }: SenterPurchaseFieldsProps) => (
// 		<ReactFinal.Field
// 			name='fee'
// 			parse={Normalize.fee}
// 			render={({ input }) => (
// 				<Semantic.Form.Input
// 					id='fee'
// 					className='Amount'
// 					label='Fee'
// 					size='massive'
// 					inverted
// 					width={2}
// 					disabled={edit}
// 					{...input}
// 					onFocus={callback}
// 				/>
// 			)}
// 		/>
// 	),
// 	Gallon: ({ edit, callback, keyPress }: SenterPurchaseFieldsProps) => (
// 		<ReactFinal.Field
// 			name='gallon'
// 			parse={Normalize.gallon}
// 			render={({ input }) => (
// 				<Semantic.Form.Input
// 					id='gallon'
// 					label='Gallon'
// 					className='Amount'
// 					size='massive'
// 					inverted
// 					width={2}
// 					disabled={edit}
// 					{...input}
// 					onFocus={callback}
// 					onKeyPress={keyPress}
// 				/>
// 			)}
// 		/>
// 	),
// 	EditButton: ({ submitting, values, edit, callback }: EditButtonProps) => (
// 		<Semantic.Form.Button
// 			content={!edit ? 'Edit' : 'Save'}
// 			type='button'
// 			disabled={
// 				submitting ||
// 				!values.first ||
// 				!values.last ||
// 				!values.phone ||
// 				!values.account ||
// 				values.phone.length < 14
// 			}
// 			color={edit ? 'google plus' : 'vk'}
// 			size='massive'
// 			circular
// 			fluid
// 			width={2}
// 			style={{ marginTop: '30px' }}
// 			onClick={(event) => callback(event)}
// 		/>
// 	),
// 	CancelEditButton: ({ edit, callback }: CancelEditButtonProps) => (
// 		<Semantic.Form.Button
// 			content='Cancel'
// 			type='button'
// 			secondary
// 			fluid
// 			disabled={!edit}
// 			style={{ marginTop: '30px' }}
// 			size='massive'
// 			circular
// 			width={2}
// 			onClick={(event) => callback(event)}
// 		/>
// 	),
// 	BuyButton: ({ values, edit }: BuyButtonProps) => (
// 		<Semantic.Form.Button
// 			content='Buy'
// 			type='submit'
// 			positive
// 			fluid
// 			disabled={!values.buy || edit}
// 			style={{ marginTop: '30px' }}
// 			circular
// 			size='massive'
// 			width={3}
// 		/>
// 	),
// 	RenewButton: ({ values, edit }: RenewButtonProps) => (
// 		<Semantic.Form.Button
// 			content='Renew'
// 			type='submit'
// 			size='massive'
// 			primary
// 			fluid
// 			circular
// 			disabled={!values.gallon || !values.fee || edit}
// 			style={{ marginTop: '30px' }}
// 			width={3}
// 		/>
// 	),
// 	Done: ({ handleDone }: DoneButtonProps) => {
// 		const {
// 			Form: { Button },
// 		} = Semantic;
// 		return (
// 			<Button
// 				content='Done'
// 				color='black'
// 				size='huge'
// 				circular
// 				fluid
// 				type='button'
// 				onClick={handleDone}
// 			/>
// 		);
// 	},
// 	History: ({
// 		open,
// 		receipt,
// 		handleOpenHistoryModal,
// 		setOpenHistoryModal,
// 		history,
// 	}: HistoryModalProps) => {
// 		const {
// 			Modal,
// 			Form: { Button },
// 		} = Semantic;
// 		const { AccountHeaderTable, HistoryTable } = PurchaseScreenComponent;

// 		return (
// 			<>
// 				<Button
// 					width={3}
// 					content='History'
// 					color='teal'
// 					size='massive'
// 					circular
// 					fluid
// 					onClick={handleOpenHistoryModal}
// 				/>
// 				<Modal dimmer='blurring' open={open}>
// 					<Modal.Header>
// 						<AccountHeaderTable receipt={receipt} />
// 					</Modal.Header>
// 					<Modal.Content>
// 						<HistoryTable
// 							history={history}
// 							setOpenHistoryModal={setOpenHistoryModal}
// 						/>
// 					</Modal.Content>
// 				</Modal>
// 			</>
// 		);
// 	},
// 	Delete: ({
// 		open,
// 		receipt,
// 		deleteError,
// 		handleOpenDeleteModal,
// 		cancelAccountDelete,
// 		setDeleteError,
// 	}: DeleteAccountModalProps) => {
// 		const { push } = ReactRouter.useHistory();
// 		const {
// 			Form: { Button, Input },
// 			Modal,
// 			Table,
// 			Message,
// 		} = Semantic;

// 		const [password, setPassword] = React.useState('');
// 		const [error, setError] = React.useState<boolean | string>(false);

// 		const deleteAccount = async (
// 			member: Membership,
// 			password: string
// 		): Promise<void> => {
// 			const { status } = await API.deleteMembership(
// 				member.account!,
// 				password
// 			);
// 			console.log(status);
// 			if (status) {
// 				push('/dashboard');
// 			} else {
// 				setDeleteError('invalid password');
// 			}
// 		};

// 		return (
// 			<>
// 				<Button
// 					width={2}
// 					fluid
// 					content='Delete'
// 					size='massive'
// 					negative
// 					circular
// 					onClick={handleOpenDeleteModal}
// 				/>
// 				{receipt && (
// 					<Modal
// 						open={open}
// 						basic
// 						closeOnDimmerClick={false}
// 						closeOnEscape={false}
// 						closeOnPortalMouseLeave={false}
// 						closeOnDocumentClick={false}
// 						closeOnTriggerClick={false}
// 					>
// 						<Modal.Header>{receipt!.account}</Modal.Header>
// 						<Modal.Content>
// 							<Table color='red' celled size='large'>
// 								<Table.Header>
// 									<Table.Row textAlign='center'>
// 										<Table.HeaderCell>Account</Table.HeaderCell>
// 										<Table.HeaderCell>MemberSince</Table.HeaderCell>
// 										<Table.HeaderCell>Phone</Table.HeaderCell>
// 										<Table.HeaderCell>Name</Table.HeaderCell>
// 									</Table.Row>
// 								</Table.Header>
// 								<Table.Body>
// 									<Table.Row textAlign='center'>
// 										<Table.Cell content={receipt!.account} />
// 										<Table.Cell content={receipt!.since} />
// 										<Table.Cell content={receipt!.phone} />
// 										<Table.Cell
// 											content={receipt!.first + ' ' + receipt!.last}
// 										/>
// 									</Table.Row>
// 								</Table.Body>
// 							</Table>
// 						</Modal.Content>
// 						<Modal.Actions>
// 							{deleteError && (
// 								<Message negative>
// 									<Message.Header>
// 										Please enter a valid password to delete account
// 									</Message.Header>
// 								</Message>
// 							)}
// 							<Button
// 								content='Cancel'
// 								floated='right'
// 								secondary
// 								onClick={cancelAccountDelete}
// 							/>
// 							<Button
// 								floated='right'
// 								primary
// 								onClick={() => deleteAccount(receipt!, password)}
// 							>
// 								Delete
// 							</Button>
// 							<Input
// 								id={receipt!.account}
// 								name='password'
// 								type='password'
// 								error={error ? true : false}
// 								placeholder='password'
// 								onChange={(event, data) => {
// 									event.preventDefault();
// 									if (error) {
// 										setError(false);
// 									}
// 									setPassword(data.value);
// 								}}
// 							/>
// 						</Modal.Actions>
// 					</Modal>
// 				)}
// 			</>
// 		);
// 	},
// 	PurchaseScreen: (): JSX.Element => {
// 		// React Router Hooks
// 		const { state } = ReactRouter.useLocation<{
// 			membership: Membership;
// 			history: Membership[];
// 		}>();

// 		const { push } = ReactRouter.useHistory();

// 		// Receipt
// 		const [openReceipt, setOpenReceipt] = React.useState(true);
// 		const [receipt, setReceipt] = React.useState<Membership | undefined>();

// 		// History Modal State and Event Handler
// 		const [history, setHistory] = React.useState<Membership[]>([]);
// 		const [openHistoryModal, setOpenHistoryModal] = React.useState(false);
// 		const handleOpenHistoryModel = async () => {
// 			if (receipt && receipt.account) {
// 				const response = await API.getHistory(receipt.account);
// 				setHistory(response);
// 				setOpenHistoryModal(true);
// 				setOpenReceipt(true);
// 			}
// 		};

// 		// Delete Modal State and Handler
// 		const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
// 		const [deleteError, setDeleteError] = React.useState<boolean | string>(
// 			false
// 		);
// 		const handleOpenDeleteModal = async () => {
// 			if (receipt && receipt.account) {
// 				const lastRecord = await API.fetchMemberLatestRecord(receipt.account);
// 				setReceipt(lastRecord);
// 				setOpenReceipt(false);
// 				setOpenReceipt(true);
// 				setOpenDeleteModal(true);
// 			}
// 		};
// 		const cancelAccountDelete = () => {
// 			setDeleteError(false);
// 			setOpenDeleteModal(false);
// 		};

// 		const [edit, setEdit] = React.useState(false);
// 		const [error, setError] = React.useState<boolean | string>(false);

// 		const handleEditAccount = async (
// 			initialValues: Membership,
// 			values: Membership,
// 			form: FormApi
// 		) => {
// 			setEdit(true);
// 			if (edit) {
// 				const { duplicate, updatedRecord } = await API.editMembership(
// 					initialValues,
// 					values
// 				);

// 				if (duplicate) {
// 					setError(`${values.account} already existed`);
// 					setEdit(true);
// 					return;
// 				}

// 				if (updatedRecord) {
// 					const { note, account, phone, first, last } = updatedRecord;
// 					setReceipt(updatedRecord);

// 					setOpenReceipt(false);
// 					setOpenReceipt(true);

// 					form.initialize({
// 						...initialValues,
// 						note,
// 						account,
// 						first,
// 						last,
// 						phone,
// 						remain: values.remain,
// 						buy: values.buy,
// 						fee: values.fee,
// 						gallon: values.gallon,
// 					});
// 					setError(false);
// 					setEdit(false);
// 					return;
// 				}
// 			}
// 		};
// 		const handleCancelEdit = (
// 			form: FormApi,
// 			values: Membership,
// 			initialValues: Membership
// 		) => {
// 			setEdit(!edit);

// 			if (edit) {
// 				// Save Edit Here
// 				setError(false);
// 				if (initialValues) {
// 					form.reset(initialValues);
// 					form.change('remain', values.remain);
// 					form.change('buy', values.buy);
// 					form.change('fee', values.fee);
// 					form.change('gallon', values.gallon);
// 				}
// 			}
// 		};

// 		const handleDone = () => {
// 			setEdit(false);
// 			setError(false);
// 			push('/dashboard');
// 		};
// 		const onSubmit = async (
// 			values: Membership,
// 			form: FormApi
// 		): Promise<Membership> => {
// 			const { fee, buy, previous, gallon } = values;
// 			setOpenReceipt(false);

// 			// Membership Water Purchase by Gallon, update remain
// 			if (buy) {
// 				const updatedReceipt = await API.buyMembership({
// 					...values,
// 					record: undefined,
// 					remain: previous! - buy,
// 					type: 'BUY',
// 				});

// 				console.log({ ...updatedReceipt });

// 				setReceipt(updatedReceipt);
// 				setOpenReceipt(true);

// 				form.initialize({
// 					...updatedReceipt,
// 					previous: updatedReceipt.remain,
// 					type: 'BUY',
// 					buy: 0,
// 					fee: 0,
// 					gallon: 0,
// 					date: getDate(),
// 					time: getTime(),
// 				});
// 			}

// 			// Membership Water Renew Fee
// 			if (fee) {
// 				const updatedReceipt = await API.renewMembership({
// 					...values,
// 					record: undefined,
// 					remain: gallon! + previous!,
// 					type: 'RENEW',
// 				});
// 				console.log({ ...updatedReceipt });

// 				form.initialize({
// 					...updatedReceipt,
// 					previous: updatedReceipt.remain,
// 					type: 'BUY',
// 					buy: 0,
// 					fee: 0,
// 					gallon: 0,
// 					date: getDate(),
// 					time: getTime(),
// 				});

// 				setReceipt(updatedReceipt);
// 				setOpenReceipt(true);
// 				return updatedReceipt;
// 			}

// 			return values;
// 		};
// 		const { History, Delete } = PurchaseScreenComponent;

// 		React.useEffect(() => {
// 			if (!state) {
// 				push('/dashboard');
// 			} else {
// 				setReceipt(state.membership);
// 				setHistory(state.history);
// 			}
// 		}, [push, state]);

// 		const { membership } = state || {
// 			membership: {
// 				note: '',
// 				account: '',
// 				since: '',
// 				phone: '',
// 				first: '',
// 				last: '',
// 				previous: 0,
// 				type: undefined,
// 				buy: 0,
// 				remain: 0,
// 				fee: 0,
// 				gallon: 0,
// 				date: getDate(),
// 				time: getTime(),
// 			},
// 		};

// 		const initialValues = {
// 			note: membership.note,
// 			account: membership.account,
// 			since: membership.since,
// 			phone: membership.phone,
// 			first: membership.first,
// 			last: membership.last,
// 			previous: membership.remain,
// 			type: membership.type,
// 			buy: 0,
// 			remain: membership.remain,
// 			fee: 0,
// 			gallon: 0,
// 			date: getDate(),
// 			time: getTime(),
// 		};

// 		const { Portal, Header, Form, CurrentReceipt } = PurchaseScreenComponent;
// 		return (
// 			<>
// 				<Header />
// 				<CurrentReceipt open={openReceipt} receipt={receipt} />
// 				<Portal>
// 					<Form
// 						edit={edit}
// 						error={error}
// 						onSubmit={onSubmit}
// 						initialValues={initialValues}
// 						handleEditAccount={handleEditAccount}
// 						handleCancelEdit={handleCancelEdit}
// 						handleDone={handleDone}
// 					>
// 						<History
// 							open={openHistoryModal}
// 							history={history}
// 							receipt={receipt!}
// 							handleOpenHistoryModal={handleOpenHistoryModel}
// 							setOpenHistoryModal={setOpenHistoryModal}
// 						/>
// 						<Delete
// 							setDeleteError={setDeleteError}
// 							cancelAccountDelete={cancelAccountDelete}
// 							deleteError={deleteError}
// 							receipt={receipt!}
// 							open={openDeleteModal}
// 							handleOpenDeleteModal={handleOpenDeleteModal}
// 						/>
// 					</Form>
// 				</Portal>
// 			</>
// 		);
// 	},
// 	AccountHeaderTable: ({ receipt }: AccountHeaderTableProps) => {
// 		const { Table } = Semantic;
// 		return (
// 			<Table color='blue' inverted size='large'>
// 				<Table.Header fullWidth>
// 					<Table.Row style={{ fontSize: '20px', fontWeight: 'bold' }}>
// 						<Table.HeaderCell>Name</Table.HeaderCell>
// 						<Table.HeaderCell>Phone Number</Table.HeaderCell>
// 						<Table.HeaderCell>Account #</Table.HeaderCell>
// 						<Table.HeaderCell>Member Since</Table.HeaderCell>
// 					</Table.Row>
// 					<Table.Row style={{ fontSize: '20px', fontWeight: 'bold' }}>
// 						<Table.Cell>{receipt.first + ' ' + receipt.last}</Table.Cell>
// 						<Table.Cell>{receipt.phone}</Table.Cell>
// 						<Table.Cell>{receipt.account}</Table.Cell>
// 						<Table.Cell>{receipt.since}</Table.Cell>
// 					</Table.Row>
// 				</Table.Header>
// 			</Table>
// 		);
// 	},
// 	HistoryTable: ({ history, setOpenHistoryModal }: HistoryTableProps) => {
// 		const itemPerPage = 8;
// 		const [activePage, setActivePage] = React.useState(1);
// 		const [totalPages, setTotalPages] = React.useState(0);

// 		const handlePagination = (
// 			event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
// 			{ activePage }: Semantic.PaginationProps
// 		) => {
// 			event.preventDefault();
// 			if (activePage && typeof activePage === 'number') {
// 				setActivePage(activePage);
// 			}
// 		};

// 		const handleCloseHistoryModal = () => {
// 			setActivePage(1);
// 			setOpenHistoryModal(false);
// 			document.getElementById('buy')?.focus();
// 		};

// 		const {
// 			Table,
// 			Pagination,
// 			Form: { Button },
// 		} = Semantic;

// 		React.useEffect(() => {
// 			setTotalPages(Math.ceil(history.length / itemPerPage));
// 		}, [history]);

// 		return (
// 			<Table celled color='blue' compact>
// 				<Table.Header fullWidth>
// 					<Table.Row>
// 						<Table.HeaderCell />
// 						<Table.HeaderCell colSpan={historyHeaderCells.length}>
// 							<Pagination
// 								defaultActivePage={activePage}
// 								ellipsisItem={null}
// 								firstItem={null}
// 								lastItem={null}
// 								totalPages={totalPages ? totalPages : 1}
// 								onPageChange={handlePagination}
// 							/>
// 						</Table.HeaderCell>
// 					</Table.Row>
// 				</Table.Header>
// 				<Table.Header fullWidth>
// 					<Table.Row textAlign='center'>
// 						{historyHeaderCells.map((data, index) => (
// 							<Table.HeaderCell content={data} key={index} />
// 						))}
// 					</Table.Row>
// 				</Table.Header>
// 				<Table.Body>
// 					{history
// 						.map((item, index) => (
// 							<Table.Row
// 								textAlign='center'
// 								key={index}
// 								warning={item.type === 'NEW'}
// 								style={{ fontSize: '20px' }}
// 							>
// 								<Table.Cell>{index + 1}</Table.Cell>
// 								<Table.Cell>{item.type}</Table.Cell>
// 								<Table.Cell>{'$' + item.fee}</Table.Cell>
// 								<Table.Cell>{item.gallon}</Table.Cell>
// 								<Table.Cell>{item.previous}</Table.Cell>
// 								<Table.Cell>{item.buy}</Table.Cell>
// 								<Table.Cell>{item.remain}</Table.Cell>
// 								<Table.Cell>{item.date}</Table.Cell>
// 								<Table.Cell>{item.time}</Table.Cell>
// 								<Table.Cell>{item.record}</Table.Cell>
// 							</Table.Row>
// 						))
// 						.slice((activePage - 1) * itemPerPage, activePage * itemPerPage)}
// 				</Table.Body>
// 				<Table.Footer>
// 					<Table.Row>
// 						<Table.HeaderCell colSpan={historyHeaderCells.length}>
// 							<Button
// 								floated='right'
// 								negative
// 								circular
// 								size='huge'
// 								content='Close'
// 								onClick={handleCloseHistoryModal}
// 							/>
// 						</Table.HeaderCell>
// 					</Table.Row>
// 				</Table.Footer>
// 			</Table>
// 		);
// 	},
// },
