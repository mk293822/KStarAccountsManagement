import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { AccountCreateForm, BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

const Create = () => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Account', href: `/accounts` },
        { title: 'Account Create', href: `/accounts/create` },
    ];

    const { data, setData, post, processing, errors } = useForm<
       Required<AccountCreateForm>
    >({
        account_name: '',
        account_email: '',
        th_level: 0,
        seller_name: '',

        bought_price: 0,
        bought_date: new Date().toISOString().split('T')[0],

        is_acc_protection_changed: false,
        is_email_changed: false,
        is_email_disabled: false,
        is_sold: false,

        buyer_name: '',
        sold_price: 0,
        sold_date: new Date().toISOString().split('T')[0],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('account.store'), {
            onSuccess: () => {
                router.visit(route('accounts'))
            }
        });
    };

    return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Edit Account" />

			<div className="space-y-10 p-4">
				<Heading title="Edit Account" description="Edit Account Information" />

				<form onSubmit={submit}>
					<div className="space-y-6">
						{/* Account Information */}
						<section>
							<h2 className="mb-2 text-lg font-semibold text-muted-foreground">Account Information</h2>
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div>
									<Label htmlFor="acc_name">Account Name</Label>
									<Input
										id="acc_name"
										required
										value={data.account_name}
										onChange={(e) => setData('account_name', e.target.value)}
									/>
									<InputError message={errors.account_name} />
								</div>

								<div>
									<Label htmlFor="acc_email">Account Email</Label>
									<Input
										id="acc_email"
										required
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
										required
										min={0}
										value={data.th_level}
										onChange={(e) => setData('th_level', Number(e.target.value))}
									/>
									<InputError message={errors.th_level} />
								</div>
							</div>
						</section>

						{/* Purchase Information */}
						<section>
							<h2 className="mb-2 text-lg font-semibold text-muted-foreground">Purchase Information</h2>
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div>
									<Label htmlFor="seller_name">Seller Name</Label>
									<Input
										id="seller_name"
										required
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
										id="bought_date"
										type="date"
										required
										value={data.bought_date}
										onChange={(e) => setData('bought_date', e.target.value)}
									/>
									<InputError message={errors.bought_date} />
								</div>
							</div>
						</section>

						{/* Sale Information */}
						{data.is_sold && (
							<section>
								<h2 className="mb-2 text-lg font-semibold text-muted-foreground">Sale Information</h2>
								<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
									<div>
										<Label htmlFor="buyer_name">Buyer Name</Label>
										<Input
											id="buyer_name"
											required
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
											id="sold_date"
											type="date"
											required
											value={data.sold_date}
											onChange={(e) => setData('sold_date', e.target.value)}
										/>
										<InputError message={errors.sold_date} />
									</div>
								</div>
							</section>
						)}

						{/* Statuses */}
						<section>
							<h2 className="mb-2 text-lg font-semibold text-muted-foreground">Account Status</h2>
							<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
								<div className="flex items-center space-x-2">
									<Checkbox
										id="is_email_changed"
										checked={data.is_email_changed}
										onClick={() => setData('is_email_changed', !data.is_email_changed)}
									/>
									<Label htmlFor="is_email_changed">Email Changed</Label>
								</div>

								<div className="flex items-center space-x-2">
									<Checkbox
										id="is_email_disabled"
										checked={data.is_email_disabled}
										onClick={() => setData('is_email_disabled', !data.is_email_disabled)}
									/>
									<Label htmlFor="is_email_disabled">Email Disabled</Label>
								</div>

								<div className="flex items-center space-x-2">
									<Checkbox
										id="is_acc_protection_changed"
										checked={data.is_acc_protection_changed}
										onClick={() => setData('is_acc_protection_changed', !data.is_acc_protection_changed)}
									/>
									<Label htmlFor="is_acc_protection_changed">Protection Changed</Label>
								</div>

								<div className="flex items-center space-x-2">
									<Checkbox id="is_sold" checked={data.is_sold} onClick={() => setData('is_sold', !data.is_sold)} />
									<Label htmlFor="is_sold">Sold Out</Label>
								</div>
							</div>
						</section>
					</div>

					<div className="flex justify-end gap-4 pt-8">
						<Button type="submit" className="w-28" disabled={processing}>
							{processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
							Create
						</Button>
					</div>
				</form>
			</div>
		</AppLayout>
	);
};

export default Create;
