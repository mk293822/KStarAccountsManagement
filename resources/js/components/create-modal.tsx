import { AccountCreateForm, SharedData } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
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
};

const CreateAccount = ({ show, onClose }: Props) => {
    const { all_users } = usePage<SharedData>().props.auth;

    const { data, setData, post, processing, errors } = useForm<Required<AccountCreateForm>>({
        account_name: '',
        account_email: '',
        th_level: undefined,
        seller_name: '',
        bought_price: undefined,
        bought_by: 1,
        bought_date: '',
        is_acc_protection_changed: false,
        is_email_changed: false,
        is_email_disabled: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('account.create'));
    };

    return (
        <Modal show={show} onClose={onClose} closeable={false}>
            <div className="mx-auto w-full max-w-2xl rounded-2xl border border-white/20 bg-white/10 p-6 text-white shadow-xl backdrop-blur-md">
                <Heading title="Create Account" description="Enter your details to create a new account." />

                <form className="" onSubmit={submit}>
                    <div className="hide-scrollbar grid max-h-[70vh] grid-cols-1 gap-4 overflow-y-auto sm:grid-cols-2 sm:max-h-[100vh]">
                        <div>
                            <Label htmlFor="acc_name">Account Name</Label>
                            <Input
                                id="acc_name"
                                placeholder="Account Name"
                                className="border-gray-200"
                                required
                                autoFocus
                                autoComplete="account_name"
                                value={data.account_name}
                                onChange={(e) => setData('account_name', e.target.value)}
                            />
                            <InputError message={errors.account_name} />
                        </div>

                        <div>
                            <Label htmlFor="acc_email">Account Email</Label>
                            <Input
                                id="acc_email"
                                className="border-gray-200"
                                placeholder="Account Email"
                                required
                                autoComplete="account_email"
                                value={data.account_email}
                                onChange={(e) => setData('account_email', e.target.value)}
                            />
                            <InputError message={errors.account_email} />
                        </div>

                        <div>
                            <Label htmlFor="th_level">Town Hall Level</Label>
                            <Input
                                id="th_level"
                                type="number"
                                className="border-gray-200"
                                placeholder="Town Hall Level"
                                required
                                min={0}
                                value={data.th_level}
                                onChange={(e) => setData('th_level', Number(e.target.value))}
                            />
                            <InputError message={errors.th_level} />
                        </div>

                        <div>
                            <Label htmlFor="seller_name">Seller Name</Label>
                            <Input
                                id="seller_name"
                                className="border-gray-200"
                                placeholder="Seller Name"
                                required
                                autoComplete="seller_name"
                                value={data.seller_name}
                                onChange={(e) => setData('seller_name', e.target.value)}
                            />
                            <InputError message={errors.seller_name} />
                        </div>

                        <div>
                            <Label htmlFor="bought_price">Bought Price</Label>
                            <Input
                                id="bought_price"
                                type="number"
                                className="border-gray-200"
                                placeholder="Bought Price"
                                required
                                min={50}
                                value={data.bought_price}
                                onChange={(e) => setData('bought_price', Number(e.target.value))}
                            />
                            <InputError message={errors.bought_price} />
                        </div>

                        <div>
                            <Label htmlFor="bought_date">Bought Date</Label>
                            <Input
                                className="border-gray-200"
                                id="bought_date"
                                type="date"
                                required
                                value={data.bought_date}
                                onChange={(e) => setData('bought_date', e.target.value)}
                            />
                            <InputError message={errors.bought_date} />
                        </div>

                        <div className="sm:col-span-2">
                            <Label htmlFor="bought_by">Bought By</Label>
                            <select
                                id="bought_by"
                                value={data.bought_by}
                                onChange={(e) => setData('bought_by', Number(e.target.value))}
                                className="w-full rounded-md border border-gray-300 p-2"
                            >
                                {all_users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.bought_by} />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:col-span-2 md:grid-cols-3">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    className="border-gray-200"
                                    id="is_email_changed"
                                    checked={data.is_email_changed}
                                    onClick={() => setData('is_email_changed', !data.is_email_changed)}
                                />
                                <Label htmlFor="is_email_changed">Email Changed</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    className="border-gray-200"
                                    id="is_email_disabled"
                                    checked={data.is_email_disabled}
                                    onClick={() => setData('is_email_disabled', !data.is_email_disabled)}
                                />
                                <Label htmlFor="is_email_disabled">Email Disabled</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    className="border-gray-200"
                                    id="is_acc_protection_changed"
                                    checked={data.is_acc_protection_changed}
                                    onClick={() => setData('is_acc_protection_changed', !data.is_acc_protection_changed)}
                                />
                                <Label htmlFor="is_acc_protection_changed">Acc Protection Changed</Label>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-8">
                        <Button type="button" variant={'ghost'} onClick={onClose} className="w-28 border border-gray-400">
                            Cancel
                        </Button>
                        <Button type="submit" className="w-28" disabled={processing}>
                            {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                            Create
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default CreateAccount;
