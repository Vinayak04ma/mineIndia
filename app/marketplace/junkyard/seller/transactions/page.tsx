'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Filter, Download, RefreshCw, Calendar, FileText } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TransactionStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

type Transaction = {
  id: string;
  date: string;
  customer: string;
  items: number;
  amount: string;
  status: TransactionStatus;
  payment: 'paid' | 'pending' | 'failed' | 'refunded';
};

// Mock data - in a real app, this would come from an API
const getTransactions = (): Transaction[] => [
  // Pending transaction
  {
    id: 'TXN-001',
    date: '2025-09-25',
    customer: 'John Doe',
    items: 2,
    amount: '$970.00',
    status: 'pending',
    payment: 'paid',
  },
  // Confirmed transaction
  {
    id: 'TXN-002',
    date: '2025-09-24',
    customer: 'Jane Smith',
    items: 1,
    amount: '$450.00',
    status: 'confirmed',
    payment: 'paid',
  },
  // Shipped transaction
  {
    id: 'TXN-003',
    date: '2025-09-23',
    customer: 'Acme Corp',
    items: 5,
    amount: '$2,345.00',
    status: 'shipped',
    payment: 'paid',
  },
  // Delivered transaction
  {
    id: 'TXN-004',
    date: '2025-09-22',
    customer: 'Global Metals',
    items: 3,
    amount: '$1,230.00',
    status: 'delivered',
    payment: 'paid',
  },
  // Cancelled transaction with refund
  {
    id: 'TXN-005',
    date: '2025-09-21',
    customer: 'Tech Recyclers',
    items: 2,
    amount: '$780.00',
    status: 'cancelled',
    payment: 'refunded',
  },
  // Failed payment
  {
    id: 'TXN-006',
    date: '2025-09-20',
    customer: 'Metal Works Inc',
    items: 4,
    amount: '$1,560.00',
    status: 'pending',
    payment: 'failed',
  },
  // Pending payment
  {
    id: 'TXN-007',
    date: '2025-09-19',
    customer: 'Green Recycling',
    items: 3,
    amount: '$890.00',
    status: 'pending',
    payment: 'pending',
  },
];

const getStatusBadge = (status: TransactionStatus) => {
  const statusConfig = {
    pending: { text: 'Pending', variant: 'secondary' as const },
    confirmed: { text: 'Confirmed', variant: 'default' as const },
    shipped: { text: 'Shipped', variant: 'default' as const },
    delivered: { text: 'Delivered', variant: 'default' as const },
    cancelled: { text: 'Cancelled', variant: 'destructive' as const },
  };

  const config = statusConfig[status] || statusConfig.pending;
  return <Badge variant={config.variant}>{config.text}</Badge>;
};

const getPaymentBadge = (status: string) => {
  const statusConfig = {
    paid: { text: 'Paid', variant: 'default' as const },
    pending: { text: 'Pending', variant: 'secondary' as const },
    failed: { text: 'Failed', variant: 'destructive' as const },
    refunded: { text: 'Refunded', variant: 'outline' as const },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  return <Badge variant={config.variant}>{config.text}</Badge>;
};

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch the transactions here
    const data = getTransactions();
    setTransactions(data);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <Link href="/marketplace/junkyard/seller" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">View and manage your sales transactions</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search transactions..."
                className="w-full pl-8"
              />
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[150px]">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="This month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    <Link href={`/marketplace/junkyard/seller/transactions/${transaction.id}`} className="hover:underline">
                      {transaction.id}
                    </Link>
                  </TableCell>
                  <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                  <TableCell>{transaction.customer}</TableCell>
                  <TableCell>{transaction.items} {transaction.items === 1 ? 'item' : 'items'}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                  <TableCell>{getPaymentBadge(transaction.payment)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/marketplace/junkyard/seller/transactions/${transaction.id}`}>
                        View
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {transactions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
        <div>Showing <span className="font-medium">1</span> to <span className="font-medium">{transactions.length}</span> of <span className="font-medium">{transactions.length}</span> transactions</div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
