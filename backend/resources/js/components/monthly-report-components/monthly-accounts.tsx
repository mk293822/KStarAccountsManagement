import { Account } from '@/types';
import { useEffect, useState } from 'react';
import AccountCard from '../account-components/account-card';
import Heading from '../heading';
import { Button } from '../ui/button';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, router } from '@inertiajs/react';

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
};

const MonthlyAccounts = ({ accounts }: Props) => {
	const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());

	useEffect(() => {
		const timeout = setTimeout(() => {
			router.get(
				route('monthly_report'),
				{
					page: accounts.meta.current_page,
				},
				{
					preserveScroll: true,
					preserveState: true,
					replace: true,
				},
			);
		}, 200);

		return () => clearTimeout(timeout);
	}, [accounts.meta.current_page]);

	const toggleIndex = (index: number) => {
		setOpenIndexes((prev) => {
			const next = new Set(prev);
			if (next.has(index)) {
				next.delete(index);
			} else {
				next.add(index);
			}
			return next;
		});
	};

	const collapseAll = () => {
		if (openIndexes.size === 0) {
			const set = new Set(accounts.data.map((_, i) => i));
			setOpenIndexes(set);
		} else {
			setOpenIndexes(new Set());
		}
	};

	return (
		<div className="overflow-x-auto">
			<div className="flex flex-row items-center justify-between">
				<Heading title="Accounts" />
				<div className="mb-4 flex flex-row items-center justify-center gap-2 py-2">
					{/* Collapse All Button */}
					<Button
						variant="outline"
						size={'sm'}
						className="flex items-center gap-1 rounded-md bg-zinc-800 text-sm text-gray-300 hover:bg-zinc-700"
						onClick={collapseAll}
					>
						{openIndexes.size === 0 ? 'Open All' : 'Collapse All'}
						<ChevronDown className={cn('h-4 w-4 transition-transform', openIndexes.size !== 0 && 'rotate-180')} />
					</Button>
					{/* Create New Account Button */}
					<Button size={'sm'} onClick={() => router.visit(route('account.create'))} variant={'secondary'}>
						Create
					</Button>
				</div>
			</div>
			<div className="min-h-96 space-y-2">
				{accounts.data.length > 0 ? (
					accounts.data.map((account, index) => (
						<AccountCard
							key={account.id}
							account={account}
							index={index}
							isOpen={openIndexes.has(index)}
							onToggle={() => toggleIndex(index)}
						/>
					))
				) : (
					<div className="text-center text-gray-500">No matching accounts found.</div>
				)}
			</div>

			{accounts.meta.links.length > 3 && (
				<div className="mt-6 flex justify-center px-2">
					<nav className="hide-scrollbar inline-flex flex-nowrap gap-1 overflow-x-auto rounded-md border border-zinc-700 bg-zinc-950 px-2 py-1 text-sm text-gray-300 shadow-sm sm:text-xs">
						{accounts.meta.links.map((link, i) => (
							<Link
								key={i + link.url}
								href={link.url ?? ''}
								className={cn(
									'rounded px-3 py-1 text-nowrap',
									link.active ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-zinc-700',
									!link.url && 'cursor-not-allowed text-gray-500',
								)}
								dangerouslySetInnerHTML={{ __html: link.label }}
							/>
						))}
					</nav>
				</div>
			)}
		</div>
	);
};

export default MonthlyAccounts;
