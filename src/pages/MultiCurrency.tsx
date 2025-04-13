import React, { useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Globe, RefreshCw, ChevronsUpDown, Plus, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

// Currency type
interface Currency {
  code: string;
  name: string;
  symbol: string;
  exchangeRate: number; // Rate to USD
}

// Sample currencies data
const currencies: Currency[] = [
  { code: "INR", name: "Indian Rupee", symbol: "₹", exchangeRate: 83.20 },
  { code: "USD", name: "US Dollar", symbol: "$", exchangeRate: 1 },
  { code: "EUR", name: "Euro", symbol: "€", exchangeRate: 0.91 },
  { code: "GBP", name: "British Pound", symbol: "£", exchangeRate: 0.78 },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", exchangeRate: 146.32 },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", exchangeRate: 1.36 },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", exchangeRate: 1.48 },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", exchangeRate: 7.16 },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF", exchangeRate: 0.87 },
  { code: "BRL", name: "Brazilian Real", symbol: "R$", exchangeRate: 5.07 },
  { code: "MXN", name: "Mexican Peso", symbol: "Mex$", exchangeRate: 16.76 },
];

const defaultConversion = [
  { from: "USD", to: "EUR", amount: 100 },
  { from: "USD", to: "GBP", amount: 100 },
  { from: "USD", to: "JPY", amount: 100 },
];

interface Transaction {
  id: string;
  description: string;
  amount: number;
  currency: string;
  date: string;
  category: string;
  amountInUSD: number;
}

const MultiCurrency = () => {
  const { t } = useLanguage();
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [quickConversions, setQuickConversions] = useState(defaultConversion);
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    description: "",
    amount: "",
    currency: "USD",
    category: "",
  });

  // Sample transactions
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      description: "Hotel Booking - Paris",
      amount: 450,
      currency: "EUR",
      date: "2024-03-15",
      category: "Travel",
      amountInUSD: 489.13,
    },
    {
      id: "2",
      description: "Conference Ticket",
      amount: 350,
      currency: "GBP",
      date: "2024-03-10",
      category: "Business",
      amountInUSD: 442.18,
    },
    {
      id: "3",
      description: "Restaurant - Tokyo",
      amount: 8500,
      currency: "JPY",
      date: "2024-02-25",
      category: "Food",
      amountInUSD: 56.01,
    },
    {
      id: "4",
      description: "Souvenir Shopping",
      amount: 3500,
      currency: "INR",
      date: "2024-02-20",
      category: "Shopping",
      amountInUSD: 41.95,
    },
  ]);

  // Get exchange rate between two currencies
  const getExchangeRate = (from: string, to: string): number => {
    const fromCurrency = currencies.find((c) => c.code === from);
    const toCurrency = currencies.find((c) => c.code === to);
    
    if (!fromCurrency || !toCurrency) return 1;
    
    // Convert through USD
    return toCurrency.exchangeRate / fromCurrency.exchangeRate;
  };

  // Convert amount between currencies
  const convertAmount = (amount: number, from: string, to: string): number => {
    const rate = getExchangeRate(from, to);
    return amount * rate;
  };

  // Handle conversion
  const handleConvert = () => {
    if (!amount) {
      toast.error("Please enter an amount");
      return;
    }
    
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    const result = convertAmount(numAmount, fromCurrency, toCurrency);
    toast.success(
      `${numAmount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`,
      {
        description: `Exchange rate: 1 ${fromCurrency} = ${getExchangeRate(fromCurrency, toCurrency).toFixed(4)} ${toCurrency}`,
      }
    );
  };

  // Swap currencies
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Add quick conversion
  const handleAddQuickConversion = () => {
    const newConversion = { from: fromCurrency, to: toCurrency, amount: parseFloat(amount) || 1 };
    setQuickConversions([...quickConversions, newConversion]);
    toast.success("Quick conversion added");
  };

  // Handle new transaction form change
  const handleTransactionFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  // Handle currency selection for new transaction
  const handleCurrencyChange = (value: string) => {
    setNewTransaction({ ...newTransaction, currency: value });
  };

  // Add new transaction
  const handleAddTransaction = () => {
    if (!newTransaction.description || !newTransaction.amount || !newTransaction.category) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const amount = parseFloat(newTransaction.amount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    const amountInUSD = convertAmount(amount, newTransaction.currency, "USD");
    
    const transaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      description: newTransaction.description,
      amount: amount,
      currency: newTransaction.currency,
      date: new Date().toISOString().split("T")[0],
      category: newTransaction.category,
      amountInUSD: amountInUSD,
    };
    
    setTransactions([transaction, ...transactions]);
    setNewTransaction({
      description: "",
      amount: "",
      currency: "USD",
      category: "",
    });
    setIsAddingTransaction(false);
    toast.success("Transaction added successfully");
  };

  // Format amount with currency symbol
  const formatCurrency = (amount: number, currencyCode: string): string => {
    const currency = currencies.find((c) => c.code === currencyCode);
    return `${currency?.symbol || ""}${amount.toFixed(2)}`;
  };

  // Calculate balance in each currency
  const calculateBalances = () => {
    const balances: Record<string, number> = {};
    
    transactions.forEach((transaction) => {
      if (!balances[transaction.currency]) {
        balances[transaction.currency] = 0;
      }
      balances[transaction.currency] -= transaction.amount;
    });
    
    return Object.entries(balances).map(([currency, amount]) => ({
      currency,
      amount,
      amountInBaseCurrency: convertAmount(amount, currency, baseCurrency),
    }));
  };

  // Total in base currency
  const totalInBaseCurrency = transactions.reduce((total, transaction) => {
    return total - convertAmount(transaction.amount, transaction.currency, baseCurrency);
  }, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Multi-Currency Management</h1>
          <Button onClick={() => setIsAddingTransaction(!isAddingTransaction)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Foreign Transaction
          </Button>
        </div>
        
        {isAddingTransaction && (
          <Card>
            <CardHeader>
              <CardTitle>Add Foreign Currency Transaction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input 
                    id="description" 
                    name="description" 
                    value={newTransaction.description} 
                    onChange={handleTransactionFormChange}
                    placeholder="e.g., Hotel Booking"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input 
                    id="amount" 
                    name="amount" 
                    type="number" 
                    value={newTransaction.amount} 
                    onChange={handleTransactionFormChange}
                    placeholder="0.00"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={newTransaction.currency}
                    onValueChange={handleCurrencyChange}
                  >
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.code} - {currency.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input 
                    id="category" 
                    name="category" 
                    value={newTransaction.category} 
                    onChange={handleTransactionFormChange}
                    placeholder="e.g., Travel, Food"
                  />
                </div>
              </div>
              
              <div className="mt-4 text-sm text-muted-foreground">
                This transaction will be converted to {baseCurrency} at the current exchange rate: 1 {newTransaction.currency} = {getExchangeRate(newTransaction.currency, baseCurrency).toFixed(4)} {baseCurrency}
              </div>
              
              <div className="flex justify-end mt-6 space-x-2">
                <Button variant="outline" onClick={() => setIsAddingTransaction(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddTransaction}>
                  Save Transaction
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Currency Converter</CardTitle>
              <CardDescription>
                Convert between different currencies using the latest exchange rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount-input">Amount</Label>
                    <Input
                      id="amount-input"
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="from-currency">From</Label>
                    <Select value={fromCurrency} onValueChange={setFromCurrency}>
                      <SelectTrigger id="from-currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.code} - {currency.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="to-currency">To</Label>
                    <div className="flex items-center gap-2">
                      <Select value={toCurrency} onValueChange={setToCurrency} className="flex-1">
                        <SelectTrigger id="to-currency">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map((currency) => (
                            <SelectItem key={currency.code} value={currency.code}>
                              {currency.code} - {currency.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleSwapCurrencies}
                        className="flex-shrink-0"
                      >
                        <ChevronsUpDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleAddQuickConversion} className="w-1/3">
                    Save Conversion
                  </Button>
                  <Button onClick={handleConvert} className="w-1/2">
                    Convert
                  </Button>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Quick Conversions</h3>
                  <div className="space-y-2">
                    {quickConversions.map((conversion, index) => {
                      const rate = getExchangeRate(conversion.from, conversion.to);
                      const result = conversion.amount * rate;
                      
                      return (
                        <div key={index} className="flex justify-between items-center p-2 border rounded-md">
                          <div>
                            <span className="font-medium">{conversion.amount}</span> {conversion.from}
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <RefreshCw className="mx-2 h-3 w-3" />
                          </div>
                          <div>
                            <span className="font-medium">{result.toFixed(2)}</span> {conversion.to}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <CardTitle>Multi-Currency Balance</CardTitle>
                  <CardDescription>
                    Your balances across different currencies
                  </CardDescription>
                </div>
                <Select value={baseCurrency} onValueChange={setBaseCurrency}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Base currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {calculateBalances().map(({ currency, amount, amountInBaseCurrency }) => (
                  <div key={currency} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                    <div>
                      <div className="text-lg font-semibold">{formatCurrency(amount, currency)}</div>
                      <div className="text-sm text-muted-foreground">{currency}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">In {baseCurrency}</div>
                      <div className="text-lg font-semibold">{formatCurrency(amountInBaseCurrency, baseCurrency)}</div>
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <div className="text-lg font-medium">Total Balance:</div>
                    <div className="text-xl font-bold text-primary">
                      {formatCurrency(totalInBaseCurrency, baseCurrency)}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Foreign Currency Transactions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Original Amount</TableHead>
                  <TableHead>In {baseCurrency}</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No foreign currency transactions yet
                    </TableCell>
                  </TableRow>
                ) : (
                  transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.description}</TableCell>
                      <TableCell>
                        {formatCurrency(transaction.amount, transaction.currency)} {transaction.currency}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(
                          convertAmount(transaction.amount, transaction.currency, baseCurrency),
                          baseCurrency
                        )}
                      </TableCell>
                      <TableCell>{transaction.category}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card className="bg-primary-foreground/5 border rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
              <Globe className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">About Multi-Currency Support</h3>
              <p className="text-muted-foreground mb-4">
                Track your expenses in different currencies while traveling or working internationally.
                All foreign transactions are automatically converted to your base currency for consistent financial tracking.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2 border rounded-lg p-3">
                  <h4 className="font-medium">Currency Conversion</h4>
                  <p className="text-sm text-muted-foreground">
                    Convert between currencies using real-time exchange rates.
                  </p>
                </div>
                <div className="space-y-2 border rounded-lg p-3">
                  <h4 className="font-medium">Track Foreign Spending</h4>
                  <p className="text-sm text-muted-foreground">
                    Record expenses in their original currency for accurate records.
                  </p>
                </div>
                <div className="space-y-2 border rounded-lg p-3">
                  <h4 className="font-medium">Consolidated View</h4>
                  <p className="text-sm text-muted-foreground">
                    See your total balance in your preferred base currency.
                  </p>
                </div>
                <div className="space-y-2 border rounded-lg p-3">
                  <h4 className="font-medium">Exchange Rate Updates</h4>
                  <p className="text-sm text-muted-foreground">
                    Rates are updated regularly to reflect current market conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MultiCurrency;
