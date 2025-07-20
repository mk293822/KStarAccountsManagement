import { ReturnedAccount } from '@/types';
import Modal from '../ui/modal';
import ReturnCard from './return-card';
import Heading from '../heading';
import { Button } from '../ui/button';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import ReturnModal from './return-modal';

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
};

const ReturnListModal = ({ accounts, show, onClose, th_level, account_email, account_name, id, is_deposit = false, is_returned = false }: Props) => {
	const [showReturnModal, setshowReturnModal] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [editAcc, setEditAcc] = useState<ReturnedAccount | undefined>();

	const onEdit = (acc: ReturnedAccount) => {
		setshowReturnModal(true);
		setIsEdit(true);
		setEditAcc(acc);
	};

	const onDelete = (acc: ReturnedAccount) => {
		console.log(acc);
	};

	return (
		<>
			<Modal show={show} onClose={onClose}>
				<div className="hide-scrollbar flex max-h-[95vh] min-h-72 flex-col gap-2 overflow-y-auto rounded-xl border-2 border-red-200/40 px-4 pt-6">
					<div className="flex flex-row items-center justify-between">
						<Heading title="Returned Accounts" />
						{!is_returned && !is_deposit && (
							<Button size={'sm'} variant={'outline'} className="mb-4" onClick={() => setshowReturnModal(!showReturnModal)}>
								<PlusIcon />
								Create
							</Button>
						)}
					</div>
					<div className="hide-scrollbar flex h-full min-w-72 flex-col gap-4 overflow-y-auto pb-6">
						{accounts && accounts.length > 0 ? (
							accounts.map((acc) => (
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
