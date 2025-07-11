import AccountChart from '@/components/dashboard-components/account-chart';
import StatCard from '@/components/dashboard-components/status-card';
import { Button } from '@/components/ui/button'; // You can replace with your button if not using shadcn/ui
import AppLayout from '@/layouts/app-layout';
import { DashboardAccounts, type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

// Breadcrumbs
const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];

type Props = {
    accounts: DashboardAccounts;
    period: 'daily' | 'monthly' | 'all';
};

const Dashboard = ({ accounts, period }: Props) => {
    const [mode, setMode] = useState<'daily' | 'monthly' | 'all'>(period);

    useEffect(() => setMode(period), [period]);

    useEffect(() => {
        router.get(
            '/dashboard',
            {
                period: mode,
            },
            { preserveScroll: true, preserveState: true, replace: true },
        );
    }, [mode]);

    console.log(accounts.sold_accounts);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                {/* Header and Mode Switch */}
                <div className="flex items-center justify-between">
                    <h1 className="text-lg font-semibold text-foreground">Accounts</h1>
                    <div className="flex items-center gap-2">
                        <Button variant={mode === 'daily' ? 'default' : 'outline'} onClick={() => setMode('daily')}>
                            Daily
                        </Button>
                        <Button variant={mode === 'monthly' ? 'default' : 'outline'} onClick={() => setMode('monthly')}>
                            Monthly
                        </Button>
                        <Button variant={mode === 'all' ? 'default' : 'outline'} onClick={() => setMode('all')}>
                            All
                        </Button>
                    </div>
                </div>
                {/* Stat cards */}
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

                {/* Chart */}
                <AccountChart bought_accounts={accounts.bought_accounts} sold_accounts={accounts.sold_accounts} mode={mode} />
            </div>
        </AppLayout>
    );
};

export default Dashboard;

