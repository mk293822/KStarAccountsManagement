import { DashboardAccount } from '@/types';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type Props = {
    bought_accounts: DashboardAccount[];
    sold_accounts: DashboardAccount[];
    mode: 'daily' | 'monthly' | 'all';
};

type ChartData = { date: string | number; bought: number; sold: number };

const AccountChart = ({ bought_accounts, sold_accounts, mode }: Props) => {
    const getMonthShortName = (dateStr: string) => new Date(dateStr).toLocaleString('en-US', { month: 'short' });

    const generateInitialData = (): ChartData[] => {
        if (mode === 'monthly') {
            const months = Array.from({ length: 12 }, (_, i) => new Date(2000, i, 1).toLocaleString('en-US', { month: 'short' }));
            return months.map((month) => ({ date: month, bought: 0, sold: 0 }));
        } else if (mode === 'daily') {
            const now = new Date();
            const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
            return Array.from({ length: daysInMonth }, (_, i) => ({
                date: i + 1,
                bought: 0,
                sold: 0,
            }));
        } else {
            return Array.from({ length: 20 }, (_, i) => ({
                date: i + new Date(bought_accounts[0].bought_date).getFullYear() - 1,
                bought: 0,
                sold: 0,
            }));
        }
    };

    const datas = generateInitialData();

    bought_accounts.forEach((acc) => {
        let key: string | number;

        if (mode === 'monthly') key = getMonthShortName(acc.bought_date);
        else if (mode === 'daily') key = new Date(acc.bought_date).getDate();
        else key = new Date(acc.bought_date).getFullYear();

        const item = datas.find((d) => d.date === key);
        if (item) {
            item.bought += 1;
        }
    });

    sold_accounts.forEach((acc) => {
        let key: string | number;

        if (mode === 'monthly') key = getMonthShortName(acc.sold_date);
        else if (mode === 'daily') key = new Date(acc.sold_date).getDate();
        else key = new Date(acc.sold_date).getFullYear();

        const item = datas.find((d) => d.date === key);
        if (item) {
            item.sold += 1;
        }
    });

    return (
		<div className="rounded-lg border border-border bg-muted/40 pe-2 pt-4 shadow-sm">
			<h2 className="mb-4 ps-8 text-base font-semibold text-foreground">{mode === 'daily' ? 'Daily' : 'Monthly'} Bought & Sold Accounts</h2>
			<div className="h-56 pe-4 sm:pe-8 md:h-72 lg:h-72">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={datas}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="date" tick={{ fontSize: window.innerWidth <= 460 ? 10 : 14 }} />

						<YAxis tick={{ fontSize: window.innerWidth <= 460 ? 10 : 14 }} />

						<Tooltip
							contentStyle={{
								backgroundColor: '#0f0f0f', // or 'black'
								border: '1px solid #333',
								borderRadius: '0.5rem',
								color: '#f9f9f9',
							}}
							labelStyle={{
								color: '#d1d5db', // Tailwind gray-300
								fontWeight: '500',
							}}
							itemStyle={{
								color: '#f3f4f6', // Tailwind gray-100
							}}
						/>

						<Legend />
						<Line type="monotone" dataKey="bought" stroke="#3b82f6" name="Bought" />
						<Line type="monotone" dataKey="sold" stroke="#f97316" name="Sold" />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default AccountChart;
