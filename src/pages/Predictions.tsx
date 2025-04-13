
import React from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Info, DollarSign, AlertTriangle, Sparkles } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

const Predictions = () => {
  const { t } = useLanguage();
  
  // Sample data for the prediction chart
  const predictionData = [
    { month: "Jan", actual: 2100, predicted: null },
    { month: "Feb", actual: 2400, predicted: null },
    { month: "Mar", actual: 2200, predicted: null },
    { month: "Apr", actual: 2300, predicted: null },
    { month: "May", actual: 2400, predicted: null },
    { month: "Jun", actual: 2150, predicted: null },
    { month: "Jul", actual: 2350, predicted: null },
    { month: "Aug", actual: null, predicted: 2400 },
    { month: "Sep", actual: null, predicted: 2450 },
    { month: "Oct", actual: null, predicted: 2500 },
    { month: "Nov", actual: null, predicted: 2600 },
    { month: "Dec", actual: null, predicted: 2700 },
  ];

  // Sample anomalies detected
  const anomalies = [
    {
      title: "Unusual Spending",
      category: "Entertainment",
      change: "+85%",
      impact: "high",
      description:
        "Your entertainment spending is significantly higher compared to your 6-month average.",
    },
    {
      title: "Recurring Payment Increase",
      category: "Subscriptions",
      change: "+$15/month",
      impact: "medium",
      description:
        "Your streaming service subscription increased from $9.99 to $14.99 per month.",
    },
    {
      title: "Potential Savings",
      category: "Food & Dining",
      change: "-$120",
      impact: "positive",
      description:
        "You could save approximately $120 per month by reducing takeout orders by 30%.",
    },
  ];

  const handleActionClick = (title: string) => {
    toast.success(`Taking action on: ${title}`);
  };

  const handleRefreshPredictions = () => {
    toast.success("Predictions refreshed with latest data");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl font-bold">AI {t('predictions')}</h1>
            <Sparkles className="h-6 w-6 text-amber-500" />
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRefreshPredictions}
              className="flex items-center space-x-1"
            >
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Refresh Predictions</span>
            </Button>
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Our AI analyzes your spending patterns to predict future expenses and identify
                    potential savings opportunities.
                  </p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          </div>
        </div>

        <Card className="border border-primary/10 shadow-md hover:shadow-lg transition-all">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
            <CardTitle>{t('expenseForecast')}</CardTitle>
            <CardDescription>
              Predicted expenses for the next 5 months based on your spending history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={predictionData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0C6E81" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#0C6E81" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2A9D8F" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#2A9D8F" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="actual"
                    stroke="#0C6E81"
                    fillOpacity={1}
                    fill="url(#colorActual)"
                    name="Actual Spend"
                  />
                  <Area
                    type="monotone"
                    dataKey="predicted"
                    stroke="#2A9D8F"
                    fillOpacity={1}
                    fill="url(#colorPredicted)"
                    strokeDasharray="5 5"
                    name="Predicted Spend"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#0C6E81] rounded-full"></div>
                <span className="text-sm">Actual Spending</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#2A9D8F] rounded-full"></div>
                <span className="text-sm">Predicted Spending</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border border-primary/10 shadow-md hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Monthly Prediction</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,450</div>
              <p className="text-xs text-muted-foreground">{t('predictedSpending')}</p>
              <div className="mt-4 flex items-center text-sm">
                <DollarSign className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">4.2% lower</span>
                <span className="text-muted-foreground ml-1">than current month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-primary/10 shadow-md hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t('aiConfidence')}</CardTitle>
              <Info className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">Prediction confidence level</p>
              <div className="mt-4 text-sm text-muted-foreground">
                Based on 7 months of your financial data
              </div>
            </CardContent>
          </Card>

          <Card className="border border-primary/10 shadow-md hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Budget Impact</CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">Medium</div>
              <p className="text-xs text-muted-foreground">Risk level for your budgets</p>
              <div className="mt-4 text-sm text-muted-foreground">
                Food category might exceed budget next month
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border border-primary/10 shadow-md">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
            <CardTitle>Spending Anomalies & Insights</CardTitle>
            <CardDescription>
              Our AI has detected these unusual patterns or opportunities in your finances
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mt-4">
              {anomalies.map((anomaly, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-all"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          anomaly.impact === "high"
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : anomaly.impact === "medium"
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }`}
                      >
                        {anomaly.category}
                      </span>
                      <span
                        className={`font-medium ${
                          anomaly.impact === "positive"
                            ? 'text-green-600 dark:text-green-400'
                            : anomaly.change.startsWith("+")
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-blue-600 dark:text-blue-400'
                        }`}
                      >
                        {anomaly.change}
                      </span>
                    </div>
                    <h3 className="font-medium mb-1">{anomaly.title}</h3>
                    <p className="text-sm text-muted-foreground">{anomaly.description}</p>
                  </div>
                  <Button
                    variant="outline"
                    className="shrink-0"
                    onClick={() => handleActionClick(anomaly.title)}
                  >
                    {anomaly.impact === "positive" ? "Apply Suggestion" : "View Details"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Predictions;
