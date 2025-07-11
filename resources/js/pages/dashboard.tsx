import AccountChart from '@/components/dashboard-components/account-chart';
import { Button } from '@/components/ui/button'; // You can replace with your button if not using shadcn/ui
import AppLayout from '@/layouts/app-layout';
import { ChartDatas, type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

// Breadcrumbs
const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];

type Props = {
    chartDatas: ChartDatas;
    period: 'daily' | 'monthly' | 'all';
};

const Dashboard = ({ chartDatas, period }: Props) => {
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
                    <StatCard title="Left Accounts" value={chartDatas.left_accounts.length} />
                    <StatCard title="Bought Accounts" value={chartDatas.bought_accounts.length} />
                    <StatCard title="Sold Accounts" value={chartDatas.sold_accounts.length} />
                    <StatCard title="Acc Protection Unchanged Accounts" value={chartDatas.unchanged_acc_protection_accounts.length} />
                    <StatCard title="Email Unchanged Accounts" value={chartDatas.unchanged_email_accounts.length} />
                    <StatCard title="Email Disabled Accounts" value={chartDatas.mail_disabled_accounts.length} />
                </div>

                {/* Chart */}
                <AccountChart bought_accounts={chartDatas.bought_accounts} sold_accounts={chartDatas.sold_accounts} mode={mode} />
            </div>
        </AppLayout>
    );
};

export default Dashboard;

// Typed StatCard Component
const StatCard = ({ title, value }: { title: string; value: number }) => {
    return (
        <div className="rounded-lg border border-border bg-muted/40 px-4 py-3 shadow-sm">
            <div className="text-sm text-muted-foreground">{title}</div>
            <div className="text-xl font-semibold text-foreground">{value.toLocaleString()}</div>
        </div>
    );
};
