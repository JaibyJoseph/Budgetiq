
import React from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BudgetProgressCard } from "@/components/dashboard/BudgetProgressCard";
import { Plus, TrendingUp, Lightbulb, Landmark, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Budget = () => {
  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false);
  const [newBudget, setNewBudget] = useState({
    category: "",
    limit: ""
  });
  const { t } = useLanguage();

  // Sample data for budget progress
  const budgetData = [
    { category: "Housing", spent: 1200, limit: 1500, percentage: 80 },
    { category: "Food", spent: 500, limit: 550, percentage: 91 },
    { category: "Transport", spent: 300, limit: 400, percentage: 75 },
    { category: "Entertainment", spent: 200, limit: 300, percentage: 67 },
    { category: "Shopping", spent: 250, limit: 400, percentage: 63 },
    { category: "Healthcare", spent: 120, limit: 300, percentage: 40 },
  ];

  const handleAddBudget = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Budget for ${newBudget.category} added successfully`);
    setIsAddBudgetOpen(false);
    setNewBudget({ category: "", limit: "" });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{t('budgetManagement')}</h1>
          <Dialog open={isAddBudgetOpen} onOpenChange={setIsAddBudgetOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-primary/80">
                <Plus className="mr-2 h-4 w-4" /> {t('addBudget')}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{t('addBudget')}</DialogTitle>
                <DialogDescription>
                  Set a spending limit for a specific category
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddBudget}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="budget-category">{t('category')}</Label>
                    <Select
                      value={newBudget.category}
                      onValueChange={(value) => setNewBudget({ ...newBudget, category: value })}
                      required
                    >
                      <SelectTrigger id="budget-category">
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
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="budget-limit">{t('monthlyLimit')} ($)</Label>
                    <Input
                      id="budget-limit"
                      type="number"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      value={newBudget.limit}
                      onChange={(e) => setNewBudget({ ...newBudget, limit: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">{t('createBudget')}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border border-primary/10 shadow-md hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle>Budget Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <BudgetProgressCard budgets={budgetData} />
                </CardContent>
              </Card>
              
              <Card className="border border-primary/10 shadow-md hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle>Budget Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted p-4 rounded-lg hover:shadow-md transition-all">
                        <p className="text-sm text-muted-foreground mb-1">Total Budget</p>
                        <p className="text-2xl font-bold">$3,450</p>
                      </div>
                      <div className="bg-muted p-4 rounded-lg hover:shadow-md transition-all">
                        <p className="text-sm text-muted-foreground mb-1">Spent So Far</p>
                        <p className="text-2xl font-bold">$2,570</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted p-4 rounded-lg hover:shadow-md transition-all">
                        <p className="text-sm text-muted-foreground mb-1">Remaining</p>
                        <p className="text-2xl font-bold text-green-500">$880</p>
                      </div>
                      <div className="bg-muted p-4 rounded-lg hover:shadow-md transition-all">
                        <p className="text-sm text-muted-foreground mb-1">Budget Health</p>
                        <p className="text-2xl font-bold text-amber-500">Good</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border border-primary/10 shadow-md">
              <CardHeader>
                <CardTitle>All Budgets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-muted">
                      <tr>
                        <th scope="col" className="px-6 py-3">Category</th>
                        <th scope="col" className="px-6 py-3">Monthly Limit</th>
                        <th scope="col" className="px-6 py-3">Spent</th>
                        <th scope="col" className="px-6 py-3">Remaining</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {budgetData.map((budget, index) => (
                        <tr key={index} className="bg-card border-b hover:bg-muted/50 transition-colors">
                          <td className="px-6 py-4 font-medium">{budget.category}</td>
                          <td className="px-6 py-4">${budget.limit}</td>
                          <td className="px-6 py-4">${budget.spent}</td>
                          <td className="px-6 py-4">${budget.limit - budget.spent}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              budget.percentage >= 90 
                                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                                : budget.percentage >= 70 
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200' 
                                : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            }`}>
                              {budget.percentage >= 90 ? 'Alert' : budget.percentage >= 70 ? 'Warning' : 'Good'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-4">
            <Card className="p-8 text-center border border-primary/10 shadow-md">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-primary/70" />
              <h3 className="text-lg font-medium mb-2">Monthly Budget Analysis</h3>
              <p className="text-muted-foreground mb-4">
                View detailed spending patterns and budget allocation for each month.
              </p>
              <Button className="bg-gradient-to-r from-primary to-primary/80">
                View Monthly Analysis <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="yearly" className="space-y-4">
            <Card className="p-8 text-center border border-primary/10 shadow-md">
              <Landmark className="h-12 w-12 mx-auto mb-4 text-primary/70" />
              <h3 className="text-lg font-medium mb-2">Yearly Budget Overview</h3>
              <p className="text-muted-foreground mb-4">
                Track your annual spending and see how your budget evolves over time.
              </p>
              <Button className="bg-gradient-to-r from-primary to-primary/80">
                View Yearly Analysis <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Budget;
