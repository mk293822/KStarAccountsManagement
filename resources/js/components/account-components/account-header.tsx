import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ChevronDown, Search } from 'lucide-react';
import { useDebouncedValue } from '@/hooks/use-debounce';
import { router, usePage } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { Account } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import CreateAccount from './create-modal';
import FilteringOrderingModal from './filtering-ordering-modal';

type Props = {
    openIndexes: Set<number>;
    accounts: Account[];
    setOpenIndexes: Dispatch<SetStateAction<Set<number>>>;
    page: number;
};

type QueryProps = {
    query?: {
        searchQuery?: string;
        sort_by?: string;
        filter_by?: string;
        order_by?: string;
        page?: string | number;
        filter_value?: string;
    };
};

const AccountHeader = ({ openIndexes, accounts, setOpenIndexes, page }: Props) => {
    const { query } = usePage<QueryProps>().props;

    const { searchQuery: query_prop = '', sort_by = '', filter_by = '', order_by = 'desc', filter_value = '' } = query || {};
    const [showCreateAccount, setShowCreateAccount] = useState(false);
    const [showFilterOrderModal, setShowFilterOrderModal] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [filterBy, setFilterBy] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [orderBy, setOrderBy] = useState('desc');
    const [filterValue, setFilterValue] = useState('');

    useEffect(() => {
        setSearchQuery(query_prop);
        setSortBy(sort_by);
        setOrderBy(order_by ?? 'desc');
        setFilterBy(filter_by);
        setFilterValue(filter_value);
    }, [query_prop, sort_by, order_by, filter_by, filter_value]);

    const debouncedSearch = useDebouncedValue(searchQuery, 200);

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                '/accounts',
                {
                    searchQuery: debouncedSearch.trim() ? debouncedSearch : undefined,
                    filter_by: filterBy || undefined,
                    sort_by: sortBy || undefined,
                    order_by: orderBy || undefined,
                    page: page || undefined,
                    filter_value: filterValue || true,
                },
                {
                    preserveScroll: true,
                    preserveState: true,
                    replace: true,
                },
            );
        }, 200);

        return () => clearTimeout(timeout);
    }, [debouncedSearch, filterBy, sortBy, orderBy, page, filterValue]);

    const collapseAll = () => {
        if (openIndexes.size === 0) {
            const set = new Set(accounts.map((_, i) => i));
            setOpenIndexes(set);
        } else {
            setOpenIndexes(new Set());
        }
    };

    return (
        <>
            <div className="mb-6">
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-2xl font-bold text-white">COC Accounts</h1>
                    <div className="w-full sm:w-[40%]">
                        <div className="relative">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search accounts..."
                                className="w-full rounded-md border border-zinc-700 bg-zinc-800 py-1.5 pr-3 pl-9 text-sm text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-2 flex flex-row items-center justify-between">
                    <div className="hidden lg:flex lg:flex-row lg:flex-nowrap lg:gap-2">
                        {/* Filter Field */}
                        <div className="flex w-[160px] flex-col text-sm text-gray-300">
                            <Label htmlFor="filterBy" className="mb-1">
                                Filter Field
                            </Label>
                            <Select value={filterBy} onValueChange={setFilterBy}>
                                <SelectTrigger id="filterBy" className="bg-zinc-800 text-gray-200">
                                    <SelectValue placeholder="Select Field" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="is_acc_protection_changed">Acc Prt Changed</SelectItem>
                                    <SelectItem value="is_sold">Sold</SelectItem>
                                    <SelectItem value="is_email_changed">Email Changed</SelectItem>
                                    <SelectItem value="is_email_disabled">Email Disabled</SelectItem>
                                    <SelectItem value="is_returned">Returned</SelectItem>
                                    <SelectItem value="is_deposit">Deposit</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Filter Value */}
                        {filterBy && (
                            <div className="flex w-[140px] flex-col text-sm text-gray-300">
                                <Label htmlFor="filterValue" className="mb-1">
                                    Filter Value
                                </Label>
                                <Select value={filterValue} onValueChange={setFilterValue}>
                                    <SelectTrigger id="filterValue" className="bg-zinc-800 text-gray-200">
                                        <SelectValue placeholder="Select Value" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="true">Yes</SelectItem>
                                        <SelectItem value="false">No</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {/* Sort By */}
                        <div className="flex w-[160px] flex-col text-sm text-gray-300">
                            <Label htmlFor="sortBy" className="mb-1">
                                Sort By
                            </Label>
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger id="sortBy" className="bg-zinc-800 text-gray-200">
                                    <SelectValue placeholder="None" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="th_level">TH Level</SelectItem>
                                    <SelectItem value="bought_date">Bought Date</SelectItem>
                                    <SelectItem value="sold_date">Sold Date</SelectItem>
                                    <SelectItem value="bought_price">Bought Price</SelectItem>
                                    <SelectItem value="sold_price">Sold Price</SelectItem>
                                    <SelectItem value="profit">Profit</SelectItem>
                                    <SelectItem value="loss">Loss</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Order */}
                        <div className="flex w-[120px] flex-col text-sm text-gray-300">
                            <Label htmlFor="orderBy" className="mb-1">
                                Order
                            </Label>
                            <Select value={orderBy} onValueChange={setOrderBy}>
                                <SelectTrigger id="orderBy" className="bg-zinc-800 text-gray-200">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="desc">Descending</SelectItem>
                                    <SelectItem value="asc">Ascending</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="block lg:hidden">
                        <Button onClick={() => setShowFilterOrderModal(!showFilterOrderModal)} size={'sm'} variant={'secondary'}>
                            Filter and Order
                        </Button>
                    </div>

                    <div className="flex flex-row items-center justify-center gap-2 lg:mt-4">
                        {/* Collapse All Button */}
                        <Button
                            variant="outline"
                            size={'sm'}
                            className="flex items-center gap-1 rounded-md bg-zinc-800 text-sm text-gray-300 hover:bg-zinc-700"
                            onClick={collapseAll}
                        >
                            {openIndexes.size === 0 ? 'Open All' : 'Collapse All'}
                            <ChevronDown className={cn('h-4 w-4 transition-transform', openIndexes.size !== 0 && 'rotate-180')} />
                        </Button>
                        {/* Create New Account Button */}
                        <Button size={'sm'} onClick={() => setShowCreateAccount(!showCreateAccount)} variant={'secondary'}>
                            Create Account
                        </Button>
                    </div>
                </div>
            </div>

            {/* Create Modal */}
            <CreateAccount show={showCreateAccount} onClose={() => setShowCreateAccount(false)} />
            <FilteringOrderingModal
                show={showFilterOrderModal}
                onClose={() => setShowFilterOrderModal(false)}
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                filterValue={filterValue}
                setFilterValue={setFilterValue}
                sortBy={sortBy}
                setSortBy={setSortBy}
                orderBy={orderBy}
                setOrderBy={setOrderBy}
            />
        </>
    );
};

export default AccountHeader
