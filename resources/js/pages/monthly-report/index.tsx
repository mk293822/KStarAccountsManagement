import Heading from '@/components/heading';
import MonthlyAccounts from '@/components/monthly-report-components/monthly-accounts';
import { useCurrencyFormatter } from '@/hooks/useCurrencyFormatter';
import AppLayout from '@/layouts/app-layout';
import { Account, BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Monthly Report', href: '/monthly-report' }];

const Index = ({ accounts }: { accounts: Account[] }) => {
	const currencyFormatter = useCurrencyFormatter('MMK');
	const totalBoughtPrice = accounts.reduce((total, account) => total + account.bought_price, 0);
	const totalSoldPrice = accounts.reduce((total, account) => total + (account.sold_price ?? 0), 0);

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Monthly Report" />
			<div className="space-y-4 p-6">
				<Heading title="Monthly Report" description="The monthly reports of the Accounts." />
				{/* Trading Overview */}
				<div className="rounded-xl border border-white/20 p-6">
					<div className="flex flex-row items-center justify-between">
						<Heading title="Trading Overview" />
						<small className='mb-3'>{new Date().toLocaleDateString()}</small>
					</div>

					<div className="mt-4 grid grid-cols-8 gap-x-6 gap-y-4 text-sm">
						<p className="text-white/80 col-span-4">Total Bought Accounts</p>
						<p className="text-white/80">{accounts.length}</p>
						<p className="text-right font-semibold col-span-3">{currencyFormatter(totalBoughtPrice)}</p>

						<p className="text-white/80 col-span-4">Total Sold Accounts</p>
						<p className="text-white/80">{accounts.filter((a) => a.is_sold).length}</p>
						<p className="text-right font-semibold col-span-3">{currencyFormatter(totalSoldPrice)}</p>

						<div className="col-span-8 mt-4 flex items-center justify-end border-t border-white/10 pt-4">
							<div className="text-right">
								<p className={`text-lg font-bold ${totalSoldPrice - totalBoughtPrice >= 0 ? 'text-green-400' : 'text-red-400'}`}>
									{currencyFormatter(totalSoldPrice - totalBoughtPrice)}
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
