'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, Clock, XCircle, Truck, MessageSquare, Phone, Mail, FileText, Download, Printer } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

type TransactionStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

type TransactionItem = {
  id: string;
  name: string;
  type: string;
  price: string;
  quantity: number;
  image: string;
};

type Transaction = {
  id: string;
  status: TransactionStatus;
  orderDate: string;
  deliveryDate?: string;
  items: TransactionItem[];
  buyer: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  payment: {
    method: string;
    transactionId: string;
    amount: string;
    status: 'pending' | 'completed' | 'failed' | 'refunded';
  };
  shipping: {
    method: string;
    trackingNumber?: string;
    carrier?: string;
  };
};

// Mock data - in a real app, this would come from an API
const getTransactionById = (id: string): Transaction | undefined => {
  const transactions: Transaction[] = [
    {
      id: 'TXN-001',
      status: 'pending',
      orderDate: '2025-09-25T14:30:00Z',
      items: [
        {
          id: '1',
          name: 'Copper Wire Scrap',
          type: 'Copper',
          price: '$8.50/kg',
          quantity: 100,
          image: '/copper-wire-scrap.jpeg',
        },
        {
          id: '2',
          name: 'Aluminum Cans',
          type: 'Aluminum',
          price: '$1.20/kg',
          quantity: 50,
          image: '/aluminium-cans.jpeg',
        },
      ],
      buyer: {
        name: 'John Doe',
        phone: '+91 98765 43210',
        email: 'john.doe@example.com',
        address: '123 Business Park, Andheri East, Mumbai, Maharashtra 400069',
      },
      payment: {
        method: 'UPI',
        transactionId: 'TXN987654321',
        amount: '$970.00',
        status: 'completed',
      },
      shipping: {
        method: 'Standard Delivery',
        trackingNumber: 'SHIP123456789',
        carrier: 'DTDC',
      },
    },
  ];

  return transactions.find((txn) => txn.id === id);
};

const getStatusBadge = (status: TransactionStatus) => {
  const statusConfig = {
    pending: { text: 'Pending', icon: <Clock className="h-4 w-4 mr-1" />, variant: 'secondary' as const },
    confirmed: { text: 'Confirmed', icon: <CheckCircle className="h-4 w-4 mr-1" />, variant: 'default' as const },
    shipped: { text: 'Shipped', icon: <Truck className="h-4 w-4 mr-1" />, variant: 'default' as const },
    delivered: { text: 'Delivered', icon: <CheckCircle className="h-4 w-4 mr-1" />, variant: 'success' as const },
    cancelled: { text: 'Cancelled', icon: <XCircle className="h-4 w-4 mr-1" />, variant: 'destructive' as const },
  };

  const config = statusConfig[status] || statusConfig.pending;
  return (
    <Badge variant={config.variant} className="flex items-center">
      {config.icon}
      {config.text}
    </Badge>
  );
};

export default function TransactionDetailPage({ params }: { params: { id: string } }) {
  const [isClient, setIsClient] = useState(false);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
    // In a real app, you would fetch the transaction data here
    const data = getTransactionById(params.id);
    if (data) {
      setTransaction(data);
    }
    setIsLoading(false);
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <h1 className="text-2xl font-bold mb-4">Transaction Not Found</h1>
          <p className="text-muted-foreground mb-6">The transaction you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link href="/marketplace/junkyard/seller/transactions">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Transactions
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadInvoice = () => {
    // In a real app, this would generate and download a PDF invoice
    alert('Downloading invoice...');
  };

  const handleUpdateStatus = (newStatus: TransactionStatus) => {
    // In a real app, this would update the transaction status via API
    alert(`Updating status to: ${newStatus}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Button variant="ghost" asChild>
            <Link href="/marketplace/junkyard/seller/transactions">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Transactions
            </Link>
          </Button>
          <h1 className="text-2xl font-bold mt-2">Order #{transaction.id}</h1>
          <div className="flex items-center mt-2">
            <span className="text-sm text-muted-foreground mr-2">Status:</span>
            {getStatusBadge(transaction.status)}
            <span className="text-sm text-muted-foreground ml-4">
              Ordered on {new Date(transaction.orderDate).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownloadInvoice}>
            <Download className="h-4 w-4 mr-2" />
            Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transaction.items.map((item) => (
                  <div key={item.id} className="flex items-start gap-4 pb-4 border-b">
                    <div className="relative h-20 w-20 rounded-md overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.type}</p>
                      <p className="text-sm mt-1">{item.price} × {item.quantity} kg</p>
                    </div>
                    <div className="font-medium">
                      ${(parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Shipping Address</h4>
                  <address className="not-italic text-sm">
                    {transaction.buyer.name}<br />
                    {transaction.buyer.address}
                  </address>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Contact Information</h4>
                  <p className="text-sm">
                    <a href={`tel:${transaction.buyer.phone}`} className="flex items-center text-foreground hover:underline">
                      <Phone className="h-4 w-4 mr-2" />
                      {transaction.buyer.phone}
                    </a>
                    <a href={`mailto:${transaction.buyer.email}`} className="flex items-center text-foreground hover:underline mt-1">
                      <Mail className="h-4 w-4 mr-2" />
                      {transaction.buyer.email}
                    </a>
                  </p>
                </div>
              </div>
              
              {transaction.shipping.trackingNumber && (
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Shipping Details</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Shipping Method</p>
                      <p>{transaction.shipping.method}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Tracking Number</p>
                      <p>{transaction.shipping.trackingNumber}</p>
                    </div>
                    {transaction.shipping.carrier && (
                      <div>
                        <p className="text-muted-foreground">Carrier</p>
                        <p>{transaction.shipping.carrier}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>$950.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>$20.00</span>
                </div>
                <div className="flex justify-between font-medium text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>{transaction.payment.amount}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Method</span>
                  <span>{transaction.payment.method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transaction ID</span>
                  <span>{transaction.payment.transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant={transaction.payment.status === 'completed' ? 'success' : 'secondary'}>
                    {transaction.payment.status.charAt(0).toUpperCase() + transaction.payment.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Update Status</CardTitle>
              <CardDescription>Update the status of this order</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleUpdateStatus('confirmed')}
                disabled={transaction.status !== 'pending'}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Confirm Order
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleUpdateStatus('shipped')}
                disabled={transaction.status !== 'confirmed'}
              >
                <Truck className="h-4 w-4 mr-2" />
                Mark as Shipped
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleUpdateStatus('delivered')}
                disabled={transaction.status !== 'shipped'}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as Delivered
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start text-destructive"
                onClick={() => handleUpdateStatus('cancelled')}
                disabled={transaction.status === 'cancelled' || transaction.status === 'delivered'}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Cancel Order
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Phone className="h-4 w-4 mr-2" />
                Call Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {isClient && (
        <style jsx global>{`
          @media print {
            nav, button, footer, .no-print {
              display: none !important;
            }
            body {
              padding: 20px;
              font-size: 12px;
            }
            .container {
              max-width: 100%;
              padding: 0;
            }
          }
        `}</style>
      )}
    </div>
  );
}
