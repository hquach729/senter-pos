export type AppInfo = { name?: string; version?: string };
export type Auth = {
	authenticated?: boolean;
};
export interface Credential {
	username?: string;
	password?: string;
}
export type BackupInfo = {
	status: boolean;
	date: string;
};
export interface PrintData {
	data: string;
}

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

interface RenewValues {}
interface EditValues {}

export type CurrentRecord = MembershipValues | undefined;
