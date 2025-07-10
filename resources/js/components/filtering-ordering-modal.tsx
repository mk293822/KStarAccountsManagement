import React, { Dispatch } from 'react';
import { Label } from './ui/label';
import Modal from './ui/modal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

type Props = {
    show: boolean;
    onClose: () => void;
    filterBy: string;
    setFilterBy: Dispatch<React.SetStateAction<string>>;
    sortBy: string;
    setSortBy: Dispatch<React.SetStateAction<string>>;
    filterValue: string;
    setFilterValue: Dispatch<React.SetStateAction<string>>;
    orderBy: string;
    setOrderBy: Dispatch<React.SetStateAction<string>>;
};

const FilteringOrderingModal = ({
    show,
    onClose,
    filterBy,
    setFilterBy,
    filterValue,
    setFilterValue,
    sortBy,
    setSortBy,
    orderBy,
    setOrderBy,
}: Props) => {
    return (
        <Modal show={show} onClose={onClose}>
            <div className="mx-auto w-full max-w-2xl rounded-2xl bg-zinc-900 p-6 text-white shadow-lg">
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold">Filter & Sort Accounts</h2>
                    <p className="text-sm text-gray-400">Set your preferences below</p>
                </div>

                {/* Form Section */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Filter Field */}
                    <div className="flex flex-col text-sm">
                        <Label htmlFor="filterBy" className="mb-1 text-gray-300">
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
                        <div className="flex flex-col text-sm">
                            <Label htmlFor="filterValue" className="mb-1 text-gray-300">
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
                    <div className="flex flex-col text-sm">
                        <Label htmlFor="sortBy" className="mb-1 text-gray-300">
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
                    <div className="flex flex-col text-sm">
                        <Label htmlFor="orderBy" className="mb-1 text-gray-300">
                            Order
                        </Label>
                        <Select value={orderBy} onValueChange={setOrderBy}>
                            <SelectTrigger id="orderBy" className="bg-zinc-800 text-gray-200">
                                <SelectValue placeholder="Order" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="desc">Descending</SelectItem>
                                <SelectItem value="asc">Ascending</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-gray-300 hover:bg-zinc-700"
                    >
                        Cancel
                    </button>
                    <button onClick={onClose} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500">
                        Apply
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default FilteringOrderingModal;
