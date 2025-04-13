import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budget from "./pages/Budget";
import History from "./pages/History";
import Reports from "./pages/Reports";
import Predictions from "./pages/Predictions";
import Tips from "./pages/Tips";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "./contexts/LanguageContext";
import SmartCategorization from "./pages/SmartCategorization";
import ReceiptUpload from "./pages/ReceiptUpload";
import DownloadReports from "./pages/DownloadReports";
import RecurringTransactions from "./pages/RecurringTransactions";
import SavingsGoals from "./pages/SavingsGoals";
import SplitExpenses from "./pages/SplitExpenses";
import SearchTransactions from "./pages/SearchTransactions";
import MultiCurrency from "./pages/MultiCurrency";
import AboutUs from "./pages/AboutUs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/history" element={<History />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/predictions" element={<Predictions />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/smart-categorization" element={<SmartCategorization />} />
            <Route path="/receipt-upload" element={<ReceiptUpload />} />
            <Route path="/download-reports" element={<DownloadReports />} />
            <Route path="/recurring-transactions" element={<RecurringTransactions />} />
            <Route path="/savings-goals" element={<SavingsGoals />} />
            <Route path="/split-expenses" element={<SplitExpenses />} />
            <Route path="/search-transactions" element={<SearchTransactions />} />
            <Route path="/multi-currency" element={<MultiCurrency />} />
            <Route path="/about-us" element={<AboutUs />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
