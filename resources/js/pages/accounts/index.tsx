import AccountCard from '@/components/account-card';
import AccountHeader from '@/components/account-header';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { Account, BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Accounts',
        href: '/accounts',
    },
];

type Props = {
    accounts: {
        data: Account[];
        meta: {
            current_page: number;
            links: Array<{
                url: string;
                active: boolean;
                label: string;
            }>;
        };
    };
};

const Index = ({ accounts }: Props) => {
    const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());

    console.log(accounts);

    const toggleIndex = (index: number) => {
        setOpenIndexes((prev) => {
            const next = new Set(prev);
            if (next.has(index)) {
                next.delete(index);
            } else {
                next.add(index);
            }
            return next;
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Accounts" />
            <div className="p-4">
                <AccountHeader page={accounts.meta.current_page} accounts={accounts.data} openIndexes={openIndexes} setOpenIndexes={setOpenIndexes} />

                <div className="min-h-96 space-y-2">
                    {accounts.data.length > 0 ? (
                        accounts.data.map((account, index) => (
                            <AccountCard
                                key={account.id}
                                account={account}
                                index={index}
                                isOpen={openIndexes.has(index)}
                                onToggle={() => toggleIndex(index)}
                            />
                        ))
                    ) : (
                        <div className="text-center text-gray-500">No matching accounts found.</div>
                    )}
                </div>

                {accounts.meta.links.length > 3 && (
                    <div className="mt-6 flex justify-center">
                        <nav className="inline-flex space-x-1 rounded-md border border-zinc-700 bg-zinc-800 px-2 py-1 text-sm text-gray-300 shadow-sm">
                            {accounts.meta.links.map((link, i) => (
                                <Link
                                    key={i + link.url}
                                    href={link.url ?? ''}
                                    className={cn(
                                        'rounded px-3 py-1',
                                        link.active ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-zinc-700',
                                        !link.url && 'cursor-not-allowed text-gray-500',
                                    )}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default Index;
