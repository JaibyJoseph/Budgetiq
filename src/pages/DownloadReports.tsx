
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Calendar as CalendarIcon,
  Download,
  FileText,
  BarChart,
  PieChart,
  Clock,
  Filter
} from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const DownloadReports = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("monthly");
  
  // Date selection states
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  
  // Report format states
  const [reportFormat, setReportFormat] = useState("csv");
  const [includeCharts, setIncludeCharts] = useState(true);
  
  // Selected report items
  const [selectedItems, setSelectedItems] = useState({
    income: true,
    expenses: true,
    categories: true,
    transactions: true,
    budgetComparison: true
  });
  
  const handleSelectItem = (item: keyof typeof selectedItems) => {
    setSelectedItems({
      ...selectedItems,
      [item]: !selectedItems[item]
    });
  };
  
  const handleGenerateReport = (type: string) => {
    toast.success(`${type} report generated and downloading...`);
    // In a real app, this would trigger the actual report generation
  };
  
  // Get current month and year for default selection
  const currentMonth = format(new Date(), 'MMMM yyyy');
  const currentYear = new Date().getFullYear().toString();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('download_reports')}</h1>
          <p className="text-muted-foreground">
            {t('export_financial_reports_as_csv_or_pdf')}
          </p>
        </div>

        <Tabs defaultValue="monthly" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="monthly">{t('monthly_reports')}</TabsTrigger>
            <TabsTrigger value="yearly">{t('yearly_reports')}</TabsTrigger>
            <TabsTrigger value="custom">{t('custom_reports')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="monthly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('monthly_financial_report')}</CardTitle>
                <CardDescription>
                  {t('download_detailed_monthly_report')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t('select_month')}</Label>
                    <Select defaultValue={currentMonth}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('select_month')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="January 2024">January 2024</SelectItem>
                        <SelectItem value="February 2024">February 2024</SelectItem>
                        <SelectItem value="March 2024">March 2024</SelectItem>
                        <SelectItem value="April 2024">April 2024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{t('report_format')}</Label>
                    <Select value={reportFormat} onValueChange={setReportFormat}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('select_format')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label>{t('report_contents')}</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="income" 
                        checked={selectedItems.income}
                        onCheckedChange={() => handleSelectItem('income')}
                      />
                      <Label htmlFor="income" className="font-normal cursor-pointer">
                        {t('income_summary')}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="expenses" 
                        checked={selectedItems.expenses}
                        onCheckedChange={() => handleSelectItem('expenses')}
                      />
                      <Label htmlFor="expenses" className="font-normal cursor-pointer">
                        {t('expense_summary')}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="categories" 
                        checked={selectedItems.categories}
                        onCheckedChange={() => handleSelectItem('categories')}
                      />
                      <Label htmlFor="categories" className="font-normal cursor-pointer">
                        {t('category_breakdown')}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="transactions" 
                        checked={selectedItems.transactions}
                        onCheckedChange={() => handleSelectItem('transactions')}
                      />
                      <Label htmlFor="transactions" className="font-normal cursor-pointer">
                        {t('transaction_list')}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="budgetComparison" 
                        checked={selectedItems.budgetComparison}
                        onCheckedChange={() => handleSelectItem('budgetComparison')}
                      />
                      <Label htmlFor="budgetComparison" className="font-normal cursor-pointer">
                        {t('budget_comparison')}
                      </Label>
                    </div>
                  </div>
                </div>
                
                {reportFormat === "pdf" && (
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="include-charts"
                      checked={includeCharts}
                      onCheckedChange={setIncludeCharts}
                    />
                    <Label htmlFor="include-charts" className="font-normal cursor-pointer">
                      {t('include_charts_and_graphs')}
                    </Label>
                  </div>
                )}
                
                <Button 
                  className="w-full sm:w-auto"
                  onClick={() => handleGenerateReport('Monthly')}
                >
                  <Download className="mr-2 h-4 w-4" />
                  {t('generate_monthly_report')}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="yearly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('yearly_financial_report')}</CardTitle>
                <CardDescription>
                  {t('download_comprehensive_yearly_report')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t('select_year')}</Label>
                    <Select defaultValue={currentYear}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('select_year')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{t('report_format')}</Label>
                    <Select value={reportFormat} onValueChange={setReportFormat}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('select_format')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label>{t('report_contents')}</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="yearly-income" 
                        checked={selectedItems.income}
                        onCheckedChange={() => handleSelectItem('income')}
                      />
                      <Label htmlFor="yearly-income" className="font-normal cursor-pointer">
                        {t('yearly_income_summary')}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="yearly-expenses" 
                        checked={selectedItems.expenses}
                        onCheckedChange={() => handleSelectItem('expenses')}
                      />
                      <Label htmlFor="yearly-expenses" className="font-normal cursor-pointer">
                        {t('yearly_expense_summary')}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="yearly-categories" 
                        checked={selectedItems.categories}
                        onCheckedChange={() => handleSelectItem('categories')}
                      />
                      <Label htmlFor="yearly-categories" className="font-normal cursor-pointer">
                        {t('yearly_category_breakdown')}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="yearly-monthly-comparison" 
                        checked={selectedItems.transactions}
                        onCheckedChange={() => handleSelectItem('transactions')}
                      />
                      <Label htmlFor="yearly-monthly-comparison" className="font-normal cursor-pointer">
                        {t('monthly_comparison')}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="yearly-budget-comparison" 
                        checked={selectedItems.budgetComparison}
                        onCheckedChange={() => handleSelectItem('budgetComparison')}
                      />
                      <Label htmlFor="yearly-budget-comparison" className="font-normal cursor-pointer">
                        {t('yearly_budget_analysis')}
                      </Label>
                    </div>
                  </div>
                </div>
                
                {reportFormat === "pdf" && (
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="yearly-include-charts"
                      checked={includeCharts}
                      onCheckedChange={setIncludeCharts}
                    />
                    <Label htmlFor="yearly-include-charts" className="font-normal cursor-pointer">
                      {t('include_yearly_trend_charts')}
                    </Label>
                  </div>
                )}
                
                <Button 
                  className="w-full sm:w-auto"
                  onClick={() => handleGenerateReport('Yearly')}
                >
                  <Download className="mr-2 h-4 w-4" />
                  {t('generate_yearly_report')}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="custom" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('custom_date_range_report')}</CardTitle>
                <CardDescription>
                  {t('create_report_for_specific_date_range')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t('start_date')}</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : t('select_date')}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>{t('end_date')}</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : t('select_date')}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                          disabled={date => !startDate || date < startDate}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>{t('report_format')}</Label>
                  <Select value={reportFormat} onValueChange={setReportFormat}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('select_format')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>{t('report_sections')}</Label>
                    <Button variant="ghost" size="sm" className="h-8">
                      <Filter className="h-4 w-4 mr-2" />
                      {t('select_all')}
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <Checkbox id="custom-summary" checked />
                      <div className="space-y-0.5">
                        <Label htmlFor="custom-summary" className="font-medium cursor-pointer">
                          {t('summary_overview')}
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          {t('income_expense_summary')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <Checkbox id="custom-transactions" checked />
                      <div className="space-y-0.5">
                        <Label htmlFor="custom-transactions" className="font-medium cursor-pointer">
                          {t('transactions')}
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          {t('all_transactions_in_period')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <Checkbox id="custom-categories" checked />
                      <div className="space-y-0.5">
                        <Label htmlFor="custom-categories" className="font-medium cursor-pointer">
                          {t('categories')}
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          {t('spending_by_category')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <Checkbox id="custom-budget" checked />
                      <div className="space-y-0.5">
                        <Label htmlFor="custom-budget" className="font-medium cursor-pointer">
                          {t('budget_analysis')}
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          {t('budget_vs_actual')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <Checkbox id="custom-trends" checked />
                      <div className="space-y-0.5">
                        <Label htmlFor="custom-trends" className="font-medium cursor-pointer">
                          {t('trends')}
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          {t('spending_trend_analysis')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {reportFormat === "pdf" && (
                  <div className="space-y-4">
                    <Label>{t('visual_elements')}</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="flex items-center space-x-2 rounded-md border p-3">
                        <Checkbox id="pie-charts" checked />
                        <div className="flex items-center space-x-2">
                          <PieChart className="h-4 w-4 text-muted-foreground" />
                          <Label htmlFor="pie-charts" className="font-normal cursor-pointer">
                            {t('pie_charts')}
                          </Label>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 rounded-md border p-3">
                        <Checkbox id="bar-charts" checked />
                        <div className="flex items-center space-x-2">
                          <BarChart className="h-4 w-4 text-muted-foreground" />
                          <Label htmlFor="bar-charts" className="font-normal cursor-pointer">
                            {t('bar_charts')}
                          </Label>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 rounded-md border p-3">
                        <Checkbox id="timeline" checked />
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <Label htmlFor="timeline" className="font-normal cursor-pointer">
                            {t('timeline')}
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <Button 
                  className="w-full sm:w-auto"
                  onClick={() => handleGenerateReport('Custom')}
                  disabled={!startDate || !endDate}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  {t('generate_custom_report')}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DownloadReports;
