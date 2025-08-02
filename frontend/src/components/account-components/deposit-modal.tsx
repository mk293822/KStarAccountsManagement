import { DepositAccount } from '@/types';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';
import Heading from '../heading';
import InputError from '../input-error';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import Modal from '../ui/modal';

type Props = {
	show: boolean;
	onClose: () => void;
	account?: DepositAccount;
	is_Edit?: boolean;
	th_level: number;
	account_name: string;
	account_email: string;
	id: number;
	allCancelled?: boolean;
};

type DepositForm = {
	name: string;
	deposit_amount: number;
	deposit_date: string;
	gave_account: boolean;
	cancelled?: boolean | null;
	return_deposit_amount?: number | null;
};

const DepositModal = ({ show, onClose, allCancelled, account, id, is_Edit = false, th_level, account_email, account_name }: Props) => {
	const { data, setData, post, processing, errors } = useForm<DepositForm>({
		name: is_Edit && account?.name ? account.name : '',
		deposit_amount: is_Edit && typeof account?.deposit_amount === 'number' ? account.deposit_amount : 0,
		deposit_date: is_Edit && account?.deposit_date ? account.deposit_date : new Date().toISOString().split('T')[0],
		gave_account: is_Edit && typeof account?.gave_account === 'boolean' ? account.gave_account : false,
		cancelled: allCancelled ? account?.cancelled : null,
		return_deposit_amount: allCancelled ? account?.return_deposit_amount : null,
	});

	useEffect(() => {
		setData({
			name: is_Edit && account?.name ? account.name : '',
			deposit_amount: is_Edit && typeof account?.deposit_amount === 'number' ? account.deposit_amount : 0,
			deposit_date: is_Edit && account?.deposit_date ? account.deposit_date : new Date().toISOString().split('T')[0],
			gave_account: is_Edit && typeof account?.gave_account === 'boolean' ? account.gave_account : false,
			cancelled: allCancelled ? account?.cancelled : null,
			return_deposit_amount: allCancelled ? account?.return_deposit_amount : null,
		});
	}, [is_Edit, account, setData, allCancelled]);

	const submit: FormEventHandler = (e) => {
		e.preventDefault();
		if (is_Edit) {
			post(route('account.edit_deposit', account?.id), {
				onSuccess: () => {
					onClose();
				},
			});
		} else {
			post(route('account.deposit', id), {
				onSuccess: () => {
					onClose();
				},
			});
		}
	};

	return (
		<Modal show={show} onClose={onClose} closeable={false}>
			<div className="mx-auto w-full max-w-2xl rounded-2xl border border-white/20 bg-white/10 p-6 text-white shadow-xl backdrop-blur-md">
				<Heading title="Deposit Account" description="Enter your details to create a deposit account." />

				<div className="hide-scrollbar grid max-h-[70vh] grid-cols-1 gap-4 overflow-y-auto sm:max-h-[100vh] sm:grid-cols-2">
					<div className="sm:col-span-2">
						<Label htmlFor="acc_email">Account Email</Label>
						<Input id="acc_email" className="border-gray-200" placeholder="Account Email" disabled value={account_email} />
					</div>
					<div>
						<Label htmlFor="acc_name">Account Name</Label>
						<Input id="acc_name" placeholder="Account Name" className="border-gray-200" disabled autoFocus value={account_name} />
					</div>
					<div>
						<Label htmlFor="th_level">Town Hall Level</Label>
						<Input
							id="th_level"
							type="number"
							className="border-gray-200"
							placeholder="Town Hall Level"
							disabled
							min={0}
							value={th_level}
						/>
					</div>
				</div>

				<form className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={submit}>
					<div>
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							type="text"
							className="border-gray-200"
							placeholder="Name"
							required
							value={data.name}
							onChange={(e) => setData('name', e.target.value)}
						/>
						<InputError message={errors.name} />
					</div>
					<div>
						<Label htmlFor="deposit_amount">Deposit Amount</Label>
						<Input
							id="deposit_amount"
							type="number"
							className="border-gray-200"
							placeholder="Deposit Amount"
							required
							min={50}
							value={data.deposit_amount}
							onChange={(e) => setData('deposit_amount', Number(e.target.value))}
						/>
						<InputError message={errors.deposit_amount} />
					</div>

					<div>
						<Label htmlFor="deposit_date">Deposit Date</Label>
						<Input
							className="border-gray-200"
							id="deposit_date"
							type="date"
							required
							value={data.deposit_date}
							onChange={(e) => setData('deposit_date', e.target.value)}
						/>
						<InputError message={errors.deposit_date} />
					</div>

					{is_Edit && (
						<div>
							{data.cancelled && (
								<>
									<Label htmlFor="return_deposit_amount">Returned Deposit Amount</Label>
									<Input
										id="return_deposit_amount"
										type="number"
										className="border-gray-200"
										placeholder="Deposit Amount"
										required
										min={0}
										value={data.return_deposit_amount ?? ''}
										onChange={(e) => setData('return_deposit_amount', Number(e.target.value))}
									/>
									<InputError message={errors.return_deposit_amount} />
								</>
							)}
						</div>
					)}

					{is_Edit && (allCancelled || !account?.cancelled) && (
						<div className="flex items-center space-x-2">
							<Checkbox
								className="border-gray-200"
								id="cancelled"
								checked={data.cancelled ?? false}
								onClick={() => setData('cancelled', !data.cancelled)}
							/>
							<Label htmlFor="cancelled">Cancelled</Label>
						</div>
					)}

					<div className="flex items-center space-x-2">
						<Checkbox
							className="border-gray-200"
							id="gave_account"
							checked={data.gave_account}
							onClick={() => setData('gave_account', !data.gave_account)}
						/>
						<Label htmlFor="gave_account">Account is Given</Label>
					</div>

					<div className="flex justify-end gap-4 pt-4 sm:col-span-2">
						<Button type="button" variant={'ghost'} onClick={onClose} className="w-28 border border-gray-400">
							Cancel
						</Button>
						<Button type="submit" className="w-28" disabled={processing}>
							{processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
							Submit
						</Button>
					</div>
				</form>
			</div>
		</Modal>
	);
};

export default DepositModal;
