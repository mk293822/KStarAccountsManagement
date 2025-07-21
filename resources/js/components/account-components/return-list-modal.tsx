import { ReturnedAccount } from '@/types';
import Modal from '../ui/modal';
import ReturnCard from './return-card';
import Heading from '../heading';
import { Button } from '../ui/button';
import { PlusIcon, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import ReturnModal from './return-modal';
import axios, { isAxiosError } from 'axios';

type Props = {
	show: boolean;
	onClose: () => void;
	accounts: ReturnedAccount[] | undefined;
	th_level: number;
	account_name: string;
	account_email: string;
	id: number;
	is_returned?: boolean;
	is_deposit?: boolean;
	is_sold?: boolean;
};

const ReturnListModal = ({
	accounts,
	show,
	onClose,
	th_level,
	account_email,
	account_name,
	id,
	is_deposit = false,
	is_returned = false,
	is_sold = false,
}: Props) => {
	const [showReturnModal, setshowReturnModal] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [editAcc, setEditAcc] = useState<ReturnedAccount | undefined>();
	const [localAccounts, setLocalAccounts] = useState<ReturnedAccount[] | undefined>(accounts);

	useEffect(() => setLocalAccounts(accounts), [accounts]);

	const onEdit = (acc: ReturnedAccount) => {
		setshowReturnModal(true);
		setIsEdit(true);
		setEditAcc(acc);
	};

	const onDelete = async (account: ReturnedAccount) => {
		try {
			await axios.delete(route('account.destroy_return', account.id));
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
				<div className="hide-scrollbar relative flex max-h-[95vh] min-h-72 flex-col gap-2 overflow-y-auto rounded-xl border-2 border-red-200/40 px-4 pt-6">
					<button
						onClick={onClose}
						className="absolute top-1 right-1 rounded-full p-1 text-white transition hover:bg-white/10 focus:ring-2 focus:ring-white/20 focus:outline-none"
						aria-label="Close"
					>
						<X size={24} className="pointer-events-none" />
					</button>
					<div className="flex flex-row items-center justify-between">
						<Heading title="Returned Accounts" />
						{!is_returned && !is_deposit && is_sold && (
							<Button size={'sm'} variant={'outline'} className="mr-4 mb-4" onClick={() => setshowReturnModal(!showReturnModal)}>
								<PlusIcon />
								Create
							</Button>
						)}
					</div>
					<div className="hide-scrollbar flex h-full min-w-72 flex-col gap-4 overflow-y-auto pb-6">
						{localAccounts && localAccounts.length > 0 ? (
							localAccounts.map((acc) => (
								<ReturnCard onDelete={() => onDelete(acc)} onEdit={() => onEdit(acc)} isEdit={true} acc={acc} key={acc.id} />
							))
						) : (
							<div className="mt-16 text-center">No Returned Account</div>
						)}
					</div>
				</div>
			</Modal>
			<ReturnModal
				show={showReturnModal}
				onClose={() => {
					setshowReturnModal(false);
					setIsEdit(false);
					setEditAcc(undefined);
				}}
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

export default ReturnListModal;
