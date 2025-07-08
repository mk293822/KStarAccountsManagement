import { InfoRow } from '@/components/components';
import AppLayout from '@/layouts/app-layout'
import { Account } from '@/types'
import React from 'react'

const Edit = ({account}: {account: Account}) => {
    return (
        <AppLayout>
            <div className="w-full">
                <div className="max-auto max-w-xl">
                    {Object.entries(account).map(([key, value], index) => (
                        <InfoRow key={index} label={key} value={value} />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}

export default Edit
