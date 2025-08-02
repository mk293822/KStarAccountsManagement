import { DepositAccount } from '@/types';
import { PlusIcon, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Heading from '../heading';
import { Button } from '../ui/button';
import Modal from '../ui/modal';
import DepositCard from './deposit-card';
import DepositModal from './deposit-modal';
import axios, { isAxiosError } from 'axios';

type Props = {
	show: boolean;
	onClose: () => void;
	accounts: DepositAccount[] | undefined;
	th_level: number;
	account_name: string;
	account_email: string;
	id: number;
	is_deposit?: boolean;
	is_sold?: boolean;
};

const DepositListModal = ({ accounts, show, onClose, account_email, account_name, id, th_level, is_deposit = false, is_sold = false }: Props) => {
	const [showDepositModal, setShowDepositModal] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [editAcc, setEditAcc] = useState<DepositAccount | undefined>();
	const [localAccounts, setLocalAccounts] = useState<DepositAccount[] | undefined>(accounts);

	useEffect(() => setLocalAccounts(accounts), [accounts]);

	const allCancelled = !accounts?.some((acc) => acc.cancelled === false);

	const onEdit = (acc: DepositAccount) => {
		setShowDepositModal(true);
		setIsEdit(true);
		setEditAcc(acc);
	};

	const onDelete = async (account: DepositAccount) => {
		try {
			await axios.delete(route('account.destroy_deposit', account.id));
			setLocalAccounts((prev = []) => prev.filter((acc) => acc.id !== account.id));
		} catch (e) {
			if (isAxiosError(e)) {
				console.log(e.response?.statusText);
			} else {
				console.log('Unknown error: ', e);
			}
		}
	};

	return (
		<>
			<Modal show={show} onClose={onClose} closeable={false}>
				<div className="hide-scrollbar relative flex max-h-[95vh] min-h-72 flex-col gap-2 overflow-y-auto rounded-xl border-2 border-green-200/40 px-4 pt-8">
					<button
						onClick={onClose}
						className="absolute top-1 right-1 rounded-full p-1 text-white transition hover:bg-white/10 focus:ring-2 focus:ring-white/20 focus:outline-none"
						aria-label="Close"
					>
						<X size={24} className="pointer-events-none" />
					</button>

					<div className="flex flex-row items-center justify-between">
						<Heading title="Deposit Accounts" />
						{!is_deposit && !is_sold && (
							<Button size={'sm'} variant={'outline'} className="mr-4 mb-4" onClick={() => setShowDepositModal(!showDepositModal)}>
								<PlusIcon />
								Create
							</Button>
						)}
					</div>
					<div className="hide-scrollbar flex h-full min-w-72 flex-col gap-4 overflow-y-auto pb-6">
						{localAccounts && localAccounts.length > 0 ? (
							localAccounts.map((acc) => (
								<DepositCard onEdit={() => onEdit(acc)} onDelete={() => onDelete(acc)} isEdit={true} acc={acc} key={acc.id} />
							))
						) : (
							<div className="mt-16 text-center">No Deposit Account</div>
						)}
					</div>
				</div>
			</Modal>

			<DepositModal
				show={showDepositModal}
				onClose={() => {
					setShowDepositModal(false);
					setIsEdit(false);
					setEditAcc(undefined);
				}}
				allCancelled={allCancelled}
				account={editAcc}
				is_Edit={isEdit}
				th_level={th_level}
				account_email={account_email}
				account_name={account_name}
				id={id}
			/>
		</>
	);
};

export default DepositListModal;
