
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { 
  Download, 
  Filter, 
  MoreVertical, 
  Search, 
  Edit, 
  Trash, 
  ArrowDown, 
  ArrowUp
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

interface Transaction {
  id: string;
  date: Date;
  description: string;
  category: string;
  type: "expense" | "income";
  amount: number;
  paymentMethod: string;
}

const History = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>();
  const [typeFilter, setTypeFilter] = useState<string | undefined>();
  const [timePeriod, setTimePeriod] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);

  // Sample transaction data
  const transactions: Transaction[] = [
    {
      id: "tx1",
      date: new Date(2024, 3, 7),
      description: "Grocery Shopping",
      category: "Food",
      type: "expense",
      amount: 75.50,
      paymentMethod: "Credit Card",
    },
    {
      id: "tx2",
      date: new Date(2024, 3, 5),
      description: "Salary Deposit",
      category: "Income",
      type: "income",
      amount: 3500.00,
      paymentMethod: "Bank Transfer",
    },
    {
      id: "tx3",
      date: new Date(2024, 3, 4),
      description: "Netflix Subscription",
      category: "Entertainment",
      type: "expense",
      amount: 14.99,
      paymentMethod: "Credit Card",
    },
    {
      id: "tx4",
      date: new Date(2024, 3, 3),
      description: "Gas Station",
      category: "Transportation",
      type: "expense",
      amount: 45.30,
      paymentMethod: "Debit Card",
    },
    {
      id: "tx5",
      date: new Date(2024, 3, 2),
      description: "Freelance Payment",
      category: "Income",
      type: "income",
      amount: 850.00,
      paymentMethod: "PayPal",
    },
    {
      id: "tx6",
      date: new Date(2024, 3, 1),
      description: "Rent Payment",
      category: "Housing",
      type: "expense",
      amount: 1200.00,
      paymentMethod: "Bank Transfer",
    },
    {
      id: "tx7",
      date: new Date(2024, 2, 28),
      description: "Internet Bill",
      category: "Utilities",
      type: "expense",
      amount: 59.99,
      paymentMethod: "Credit Card",
    },
    {
      id: "tx8",
      date: new Date(2024, 2, 25),
      description: "Restaurant Dinner",
      category: "Food",
      type: "expense",
      amount: 68.25,
      paymentMethod: "Credit Card",
    },
    {
      id: "tx9",
      date: new Date(2024, 2, 22),
      description: "Pharmacy",
      category: "Healthcare",
      type: "expense",
      amount: 35.47,
      paymentMethod: "Debit Card",
    },
    {
      id: "tx10",
      date: new Date(2024, 2, 20),
      description: "Clothing Store",
      category: "Shopping",
      type: "expense",
      amount: 125.30,
      paymentMethod: "Credit Card",
    },
  ];

  // Filter transactions based on search term and filters
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || transaction.category === categoryFilter;
    const matchesType = !typeFilter || transaction.type === typeFilter;
    
    let matchesTimePeriod = true;
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(today.getDate() - 90);
    
    if (timePeriod === "30days") {
      matchesTimePeriod = transaction.date >= thirtyDaysAgo;
    } else if (timePeriod === "90days") {
      matchesTimePeriod = transaction.date >= ninetyDaysAgo;
    }
    
    return matchesSearch && matchesCategory && matchesType && matchesTimePeriod;
  });

  const categories = Array.from(new Set(transactions.map(tx => tx.category)));

  const handleEdit = (id: string) => {
    toast.success(`Edit transaction ${id}`);
  };

  const handleDelete = (id: string) => {
    setSelectedTransaction(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedTransaction) {
      toast.success(`Transaction ${selectedTransaction} deleted`);
      setDeleteDialogOpen(false);
      setSelectedTransaction(null);
    }
  };

  const handleExport = () => {
    toast.success("Transactions exported successfully");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Transaction History</h1>
          <Button onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={undefined}>All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={undefined}>All Types</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
                <SelectItem value="income">Income</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={timePeriod} onValueChange={setTimePeriod}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{format(transaction.date, "MMM dd, yyyy")}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs bg-muted">
                        {transaction.category}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {transaction.type === "expense" ? (
                          <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
                        ) : (
                          <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                        )}
                        <span className={transaction.type === "expense" ? "text-red-500" : "text-green-500"}>
                          ${transaction.amount.toFixed(2)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{transaction.paymentMethod}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(transaction.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(transaction.id)}>
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this transaction? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default History;
