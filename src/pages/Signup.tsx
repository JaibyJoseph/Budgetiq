
import React from "react";
import { SignupForm } from "@/components/auth/SignupForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "react-router-dom";
import { BarChart3 } from "lucide-react";

const Signup = () => {
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
        <div className="w-full md:w-1/2 bg-gradient-to-br from-budget-teal to-budget-teal2 flex items-center justify-center p-6 md:p-12">
          <div className="max-w-md text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Start your financial journey with BudgetIQ
            </h2>
            <p className="mb-6">
              Join thousands of users who are taking control of their finances with our AI-powered budgeting platform.
            </p>
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 rounded-full p-1.5">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 16V8.00002C20.9996 7.6493 20.9071 7.30483 20.7315 7.00119C20.556 6.69754 20.3037 6.44539 20 6.27002L13 2.27002C12.696 2.09449 12.3511 2.00208 12 2.00208C11.6489 2.00208 11.304 2.09449 11 2.27002L4 6.27002C3.69626 6.44539 3.44398 6.69754 3.26846 7.00119C3.09294 7.30483 3.00036 7.6493 3 8.00002V16C3.00036 16.3508 3.09294 16.6952 3.26846 16.9989C3.44398 17.3025 3.69626 17.5547 4 17.73L11 21.73C11.304 21.9056 11.6489 21.998 12 21.998C12.3511 21.998 12.696 21.9056 13 21.73L20 17.73C20.3037 17.5547 20.556 17.3025 20.7315 16.9989C20.9071 16.6952 20.9996 16.3508 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="font-medium">Smart Budgeting</span>
                </div>
                <p className="text-sm ml-9">Set up categories and track spending automatically with our AI categorization.</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 rounded-full p-1.5">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7V21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H2V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 3H16C14.9391 3 13.9217 3.42143 13.1716 4.17157C12.4214 4.92172 12 5.93913 12 7V21C12 20.2044 12.3161 19.4413 12.8787 18.8787C13.4413 18.3161 14.2044 18 15 18H22V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="font-medium">Personalized Insights</span>
                </div>
                <p className="text-sm ml-9">Get tailored financial advice based on your spending patterns and habits.</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 rounded-full p-1.5">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23 6L13.5 15.5L8.5 10.5L1 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17 6H23V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="font-medium">Future Projections</span>
                </div>
                <p className="text-sm ml-9">Predict future expenses and plan ahead with our AI-powered forecasting.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6">
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default Signup;
