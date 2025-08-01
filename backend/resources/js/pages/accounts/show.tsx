import DepositCard from '@/components/account-components/deposit-card';
import ReturnCard from '@/components/account-components/return-card';
import { Flag, InfoRow, SectionHeader } from '@/components/custom-components';
import { useCurrencyFormatter } from '@/hooks/use-currency-formatter';
import AppLayout from '@/layouts/app-layout';
import { Account, BreadcrumbItem } from '@/types';
import { Link, router } from '@inertiajs/react';
import axios, { isAxiosError } from 'axios';

const Show = ({ account }: { account: Account }) => {
	const currencyFormatter = useCurrencyFormatter();

	const breadcrumbs: BreadcrumbItem[] = [
		{
			title: 'Account',
			href: `/accounts`,
		},
		{
			title: 'Account Details',
			href: `/accounts/${account.id}`,
		},
	];

	const handleAccountDelete = async () => {
		try {
			await axios.delete(route('account.destroy', account.id));
			router.visit(route('accounts'));
		} catch (e) {
			if (isAxiosError(e)) {
				console.log(e.response?.statusText);
			} else {
				console.log('Unknown error: ', e);
			}
		}
	};

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<div className="mx-auto max-w-4xl space-y-4 rounded-xl bg-zinc-950 p-4 text-gray-200 shadow-md sm:p-6">
				<div className="flex flex-row items-center justify-between">
					<h2 className="text-xl font-semibold text-blue-400 sm:text-2xl">Account Details</h2>
					<div className="flex flex-row items-center gap-2">
						<Link
							className="rounded border border-blue-400 bg-transparent px-4 py-0.5 text-white hover:bg-blue-400"
							href={route('account.edit', account.id)}
						>
							Edit
						</Link>
						<button
							onClick={handleAccountDelete}
							className="rounded border border-red-500 bg-transparent px-4 py-0.5 text-white hover:bg-red-500"
						>
							Delete
						</button>
					</div>
				</div>

				{/* Warning for Email Disabled */}
				{account.is_email_disabled && (
					<div className="mb-4 rounded-md bg-red-700 p-4 text-white shadow-md">
						<h3 className="text-lg font-bold">⚠️ Warning: Email Disabled</h3>
						<p className="text-sm">
							The email associated with this account has been disabled. Please check or update the email settings as soon as possible.
						</p>
					</div>
				)}

				<div className="space-y-4">
					<div>
						<SectionHeader title="Account Information" />
						<div className="space-y-2">
							<InfoRow label="Account Name:" value={account.account_name} />
							<InfoRow label="Account Email:" value={account.account_email} />
							<InfoRow label="Town Hall Level:" value={<span className="text-blue-400">{account.th_level}</span>} />
						</div>
					</div>

					<div>
						<SectionHeader title="Purchase Details" />
						<div className="space-y-2">
							<InfoRow
								label="Bought Price:"
								value={<span className="text-green-400">{currencyFormatter(account.bought_price)}</span>}
							/>
							<InfoRow label="Bought Date:" value={new Date(account.bought_date).toLocaleDateString()} />
							<InfoRow label="Bought By:" value={account.bought_by} />
							<InfoRow label="Seller Name:" value={account.seller_name} />
						</div>
					</div>

					{account.is_sold && (
						<div>
							<SectionHeader title="Sale Details" />
							<div className="space-y-2">
								<InfoRow
									label="Sold Price:"
									value={
										<span className="text-yellow-400">
											{account.sold_price && account.sold_price > 0 ? `${currencyFormatter(account.sold_price)}` : '-'}
										</span>
									}
								/>
								{account.sold_date && <InfoRow label="Sold Date:" value={new Date(account.sold_date).toLocaleDateString()} />}
								{account.buyer_name && <InfoRow label="Buyer Name:" value={account.buyer_name} />}
							</div>
						</div>
					)}

					{((account.profit ?? 0) > 0 || (account.loss ?? 0) > 0) && (
						<div>
							<SectionHeader title="Summary" />
							<div className="space-y-2">
								{account.profit && account.profit > 0 && (
									<InfoRow label="Profit:" value={<span className="text-green-400">{currencyFormatter(account.profit)}</span>} />
								)}
								{account.loss && account.loss > 0 && (
									<InfoRow label="Loss:" value={<span className="text-red-400">{currencyFormatter(account.loss)}</span>} />
								)}
							</div>
						</div>
					)}
				</div>

				<div>
					<SectionHeader title="Statuses" />
					<div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
						<Flag label="Protection Changed" value={account.is_acc_protection_changed} />
						<Flag label="Email Changed" value={account.is_email_changed} />
						<Flag label="Sold" value={!!account.is_sold} />
						<Flag label="Returned" value={!!account.is_returned} />
						<Flag label="Deposit" value={!!account.is_deposit} />
						<div
							className={`rounded-full px-3 py-1 text-xs font-semibold text-white shadow ${!account.is_email_disabled ? 'bg-green-600' : 'bg-red-600/70 text-gray-300'}`}
						>
							Email Disabled: {account.is_email_disabled ? 'Yes' : 'No'}
						</div>
					</div>
				</div>

				{account.returned_accounts?.map((acc) => (
					<ReturnCard key={acc.id} acc={acc} />
				))}

				{account.deposit_accounts?.map((acc) => (
					<DepositCard key={acc.id} acc={acc} />
				))}
			</div>
		</AppLayout>
	);
};

export default Show;
