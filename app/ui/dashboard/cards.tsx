import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
import Link from 'next/link';
const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default async function CardWrapper() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();
  return (
    <>
      {/* NOTE: Uncomment this code in Chapter 9 */}

      <Card title="Collected" value={totalPaidInvoices} type="collected" href="/dashboard/invoices?query=paid"  />
      <Card title="Pending" value={totalPendingInvoices} type="pending" href="/dashboard/invoices?query=pending" />
      <Card title="Total Invoices" href="/dashboard/invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
  href
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
  href?: string
}) {
  const Icon = iconMap[type];
  const card = <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
    <div className="flex p-4">
      {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
      <h3 className="ml-2 text-sm font-medium">{title}</h3>
    </div>
    <p
      className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
    >
      {value}
    </p>
  </div>
  return (
    <>{href ? <Link key={title}
      href={href}>
      {card}
    </Link> :
      <>{ card }</>
    }</>

  );
}
