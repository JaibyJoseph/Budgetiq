import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  BarChart3,
  TrendingUp,
  LineChart,
  BrainCircuit,
  ReceiptText,
  CreditCard,
  CheckCircle,
  ChevronRight,
} from "lucide-react";

const LandingPage = () => {
  const financialImages = [
    "https://wealthydoc.org/wp-content/uploads/2020/09/Financial-DESIRES.jpg",
    "https://cdn.tinybuddha.com/wp-content/uploads/2015/09/Man-Jumping-Next-to-Dollar-Symbol.jpg",
    "https://thaiworld.org/wp-content/uploads/2020/09/Factors-that-Affect-Your-Financial-Stability.jpg",
    "https://thaiworld.org/wp-content/uploads/2020/09/Factors-that-Affect-Your-Financial-Stability.jpg",
    "https://media.licdn.com/dms/image/v2/D4E12AQHL9aq32Ob7fg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1697485607091?e=2147483647&v=beta&t=K-DVbZT4jy7jD0Lw8ZE0iupHN9qE1LxCbby-fkoZ4Uo",
    "https://png.pngtree.com/thumb_back/fw800/background/20241210/pngtree-a-close-up-of-hand-carefully-stacking-coins-to-represent-smart-image_16736449.jpg"
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === financialImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [financialImages.length]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="w-full py-4 px-6 lg:px-12 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <div className="bg-budget-teal rounded-full p-1.5">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold">BudgetIQ</span>
        </div>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm hover:text-primary transition-colors">How it works</a>
            <a href="#testimonials" className="text-sm hover:text-primary transition-colors">Testimonials</a>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link to="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 px-6 lg:px-12 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-3xl leading-tight mb-6 animate-fade-in">
          Smart AI-Powered Budgeting For Your Financial Future
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-8 animate-fade-in" style={{animationDelay: "0.2s"}}>
          Take control of your finances with advanced AI insights, intelligent predictions, and personalized recommendations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{animationDelay: "0.4s"}}>
          <Link to="/signup">
            <Button size="lg" className="gap-2">
              Get Started for Free
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
          <a href="#learn-more">
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </a>
        </div>
        
        {/* Dashboard Preview */}
        <div className="w-full max-w-5xl mt-16 relative animate-scale-in" style={{animationDelay: "0.6s"}}>
          <div className="bg-gradient-to-r from-budget-teal to-budget-teal2 absolute -inset-0.5 rounded-xl blur-lg opacity-30"></div>
          <div className="relative bg-card border shadow-2xl rounded-xl overflow-hidden">
            <div className="relative">
              {financialImages.map((src, index) => (
                <div 
                  key={index} 
                  className={`transition-opacity duration-1000 absolute inset-0 ${
                    index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                  style={{ display: index === currentImageIndex ? 'block' : 'none' }}
                >
                  <img
                    src={src}
                    alt={`Financial image ${index + 1}`}
                    className="w-full h-auto object-cover aspect-[3/2]"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="bg-black/60 text-white px-6 py-4 rounded-lg text-center max-w-md">
                      <h3 className="text-xl font-bold mb-2">Smart Financial Planning</h3>
                      <p>Track, manage, and grow your finances with BudgetIQ's intelligent dashboard</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Indicators */}
              <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
                {financialImages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-16 px-6 lg:px-12 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              All the tools you need to manage your finances intelligently in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card border rounded-xl p-6 shadow-sm card-hover">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Smart Analytics</h3>
              <p className="text-muted-foreground">
                Visualize your spending patterns with intuitive charts and graphs updated in real-time.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-card border rounded-xl p-6 shadow-sm card-hover">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BrainCircuit className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">AI Predictions</h3>
              <p className="text-muted-foreground">
                Let our AI analyze your spending habits and predict future expenses with remarkable accuracy.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-card border rounded-xl p-6 shadow-sm card-hover">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Budget Planning</h3>
              <p className="text-muted-foreground">
                Set and track budgets for different categories and receive alerts when you're close to limits.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-card border rounded-xl p-6 shadow-sm card-hover">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <LineChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Financial Reports</h3>
              <p className="text-muted-foreground">
                Generate comprehensive reports to understand your financial health at a glance.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-card border rounded-xl p-6 shadow-sm card-hover">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <ReceiptText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Receipt Scanner</h3>
              <p className="text-muted-foreground">
                Upload receipts and let our AI automatically categorize and add transactions to your account.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-card border rounded-xl p-6 shadow-sm card-hover">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Transaction Management</h3>
              <p className="text-muted-foreground">
                Easily add, categorize, and manage all your income and expenses in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 px-6 lg:px-12">
        <div className="container mx-auto bg-gradient-to-r from-budget-teal to-budget-teal2 rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="md:max-w-xl mb-6 md:mb-0">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to take control of your finances?</h2>
              <p className="text-white/90">
                Join thousands of users who have improved their financial well-being with BudgetIQ.
              </p>
            </div>
            <Link to="/signup">
              <Button size="lg" className="bg-white text-budget-teal hover:bg-white/90">
                Start for Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-6 lg:px-12 bg-muted/50 border-t mt-auto">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="md:max-w-xs">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-budget-teal rounded-full p-1.5">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold">BudgetIQ</span>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Smart AI-powered budgeting for your financial future. Take control of your finances today.
              </p>
              <div className="flex gap-4">
                <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-foreground">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" aria-label="GitHub" className="text-muted-foreground hover:text-foreground">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
                <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-foreground">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-medium mb-4">Product</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Features</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Pricing</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Tutorials</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Updates</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-4">Company</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">About</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Blog</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Careers</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-4">Legal</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Security</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} BudgetIQ. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
