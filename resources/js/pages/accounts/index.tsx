import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import React from 'react'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Accounts',
        href: '/accounts',
    },
];

const index = () => {
  return (
      <AppLayout breadcrumbs={breadcrumbs}>
          <Head title='Accounts'/>
          <div>hello</div>
      </AppLayout>
  );
}

export default index
