
import React from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "react-router-dom";
import { BarChart3 } from "lucide-react";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-between items-center p-4 md:p-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-budget-teal rounded-full p-1.5">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold">BudgetIQ</span>
        </Link>
        <ThemeToggle />
      </div>
      
      <div className="flex-1 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 order-2 md:order-1">
          <LoginForm />
        </div>
        <div className="w-full md:w-1/2 bg-gradient-to-br from-budget-teal to-budget-teal2 flex items-center justify-center p-6 md:p-12 order-1 md:order-2">
          <div className="max-w-md text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Welcome back to BudgetIQ
            </h2>
            <p className="mb-6">
              Log in to access your financial dashboard and continue your journey to financial freedom with AI-powered insights.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="bg-white/20 rounded-full p-1">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>Smart Budget Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-white/20 rounded-full p-1">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>AI-Powered Insights</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-white/20 rounded-full p-1">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>Expense Predictions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-white/20 rounded-full p-1">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>Personalized Reports</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
