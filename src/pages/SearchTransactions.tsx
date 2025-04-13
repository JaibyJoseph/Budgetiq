
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { Search, Calendar as CalendarIcon, ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  type: "income" | "expense";
  notes?: string;
}

const categories = [
  "All Categories",
  "Food",
  "Transport",
  "Entertainment",
  "Housing",
  "Utilities",
  "Shopping",
  "Health",
  "Education",
  "Travel",
  "Income",
];

const amountRanges = [
  "Any Amount",
  "$0 - $50",
  "$50 - $100",
  "$100 - $500",
  "$500 - $1000",
  "$1000+",
];

const SearchTransactions = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [selectedAmountRange, setSelectedAmountRange] = useState("Any Amount");
  const [transactionType, setTransactionType] = useState("all");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");

  // Sample transaction data
  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      title: "Grocery Store",
      amount: 75.5,
      date: "2024-04-05",
      category: "Food",
      type: "expense",
      notes: "Weekly grocery shopping",
    },
    {
      id: "2",
      title: "Salary Deposit",
      amount: 2000,
      date: "2024-04-01",
      category: "Income",
      type: "income",
    },
    {
      id: "3",
      title: "Amazon Purchase",
      amount: 120.99,
      date: "2024-03-29",
      category: "Shopping",
      type: "expense",
      notes: "New headphones",
    },
    {
      id: "4",
      title: "Uber Ride",
      amount: 24.5,
      date: "2024-03-28",
      category: "Transport",
      type: "expense",
    },
    {
      id: "5",
      title: "Apartment Rent",
      amount: 1200,
      date: "2024-03-27",
      category: "Housing",
      type: "expense",
    },
    {
      id: "6",
      title: "Movie Tickets",
      amount: 35.5,
      date: "2024-03-25",
      category: "Entertainment",
      type: "expense",
      notes: "Weekend movie with friends",
    },
    {
      id: "7",
      title: "Freelance Payment",
      amount: 500,
      date: "2024-03-23",
      category: "Income",
      type: "income",
      notes: "Website design project",
    },
    {
      id: "8",
      title: "Electricity Bill",
      amount: 85.26,
      date: "2024-03-20",
      category: "Utilities",
      type: "expense",
    },
    {
      id: "9",
      title: "Doctor Visit",
      amount: 150,
      date: "2024-03-18",
      category: "Health",
      type: "expense",
    },
    {
      id: "10",
      title: "Online Course",
      amount: 199.99,
      date: "2024-03-15",
      category: "Education",
      type: "expense",
      notes: "Python programming course",
    },
    {
      id: "11",
      title: "Coffee Shop",
      amount: 4.75,
      date: "2024-03-12",
      category: "Food",
      type: "expense",
    },
    {
      id: "12",
      title: "Gym Membership",
      amount: 49.99,
      date: "2024-03-10",
      category: "Health",
      type: "expense",
    },
  ]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategory("All Categories");
    setFromDate(undefined);
    setToDate(undefined);
    setSelectedAmountRange("Any Amount");
    setTransactionType("all");
    setSortField("date");
    setSortDirection("desc");
    toast.success("Search filters reset");
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Apply filters
  const filteredTransactions = transactions.filter((transaction) => {
    // Text search
    const matchesSearch = transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (transaction.notes || "").toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = selectedCategory === "All Categories" || transaction.category === selectedCategory;
    
    // Date range filter
    const transactionDate = new Date(transaction.date);
    const matchesDateFrom = !fromDate || transactionDate >= fromDate;
    const matchesDateTo = !toDate || transactionDate <= toDate;
    
    // Amount range filter
    let matchesAmount = true;
    if (selectedAmountRange !== "Any Amount") {
      const amount = transaction.amount;
      switch (selectedAmountRange) {
        case "$0 - $50":
          matchesAmount = amount >= 0 && amount <= 50;
          break;
        case "$50 - $100":
          matchesAmount = amount > 50 && amount <= 100;
          break;
        case "$100 - $500":
          matchesAmount = amount > 100 && amount <= 500;
          break;
        case "$500 - $1000":
          matchesAmount = amount > 500 && amount <= 1000;
          break;
        case "$1000+":
          matchesAmount = amount > 1000;
          break;
        default:
          matchesAmount = true;
      }
    }
    
    // Transaction type filter
    const matchesType = transactionType === "all" || transaction.type === transactionType;
    
    return matchesSearch && matchesCategory && matchesDateFrom && matchesDateTo && matchesAmount && matchesType;
  });

  // Apply sorting
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    let comparison = 0;
    
    switch (sortField) {
      case "title":
        comparison = a.title.localeCompare(b.title);
        break;
      case "amount":
        comparison = a.amount - b.amount;
        break;
      case "date":
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
        break;
      case "category":
        comparison = a.category.localeCompare(b.category);
        break;
      default:
        comparison = 0;
    }
    
    return sortDirection === "asc" ? comparison : -comparison;
  });

  const getSortIcon = (field: string) => {
    if (sortField !== field) return null;
    
    return sortDirection === "asc" ? 
      <ArrowUpNarrowWide className="ml-1 h-4 w-4" /> : 
      <ArrowDownNarrowWide className="ml-1 h-4 w-4" />;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Search Transactions</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Search Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="col-span-1 md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search transactions..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="category" className="text-xs">Category</Label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="transaction-type" className="text-xs">Transaction Type</Label>
                <Select
                  value={transactionType}
                  onValueChange={setTransactionType}
                >
                  <SelectTrigger id="transaction-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="amount-range" className="text-xs">Amount Range</Label>
                <Select
                  value={selectedAmountRange}
                  onValueChange={setSelectedAmountRange}
                >
                  <SelectTrigger id="amount-range">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    {amountRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-xs">From Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {fromDate ? format(fromDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={fromDate}
                      onSelect={setFromDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label className="text-xs">To Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {toDate ? format(toDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={toDate}
                      onSelect={setToDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="md:col-span-2 flex items-end">
                <Button variant="outline" onClick={handleReset} className="w-full">
                  Reset Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Search Results ({sortedTransactions.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead onClick={() => handleSort("title")} className="cursor-pointer">
                      <div className="flex items-center">
                        Description {getSortIcon("title")}
                      </div>
                    </TableHead>
                    <TableHead onClick={() => handleSort("amount")} className="cursor-pointer">
                      <div className="flex items-center">
                        Amount {getSortIcon("amount")}
                      </div>
                    </TableHead>
                    <TableHead onClick={() => handleSort("category")} className="cursor-pointer">
                      <div className="flex items-center">
                        Category {getSortIcon("category")}
                      </div>
                    </TableHead>
                    <TableHead onClick={() => handleSort("date")} className="cursor-pointer">
                      <div className="flex items-center">
                        Date {getSortIcon("date")}
                      </div>
                    </TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedTransactions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No transactions matching your search criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">
                          {transaction.title}
                        </TableCell>
                        <TableCell className={transaction.type === "income" ? "text-green-600" : "text-red-600"}>
                          {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-primary/10">
                            {transaction.category}
                          </span>
                        </TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {transaction.notes || "—"}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-sm text-muted-foreground">
          Click on column headers to sort. You can also export these results from the Download Reports page.
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SearchTransactions;
