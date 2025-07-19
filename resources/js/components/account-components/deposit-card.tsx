import React from 'react'
import { Flag, Info, SectionCard } from '../custom-components';
import { DepositAccount } from '@/types';
import { useCurrencyFormatter } from '@/hooks/use-currency-formatter';
import { Button } from '../ui/button';
import { Pencil, Trash } from 'lucide-react';

type Props = {
	acc: DepositAccount;
	isEdit?: boolean;
	onDelete: () => void;
	onEdit: () => void;
}

const DepositCard = ({ acc, isEdit, onDelete, onEdit }: Props) => {

	const currencyFormatter = useCurrencyFormatter();

  return (
		<SectionCard color="green">
			<div className="mb-4 flex gap-2 flex-row items-center justify-between">
				<h3 className="text-lg font-semibold text-green-300">{!isEdit && 'Deposit'} Account Info</h3>
				{isEdit && (
					<div className="flex justify-end gap-1">
						<Button variant="outline" size="sm" onClick={onEdit}>
							<Pencil className="mr-1" /> Edit
						</Button>
						<Button onClick={onDelete} className="bg-red-600/70 text-white hover:bg-red-500" size="sm">
							<Trash className="mr-1" /> Delete
						</Button>
					</div>
				)}
			</div>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<Info label="Deposit By" value={acc.name} />
				<Info label="Deposit Amount" value={`${currencyFormatter(acc.deposit_amount)}`} />
			</div>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<Info label="Return Deposit Amount" value={`${currencyFormatter(acc.return_deposit_amount)}`} />
				<Info label="Deposited Date" value={new Date(acc.deposit_date).toLocaleDateString()} />
			</div>
			<div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
				<div
					className={`rounded-full px-3 py-1 text-xs font-semibold text-white shadow ${!acc.cancelled ? 'bg-green-600' : 'bg-red-600/70 text-gray-300'}`}
				>
					Cancelled Deposit: {acc.cancelled ? 'Yes' : 'No'}
				</div>
				<div
					className={`rounded-full px-3 py-1 text-xs font-semibold text-white shadow ${!acc.return_deposit ? 'bg-green-600' : 'bg-red-600/70 text-gray-300'}`}
				>
					Return Deposit: {acc.return_deposit ? 'Yes' : 'No'}
				</div>
				<Flag label="Gave Account" value={!!acc.gave_account} />
			</div>
		</SectionCard>
  );
}

export default DepositCard
