'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, Clock, XCircle, Truck, MessageSquare, Phone, Mail, FileText, Download, Printer, RefreshCw } from "lucide-react";
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
  cancelledDate?: string;
  cancellationReason?: string;
  items: TransactionItem[];
  buyer: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  payment: {
    method: string;
    transactionId?: string;
    amount: string;
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    failureReason?: string;
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
    // Pending transaction
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
    // Confirmed transaction
    {
      id: 'TXN-002',
      status: 'confirmed',
      orderDate: '2025-09-24T11:20:00Z',
      items: [
        {
          id: '3',
          name: 'Brass Scrap',
          type: 'Brass',
          price: '$12.75/kg',
          quantity: 35,
          image: '/circuit-boards.jpeg',
        },
      ],
      buyer: {
        name: 'Jane Smith',
        phone: '+91 98765 12340',
        email: 'jane.smith@example.com',
        address: '456 Industrial Area, Whitefield, Bengaluru, Karnataka 560066',
      },
      payment: {
        method: 'Bank Transfer',
        transactionId: 'TXN123456789',
        amount: '$450.00',
        status: 'completed',
      },
      shipping: {
        method: 'Express Delivery',
        trackingNumber: 'SHIP987654321',
        carrier: 'Blue Dart',
      },
    },
    // Shipped transaction
    {
      id: 'TXN-003',
      status: 'shipped',
      orderDate: '2025-09-23T09:15:00Z',
      items: [
        {
          id: '4',
          name: 'Stainless Steel Scrap',
          type: 'Stainless Steel',
          price: '$5.90/kg',
          quantity: 200,
          image: '/copper-wire-scrap.jpeg',
        },
        {
          id: '5',
          name: 'Aluminum Profiles',
          type: 'Aluminum',
          price: '$2.30/kg',
          quantity: 150,
          image: '/aluminium-cans.jpeg',
        },
      ],
      buyer: {
        name: 'Acme Corp',
        phone: '+91 98765 67890',
        email: 'purchasing@acmecorp.com',
        address: '789 Corporate Towers, Hitech City, Hyderabad, Telangana 500081',
      },
      payment: {
        method: 'Net Banking',
        transactionId: 'TXN456789123',
        amount: '$2,345.00',
        status: 'completed',
      },
      shipping: {
        method: 'Standard Delivery',
        trackingNumber: 'SHIP456123789',
        carrier: 'Delhivery',
      },
    },
    // Delivered transaction
    {
      id: 'TXN-004',
      status: 'delivered',
      orderDate: '2025-09-22T16:45:00Z',
      deliveryDate: '2025-09-24T14:20:00Z',
      items: [
        {
          id: '6',
          name: 'Copper Tubes',
          type: 'Copper',
          price: '$9.20/kg',
          quantity: 75,
          image: '/copper-wire-scrap.jpeg',
        },
        {
          id: '7',
          name: 'Aluminum Wheels',
          type: 'Aluminum',
          price: '$3.50/kg',
          quantity: 40,
          image: '/aluminium-cans.jpeg',
        },
      ],
      buyer: {
        name: 'Global Metals',
        phone: '+91 98765 54321',
        email: 'orders@globalmetals.com',
        address: '321 Export Hub, Kandla Port, Gujarat 370210',
      },
      payment: {
        method: 'Letter of Credit',
        transactionId: 'TXN789123456',
        amount: '$1,230.00',
        status: 'completed',
      },
      shipping: {
        method: 'Sea Freight',
        trackingNumber: 'SHIP789123456',
        carrier: 'Maersk',
      },
    },
    // Cancelled transaction with refund
    {
      id: 'TXN-005',
      status: 'cancelled',
      orderDate: '2025-09-21T10:30:00Z',
      cancelledDate: '2025-09-21T14:15:00Z',
      items: [
        {
          id: '8',
          name: 'Brass Fittings',
          type: 'Brass',
          price: '$14.50/kg',
          quantity: 30,
          image: '/circuit-boards.jpeg',
        },
      ],
      buyer: {
        name: 'Tech Recyclers',
        phone: '+91 98765 98765',
        email: 'returns@techrecyclers.com',
        address: '654 E-Waste Center, Peenya, Bengaluru, Karnataka 560058',
      },
      payment: {
        method: 'Credit Card',
        transactionId: 'TXN321654987',
        amount: '$780.00',
        status: 'refunded',
      },
      shipping: {
        method: 'Standard Delivery',
        trackingNumber: 'SHIP321654987',
        carrier: 'FedEx',
      },
      cancellationReason: 'Customer requested to cancel the order',
    },
    // Failed payment
    {
      id: 'TXN-006',
      status: 'pending',
      orderDate: '2025-09-20T13:20:00Z',
      items: [
        {
          id: '9',
          name: 'Stainless Steel Sheets',
          type: 'Stainless Steel',
          price: '$6.75/kg',
          quantity: 120,
          image: '/copper-wire-scrap.jpeg',
        },
      ],
      buyer: {
        name: 'Metal Works Inc',
        phone: '+91 98765 12345',
        email: 'accounts@metalworks.com',
        address: '987 Foundry Lane, MIDC, Pune, Maharashtra 411028',
      },
      payment: {
        method: 'Net Banking',
        transactionId: 'TXN654987321',
        amount: '$1,560.00',
        status: 'failed',
        failureReason: 'Insufficient funds',
      },
      shipping: {
        method: 'Standard Delivery',
      },
    },
    // Pending payment
    {
      id: 'TXN-007',
      status: 'pending',
      orderDate: '2025-09-19T15:10:00Z',
      items: [
        {
          id: '10',
          name: 'Aluminum Extrusions',
          type: 'Aluminum',
          price: '$2.10/kg',
          quantity: 200,
          image: '/aluminium-cans.jpeg',
        },
      ],
      buyer: {
        name: 'Green Recycling',
        phone: '+91 98765 67890',
        email: 'info@greenrecycling.org',
        address: '159 Eco Park, Noida, Uttar Pradesh 201301',
      },
      payment: {
        method: 'Bank Transfer',
        amount: '$890.00',
        status: 'pending',
      },
      shipping: {
        method: 'Standard Delivery',
      },
    },
  ];

  return transactions.find((txn) => txn.id === id);
};

const getStatusBadge = (status: TransactionStatus) => {
  const statusConfig = {
    pending: { 
      text: 'Pending', 
      icon: <Clock className="h-4 w-4 mr-1" />, 
      variant: 'secondary' as const 
    },
    confirmed: { 
      text: 'Confirmed', 
      icon: <CheckCircle className="h-4 w-4 mr-1" />, 
      variant: 'default' as const 
    },
    shipped: { 
      text: 'Shipped', 
      icon: <Truck className="h-4 w-4 mr-1" />, 
      variant: 'default' as const 
    },
    delivered: { 
      text: 'Delivered', 
      icon: <CheckCircle className="h-4 w-4 mr-1" />, 
      variant: 'default' as const 
    },
    cancelled: { 
      text: 'Cancelled', 
      icon: <XCircle className="h-4 w-4 mr-1" />, 
      variant: 'destructive' as const 
    },
  };

  const config = statusConfig[status] || statusConfig.pending;
  return (
    <Badge variant={config.variant} className="flex items-center">
      {config.icon}
      {config.text}
    </Badge>
  );
};

const getPaymentStatusBadge = (status: string) => {
  const statusConfig = {
    pending: { 
      text: 'Pending', 
      variant: 'secondary' as const 
    },
    completed: { 
      text: 'Paid', 
      variant: 'default' as const 
    },
    failed: { 
      text: 'Failed', 
      variant: 'destructive' as const 
    },
    refunded: { 
      text: 'Refunded', 
      variant: 'outline' as const 
    },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  return <Badge variant={config.variant}>{config.text}</Badge>;
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
                  {getPaymentStatusBadge(transaction.payment.status)}
                </div>
                {transaction.payment.failureReason && (
                  <div className="text-sm text-red-500 mt-1">
                    Reason: {transaction.payment.failureReason}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Actions</CardTitle>
              <CardDescription>Manage this order</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {transaction.status === 'pending' && transaction.payment.status === 'pending' && (
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleUpdateStatus('pending')}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retry Payment
                </Button>
              )}

              {transaction.status === 'pending' && transaction.payment.status === 'completed' && (
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleUpdateStatus('confirmed')}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirm Order
                </Button>
              )}

              {transaction.status === 'confirmed' && (
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleUpdateStatus('shipped')}
                >
                  <Truck className="h-4 w-4 mr-2" />
                  Mark as Shipped
                </Button>
              )}

              {transaction.status === 'shipped' && (
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleUpdateStatus('delivered')}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Delivered
                </Button>
              )}

              {['pending', 'confirmed', 'shipped'].includes(transaction.status) && (
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-destructive"
                  onClick={() => handleUpdateStatus('cancelled')}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Cancel Order
                </Button>
              )}

              {transaction.status === 'cancelled' && transaction.payment.status === 'refunded' && (
                <div className="text-sm text-green-600 p-2 bg-green-50 rounded-md">
                  <div className="font-medium">Refund Processed</div>
                  <div>Amount: {transaction.payment.amount} has been refunded</div>
                </div>
              )}

              {transaction.status === 'delivered' && (
                <div className="text-sm text-green-600 p-2 bg-green-50 rounded-md">
                  <div className="font-medium">Order Delivered</div>
                  <div>Delivered on: {new Date(transaction.deliveryDate || '').toLocaleDateString()}</div>
                </div>
              )}
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
