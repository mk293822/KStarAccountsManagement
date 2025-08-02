export const getMonthShortName = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', { month: 'short' });
};
