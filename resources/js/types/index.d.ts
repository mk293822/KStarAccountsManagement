import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
    all_users: User[];
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

// account
export interface Account {
    id?: number;
    account_name: string;
    account_email: string;
    seller_name: string;
    buyer_name?: string;
    th_level: number;

    bought_price: number;
    sold_price?: number;
    profit?: number;
    loss?: number;

    is_acc_protection_changed: boolean;
    is_sold?: boolean;
    is_email_changed: boolean;
    is_email_disabled: boolean;
    is_returned?: boolean;
    is_deposit?: boolean;

    sold_by?: string;
    bought_by: string;

    bought_date: string; // ISO 8601 string, e.g. "2025-07-05T13:15:30"
    sold_date?: string;

    returned_account?: ReturnedAccount;
    deposit_account?: DepositAccount;
}

export interface ReturnedAccount {
    id: number;
    account_id: number;
    name: string;
    return_price: number;
    is_password_changed: boolean;
    sold_price: number;
    returned_date: string;
}

export interface DepositAccount {
    id: number;
    account_id: number;
    name: string;
    deposit_amount: number;
    gave_account: string;
    deposit_date: string;
    cancelled: boolean;
    return_deposit: boolean;
    return_deposit_amount: number;
}

export interface AccountCreateForm {
    account_name: string;
    account_email: string;
    seller_name: string;
    th_level: number;

    bought_price: number;
    is_acc_protection_changed: boolean;
    is_email_changed: boolean;
    is_email_disabled: boolean;
    bought_date: string;
}

export interface DashboardAccount {
    id: number;
    bought_date: string;
    sold_date: string;
    bought_price: number;
    sold_price: number;
}

export interface DashboardAccounts {
    left_accounts: DashboardAccount[];
    sold_accounts: DashboardAccount[];
    deposit_accounts: DashboardAccount[];
    returned_accounts: DashboardAccount[];
    mail_disabled_accounts: DashboardAccount[];
    unchanged_acc_protection_accounts: DashboardAccount[];
    unchanged_email_accounts: DashboardAccount[];
    bought_accounts: DashboardAccount[];
}
