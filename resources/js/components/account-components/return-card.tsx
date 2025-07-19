import { useCurrencyFormatter } from '@/hooks/use-currency-formatter';
import { ReturnedAccount } from '@/types';
import { Flag, Info, SectionCard } from '../custom-components';
import { Button } from '../ui/button';
import { Pencil, Trash } from 'lucide-react';

type Props = {
	acc: ReturnedAccount;
	isEdit?: boolean;
	onDelete: () => void;
	onEdit: () => void;
};

const ReturnCard = ({ acc, isEdit = false, onDelete, onEdit }: Props) => {
	const currencyFormatter = useCurrencyFormatter();

	return (
		<SectionCard color="red">
			<div className="mb-4 flex flex-row items-center justify-between gap-2">
				<h3 className="text-lg font-semibold text-red-300">{!isEdit && 'Returned'} Account Info</h3>
				{isEdit && (
					<div className="flex justify-end gap-1">
						<Button variant="outline" size="sm" onClick={onEdit}>
							<Pencil /> Edit
						</Button>
						<Button onClick={onDelete} className="bg-red-600/70 text-white hover:bg-red-500" size="sm">
							<Trash  /> Delete
						</Button>
					</div>
				)}
			</div>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<Info label="Return By" value={acc.name} />
				<Info label="Return Price" value={`${currencyFormatter(acc.return_price)}`} />
			</div>
			<div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
				<Info label="Sold Price" value={`${currencyFormatter(acc.sold_price)}`} />
				<Info label="Return Date" value={new Date(acc.returned_date).toLocaleDateString()} />
			</div>
			<div className="mt-2">
				<Flag label="Password Changed" value={acc.is_password_changed} />
			</div>
		</SectionCard>
	);
};

export default ReturnCard;
