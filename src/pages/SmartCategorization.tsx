
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Tags, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const SmartCategorization = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("auto");
  
  // Sample data for uncategorized transactions
  const uncategorizedTransactions = [
    { id: 1, name: "Amazon Purchase", amount: 67.99, date: "2024-04-05", suggestedCategory: "Shopping" },
    { id: 2, name: "Uber Ride", amount: 24.50, date: "2024-04-04", suggestedCategory: "Transportation" },
    { id: 3, name: "Corner Cafe", amount: 12.75, date: "2024-04-03", suggestedCategory: "Dining" },
    { id: 4, name: "Pharmacy Rx", amount: 35.00, date: "2024-04-02", suggestedCategory: "Healthcare" },
    { id: 5, name: "Online Subscription", amount: 14.99, date: "2024-04-01", suggestedCategory: "Entertainment" },
  ];
  
  // Sample data for rules
  const [rules, setRules] = useState([
    { id: 1, keyword: "Netflix", category: "Entertainment", active: true },
    { id: 2, keyword: "Uber", category: "Transportation", active: true },
    { id: 3, keyword: "Grocery", category: "Food", active: true },
  ]);
  
  const [newRule, setNewRule] = useState({
    keyword: "",
    category: ""
  });
  
  const handleApproveCategory = (id: number) => {
    toast.success(`Transaction ${id} categorized successfully`);
  };
  
  const handleEditCategory = (id: number, category: string) => {
    toast.success(`Transaction ${id} now categorized as ${category}`);
  };
  
  const handleAddRule = () => {
    if (newRule.keyword && newRule.category) {
      setRules([...rules, { id: rules.length + 1, ...newRule, active: true }]);
      setNewRule({ keyword: "", category: "" });
      toast.success("New rule added successfully");
    } else {
      toast.error("Please fill in all fields");
    }
  };
  
  const handleToggleRule = (id: number) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, active: !rule.active } : rule
    ));
    toast.success("Rule updated successfully");
  };
  
  const handleDeleteRule = (id: number) => {
    setRules(rules.filter(rule => rule.id !== id));
    toast.success("Rule deleted successfully");
  };
  
  const handleRunAutoCategorization = () => {
    toast.success("AI categorization complete! 12 transactions categorized");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('smart_categorization')}</h1>
            <p className="text-muted-foreground">
              {t('ai_automatically_sorts_transactions')}
            </p>
          </div>
          <Button onClick={handleRunAutoCategorization}>
            <RefreshCw className="mr-2 h-4 w-4" />
            {t('run_ai_categorization')}
          </Button>
        </div>

        <Tabs defaultValue="auto" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="auto">{t('ai_suggestions')}</TabsTrigger>
            <TabsTrigger value="rules">{t('custom_rules')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="auto" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('pending_categorization')}</CardTitle>
                <CardDescription>
                  {t('review_and_approve_ai_suggestions')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('transaction')}</TableHead>
                      <TableHead>{t('amount')}</TableHead>
                      <TableHead>{t('date')}</TableHead>
                      <TableHead>{t('suggested_category')}</TableHead>
                      <TableHead>{t('actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {uncategorizedTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.name}</TableCell>
                        <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>
                          <Select defaultValue={transaction.suggestedCategory}>
                            <SelectTrigger className="w-[150px]">
                              <SelectValue placeholder={transaction.suggestedCategory} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Shopping">{t('shopping')}</SelectItem>
                              <SelectItem value="Transportation">{t('transportation')}</SelectItem>
                              <SelectItem value="Dining">{t('dining')}</SelectItem>
                              <SelectItem value="Healthcare">{t('healthcare')}</SelectItem>
                              <SelectItem value="Entertainment">{t('entertainment')}</SelectItem>
                              <SelectItem value="Utilities">{t('utilities')}</SelectItem>
                              <SelectItem value="Other">{t('other')}</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleApproveCategory(transaction.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              {t('approve')}
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleEditCategory(transaction.id, transaction.suggestedCategory)}
                            >
                              {t('apply')}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="rules" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('categorization_rules')}</CardTitle>
                <CardDescription>
                  {t('create_rules_for_automatic_categorization')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="keyword">{t('keyword')}</Label>
                    <Input 
                      id="keyword" 
                      placeholder={t('enter_keyword')} 
                      value={newRule.keyword}
                      onChange={(e) => setNewRule({...newRule, keyword: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">{t('category')}</Label>
                    <Select value={newRule.category} onValueChange={(value) => setNewRule({...newRule, category: value})}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder={t('select_category')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Shopping">{t('shopping')}</SelectItem>
                        <SelectItem value="Transportation">{t('transportation')}</SelectItem>
                        <SelectItem value="Dining">{t('dining')}</SelectItem>
                        <SelectItem value="Healthcare">{t('healthcare')}</SelectItem>
                        <SelectItem value="Entertainment">{t('entertainment')}</SelectItem>
                        <SelectItem value="Utilities">{t('utilities')}</SelectItem>
                        <SelectItem value="Food">{t('food')}</SelectItem>
                        <SelectItem value="Other">{t('other')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button onClick={handleAddRule} className="w-full">
                      <Tags className="mr-2 h-4 w-4" />
                      {t('add_rule')}
                    </Button>
                  </div>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('keyword')}</TableHead>
                      <TableHead>{t('category')}</TableHead>
                      <TableHead>{t('status')}</TableHead>
                      <TableHead>{t('actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rules.map((rule) => (
                      <TableRow key={rule.id}>
                        <TableCell className="font-medium">{rule.keyword}</TableCell>
                        <TableCell>{rule.category}</TableCell>
                        <TableCell>
                          {rule.active ? (
                            <span className="flex items-center text-green-600">
                              <CheckCircle className="mr-1 h-4 w-4" />
                              {t('active')}
                            </span>
                          ) : (
                            <span className="flex items-center text-gray-500">
                              <AlertCircle className="mr-1 h-4 w-4" />
                              {t('inactive')}
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleToggleRule(rule.id)}
                            >
                              {rule.active ? t('disable') : t('enable')}
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleDeleteRule(rule.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              {t('delete')}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SmartCategorization;
