
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Target, PlusCircle, Edit2, Trash2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";

interface SavingsGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  createdAt: string;
}

const SavingsGoals = () => {
  const { t } = useLanguage();
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    targetAmount: '',
    deadline: '',
    category: '',
  });
  const [depositAmount, setDepositAmount] = useState('');
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);

  // Sample data
  const [goals, setGoals] = useState<SavingsGoal[]>([
    {
      id: '1',
      title: 'Emergency Fund',
      targetAmount: 10000,
      currentAmount: 3500,
      deadline: '2024-12-31',
      category: 'Emergency',
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      title: 'Vacation to Bali',
      targetAmount: 5000,
      currentAmount: 2000,
      deadline: '2024-08-15',
      category: 'Travel',
      createdAt: '2024-02-01',
    },
    {
      id: '3',
      title: 'New Laptop',
      targetAmount: 1500,
      currentAmount: 750,
      deadline: '2024-06-30',
      category: 'Technology',
      createdAt: '2024-03-10',
    },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewGoal({ ...newGoal, [name]: value });
  };

  const handleAddGoal = () => {
    // Simple validation
    if (!newGoal.title || !newGoal.targetAmount || !newGoal.deadline) {
      toast.error("Please fill in all required fields");
      return;
    }

    const goal: SavingsGoal = {
      id: Math.random().toString(36).substr(2, 9),
      title: newGoal.title,
      targetAmount: parseFloat(newGoal.targetAmount),
      currentAmount: 0,
      deadline: newGoal.deadline,
      category: newGoal.category || 'General',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setGoals([...goals, goal]);
    setNewGoal({ title: '', targetAmount: '', deadline: '', category: '' });
    setIsAddingGoal(false);
    toast.success("Savings goal added successfully");
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
    toast.success("Savings goal deleted");
  };

  const handleDeposit = () => {
    if (!depositAmount || !selectedGoalId) {
      toast.error("Please enter a valid amount");
      return;
    }

    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setGoals(
      goals.map(goal => 
        goal.id === selectedGoalId 
          ? { 
              ...goal, 
              currentAmount: goal.currentAmount + amount 
            } 
          : goal
      )
    );
    
    setDepositAmount('');
    setSelectedGoalId(null);
    toast.success(`$${amount.toFixed(2)} added to your savings goal`);
  };

  // Calculate days remaining for a goal
  const getDaysRemaining = (deadline: string): number => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate.getTime() - today.getTime();
    return Math.max(0, Math.ceil(timeDiff / (1000 * 3600 * 24)));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Savings Goals</h1>
          <Button onClick={() => setIsAddingGoal(!isAddingGoal)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Goal
          </Button>
        </div>

        {isAddingGoal && (
          <Card>
            <CardHeader>
              <CardTitle>Create New Savings Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Goal Name</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    value={newGoal.title} 
                    onChange={handleInputChange} 
                    placeholder="e.g., Emergency Fund"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetAmount">Target Amount</Label>
                  <Input 
                    id="targetAmount" 
                    name="targetAmount" 
                    type="number" 
                    value={newGoal.targetAmount} 
                    onChange={handleInputChange}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Target Date</Label>
                  <Input 
                    id="deadline" 
                    name="deadline" 
                    type="date" 
                    value={newGoal.deadline} 
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category (Optional)</Label>
                  <Input 
                    id="category" 
                    name="category" 
                    value={newGoal.category} 
                    onChange={handleInputChange}
                    placeholder="e.g., Travel, Home, Education"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6 space-x-2">
                <Button variant="outline" onClick={() => setIsAddingGoal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddGoal}>
                  Save Goal
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => {
            const progress = (goal.currentAmount / goal.targetAmount) * 100;
            const daysRemaining = getDaysRemaining(goal.deadline);
            
            return (
              <Card key={goal.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{goal.title}</CardTitle>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-red-600"
                        onClick={() => handleDeleteGoal(goal.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {goal.category}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{progress.toFixed(0)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">${goal.currentAmount.toFixed(2)}</span>
                      <span className="text-muted-foreground">of ${goal.targetAmount.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-muted-foreground">Target Date</p>
                      <p className="font-medium">{goal.deadline}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {daysRemaining} days remaining
                      </p>
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm"
                          onClick={() => setSelectedGoalId(goal.id)}
                        >
                          Add Money
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add money to {goal.title}</DialogTitle>
                          <DialogDescription>
                            Enter the amount you want to add to your savings goal.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="deposit-amount">Amount</Label>
                            <Input
                              id="deposit-amount"
                              type="number"
                              placeholder="0.00"
                              value={depositAmount}
                              onChange={(e) => setDepositAmount(e.target.value)}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" onClick={handleDeposit}>Add Funds</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {goals.length === 0 && (
          <Card className="py-16">
            <CardContent className="flex flex-col items-center justify-center text-center">
              <div className="p-3 rounded-full bg-primary/10 mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">No savings goals yet</h3>
              <p className="text-muted-foreground mb-4 max-w-md">
                Create your first savings goal to start tracking your progress toward financial targets.
              </p>
              <Button onClick={() => setIsAddingGoal(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Goal
              </Button>
            </CardContent>
          </Card>
        )}

        <Card className="bg-primary-foreground/5 border rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Tips for Successful Saving</h3>
              <p className="text-muted-foreground mb-4">
                Setting specific, measurable, and time-bound savings goals increases your chance of success. 
                Here are some tips to help you reach your financial targets faster.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2 border rounded-lg p-3">
                  <h4 className="font-medium">Start Small</h4>
                  <p className="text-sm text-muted-foreground">
                    Begin with achievable goals to build momentum and confidence in your saving ability.
                  </p>
                </div>
                <div className="space-y-2 border rounded-lg p-3">
                  <h4 className="font-medium">Save Automatically</h4>
                  <p className="text-sm text-muted-foreground">
                    Set up automatic transfers to your savings account on payday.
                  </p>
                </div>
                <div className="space-y-2 border rounded-lg p-3">
                  <h4 className="font-medium">Celebrate Milestones</h4>
                  <p className="text-sm text-muted-foreground">
                    Reward yourself when you reach 25%, 50%, and 75% of your goal.
                  </p>
                </div>
                <div className="space-y-2 border rounded-lg p-3">
                  <h4 className="font-medium">Visualize Your Goal</h4>
                  <p className="text-sm text-muted-foreground">
                    Keep a visual reminder of what you're saving for to stay motivated.
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

export default SavingsGoals;
