import { DepositAccount } from '@/types';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import Heading from '../heading';
import { Button } from '../ui/button';
import Modal from '../ui/modal';
import DepositCard from './deposit-card';
import DepositModal from './deposit-modal';

type Props = {
	show: boolean;
	onClose: () => void;
	accounts: DepositAccount[] | undefined;
	th_level: number;
	account_name: string;
	account_email: string;
	id: number;
};

const DepositListModal = ({ accounts, show, onClose, account_email, account_name, id, th_level }: Props) => {
	const [showDepositModal, setShowDepositModal] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [editAcc, setEditAcc] = useState<DepositAccount | undefined>();

	const onEdit = (acc: DepositAccount) => {
		setShowDepositModal(true);
		setIsEdit(true);
		setEditAcc(acc);
	};

	const onDelete = (acc: DepositAccount) => {
		console.log(acc);
	};

	return (
		<>
			<Modal show={show} onClose={onClose}>
				<div className="hide-scrollbar flex max-h-[95vh] min-h-72 flex-col gap-2 overflow-y-auto rounded-xl border-2 border-green-200/40 px-4 pt-6">
					<div className="flex flex-row items-center justify-between">
						<Heading title="Deposit Accounts" />
						<Button size={'sm'} variant={'outline'} className="mb-4" onClick={() => setShowDepositModal(!showDepositModal)}>
							<PlusIcon />
							Create
						</Button>
					</div>
					<div className="hide-scrollbar flex h-full min-w-72 flex-col gap-4 overflow-y-auto pb-6">
						{accounts && accounts.length > 0 ? (
							accounts.map((acc) => (
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
				account={editAcc}
				is_deposit={isEdit}
				th_level={th_level}
				account_email={account_email}
				account_name={account_name}
				id={id}
			/>
		</>
	);
};

export default DepositListModal;
