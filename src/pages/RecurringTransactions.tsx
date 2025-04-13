
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { PlusCircle, Edit2, Trash2, RepeatIcon } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface RecurringTransaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  nextDate: string;
  status: 'active' | 'paused';
}

const RecurringTransactions = () => {
  const { t } = useLanguage();
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    title: '',
    amount: '',
    category: '',
    frequency: 'monthly',
  });

  // Sample data
  const [transactions, setTransactions] = useState<RecurringTransaction[]>([
    {
      id: '1',
      title: 'Netflix Subscription',
      amount: 14.99,
      category: 'Entertainment',
      frequency: 'monthly',
      nextDate: '2024-05-15',
      status: 'active',
    },
    {
      id: '2',
      title: 'Rent Payment',
      amount: 1200,
      category: 'Housing',
      frequency: 'monthly',
      nextDate: '2024-05-01',
      status: 'active',
    },
    {
      id: '3',
      title: 'Gym Membership',
      amount: 49.99,
      category: 'Fitness',
      frequency: 'monthly',
      nextDate: '2024-05-10',
      status: 'active',
    },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleAddTransaction = () => {
    // Simple validation
    if (!newTransaction.title || !newTransaction.amount || !newTransaction.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    const transaction: RecurringTransaction = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTransaction.title,
      amount: parseFloat(newTransaction.amount),
      category: newTransaction.category,
      frequency: newTransaction.frequency as 'daily' | 'weekly' | 'monthly' | 'yearly',
      nextDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
      status: 'active',
    };

    setTransactions([...transactions, transaction]);
    setNewTransaction({ title: '', amount: '', category: '', frequency: 'monthly' });
    setIsAddingTransaction(false);
    toast.success("Recurring transaction added successfully");
  };

  const handleToggleStatus = (id: string) => {
    setTransactions(
      transactions.map(transaction => 
        transaction.id === id 
          ? { 
              ...transaction, 
              status: transaction.status === 'active' ? 'paused' : 'active' 
            } 
          : transaction
      )
    );
    
    const status = transactions.find(t => t.id === id)?.status === 'active' ? 'paused' : 'active';
    toast.success(`Recurring transaction ${status}`);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
    toast.success("Recurring transaction deleted");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Recurring Transactions</h1>
          <Button onClick={() => setIsAddingTransaction(!isAddingTransaction)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Recurring Transaction
          </Button>
        </div>

        {isAddingTransaction && (
          <Card>
            <CardHeader>
              <CardTitle>New Recurring Transaction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Description</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    value={newTransaction.title} 
                    onChange={handleInputChange} 
                    placeholder="e.g., Netflix Subscription"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input 
                    id="amount" 
                    name="amount" 
                    type="number" 
                    value={newTransaction.amount} 
                    onChange={handleInputChange}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input 
                    id="category" 
                    name="category" 
                    value={newTransaction.category} 
                    onChange={handleInputChange}
                    placeholder="e.g., Entertainment"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select 
                    value={newTransaction.frequency} 
                    onValueChange={(value) => handleSelectChange('frequency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Next Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.title}</TableCell>
                    <TableCell className="text-right">${transaction.amount.toFixed(2)}</TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell className="capitalize">{transaction.frequency}</TableCell>
                    <TableCell>{transaction.nextDate}</TableCell>
                    <TableCell>
                      <span 
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          transaction.status === 'active' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleToggleStatus(transaction.id)}
                          title={transaction.status === 'active' ? 'Pause' : 'Activate'}
                        >
                          <RepeatIcon className={`h-4 w-4 ${transaction.status === 'active' ? 'text-green-600' : 'text-amber-600'}`} />
                        </Button>
                        <Button variant="ghost" size="icon" title="Edit">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteTransaction(transaction.id)}
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {transactions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No recurring transactions found. Add one to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="bg-primary-foreground/5 border rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              <RepeatIcon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Recurring Transactions</h3>
              <p className="text-muted-foreground mb-4">
                Setting up recurring transactions helps you track your regular expenses automatically. 
                These transactions will be added to your records based on the frequency you set,
                helping you maintain accurate financial data without manual entry.
              </p>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Autopay bills and subscriptions</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Track recurring income like salary</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Get reminders before payments are due</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RecurringTransactions;
