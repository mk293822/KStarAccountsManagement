import React from 'react'
import StatCard from './status-card';
import { DashboardAccounts } from '@/types';

const AccountStatusCards = ({ accounts }: { accounts: DashboardAccounts }) => {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            <StatCard
                title="Left Accounts"
                value={accounts.left_accounts.length}
                price={accounts.left_accounts.reduce((sum, acc) => sum + (acc.bought_price || 0), 0)}
                priceLabel="Total Bought Price"
            />
            <StatCard
                title="Bought Accounts"
                priceLabel="Total Bought Price"
                value={accounts.bought_accounts.length}
                price={accounts.bought_accounts.reduce((sum, acc) => sum + (acc.bought_price || 0), 0)}
            />
            <StatCard
                title="Sold Accounts"
                priceLabel="Total Sold Price"
                value={accounts.sold_accounts.length}
                price={accounts.sold_accounts.reduce((sum, acc) => sum + (acc.sold_price || 0), 0)}
            />
            <StatCard title="Acc Protection Unchanged Accounts" value={accounts.unchanged_acc_protection_accounts.length} />
            <StatCard title="Email Unchanged Accounts" value={accounts.unchanged_email_accounts.length} />
            <StatCard title="Email Disabled Accounts" value={accounts.mail_disabled_accounts.length} />
        </div>
    );
};

export default AccountStatusCards
