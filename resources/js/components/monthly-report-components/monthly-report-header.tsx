import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { router, usePage } from '@inertiajs/react'; // ← Inertia helpers
import { useEffect, useState } from 'react';
import Heading from '../heading';
import type { PageProps } from '@inertiajs/core';

const currentYear = new Date().getFullYear();

interface MonthlyReportProps extends PageProps {
	year: number | null;
	month: number | null;
	years: number[];
}

const MonthlyReportHeader = () => {
	const { year: selectedYearProp, month: selectedMonthProp, years } = usePage<MonthlyReportProps>().props;

	const [year, setYear] = useState(selectedYearProp?.toString() ?? currentYear.toString());
	const [month, setMonth] = useState(selectedMonthProp?.toString() ?? (new Date().getMonth() + 1).toString());

	const months = Array.from({ length: 12 }, (_, i) => new Date(Number(year), i).toLocaleString('default', { month: 'long' }));

	useEffect(() => {
		setYear(selectedYearProp?.toString() ?? currentYear.toString());
		setMonth(selectedMonthProp?.toString() ?? (new Date().getMonth() + 1).toString());
	}, [selectedMonthProp, selectedYearProp]);

	useEffect(() => {
		if (year && month) {
			router.get(route('monthly_report'), { year, month }, { preserveScroll: true, preserveState: true, replace: true });
		}
	}, [year, month]);

	return (
		<div className="flex flex-row items-center justify-between">
			<Heading title="Monthly Report" description="The monthly reports of the Accounts." />

			<div className="flex items-center gap-4">
				{/* Year Picker */}
				<Select value={year} onValueChange={setYear}>
					<SelectTrigger className="w-[120px]">
						<SelectValue placeholder="Select year" />
					</SelectTrigger>
					<SelectContent>
						{years.map((y) => (
							<SelectItem key={y} value={y.toString()}>
								{y}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				{/* Month Picker */}
				<Select value={month} onValueChange={setMonth}>
					<SelectTrigger className="w-[150px]">
						<SelectValue placeholder="Select month" />
					</SelectTrigger>
					<SelectContent>
						{months.map((m, i) => (
							<SelectItem key={m} value={(i + 1).toString()}>
								{m}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</div>
	);
};

export default MonthlyReportHeader;
