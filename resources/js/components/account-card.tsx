import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import type { Account } from '@/types';
import { ChevronDown } from 'lucide-react';
import { InfoRow } from './info-row';

type AccountCardProps = {
    account: Account;
    index: number;
    isOpen: boolean;
    onToggle: () => void;
};


export default function AccountCard({ account, index, onToggle, isOpen }: AccountCardProps) {
    const account_status = cn(account.is_sold && 'Sold', account.is_deposit && 'Deposit');
    // Adjusted colors for each status for better visibility
    const statusStyles =
        {
            Sold: 'bg-red-600 text-white',
            Deposit: 'bg-blue-600 text-white',
        }[account_status] ?? 'bg-gray-600 text-white'; // Default gray with white text

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={onToggle}
            className={cn(
                'group rounded-xl border border-zinc-800 bg-zinc-950 transition-all hover:bg-zinc-900',
                account.is_email_disabled && 'bg-red-800 hover:bg-red-600',
            )}
        >
            <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-3 text-left text-white transition">
                <div>
                    <p className="flex flex-row items-center gap-2 text-sm font-semibold">
                        <span className="text-gray-400"># {index + 1}</span> {/* Index */}
                        <span className="text-white">{account.account_name}</span> {/* Account Name */}
                        <span className="rounded-full bg-gray-800 px-2">{account.th_level}</span> {/* TownHall Level */}
                    </p>

                    <p className="text-xs text-zinc-400">{account.account_email}</p>
                </div>
                <div className="flex flex-row flex-nowrap gap-8">
                    <div className="flex flex-row gap-2">
                        {account_status && (
                            <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium shadow', statusStyles)}>{account_status}</span>
                        )}
                        {account.is_returned && <span className="rounded-full bg-yellow-600 px-2 py-0.5 text-xs font-medium shadow">Returned</span>}
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-400 transition-transform group-data-[state=open]:rotate-180" />
                </div>
            </CollapsibleTrigger>

            <CollapsibleContent className="space-y-2 border-t border-zinc-800 bg-zinc-900 px-4 py-4 text-sm text-gray-300">
                <InfoRow label="Town Hall Level:" value={<span className="text-blue-400">{account.th_level}</span>} />
                <InfoRow label="Bought Price:" value={<span className="text-green-400">${account.bought_price}</span>} />
                {account.is_sold && (
                    <InfoRow
                        label="Sold Price:"
                        value={<span className="text-yellow-400">{account.sold_price ? `$${account.sold_price}` : '-'}</span>}
                    />
                )}
                <InfoRow label="Account Protection Changed:" value={account.is_acc_protection_changed ? 'Yes' : 'No'} />
                <InfoRow label="Email Changed:" value={account.is_email_changed ? 'Yes' : 'No'} />
                <InfoRow label="Returned:" value={account.is_returned ? 'Yes' : 'No'} />
                <InfoRow label="Deposit:" value={account.is_deposit ? 'Yes' : 'No'} />
                <InfoRow label="Bought By:" value={account.bought_by} />
                {account.is_sold && <InfoRow label="Sold By:" value={account.sold_by ?? '-'} />}
                <InfoRow
                    label="Status:"
                    value={
                        <span
                            className={cn('rounded-full px-2 py-1 font-semibold', statusStyles, !account.is_sold && !account.is_deposit && 'bg-green-600')}
                        >
                            {cn(account_status, !account.is_deposit && !account.is_sold && 'Available')}
                        </span>
                    }
                />
            </CollapsibleContent>
        </Collapsible>
    );
}
