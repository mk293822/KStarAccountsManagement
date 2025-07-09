import { Flag, Info, InfoRow, SectionCard, SectionHeader } from '@/components/components';
import AppLayout from '@/layouts/app-layout';
import { Account, BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';

const Show = ({ account }: { account: Account }) => {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Account',
            href: `/accounts`,
        },
        {
            title: 'Account Details',
            href: `/accounts/${account.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="mx-auto max-w-4xl space-y-4 rounded-xl bg-zinc-950 p-4 text-gray-200 shadow-md sm:p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-xl font-semibold text-blue-400 sm:text-2xl">Account Details</h2>
                    <Link
                        className="rounded border border-blue-400 bg-transparent px-4 py-0.5 text-white hover:bg-blue-400"
                        href={route('account.edit', account.id)}
                    >
                        Edit
                    </Link>
                </div>

                {/* Warning for Email Disabled */}
                {account.is_email_disabled && (
                    <div className="mb-4 rounded-md bg-red-700 p-4 text-white shadow-md">
                        <h3 className="text-lg font-bold">⚠️ Warning: Email Disabled</h3>
                        <p className="text-sm">
                            The email associated with this account has been disabled. Please check or update the email settings as soon as possible.
                        </p>
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <SectionHeader title="Account Information" />
                        <div className="space-y-2">
                            <InfoRow label="Account Name:" value={account.account_name} />
                            <InfoRow label="Account Email:" value={account.account_email} />
                            <InfoRow label="Town Hall Level:" value={<span className="text-blue-400">{account.th_level}</span>} />
                        </div>
                    </div>

                    <div>
                        <SectionHeader title="Purchase Details" />
                        <div className="space-y-2">
                            <InfoRow label="Bought Price:" value={<span className="text-green-400">${account.bought_price}</span>} />
                            <InfoRow label="Bought Date:" value={new Date(account.bought_date).toLocaleDateString()} />
                            <InfoRow label="Bought By:" value={account.bought_by} />
                            <InfoRow label="Seller Name:" value={account.seller_name} />
                        </div>
                    </div>

                    {account.is_sold && (
                        <div>
                            <SectionHeader title="Sale Details" />
                            <div className="space-y-2">
                                <InfoRow
                                    label="Sold Price:"
                                    value={<span className="text-yellow-400">{account.sold_price ? `$${account.sold_price}` : '-'}</span>}
                                />
                                {account.sold_date && <InfoRow label="Sold Date:" value={new Date(account.sold_date).toLocaleDateString()} />}
                                {account.buyer_name && <InfoRow label="Buyer Name:" value={account.buyer_name} />}
                            </div>
                        </div>
                    )}

                    {((account.profit ?? 0) > 0 || (account.loss ?? 0) > 0) && (
                        <div>
                            <SectionHeader title="Summary" />
                            <div className="space-y-2">
                                {(account.profit ?? 0) > 0 && (
                                    <InfoRow label="Profit:" value={<span className="text-green-400">${account.profit}</span>} />
                                )}
                                {(account.loss ?? 0) > 0 && <InfoRow label="Loss:" value={<span className="text-red-400">${account.loss}</span>} />}
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    <SectionHeader title="Statuses" />
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        <Flag label="Protection Changed" value={account.is_acc_protection_changed} />
                        <Flag label="Email Changed" value={account.is_email_changed} />
                        <Flag label="Sold" value={!!account.is_sold} />
                        <Flag label="Returned" value={!!account.is_returned} />
                        <Flag label="Deposit" value={!!account.is_deposit} />
                        <div
                            className={`rounded-full px-3 py-1 text-xs font-semibold text-white shadow ${!account.is_email_disabled ? 'bg-green-600' : 'bg-red-600/70 text-gray-300'}`}
                        >
                            Email Disabled: {account.is_email_disabled ? 'Yes' : 'No'}
                        </div>
                    </div>
                </div>

                {account.returned_account && (
                    <SectionCard color="red">
                        <h3 className="mb-2 text-lg font-semibold text-red-300">Returned Account Info</h3>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Info label="Return By" value={account.returned_account.name} />
                            <Info label="Return Price" value={`$${account.returned_account.return_price}`} />
                        </div>
                        <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Info label="Sold Price" value={`$${account.returned_account.sold_price}`} />
                            <Info label="Return Date" value={new Date(account.returned_account.returned_date).toLocaleDateString()} />
                        </div>
                        <div className="mt-2">
                            <Flag label="Password Changed" value={account.returned_account.is_password_changed} />
                        </div>
                    </SectionCard>
                )}

                {account.deposit_account && (
                    <SectionCard color="green">
                        <h3 className="mb-2 text-lg font-semibold text-green-300">Deposit Account Info</h3>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Info label="Deposit By" value={account.deposit_account.name} />
                            <Info label="Deposit Amount" value={`$${account.deposit_account.deposit_amount}`} />
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Info label="Return Deposit Amount" value={`$${account.deposit_account.return_deposit_amount}`} />
                            <Info label="Deposited Date" value={new Date(account.deposit_account.deposit_date).toLocaleDateString()} />
                        </div>
                        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                            <div
                                className={`rounded-full px-3 py-1 text-xs font-semibold text-white shadow ${!account.deposit_account.cancelled ? 'bg-green-600' : 'bg-red-600/70 text-gray-300'}`}
                            >
                                Cancelled Deposit: {account.deposit_account.cancelled ? 'Yes' : 'No'}
                            </div>
                            <div
                                className={`rounded-full px-3 py-1 text-xs font-semibold text-white shadow ${!account.deposit_account.return_deposit ? 'bg-green-600' : 'bg-red-600/70 text-gray-300'}`}
                            >
                                Return Deposit: {account.deposit_account.return_deposit ? 'Yes' : 'No'}
                            </div>
                            <Flag label="Gave Account" value={!!account.deposit_account.gave_account} />
                        </div>
                    </SectionCard>
                )}
            </div>
        </AppLayout>
    );
};

export default Show;
