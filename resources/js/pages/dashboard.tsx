import AccountChart from '@/components/dashboard-components/account-chart';
import AccountStatusCards from '@/components/dashboard-components/account-status-cards';
import AccountTypePieChart from '@/components/dashboard-components/account-type-pie-chart';
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

    return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Dashboard" />
			<div className="flex h-full flex-1 flex-col gap-4 p-4">
				{/* Header and Mode Switch */}
				<div className="flex items-center justify-between">
					<h1 className="text-lg font-semibold text-foreground">Accounts</h1>
					<div className="flex items-center gap-2">
						<Button size={'sm'} variant={mode === 'daily' ? 'default' : 'outline'} onClick={() => setMode('daily')}>
							This Month
						</Button>
						<Button size={'sm'} variant={mode === 'monthly' ? 'default' : 'outline'} onClick={() => setMode('monthly')}>
							This Year
						</Button>
						<Button size={'sm'} variant={mode === 'all' ? 'default' : 'outline'} onClick={() => setMode('all')}>
							All
						</Button>
					</div>
				</div>
				{/* Stat cards */}
				<AccountStatusCards accounts={accounts} />

				{/* Chart */}
				<AccountChart bought_accounts={accounts.bought_accounts} sold_accounts={accounts.sold_accounts} mode={mode} />

				<AccountTypePieChart accounts={accounts} />
			</div>
		</AppLayout>
	);
};

export default Dashboard;

