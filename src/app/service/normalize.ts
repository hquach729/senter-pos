export const Normalize = {
	phone: (value: string): string | undefined => {
		if (!value) return undefined;

		const onlyNums = value.replace(/[^\d]/g, '');
		if (onlyNums.length <= 3) return onlyNums;
		if (onlyNums.length <= 7)
			return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 7)}`;
		return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 6)}-${onlyNums.slice(
			6,
			10
		)}`;
	},
	account: (value: string): string | undefined => {
		if (!value) return undefined;

		const onlyNums = value.replace(/[^\d]/g, '');
		if (onlyNums.length < 11) return onlyNums;
		return onlyNums.slice(0, -1);
	},
	name: (value: string): string | undefined => {
		if (!value) return undefined;

		const onlyLetters = value.replace(/[^A-Za-z]/g, '');
		return (
			onlyLetters.charAt(0).toUpperCase() + onlyLetters.slice(1).toLowerCase()
		);
	},
	fee: (value: string): number => {
		if (isNaN(parseInt(value))) return 0;

		const onlyNums = value.replace(/[^\d]/g, '');
		if (onlyNums.length < 5) {
			return parseInt(onlyNums);
		} else {
			return parseInt(onlyNums.substring(0, onlyNums.length - 1));
		}
	},
	gallon: (value: string): number => {
		if (isNaN(parseInt(value))) return 0;

		const onlyNums = value.replace(/[^\d]/g, '');
		if (onlyNums.length < 5) {
			return parseInt(onlyNums);
		} else {
			return parseInt(onlyNums.substring(0, onlyNums.length - 1));
		}
	},
};
