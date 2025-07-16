import { Account } from '@/types';
import { useState } from 'react';
import AccountCard from '../account-components/account-card';
import Heading from '../heading';
import { Button } from '../ui/button';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';

const MonthlyAccounts = ({ accounts }:{accounts: Account[]}) => {
	const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());

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
			const set = new Set(accounts.map((_, i) => i));
			setOpenIndexes(set);
		} else {
			setOpenIndexes(new Set());
		}
	};

	return (
		<div className="overflow-x-auto rounded-xl border border-white/20 p-4">
			<div className="flex flex-row justify-between items-center">
				<Heading title="Accounts" />
				<div className="flex flex-row items-center justify-center gap-2 mb-4 py-2">
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
				{accounts.length > 0 ? (
					accounts.map((account, index) => (
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
		</div>
	);
};

export default MonthlyAccounts;
