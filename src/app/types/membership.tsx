import type { SemanticDIRECTIONALTRANSITIONS } from 'semantic-ui-react';

export type PurchaseType = 'BUY' | 'RENEW' | 'NEW';

export interface MembershipValues {
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
export interface BuyValues {
	// record?: number;
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
export type CurrentRecord = MembershipValues | undefined;
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

export const enum Receipt {
	NEW = 'NEW',
	BUY = 'BUY',
	RENEW = 'RENEW',
}

export interface LoginValues {
	username?: string;
	password?: string;
}
export interface FindValues {
	phone?: string;
	account?: string;
	first?: string;
	last?: string;
}

export interface MembershipValues {
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
export interface BuyValues {
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

export interface RenewValues {}
export interface EditValues {}

export type LoginForm = JSX.Element;
export type FindForm = JSX.Element;
export type AddForm = JSX.Element;
export type BuyForm = JSX.Element;
export type RenewForm = JSX.Element;
export type EditForm = JSX.Element;
export type NoteForm = JSX.Element;

export interface CancelBtnProps {
	action?: () => void;
	disable?: boolean;
}
export interface EditBtnProps {
	setCurrentRecord?: (value: React.SetStateAction<CurrentRecord>) => void;
	setOpenReceipt: (value: React.SetStateAction<boolean>) => void;
}

export type NewAccountFieldProps = {
	error: boolean | string;
	edit?: boolean;
};

export interface BuyPortalProps {
	open?: boolean;
	children: React.ReactNode;
	transition?: { animation: SemanticDIRECTIONALTRANSITIONS; duration: number };
}

export interface ReceiptPortalProps {
	open?: boolean;
	children: React.ReactNode;
	transition?: { animation: SemanticDIRECTIONALTRANSITIONS; duration: number };
}
export interface PortalProps {
	open?: boolean;
	children: React.ReactNode;
	transition?: { animation: SemanticDIRECTIONALTRANSITIONS; duration: number };
}
export interface DashboardPortalProps {
	open?: boolean;
	children: React.ReactNode;
	transition?: { animation: SemanticDIRECTIONALTRANSITIONS; duration: number };
}

export interface LoginPortalProps {
	open?: boolean;
	children: React.ReactNode;
	transition?: { animation: SemanticDIRECTIONALTRANSITIONS; duration: number };
}

export interface AccountPortalProps {
	open?: boolean;
	children: React.ReactNode;
	transition?: { animation: SemanticDIRECTIONALTRANSITIONS; duration: number };
}

export interface AddPortalProps {
	open?: boolean;
	children: React.ReactNode;
	transition?: { animation: SemanticDIRECTIONALTRANSITIONS; duration: number };
}
