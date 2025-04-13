
import React from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Bookmark, ThumbsUp, ThumbsDown, Star, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const Tips = () => {
  const { t } = useLanguage();

  const featuredTips = [
    {
      id: "1",
      title: "50/30/20 Budget Rule",
      category: "Budgeting",
      description:
        "Allocate 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment for a balanced financial life.",
      actionText: "Apply to My Budget",
      rating: 4.8,
      reviews: 246,
      isFeatured: true,
    },
    {
      id: "2",
      title: "Automate Your Savings",
      category: "Saving",
      description:
        "Set up automatic transfers to your savings account on payday to build your emergency fund without thinking about it.",
      actionText: "Learn More",
      rating: 4.7,
      reviews: 189,
      isFeatured: true,
    },
  ];

  const personalizedTips = [
    {
      id: "3",
      title: "Reduce Food Expenses",
      category: "Spending",
      description:
        "Based on your spending patterns, you could save approximately $120 per month by meal planning and reducing takeout orders.",
      relevance: "High",
      potentialSavings: "$120/month",
    },
    {
      id: "4",
      title: "Entertainment Subscription Audit",
      category: "Subscriptions",
      description:
        "You currently have 5 entertainment subscriptions totaling $63.95/month. Consider consolidating to your 2-3 most used services.",
      relevance: "Medium",
      potentialSavings: "$25-40/month",
    },
    {
      id: "5",
      title: "Switch Utility Provider",
      category: "Utilities",
      description:
        "Based on your location and usage, switching to Provider X could save you up to $250 annually on your electricity bills.",
      relevance: "Medium",
      potentialSavings: "$250/year",
    },
    {
      id: "6",
      title: "Debt Repayment Strategy",
      category: "Debt",
      description:
        "Applying the avalanche method to your current debts could save you $1,200 in interest and help you become debt-free 8 months sooner.",
      relevance: "High",
      potentialSavings: "$1,200 total",
    },
  ];

  const handleSaveTip = (tipId: string) => {
    toast.success("Tip saved to your favorites");
  };

  const handleRateTip = (tipId: string, isLike: boolean) => {
    toast.success(`Thanks for your ${isLike ? "positive" : "negative"} feedback!`);
  };

  const handleApplyTip = (tipId: string) => {
    toast.success("We'll help you implement this tip in your budget planning");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{t('smartFinancialTips')}</h1>
          <Sparkles className="h-6 w-6 text-amber-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredTips.map((tip) => (
            <Card key={tip.id} className="overflow-hidden border-2 border-primary/10 shadow-lg hover:shadow-xl transition-all">
              <div className="bg-gradient-to-r from-primary/20 to-primary/5 px-4 py-1 text-xs font-medium">Featured Tip</div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="inline-block px-2 py-1 bg-muted text-xs font-medium rounded mb-2">
                      {tip.category}
                    </div>
                    <CardTitle>{tip.title}</CardTitle>
                  </div>
                  <div className="flex items-center text-amber-500">
                    <Star className="fill-amber-500 h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">{tip.rating}</span>
                    <span className="text-xs text-muted-foreground ml-1">({tip.reviews})</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{tip.description}</p>
                <div className="flex items-center justify-between">
                  <Button onClick={() => handleApplyTip(tip.id)} className="bg-gradient-to-r from-primary to-primary/80">{tip.actionText}</Button>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleRateTip(tip.id, true)}
                      className="hover:bg-green-100 hover:text-green-800 dark:hover:bg-green-900 dark:hover:text-green-200 transition-colors"
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleRateTip(tip.id, false)}
                      className="hover:bg-red-100 hover:text-red-800 dark:hover:bg-red-900 dark:hover:text-red-200 transition-colors"
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleSaveTip(tip.id)}
                      className="hover:bg-amber-100 hover:text-amber-800 dark:hover:bg-amber-900 dark:hover:text-amber-200 transition-colors"
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border border-primary/10 shadow-md">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
            <CardTitle>{t('personalizedRecommendations')}</CardTitle>
            <CardDescription>
              Based on your spending patterns and financial goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mt-4">
              {personalizedTips.map((tip) => (
                <div key={tip.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-all">
                  <div className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          tip.relevance === "High"
                            ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
                            : 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                        }`}
                      >
                        <Lightbulb className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">{tip.title}</h3>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-muted-foreground">{tip.category}</span>
                          <span
                            className={`px-1.5 py-0.5 rounded-full ${
                              tip.relevance === "High"
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            }`}
                          >
                            {tip.relevance} Relevance
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-600 dark:text-green-400">
                        {tip.potentialSavings}
                      </div>
                      <div className="text-xs text-muted-foreground">{t('potentialSavings')}</div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm mb-4">{tip.description}</p>
                    <div className="flex justify-between items-center">
                      <Button variant="outline" onClick={() => handleApplyTip(tip.id)}>
                        Apply This Tip
                      </Button>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleSaveTip(tip.id)}
                          className="hover:bg-amber-100 hover:text-amber-800 dark:hover:bg-amber-900 dark:hover:text-amber-200 transition-colors"
                        >
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Tips;
