import Heading from '@/components/heading';
import MonthlyAccounts from '@/components/monthly-report-components/monthly-accounts';
import MonthlyReportHeader from '@/components/monthly-report-components/monthly-report-header';
import { useCurrencyFormatter } from '@/hooks/use-currency-formatter';
import AppLayout from '@/layouts/app-layout';
import { Account, BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Monthly Report', href: '/monthly-report' }];

type Props = {
	accounts: {
		data: Account[];
		meta: {
			current_page: number;
			links: Array<{
				url: string;
				active: boolean;
				label: string;
			}>;
		};
	};
	total_bought_accounts: number;
	total_sold_accounts: number;
	total_bought_price: number;
	total_sold_price: number;
	total_deposits: number;
	total_deposit_amount: number;
	total_return_deposit_amount: number;
	total_returns: number;
	total_return_amount: number;
	total_return_deposits: number;
};

const Index = ({
	accounts,
	total_bought_accounts,
	total_bought_price,
	total_deposit_amount,
	total_deposits,
	total_return_amount,
	total_return_deposit_amount,
	total_return_deposits,
	total_returns,
	total_sold_accounts,
	total_sold_price,
}: Props) => {
	const currencyFormatter = useCurrencyFormatter();

	const totalAmount = total_sold_price + total_deposit_amount + total_return_amount - (total_bought_price + total_return_deposit_amount);

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Monthly Report" />
			<div className="space-y-4 p-4">
				<MonthlyReportHeader />

				{/* Trading Overview */}
				<div className="rounded-xl border border-white/20 p-6">
					<div className="flex flex-row items-center justify-between">
						<Heading title="Trading Overview" />
						<small className="mb-3">{new Date().toLocaleDateString()}</small>
					</div>

					<div className="mt-4 grid grid-cols-8 gap-x-6 gap-y-4 text-sm">
						<p className="col-span-4 text-white/80">Total Bought Accounts</p>
						<p className="text-white/80">{total_bought_accounts}</p>
						<p className="col-span-3 text-right font-semibold">{currencyFormatter(total_bought_price)}</p>

						<p className="col-span-4 text-white/80">Total Sold Accounts</p>
						<p className="text-white/80">{total_sold_accounts}</p>
						<p className="col-span-3 text-right font-semibold">{currencyFormatter(total_sold_price)}</p>

						<p className="col-span-4 text-white/80">Total Deposit Accounts</p>
						<p className="text-white/80">{total_deposits}</p>
						<p className="col-span-3 text-right font-semibold">{currencyFormatter(total_deposit_amount)}</p>

						<p className="col-span-4 text-white/80">Total Return Deposit Accounts</p>
						<p className="text-white/80">{total_return_deposits}</p>
						<p className="col-span-3 text-right font-semibold">{currencyFormatter(total_return_deposit_amount)}</p>

						<p className="col-span-4 text-white/80">Total Return Accounts</p>
						<p className="text-white/80">{total_returns}</p>
						<p className="col-span-3 text-right font-semibold">{currencyFormatter(total_return_amount)}</p>

						<div className="col-span-8 mt-4 flex items-center justify-end border-t border-white/10 pt-4">
							<div className="text-right">
								<p className={`text-lg font-bold ${totalAmount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
									{currencyFormatter(totalAmount)}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Accounts */}
				<MonthlyAccounts accounts={accounts} />
			</div>
		</AppLayout>
	);
};

export default Index;
