import { useMemo } from 'react';

export function useCurrencyFormatter(currency = 'USD', locale = navigator.language) {
	return useMemo(() => {
		return (amount: number) =>
			new Intl.NumberFormat(locale, {
				style: 'currency',
				currency,
			}).format(amount);
	}, [currency, locale]);
}
