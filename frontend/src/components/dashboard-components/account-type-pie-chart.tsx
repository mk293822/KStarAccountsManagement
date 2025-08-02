import { DashboardAccounts } from '@/types';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F', '#FF6699', '#9933FF'];

const AccountTypePieChart = ({ accounts }: { accounts: DashboardAccounts }) => {
    const data = [
        { name: 'Bought', value: accounts.bought_accounts.length },
        { name: 'Sold', value: accounts.sold_accounts.length },
        { name: 'Deposits', value: accounts.deposit_accounts.length },
        { name: 'Returned', value: accounts.returned_accounts.length },
        { name: 'Mail Disabled', value: accounts.mail_disabled_accounts.length },
        { name: 'Unchanged Protection', value: accounts.unchanged_acc_protection_accounts.length },
        { name: 'Unchanged Email', value: accounts.unchanged_email_accounts.length },
    ];

    return (
		<div className="rounded-xl border p-6 shadow-lg">
			<h2 className="mb-4 bg-transparent text-lg font-semibold text-foreground">Account Types Pie Chart</h2>
			<div className="flex flex-col items-center justify-between gap-8 md:flex-row lg:pe-20">
				{/* Pie Chart */}
				<div className="h-[370px] w-full">
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} label>
								{data.map((entry, index) => (
									<Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
								))}
							</Pie>
							<Tooltip
								contentStyle={{
									backgroundColor: '#0f0f0f',
									border: '1px solid #333',
									borderRadius: '0.5rem',
									color: '#f9f9f9',
								}}
								labelStyle={{ color: '#d1d5db', fontWeight: '500' }}
								itemStyle={{ color: '#f3f4f6' }}
							/>
						</PieChart>
					</ResponsiveContainer>
				</div>

				{/* Legend */}
				<div className="flex w-full flex-col gap-3 md:w-1/3">
					{data.map((entry, index) => (
						<div key={entry.name} className="flex items-center gap-2 text-sm text-muted-foreground">
							<span className="h-3 w-3 rounded-sm" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
							<span>{entry.name}</span>
							<span className="ml-auto font-medium text-foreground">{entry.value}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default AccountTypePieChart;
