import * as React from 'react';
import * as Redux from '../app/hooks';
import * as ReactRouter from 'react-router-dom';
import * as Semantic from 'semantic-ui-react';
import { API } from '../app/service/api';
import type {
	ScreenPortalProps,
	Membership,
	AccountHeaderProps,
	AccountListProps,
	AccountPaginationProps,
	SelectButtonProps,
	DeleteButtonProps,
	DeleteModalProps,
} from './types';

const {
	TransitionablePortal,
	TransitionGroup,
	Pagination,
	Modal,
	Segment,
	Grid,
	Header,
	Icon,
	Menu,
	List,
	Label,
	Input,
	Divider,
	Button,
	Form,
} = Semantic;

export const AccountScreenComponent = {
	Portal: ({
		open = true,
		transition = { animation: 'fade', duration: 500 },
		children = null,
	}: ScreenPortalProps) => (
		<TransitionablePortal
			open={open}
			transition={transition}
			closeOnDocumentClick={false}
			closeOnEscape={false}
			closeOnDimmerClick={false}
			closeOnPortalMouseLeave={false}
		>
			<Segment className='Account'>
				<Grid>
					<Grid.Column>{children}</Grid.Column>
				</Grid>
			</Segment>
		</TransitionablePortal>
	),
	Header: ({ children }: AccountHeaderProps) => {
		const { name, version } = Redux.useAppSelector((state) => state.app);
		return (
			<Header inverted as='h1' size='huge' textAlign='left'>
				<Icon color='blue' name='braille' />
				<Header.Content>
					{name}
					<Header.Subheader>Member Account: version {version}</Header.Subheader>
				</Header.Content>
				<Divider hidden />
				<Divider hidden />
				{children}
			</Header>
		);
	},
	Pagination: ({
		activePage,
		totalPages,
		handlePagination,
	}: AccountPaginationProps) => (
		<Pagination
			boundaryRange={10}
			defaultActivePage={activePage}
			ellipsisItem={null}
			firstItem={null}
			lastItem={null}
			totalPages={totalPages ? totalPages : 1}
			onPageChange={handlePagination}
		/>
	),
	List: ({
		accounts,
		activePage,
		itemPerPage,
		handleOpenDeleteAccount,
		handleSelectAccount,
	}: AccountListProps) => {
		const { SelectButton, DeleteButton } = AccountScreenComponent;
		return (
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
									<SelectButton
										handleSelectAccount={() => handleSelectAccount(item)}
									/>
									<DeleteButton
										handleOpenDeleteAccount={() =>
											handleOpenDeleteAccount(item)
										}
									/>
								</Menu.Item>
							</Menu>
						</List.Item>
					))
					.slice((activePage - 1) * itemPerPage, activePage * itemPerPage)}
			</TransitionGroup>
		);
	},
	SelectButton: ({ handleSelectAccount }: SelectButtonProps) => (
		<Form.Button
			primary
			content='Select'
			size='massive'
			circular
			onClick={handleSelectAccount}
		/>
	),
	DeleteButton: ({ handleOpenDeleteAccount }: DeleteButtonProps) => (
		<Form.Button
			negative
			circular
			size='massive'
			content='Delete'
			onClick={handleOpenDeleteAccount}
		/>
	),
	Modal: ({
		open,
		account,
		error,
		phone,
		name,
		handleChange,
		handleDelete,
		handleCancel,
	}: DeleteModalProps) => {
		return (
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
							<Menu.Item name='Account' active={true} icon='hashtag' />
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
						onClick={handleDelete}
					/>
					<Button
						content='Cancel'
						circular
						size='massive'
						secondary
						onClick={handleCancel}
					/>
				</Modal.Actions>
			</Modal>
		);
	},
	AccountScreen: () => {
		// React Router DOM state, and hooks
		const { state } = ReactRouter.useLocation<{ accounts: Membership[] }>();
		const { push } = ReactRouter.useHistory();

		// React Local State
		const [accounts, setAccounts] = React.useState(state ? state.accounts : []);

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

		const { Portal, Header, Pagination, List, Modal } = AccountScreenComponent;
		return (
			<>
				<Portal>
					<Header>
						<Pagination
							activePage={activePage}
							totalPages={totalPages}
							handlePagination={handlePagination}
						/>
						<List
							accounts={accounts}
							activePage={activePage}
							itemPerPage={itemPerPage}
							handleSelectAccount={handleSelectAccount}
							handleOpenDeleteAccount={handleOpenDeleteAccount}
						/>
					</Header>
					<Button
						color='black'
						content='Done'
						fluid
						circular
						size='massive'
						onClick={() => push('/dashboard')}
					/>
				</Portal>
				<Modal
					error={error}
					phone={phone!}
					name={name!}
					account={account!}
					open={open}
					handleCancel={handleCancelDelete}
					handleChange={handleChange}
					handleDelete={() => handleDeleteAccount(password, account!)}
				/>
			</>
		);
	},
};

export const { AccountScreen } = AccountScreenComponent;
export default AccountScreen;
