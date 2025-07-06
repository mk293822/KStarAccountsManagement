import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Button } from './ui/button';
import { ChevronDown, Search } from 'lucide-react';
import { useDebouncedValue } from '@/hooks/use-debounce';
import { router, usePage } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { Account } from '@/types';

type Props = {
    openIndexes: Set<number>;
    accounts: Account[];
    setOpenIndexes: Dispatch<SetStateAction<Set<number>>>;
    page: number;
};

const AccountHeader = ({openIndexes, accounts, setOpenIndexes, page}: Props) => {

    const page_query = usePage().props?.ziggy?.query ?? {};
    const { searchQuery: query = '', sort_by = '', filter_by = '', order_by = ''} = page_query;

    const [searchQuery, setSearchQuery] = useState('');
    const [filterBy, setFilterBy] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [orderBy, setOrderBy] = useState('');

    useEffect(() => {
        setSearchQuery(query);
        setSortBy(sort_by);
        setOrderBy(order_by);
        setFilterBy(filter_by);
    }, [query, sort_by, order_by, filter_by])

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
                    },
                    {
                        preserveScroll: true,
                        preserveState: true,
                        replace: true,
                    },
                );
            }, 200);

            return () => clearTimeout(timeout);
        }, [debouncedSearch, filterBy, sortBy, orderBy, page]);

        const collapseAll = () => {
            if (openIndexes.size === 0) {
                const set = new Set(accounts.map((_, i) => i));
                setOpenIndexes(set);
            } else {
                setOpenIndexes(new Set());
            }
        };

  return (
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

          <div className="flex w-full flex-row flex-wrap items-center gap-2">
              <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm text-gray-300"
              >
                  <option value="">Filter by</option>
                  <option value="is_acc_protection_changed">Protection Changed</option>
                  <option value="is_sold">Sold</option>
                  <option value="is_email_changed">Email Changed</option>
                  <option value="is_email_disabled">Email Disabled</option>
                  <option value="is_returned">Returned</option>
                  <option value="is_deposit">Deposit</option>
              </select>

              <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm text-gray-300"
              >
                  <option value="">Sort by</option>
                  <option value="th_level">TH Level</option>
                  <option value="bought_date">Bought Date</option>
                  <option value="sold_date">Sold Date</option>
                  <option value="bought_price">Bought Price</option>
                  <option value="sold_price">Sold Price</option>
                  <option value="profit">Profit</option>
                  <option value="loss">Loss</option>
              </select>

              <select
                  value={orderBy}
                  onChange={(e) => setOrderBy(e.target.value)}
                  className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm text-gray-300"
              >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
              </select>

              <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center justify-center gap-1 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-gray-300 hover:bg-zinc-700"
                  onClick={collapseAll}
              >
                  {openIndexes.size === 0 ? 'Open All' : 'Collapse All'}
                  <ChevronDown className={cn('h-4 w-4 transition-transform', openIndexes.size !== 0 && 'rotate-180')} />
              </Button>
          </div>
      </div>
  );
}

export default AccountHeader
