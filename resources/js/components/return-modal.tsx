import { Account } from '@/types';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import Heading from './heading';
import InputError from './input-error';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Label } from './ui/label';
import Modal from './ui/modal';

type Props = {
    show: boolean;
    onClose: () => void;
    account: Account;
};

type ReturnForm = {
    return_price: number | undefined;
    is_password_changed: boolean;
    returned_date: string;
};

const ReturnModal = ({ show, onClose, account }: Props) => {
    const { data, setData, post, processing, errors } = useForm<Required<ReturnForm>>({
        returned_date: '',
        return_price: undefined,
        is_password_changed: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('account.return', account.id));
        onClose();
    };

    return (
        <Modal show={show} onClose={onClose} closeable={false}>
            <div className="mx-auto w-full max-w-2xl rounded-2xl border border-white/20 bg-white/10 p-6 text-white shadow-xl backdrop-blur-md">
                <Heading title="Sold Account" description="Enter your details to create a sold account." />

                <div className="hide-scrollbar grid max-h-[70vh] grid-cols-1 gap-4 overflow-y-auto sm:max-h-[100vh] sm:grid-cols-2">
                    <div className="col-span-2">
                        <Label htmlFor="acc_email">Account Email</Label>
                        <Input id="acc_email" className="border-gray-200" placeholder="Account Email" disabled value={account.account_email} />
                    </div>
                    <div>
                        <Label htmlFor="acc_name">Account Name</Label>
                        <Input id="acc_name" placeholder="Account Name" className="border-gray-200" disabled autoFocus value={account.account_name} />
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
                            value={account.th_level}
                        />
                    </div>
                </div>

                <form className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={submit}>
                    <div>
                        <Label htmlFor="return_price">Return Price</Label>
                        <Input
                            id="return_price"
                            type="number"
                            className="border-gray-200"
                            placeholder="Return Price"
                            required
                            min={50}
                            value={data.return_price}
                            onChange={(e) => setData('return_price', Number(e.target.value))}
                        />
                        <InputError message={errors.return_price} />
                    </div>

                    <div>
                        <Label htmlFor="returned_date">Return Date</Label>
                        <Input
                            className="border-gray-200"
                            id="returned_date"
                            type="date"
                            required
                            value={data.returned_date}
                            onChange={(e) => setData('returned_date', e.target.value)}
                        />
                        <InputError message={errors.returned_date} />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            className="border-gray-200"
                            id="is_password_changed"
                            checked={data.is_password_changed}
                            onClick={() => setData('is_password_changed', !data.is_password_changed)}
                        />
                        <Label htmlFor="is_password_changed">Password Changed</Label>
                    </div>

                    <div className="col-span-2 flex justify-end gap-4 pt-8">
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

export default ReturnModal;
