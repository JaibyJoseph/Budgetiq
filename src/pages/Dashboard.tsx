import React from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { BalanceCard } from "@/components/dashboard/BalanceCard";
import { SpendingOverviewChart } from "@/components/dashboard/SpendingOverviewChart";
import { CategoryDistributionChart } from "@/components/dashboard/CategoryDistributionChart";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { BudgetProgressCard } from "@/components/dashboard/BudgetProgressCard";
import { SmartInsightsCard } from "@/components/dashboard/SmartInsightsCard";
import { DollarSign, ShoppingCart, Wallet, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

// Define types for components
interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  type: "income" | "expense";
}

type InsightType = "positive" | "negative" | "neutral";

interface Insight {
  id: string;
  title: string;
  description: string;
  type: InsightType;
}

const Dashboard = () => {
  const { t } = useLanguage();
  
  // Function to capitalize first letter of each word
  const capitalize = (str: string) => {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  // Sample data for the spending overview chart
  const monthlyData = [
    { name: "Jan", income: 3800, expenses: 2100 },
    { name: "Feb", income: 3900, expenses: 2400 },
    { name: "Mar", income: 4000, expenses: 2200 },
    { name: "Apr", income: 3950, expenses: 2300 },
    { name: "May", income: 4200, expenses: 2400 },
    { name: "Jun", income: 4100, expenses: 2150 },
  ];

  // Sample data for the category distribution chart
  const categoryData = [
    { name: "Housing", value: 1200, color: "#0C6E81" },
    { name: "Food", value: 500, color: "#2A9D8F" },
    { name: "Transport", value: 300, color: "#E9C46A" },
    { name: "Entertainment", value: 200, color: "#F4A261" },
    { name: "Shopping", value: 250, color: "#E76F51" },
  ];

  // Sample data for budget progress
  const budgetData = [
    { category: "Housing", spent: 1200, limit: 1500, percentage: 80 },
    { category: "Food", spent: 500, limit: 550, percentage: 91 },
    { category: "Transport", spent: 300, limit: 400, percentage: 75 },
    { category: "Entertainment", spent: 200, limit: 300, percentage: 67 },
  ];

  // Sample data for recent transactions
  const recentTransactions: Transaction[] = [
    {
      id: "1",
      title: "Grocery Store",
      amount: 75.5,
      date: "Today, 10:30 AM",
      category: "Food",
      type: "expense",
    },
    {
      id: "2",
      title: "Salary Deposit",
      amount: 2000,
      date: "Apr 01, 2024",
      category: "Income",
      type: "income",
    },
    {
      id: "3",
      title: "Amazon Purchase",
      amount: 120.99,
      date: "Mar 29, 2024",
      category: "Shopping",
      type: "expense",
    },
    {
      id: "4",
      title: "Uber Ride",
      amount: 24.5,
      date: "Mar 28, 2024",
      category: "Transport",
      type: "expense",
    },
    {
      id: "5",
      title: "Apartment Rent",
      amount: 1200,
      date: "Mar 27, 2024",
      category: "Housing",
      type: "expense",
    },
  ];

  // Sample data for smart insights
  const smartInsights: Insight[] = [
    {
      id: "1",
      title: "Budget Alert",
      description: "Your Food category is at 91% of monthly budget. Consider adjusting your spending for the rest of the month.",
      type: "negative",
    },
    {
      id: "2",
      title: "Potential Savings",
      description: "We've identified ₹35 in potential savings from subscription services you rarely use.",
      type: "positive",
    },
    {
      id: "3",
      title: "Spending Trend",
      description: "Your overall spending this month is 5% lower than last month. Great job!",
      type: "positive",
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <motion.h1 
            className="text-3xl font-bold capitalize" 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {capitalize(t('dashboard'))}
          </motion.h1>
          
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button size="sm" className="gap-2 bg-gradient-to-r from-budget-teal to-budget-teal2 text-white border-none">
              <Sparkles className="h-4 w-4" />
              {capitalize(t('ai_insights'))}
            </Button>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div 
            custom={0} 
            initial="hidden" 
            animate="visible" 
            variants={fadeIn}
          >
            <BalanceCard
              title={capitalize(t('total_balance'))}
              amount={6450.75}
              percentageChange={12.5}
              type="balance"
              icon={<DollarSign className="h-5 w-5" />}
            />
          </motion.div>
          <motion.div 
            custom={1} 
            initial="hidden" 
            animate="visible" 
            variants={fadeIn}
          >
            <BalanceCard
              title={capitalize(t('monthly_income'))}
              amount={4200}
              percentageChange={5.2}
              type="income"
              icon={<Wallet className="h-5 w-5" />}
            />
          </motion.div>
          <motion.div 
            custom={2} 
            initial="hidden" 
            animate="visible" 
            variants={fadeIn}
          >
            <BalanceCard
              title={capitalize(t('monthly_expenses'))}
              amount={2400}
              percentageChange={-3.8}
              type="expense"
              icon={<ShoppingCart className="h-5 w-5" />}
            />
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          <motion.div 
            className="lg:col-span-4 bg-card rounded-xl border shadow-sm p-5"
            custom={3} 
            initial="hidden" 
            animate="visible" 
            variants={fadeIn}
          >
            <h2 className="text-xl font-semibold mb-4 capitalize">{capitalize(t('spending_overview'))}</h2>
            <SpendingOverviewChart data={monthlyData} />
            <div className="mt-2 text-right">
              <Link to="/reports">
                <Button variant="link" className="p-0 h-auto font-normal" size="sm">
                  {capitalize(t('view_detailed_reports'))} <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-2 bg-card rounded-xl border shadow-sm p-5"
            custom={4} 
            initial="hidden" 
            animate="visible" 
            variants={fadeIn}
          >
            <h2 className="text-xl font-semibold mb-4 capitalize">{capitalize(t('category_distribution'))}</h2>
            <CategoryDistributionChart data={categoryData} />
            <div className="mt-2 text-center">
              <Link to="/history">
                <Button variant="link" className="p-0 h-auto font-normal" size="sm">
                  {capitalize(t('view_all_transactions'))} <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            custom={5} 
            initial="hidden" 
            animate="visible" 
            variants={fadeIn}
          >
            <div className="bg-card rounded-xl border shadow-sm p-5">
              <h2 className="text-xl font-semibold mb-4 capitalize">{capitalize(t('budget_progress'))}</h2>
              <BudgetProgressCard budgets={budgetData} />
              <div className="mt-2 text-right">
                <Link to="/budget">
                  <Button variant="link" className="p-0 h-auto font-normal" size="sm">
                    {capitalize(t('manage_budgets'))} <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            custom={6} 
            initial="hidden" 
            animate="visible" 
            variants={fadeIn}
          >
            <div className="bg-card rounded-xl border shadow-sm p-5">
              <h2 className="text-xl font-semibold mb-4 capitalize">{capitalize(t('smart_insights'))}</h2>
              <SmartInsightsCard insights={smartInsights} />
              <div className="mt-2 text-right">
                <Link to="/tips">
                  <Button variant="link" className="p-0 h-auto font-normal" size="sm">
                    {capitalize(t('view_all_insights'))} <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          custom={7} 
          initial="hidden" 
          animate="visible" 
          variants={fadeIn}
          className="bg-card rounded-xl border shadow-sm p-5"
        >
          <h2 className="text-xl font-semibold mb-4 capitalize">{capitalize(t('recent_transactions'))}</h2>
          <RecentTransactions transactions={recentTransactions} />
          <div className="mt-2 text-right">
            <Link to="/transactions">
              <Button variant="link" className="p-0 h-auto font-normal" size="sm">
                {capitalize(t('add_new_transaction'))} <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            custom={8} 
            initial="hidden" 
            animate="visible" 
            variants={fadeIn}
            className="bg-primary-foreground/5 border rounded-lg p-6 flex flex-col items-center text-center"
          >
            <TrendingIcon className="h-12 w-12 mb-4 text-primary/70" />
            <h3 className="text-xl font-medium mb-2 capitalize">{capitalize(t('forecast_your_finances'))}</h3>
            <p className="text-muted-foreground mb-4 capitalize">
              {capitalize(t('get_ai_powered_predictions'))}
            </p>
            <Link to="/predictions">
              <Button>{capitalize(t('view_predictions'))}</Button>
            </Link>
          </motion.div>
          <motion.div 
            custom={9} 
            initial="hidden" 
            animate="visible" 
            variants={fadeIn}
            className="bg-primary-foreground/5 border rounded-lg p-6 flex flex-col items-center text-center"
          >
            <SettingsIcon className="h-12 w-12 mb-4 text-primary/70" />
            <h3 className="text-xl font-medium mb-2 capitalize">{capitalize(t('customize_your_experience'))}</h3>
            <p className="text-muted-foreground mb-4 capitalize">
              {capitalize(t('personalize_your_dashboard'))}
            </p>
            <Link to="/settings">
              <Button variant="outline">{capitalize(t('go_to_settings'))}</Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

// Custom icon components for the dashboard
const TrendingIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 7L13 15L9 11L3 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 7V14M21 7H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SettingsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default Dashboard;
