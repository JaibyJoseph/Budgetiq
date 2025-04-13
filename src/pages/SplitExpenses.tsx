
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, Trash2, Users, UserPlus, ArrowRight, Send } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface Group {
  id: string;
  name: string;
  members: string[];
  expenses: Expense[];
  createdAt: string;
}

interface Expense {
  id: string;
  title: string;
  amount: number;
  paidBy: string;
  date: string;
  splitType: 'equal' | 'custom';
  shares?: Record<string, number>;
}

const SplitExpenses = () => {
  const { t } = useLanguage();
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [isAddingGroup, setIsAddingGroup] = useState(false);
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: '',
    members: ['Me', ''],
  });
  const [newExpense, setNewExpense] = useState({
    title: '',
    amount: '',
    paidBy: 'Me',
    splitType: 'equal',
    shares: {} as Record<string, number>,
  });

  // Sample data
  const [groups, setGroups] = useState<Group[]>([
    {
      id: '1',
      name: 'Beach Trip',
      members: ['Me', 'Alex', 'Jordan', 'Taylor'],
      expenses: [
        {
          id: 'e1',
          title: 'Airbnb Rental',
          amount: 800,
          paidBy: 'Me',
          date: '2024-03-15',
          splitType: 'equal',
        },
        {
          id: 'e2',
          title: 'Groceries',
          amount: 120,
          paidBy: 'Alex',
          date: '2024-03-16',
          splitType: 'equal',
        },
        {
          id: 'e3',
          title: 'Dinner Out',
          amount: 200,
          paidBy: 'Jordan',
          date: '2024-03-17',
          splitType: 'equal',
        },
      ],
      createdAt: '2024-03-01',
    },
    {
      id: '2',
      name: 'Roommates',
      members: ['Me', 'Sam', 'Jamie'],
      expenses: [
        {
          id: 'e4',
          title: 'Electricity Bill',
          amount: 150,
          paidBy: 'Me',
          date: '2024-04-01',
          splitType: 'equal',
        },
        {
          id: 'e5',
          title: 'Internet',
          amount: 80,
          paidBy: 'Sam',
          date: '2024-04-05',
          splitType: 'equal',
        },
      ],
      createdAt: '2024-02-15',
    },
  ]);

  const handleNewGroupInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewGroup({ ...newGroup, name: e.target.value });
  };

  const handleNewGroupMemberInput = (index: number, value: string) => {
    const updatedMembers = [...newGroup.members];
    updatedMembers[index] = value;
    setNewGroup({ ...newGroup, members: updatedMembers });
  };

  const addNewMember = () => {
    setNewGroup({
      ...newGroup,
      members: [...newGroup.members, ''],
    });
  };

  const removeMember = (index: number) => {
    if (index === 0) return; // Don't remove "Me"
    const updatedMembers = [...newGroup.members];
    updatedMembers.splice(index, 1);
    setNewGroup({ ...newGroup, members: updatedMembers });
  };

  const handleAddGroup = () => {
    // Simple validation
    if (!newGroup.name.trim()) {
      toast.error("Please enter a group name");
      return;
    }

    const filteredMembers = newGroup.members.filter(member => member.trim());
    if (filteredMembers.length < 2) {
      toast.error("Please add at least one other person to your group");
      return;
    }

    const group: Group = {
      id: Math.random().toString(36).substr(2, 9),
      name: newGroup.name,
      members: filteredMembers,
      expenses: [],
      createdAt: new Date().toISOString().split('T')[0],
    };

    const updatedGroups = [...groups, group];
    setGroups(updatedGroups);
    setActiveGroup(group.id);
    setNewGroup({ name: '', members: ['Me', ''] });
    setIsAddingGroup(false);
    toast.success("Group created successfully");
  };

  const handleNewExpenseInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  const handleSplitTypeChange = (value: string) => {
    setNewExpense({ 
      ...newExpense, 
      splitType: value as 'equal' | 'custom',
      shares: {} as Record<string, number>,
    });
  };

  const handlePaidByChange = (value: string) => {
    setNewExpense({ ...newExpense, paidBy: value });
  };

  const handleShareInput = (member: string, value: string) => {
    const amount = parseFloat(value) || 0;
    setNewExpense({
      ...newExpense,
      shares: { ...newExpense.shares, [member]: amount },
    });
  };

  const handleAddExpense = () => {
    if (!activeGroup) return;

    // Simple validation
    if (!newExpense.title.trim() || !newExpense.amount) {
      toast.error("Please fill in all required fields");
      return;
    }

    const amount = parseFloat(newExpense.amount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    const expense: Expense = {
      id: Math.random().toString(36).substr(2, 9),
      title: newExpense.title,
      amount: amount,
      paidBy: newExpense.paidBy,
      date: new Date().toISOString().split('T')[0],
      splitType: newExpense.splitType,
    };

    if (newExpense.splitType === 'custom') {
      expense.shares = newExpense.shares;
    }

    const updatedGroups = groups.map(group => 
      group.id === activeGroup 
        ? { ...group, expenses: [...group.expenses, expense] }
        : group
    );
    
    setGroups(updatedGroups);
    setNewExpense({
      title: '',
      amount: '',
      paidBy: 'Me',
      splitType: 'equal',
      shares: {} as Record<string, number>,
    });
    setIsAddingExpense(false);
    toast.success("Expense added successfully");
  };

  const calculateBalances = (group: Group): Record<string, number> => {
    const balances: Record<string, number> = {};
    
    // Initialize balances for all members
    group.members.forEach(member => {
      balances[member] = 0;
    });
    
    // Calculate payments and debts
    group.expenses.forEach(expense => {
      const { amount, paidBy, splitType, shares } = expense;
      
      // Add what the payer paid
      balances[paidBy] += amount;
      
      if (splitType === 'equal') {
        // Subtract equal shares from each member
        const perPerson = amount / group.members.length;
        group.members.forEach(member => {
          balances[member] -= perPerson;
        });
      } else if (splitType === 'custom' && shares) {
        // Subtract custom shares
        Object.entries(shares).forEach(([member, share]) => {
          balances[member] -= share;
        });
      }
    });
    
    return balances;
  };

  const getActiveGroup = (): Group | undefined => {
    return groups.find(group => group.id === activeGroup);
  };

  const getBalanceSummary = (group: Group): React.ReactNode => {
    const balances = calculateBalances(group);
    
    return (
      <div className="space-y-2">
        {Object.entries(balances).map(([member, balance]) => {
          const formattedBalance = Math.abs(balance).toFixed(2);
          
          if (Math.abs(balance) < 0.01) {
            return (
              <div key={member} className="flex justify-between items-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                <span className="font-medium">{member}</span>
                <span>settled up</span>
              </div>
            );
          }
          
          if (balance > 0) {
            return (
              <div key={member} className="flex justify-between items-center p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
                <span className="font-medium">{member}</span>
                <span className="text-green-600 dark:text-green-400">gets back ${formattedBalance}</span>
              </div>
            );
          } else {
            return (
              <div key={member} className="flex justify-between items-center p-2 rounded-lg bg-red-50 dark:bg-red-900/20">
                <span className="font-medium">{member}</span>
                <span className="text-red-600 dark:text-red-400">owes ${formattedBalance}</span>
              </div>
            );
          }
        })}
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Split Expenses</h1>
          <Button onClick={() => setIsAddingGroup(!isAddingGroup)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Create New Group
          </Button>
        </div>
        
        {isAddingGroup && (
          <Card>
            <CardHeader>
              <CardTitle>Create New Group</CardTitle>
              <CardDescription>
                Add the people you want to split expenses with
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="group-name">Group Name</Label>
                  <Input 
                    id="group-name" 
                    value={newGroup.name} 
                    onChange={handleNewGroupInput} 
                    placeholder="e.g., Beach Trip, Roommates"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Group Members</Label>
                  {newGroup.members.map((member, index) => (
                    <div key={index} className="flex gap-2">
                      <Input 
                        value={member} 
                        onChange={(e) => handleNewGroupMemberInput(index, e.target.value)} 
                        placeholder={index === 0 ? "You" : "Enter name"}
                        disabled={index === 0}
                      />
                      {index !== 0 && (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeMember(index)}
                          type="button"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    type="button" 
                    className="w-full mt-2"
                    onClick={addNewMember}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Another Person
                  </Button>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddingGroup(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddGroup}>
                    Create Group
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {groups.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Your Groups</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {groups.map((group) => (
                    <button
                      key={group.id}
                      className={`w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors ${
                        activeGroup === group.id ? 'bg-muted' : ''
                      }`}
                      onClick={() => setActiveGroup(group.id)}
                    >
                      <div>
                        <div className="font-medium">{group.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {group.members.length} people • {group.expenses.length} expenses
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {activeGroup ? (
              <div className="lg:col-span-3 space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>{getActiveGroup()?.name}</CardTitle>
                      <CardDescription>
                        {getActiveGroup()?.members.join(', ')}
                      </CardDescription>
                    </div>
                    <Button onClick={() => setIsAddingExpense(!isAddingExpense)}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Expense
                    </Button>
                  </CardHeader>
                  
                  {isAddingExpense && (
                    <CardContent className="border-b">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expense-title">Expense Description</Label>
                            <Input 
                              id="expense-title" 
                              name="title"
                              value={newExpense.title} 
                              onChange={handleNewExpenseInput} 
                              placeholder="e.g., Dinner, Tickets"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="expense-amount">Amount</Label>
                            <Input 
                              id="expense-amount" 
                              name="amount"
                              type="number" 
                              value={newExpense.amount} 
                              onChange={handleNewExpenseInput}
                              placeholder="0.00"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Paid By</Label>
                            <div className="flex flex-wrap gap-2">
                              {getActiveGroup()?.members.map((member) => (
                                <Button
                                  key={member}
                                  type="button"
                                  variant={newExpense.paidBy === member ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => handlePaidByChange(member)}
                                >
                                  {member}
                                </Button>
                              ))}
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Split Type</Label>
                            <div className="flex gap-2">
                              <Button
                                type="button"
                                variant={newExpense.splitType === 'equal' ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleSplitTypeChange('equal')}
                              >
                                Split Equally
                              </Button>
                              <Button
                                type="button"
                                variant={newExpense.splitType === 'custom' ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleSplitTypeChange('custom')}
                              >
                                Custom Split
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        {newExpense.splitType === 'custom' && (
                          <div className="space-y-2">
                            <Label>Custom Amounts</Label>
                            <div className="space-y-2">
                              {getActiveGroup()?.members.map((member) => (
                                <div key={member} className="flex gap-2 items-center">
                                  <div className="w-32">{member}</div>
                                  <Input 
                                    type="number" 
                                    value={newExpense.shares[member] || ''} 
                                    onChange={(e) => handleShareInput(member, e.target.value)}
                                    placeholder="0.00"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex justify-end space-x-2 pt-4">
                          <Button variant="outline" onClick={() => setIsAddingExpense(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddExpense}>
                            Save Expense
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  )}
                  
                  <CardContent className="p-0">
                    <Tabs defaultValue="expenses">
                      <TabsList className="w-full grid grid-cols-2">
                        <TabsTrigger value="expenses">Expenses</TabsTrigger>
                        <TabsTrigger value="balances">Balances</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="expenses" className="p-4">
                        {getActiveGroup()?.expenses.length === 0 ? (
                          <div className="text-center py-8 text-muted-foreground">
                            No expenses added yet. Click "Add Expense" to get started.
                          </div>
                        ) : (
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Description</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Paid By</TableHead>
                                <TableHead>Date</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {getActiveGroup()?.expenses.map((expense) => (
                                <TableRow key={expense.id}>
                                  <TableCell className="font-medium">{expense.title}</TableCell>
                                  <TableCell>${expense.amount.toFixed(2)}</TableCell>
                                  <TableCell>{expense.paidBy}</TableCell>
                                  <TableCell>{expense.date}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        )}
                      </TabsContent>
                      
                      <TabsContent value="balances" className="p-4">
                        {getActiveGroup() && getBalanceSummary(getActiveGroup() as Group)}
                        
                        <div className="mt-6 border-t pt-4">
                          <h3 className="font-medium mb-2">Settle Up</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Record a payment to settle debts between group members.
                          </p>
                          <Button disabled>
                            <Send className="mr-2 h-4 w-4" />
                            Record a Payment
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="lg:col-span-3 flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="mx-auto p-3 rounded-full bg-muted w-fit mb-4">
                    <Users className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Select a group</h3>
                  <p className="text-muted-foreground mb-4">
                    Choose a group from the list to view and manage shared expenses.
                  </p>
                </div>
              </Card>
            )}
          </div>
        ) : (
          <Card className="py-16">
            <CardContent className="flex flex-col items-center justify-center text-center">
              <div className="p-3 rounded-full bg-muted mb-4">
                <Users className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">No expense groups yet</h3>
              <p className="text-muted-foreground mb-4 max-w-md">
                Create your first group to start tracking and splitting expenses with friends, roommates, or travel companions.
              </p>
              <Button onClick={() => setIsAddingGroup(true)}>
                <UserPlus className="mr-2 h-4 w-4" />
                Create New Group
              </Button>
            </CardContent>
          </Card>
        )}
        
        <Card className="bg-primary-foreground/5 border rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Split Expenses Made Simple</h3>
              <p className="text-muted-foreground mb-4">
                Easily track shared expenses with friends, roommates, or travel companions. 
                Our split expenses feature calculates who owes what, so you can focus on enjoying time together.
              </p>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Track group expenses in one place</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Split bills equally or with custom amounts</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">See at a glance who owes what</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SplitExpenses;
