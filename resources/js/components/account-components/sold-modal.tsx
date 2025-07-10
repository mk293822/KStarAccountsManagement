import { Account } from '@/types';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import Heading from '../heading';
import InputError from '../input-error';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import Modal from '../ui/modal';

type Props = {
    show: boolean;
    onClose: () => void;
    account: Account;
};

type SoldForm = {
    buyer_name: string;
    sold_price: number;
    sold_date: string;
};

const SoldModal = ({ show, onClose, account }: Props) => {
    const { data, setData, post, processing, errors } = useForm<Required<SoldForm>>({
        buyer_name: '',
        sold_price: 50,
        sold_date: new Date().toISOString().split('T')[0],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('account.sold', account.id));
        onClose();
    };

    return (
        <Modal show={show} onClose={onClose} closeable={false}>
            <div className="mx-auto w-full max-w-2xl rounded-2xl border border-white/20 bg-white/10 p-6 text-white shadow-xl backdrop-blur-md">
                <Heading title="Return Account" description="Enter your details to create a return account." />

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
                    <div className="col-span-2">
                        <Label htmlFor="buyer_name">Buyer Name</Label>
                        <Input
                            id="buyer_name"
                            className="border-gray-200"
                            placeholder="Buyer Name"
                            required
                            autoComplete="buyer_name"
                            value={data.buyer_name}
                            onChange={(e) => setData('buyer_name', e.target.value)}
                        />
                        <InputError message={errors.buyer_name} />
                    </div>

                    <div>
                        <Label htmlFor="sold_price">Sold Price</Label>
                        <Input
                            id="sold_price"
                            type="number"
                            className="border-gray-200"
                            placeholder="Sold Price"
                            required
                            min={50}
                            value={data.sold_price}
                            onChange={(e) => setData('sold_price', Number(e.target.value))}
                        />
                        <InputError message={errors.sold_price} />
                    </div>

                    <div>
                        <Label htmlFor="sold_date">Sold Date</Label>
                        <Input
                            className="border-gray-200"
                            id="sold_date"
                            type="date"
                            required
                            value={data.sold_date}
                            onChange={(e) => setData('sold_date', e.target.value)}
                        />
                        <InputError message={errors.sold_date} />
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

export default SoldModal;
