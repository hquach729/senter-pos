import type {
	InputOnChangeData,
	SemanticTRANSITIONS,
	TransitionPropDuration,
} from 'semantic-ui-react';

export type PurchaseType = 'BUY' | 'RENEW' | 'NEW' | undefined;
export interface Membership {
	record?: number;
	account?: string;
	phone?: string;
	first?: string;
	last?: string;
	since?: string;
	fee?: number;
	gallon?: number;
	buy?: number;
	remain?: number;
	previous?: number;
	type?: PurchaseType;
	date?: string;
	time?: string;
	note?: string;
}
export interface LoginScreenPortalProps {
	open?: boolean;
	transition?: {
		animation: SemanticTRANSITIONS;
		duration: number | string | TransitionPropDuration;
	};
	children?: React.ReactNode;
}
export interface ScreenPortalProps {
	open?: boolean;
	transition?: {
		animation: SemanticTRANSITIONS;
		duration: number | string | TransitionPropDuration;
	};
	children?: React.ReactNode;
}
export interface LoginFormValues {
	username?: string;
	password?: string;
}
export interface LoginButtonProps {
	error: boolean | string;
}
export interface LoginScreenFieldProps {
	handleOnChange: (
		event: ChangeEvent<HTMLInputElement>,
		data: InputOnChangeData,
		input: FieldInputProps<string, HTMLElement>
	) => void;
}
export interface FindFormValues {
	phone?: string;
	account?: string;
	first?: string;
	last?: string;
}
export interface AccountHeaderProps {
	children?: React.ReactNode;
}
export interface AccountPaginationProps {
	activePage: number;
	totalPages: number;
	handlePagination: (
		event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
		data: Semantic.PaginationProps
	) => void;
}
export interface AccountListProps {
	accounts: Membership[];
	activePage: number;
	itemPerPage: number;
	handleSelectAccount: (item: Membership) => void;
	handleOpenDeleteAccount: (item: Membership) => void;
}
export interface SelectButtonProps {
	handleSelectAccount: () => void;
}
export interface DeleteButtonProps {
	handleOpenDeleteAccount: () => void;
}
export interface DeleteModalProps {
	open: boolean;
	account: string;
	// account: Membership;
	phone: string;
	name: string;
	error: boolean;
	handleChange: (
		event: React.ChangeEvent<HTMLInputElement>,
		data: Semantic.InputOnChangeData
	) => void;
	handleDelete: () => void;
	handleCancel: () => void;
}
export interface AddScreenHeaderProps {
	name?: string;
	version?: string;
}
export interface AddScreenFormProps {
	error: boolean | string;
	onSubmit: (values: Membership) => void;
	initialValuesEqual?: () => boolean;
	subscription?: FormSubscription;
	initialValues?: Membership;
}
export interface AccountFieldProps {
	error: boolean | string;
}
export interface AddButtonProps {
	values: Membership;
	submitting: boolean;
	// disabled?: boolean;
}
export interface CancelButtonProps {
	handleClick?: () => void;
	onClick?: () => void;
}
export interface SenterPurchaseFieldsProps {
	edit?: boolean;
	error?: boolean | string;
	open?: boolean;
	callback?: () => void;
	keyPress?: (event: KeyboardEvent) => void;
}
export interface EditButtonProps {
	edit: boolean;
	submitting: boolean;
	values: Membership;
	callback: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export interface CancelEditButtonProps {
	edit: boolean;
	callback: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export interface BuyButtonProps {
	values: Membership;
	edit: boolean;
	receipt: Membership;
}
export interface RenewButtonProps {
	values: Membership;
	edit: boolean;
	receipt: Membership;
	open: boolean;
	setOpen: (open: boolean) => void;
}
export interface DoneButtonProps {
	onClick: () => void;
}
export interface HistoryModalProps {
	history: Membership[];
	open: boolean;
	handleOpenHistoryModal: () => void;
	setOpenHistoryModal: (open: boolean) => void;
	receipt: Membership;
}
export interface PurchaseScreenPortalProps {
	open?: boolean;
	transition?: Semantic.TransitionProps;
	children?: React.ReactNode;
}
export interface PurchaseScreenFormProps {
	onSubmit: (values: Membership, form: FormApi) => Promise<Membership>;
	initialValues: Membership;
	edit: boolean;
	error: string | boolean;
	handleEditAccount: (
		initialValues: Membership,
		values: Membership,
		form: FormApi
	) => void;
	handleCancelEdit: (
		form: FormApi,
		values: Membership,
		initialValues: Membership
	) => void;
	handleDone: () => void;
	children?: React.ReactNode;
	receipt: Membership;
}
export interface AccountHeaderTableProps {
	receipt: Membership;
}
export interface HistoryTableProps {
	history: Membership[];
	setOpenHistoryModal: (open: boolean) => void;
}
export interface CurrentReceiptProps {
	open: boolean;
	receipt?: Membership;
}
export interface DeleteAccountModalProps {
	deleteError: boolean | string;
	receipt: Membership;
	open: boolean;
	handleOpenDeleteModal: () => void;
	cancelAccountDelete: () => void;
	setDeleteError: (error: boolean | string) => void;
}
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
export interface LastReceiptProps {
	record: Membership;
	// setOpen: (open: boolean) => void;
	// open: boolean;
}
export interface PrintReceiptPropsBtn {
	receipt: BuyReceipt | RenewReceipt | NewReceipt;
}
export interface ReceiptModalProps {
	receipt: Membership;
	open: boolean;
	setOpen: (open: boolean) => void;
	// onClose: (open: boolean) => void;
}

export interface BuyReceiptProps {
	receipt: Membership;
	setOpen: (open: boolean) => void;
}
export interface RenewReceiptProps {
	receipt: Membership;
}
