import * as Channel from '../../shared/constants';
import { AppInfo, Auth, Credential, BackupInfo } from '../types/api';
// import { MembershipValues, Membership } from '../types/membership';
import { MembershipValues } from '../types/membership';
import type {
	BuyReceipt,
	RenewReceipt,
	NewReceipt,
} from '../components/table/';

declare global {
	interface Window {
		api: {
			send: <T>(channel: string, data?: T) => void;
			// invoke: <T>(channel: string, data?: T) => Promise<void>;
			invoke: <T>(channel: string, data?: T) => Promise<T>;
			on: (channel: string, callback: Function) => void;
			once: (channel: string, callback: Function) => void;
			removeListener: (channel: string) => void;
			removeAllListeners: (channel: string) => void;
		};
	}
}

interface FindMembership {
	phone?: string;
	account?: string;
	firstName?: string;
	lastName?: string;
}

interface AddMembershipResponse {
	duplicate?: boolean;
	account?: string;
	membership?: MembershipValues | undefined;
}

export interface FindResponse {
	memberships?: MembershipValues[];
	membership?: MembershipValues;
}

type PrintReceipt =
	| BuyReceipt
	| RenewReceipt
	| NewReceipt
	| { status: string }
	| { date: string; time: string };

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

export const API = {
	fetchAppInfo: async (): Promise<AppInfo> => {
		return await window.api.invoke(Channel.APP_INFO);
	},
	verifyLogin: ({ username, password }: Credential): Promise<Auth> => {
		return new Promise((resolve) => {
			window.api.send(Channel.LOGIN, { username, password });
			window.api.on(Channel.LOGIN, ({ authenticated }: Auth) => {
				window.api.removeAllListeners(Channel.LOGIN);
				resolve({ authenticated });
			});
		});
	},
	backupDB: async (): Promise<BackupInfo> => {
		return new Promise((resolve) => {
			window.api.send(Channel.BACKUP);
			window.api.on(Channel.BACKUP, ({ status, date }: BackupInfo) => {
				window.api.removeAllListeners(Channel.BACKUP);
				resolve({ status, date });
			});
		});
	},
	escposPrint: async (
		receipt: BuyReceipt | RenewReceipt | NewReceipt
	): Promise<PrintReceipt> => {
		return await window.api.invoke(Channel.PRINT, receipt);
	},
	quitApp: async (): Promise<void> => {
		return await window.api.invoke(Channel.QUIT);
	},
	findMembership: async (values: FindMembership): Promise<FindResponse> => {
		console.log('request:', { ...values });
		return new Promise((resolve) => {
			window.api.send(Channel.FIND_MEMBERSHIP, values);
			window.api.on(Channel.FIND_MEMBERSHIP, (data: FindResponse) => {
				console.log('response:', data);
				window.api.removeAllListeners(Channel.FIND_MEMBERSHIP);
				resolve(data);
			});
		});
	},
	checkDuplicateAccount: async (
		account?: string
	): Promise<{ duplicate: boolean }> => {
		return new Promise((resolve) => {
			window.api.send(Channel.CHECK_DUPLICATE_ACCOUNT, account);
			window.api.on(
				Channel.CHECK_DUPLICATE_ACCOUNT,
				(response: { duplicate: boolean }) => {
					window.api.removeAllListeners(Channel.CHECK_DUPLICATE_ACCOUNT);
					console.log('response:duplicate', response);
					resolve(response);
				}
			);
		});
	},
	addMembership: async (
		newMembership: MembershipValues
	): Promise<AddMembershipResponse> => {
		const { account } = newMembership;
		const { duplicate } = await API.checkDuplicateAccount(account);

		return new Promise((resolve) => {
			if (duplicate) {
				resolve({ duplicate, account });
			} else {
				window.api.send(Channel.ADD_MEMBERSHIP, newMembership);
				window.api.on(
					Channel.ADD_MEMBERSHIP,
					({ membership }: AddMembershipResponse) => {
						window.api.removeAllListeners(Channel.ADD_MEMBERSHIP);
						console.log('response:addMembership', membership);
						resolve({ membership });
					}
				);
			}
		});
	},
	fetchMemberLatestRecord: async (
		account: string
	): Promise<MembershipValues> => {
		return new Promise((resolve) => {
			window.api.send(Channel.LATEST_MEMBERSHIP_RECORD, account);
			window.api.on(
				Channel.LATEST_MEMBERSHIP_RECORD,
				(data: MembershipValues) => {
					window.api.removeAllListeners(Channel.LATEST_MEMBERSHIP_RECORD);
					resolve(data);
				}
			);
		});
	},
	editMembership: (
		// initialValues: MembershipValues,
		// updateValues: MembershipValues
		initialValues: Membership,
		updateValues: Membership
	): Promise<{
		duplicate: boolean;
		updatedRecord: MembershipValues | undefined;
	}> => {
		console.log('edit:membership:initial', { initialValues });
		console.log('edit:membership:updated', { updateValues });

		return new Promise(async (resolve) => {
			// TODO: first check if there if new account is duplicated
			if (initialValues.account !== updateValues.account) {
				console.log(initialValues.account, updateValues.account);
				const { duplicate } = await API.checkDuplicateAccount(
					updateValues.account
				);

				if (!duplicate) {
					window.api.send(Channel.EDIT_MEMBERSHIP, {
						updateValues,
						initialValues,
					});
					window.api.on(Channel.EDIT_MEMBERSHIP, (data: MembershipValues) => {
						window.api.removeAllListeners(Channel.EDIT_MEMBERSHIP);
						resolve({ duplicate: false, updatedRecord: data });
					});
				} else {
					resolve({ duplicate, updatedRecord: undefined });
				}
			} else {
				// If account has not change we go ahead and update the values
				window.api.send(Channel.EDIT_MEMBERSHIP, {
					updateValues,
					initialValues,
				});
				window.api.on(Channel.EDIT_MEMBERSHIP, (data: MembershipValues) => {
					window.api.removeAllListeners(Channel.EDIT_MEMBERSHIP);
					resolve({ duplicate: false, updatedRecord: data });
				});
			}
		});
	},
	deleteMembership: async (
		account: string,
		password: string
	): Promise<{ status: number | boolean }> => {
		return new Promise((resolve) => {
			window.api.send(Channel.DELETE_MEMBERSHIP, { account, password });
			window.api.on(
				Channel.DELETE_MEMBERSHIP,
				(data: { status: number | boolean }) => {
					window.api.removeAllListeners(Channel.DELETE_MEMBERSHIP);
					resolve(data);
				}
			);
		});
	},
	buyMembership: async (data: MembershipValues): Promise<MembershipValues> => {
		return new Promise((resolve) => {
			window.api.send(Channel.BUY_MEMBERSHIP, data);
			window.api.on(Channel.BUY_MEMBERSHIP, (data: MembershipValues) => {
				window.api.removeAllListeners(Channel.BUY_MEMBERSHIP);
				resolve(data);
			});
		});
	},
	renewMembership: async (
		data: MembershipValues
	): Promise<MembershipValues> => {
		return new Promise((resolve) => {
			window.api.send(Channel.RENEW_MEMBERSHIP, data);
			window.api.on(Channel.RENEW_MEMBERSHIP, (data: MembershipValues) => {
				window.api.removeAllListeners(Channel.RENEW_MEMBERSHIP);
				resolve(data);
			});
		});
	},
	getHistory: async (account: string): Promise<Membership[]> => {
		console.log('getHistory', account);
		return new Promise((resolve) => {
			window.api.send(Channel.MEMBERSHIP_HISTORY, account);
			window.api.on(Channel.MEMBERSHIP_HISTORY, (data: MembershipValues[]) => {
				window.api.removeAllListeners(Channel.MEMBERSHIP_HISTORY);
				console.log('response', data);
				resolve(data);
			});
		});
	},
	deleteRecord: async (record: number): Promise<{ status: boolean }> => {
		console.log('delete:record', record);
		return new Promise((resolve) => {
			window.api.send(Channel.DELETE_RECORD, record);
			window.api.on(Channel.DELETE_RECORD, (data: { status: boolean }) => {
				window.api.removeAllListeners(Channel.DELETE_RECORD);
				console.log('response', data);
				resolve(data);
			});
		});
	},
	printReport: async (date: string, time: string): Promise<PrintReceipt> => {
		const response = await window.api.invoke(Channel.PRINT_REPORT, {
			date,
			time,
		});
		return response;
	},
};

export default API;
