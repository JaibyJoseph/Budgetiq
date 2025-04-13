import React, { useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const Transactions = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);
  const [isIncomeDialogOpen, setIsIncomeDialogOpen] = useState(false);
  const [isReceiptDialogOpen, setIsReceiptDialogOpen] = useState(false);
  const [expenseFormData, setExpenseFormData] = useState({
    amount: "",
    category: "",
    description: "",
    date: new Date(),
  });
  const [incomeFormData, setIncomeFormData] = useState({
    amount: "",
    category: "",
    description: "",
    date: new Date(),
  });

  const handleExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Expense added successfully");
    setIsExpenseDialogOpen(false);
    setExpenseFormData({
      amount: "",
      category: "",
      description: "",
      date: new Date(),
    });
  };

  const handleIncomeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Income added successfully");
    setIsIncomeDialogOpen(false);
    setIncomeFormData({
      amount: "",
      category: "",
      description: "",
      date: new Date(),
    });
  };

  const handleReceiptUpload = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Receipt uploaded and processed");
    setIsReceiptDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold">Add Transaction</h1>
          <div className="flex flex-wrap gap-3">
            <Dialog open={isExpenseDialogOpen} onOpenChange={setIsExpenseDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="default">
                  <Plus className="mr-2 h-4 w-4" /> Add Expense
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Expense</DialogTitle>
                  <DialogDescription>
                    Enter the details of your expense below
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleExpenseSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="expense-amount">Amount (₹)</Label>
                      <Input
                        id="expense-amount"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={expenseFormData.amount}
                        onChange={(e) =>
                          setExpenseFormData({ ...expenseFormData, amount: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="expense-category">Category</Label>
                      <Select
                        value={expenseFormData.category}
                        onValueChange={(value) =>
                          setExpenseFormData({ ...expenseFormData, category: value })
                        }
                        required
                      >
                        <SelectTrigger id="expense-category">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="food">Food & Dining</SelectItem>
                          <SelectItem value="transportation">Transportation</SelectItem>
                          <SelectItem value="housing">Housing</SelectItem>
                          <SelectItem value="utilities">Utilities</SelectItem>
                          <SelectItem value="entertainment">Entertainment</SelectItem>
                          <SelectItem value="shopping">Shopping</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="personal">Personal</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="expense-description">Description</Label>
                      <Input
                        id="expense-description"
                        placeholder="e.g. Grocery shopping, Dinner with friends"
                        value={expenseFormData.description}
                        onChange={(e) =>
                          setExpenseFormData({ ...expenseFormData, description: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {expenseFormData.date ? (
                              format(expenseFormData.date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={expenseFormData.date}
                            onSelect={(date) => {
                              if (date) {
                                setExpenseFormData({ ...expenseFormData, date });
                              }
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Expense</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={isIncomeDialogOpen} onOpenChange={setIsIncomeDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" /> Add Income
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Income</DialogTitle>
                  <DialogDescription>
                    Enter the details of your income below
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleIncomeSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="income-amount">Amount (₹)</Label>
                      <Input
                        id="income-amount"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={incomeFormData.amount}
                        onChange={(e) =>
                          setIncomeFormData({ ...incomeFormData, amount: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="income-category">Category</Label>
                      <Select
                        value={incomeFormData.category}
                        onValueChange={(value) =>
                          setIncomeFormData({ ...incomeFormData, category: value })
                        }
                        required
                      >
                        <SelectTrigger id="income-category">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="salary">Salary</SelectItem>
                          <SelectItem value="freelance">Freelance</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="investment">Investment</SelectItem>
                          <SelectItem value="gift">Gift</SelectItem>
                          <SelectItem value="refund">Refund</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="income-description">Description</Label>
                      <Input
                        id="income-description"
                        placeholder="e.g. Monthly salary, Freelance project"
                        value={incomeFormData.description}
                        onChange={(e) =>
                          setIncomeFormData({ ...incomeFormData, description: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {incomeFormData.date ? (
                              format(incomeFormData.date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={incomeFormData.date}
                            onSelect={(date) => {
                              if (date) {
                                setIncomeFormData({ ...incomeFormData, date });
                              }
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Income</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={isReceiptDialogOpen} onOpenChange={setIsReceiptDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary">
                  <Upload className="mr-2 h-4 w-4" /> Upload Receipt
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Upload Receipt</DialogTitle>
                  <DialogDescription>
                    Upload a photo of your receipt for automatic processing
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleReceiptUpload}>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="receipt-upload">Receipt Image</Label>
                      <div className="border-2 border-dashed rounded-md p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-1">
                          Drag & drop your receipt here or click to browse
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Supports JPG, PNG, PDF up to 10MB
                        </p>
                        <Input
                          id="receipt-upload"
                          type="file"
                          accept="image/jpeg,image/png,application/pdf"
                          className="hidden"
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="receipt-note">Additional Note (Optional)</Label>
                      <Input
                        id="receipt-note"
                        placeholder="Any notes for this receipt"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Upload & Process</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="p-6 bg-card rounded-lg border shadow-sm">
          <Tabs defaultValue="quick-add" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 lg:w-[600px] mb-6">
              <TabsTrigger value="quick-add">Quick Add</TabsTrigger>
              <TabsTrigger value="recurring">Recurring</TabsTrigger>
              <TabsTrigger value="split">Split Transaction</TabsTrigger>
              <TabsTrigger value="transfer">Transfer</TabsTrigger>
            </TabsList>
            <TabsContent value="quick-add" className="space-y-4 pt-2">
              <div className="text-lg font-medium mb-2">Quick Add Transaction</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div className="space-y-2">
                  <Label htmlFor="quick-amount">Amount (₹)</Label>
                  <Input id="quick-amount" type="number" step="0.01" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <div className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="expense"
                        name="transaction-type"
                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary-500"
                        defaultChecked
                      />
                      <Label htmlFor="expense" className="text-sm font-normal">Expense</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="income"
                        name="transaction-type"
                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary-500"
                      />
                      <Label htmlFor="income" className="text-sm font-normal">Income</Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quick-category">Category</Label>
                  <Select>
                    <SelectTrigger id="quick-category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="food">Food & Dining</SelectItem>
                      <SelectItem value="transportation">Transportation</SelectItem>
                      <SelectItem value="housing">Housing</SelectItem>
                      <SelectItem value="utilities">Utilities</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="shopping">Shopping</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="quick-description">Description</Label>
                  <Input id="quick-description" placeholder="e.g. Grocery shopping, Coffee" />
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <Button type="submit" onClick={() => toast.success("Transaction added successfully")}>
                    Add Transaction
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="recurring" className="space-y-4 pt-2">
              <div className="p-8 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <CalendarIcon className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">Set Up Recurring Transactions</h3>
                <p className="text-muted-foreground mb-4">
                  Create automatic entries for regular income or expenses like bills, subscriptions, or salary.
                </p>
                <Button>Set Up Recurring Transaction</Button>
              </div>
            </TabsContent>
            <TabsContent value="split" className="space-y-4 pt-2">
              <div className="p-8 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Split Transactions With Friends</h3>
                <p className="text-muted-foreground mb-4">
                  Split a bill or expense with multiple people and track who owes what.
                </p>
                <Button>Create Split Transaction</Button>
              </div>
            </TabsContent>
            <TabsContent value="transfer" className="space-y-4 pt-2">
              <div className="p-8 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Transfer Between Accounts</h3>
                <p className="text-muted-foreground mb-4">
                  Record transfers between your accounts to keep track of your money movements.
                </p>
                <Button>Create Transfer</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Transactions;
