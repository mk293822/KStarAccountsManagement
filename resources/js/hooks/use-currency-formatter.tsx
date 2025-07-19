import { useMemo } from 'react';

export function useCurrencyFormatter(locale = navigator.language) {
	return useMemo(() => {
		return (amount: number) =>
			new Intl.NumberFormat(locale, {
				style: 'currency',
				currency: import.meta.env.VITE_CURRENCY_FORMAT,
			}).format(amount);
	}, [locale]);
}
