import React, { createContext, useContext, useState, useEffect } from 'react';

// Define available languages
export type Language = 'en' | 'hi' | 'ml' | 'kn';

// Define the content structure for translations
type TranslationContent = {
  [key: string]: string;
};

// Translation data for different languages
const translations: Record<Language, TranslationContent> = {
  en: {
    // Common
    dashboard: 'dashboard',
    transactions: 'transactions',
    budget: 'budget',
    history: 'history',
    reports: 'reports',
    predictions: 'predictions',
    tips: 'smart tips',
    settings: 'settings',
    notifications: 'notifications',
    balance: 'balance',
    income: 'income',
    expenses: 'expenses',
    save: 'save',
    cancel: 'cancel',
    main: 'main',
    analytics: 'analytics',
    account: 'account',
    sign_out: 'sign out',
    
    // AI Assistant
    askAssistant: 'ask your financial assistant...',
    assistant: 'financial assistant',
    assistantWelcome: 'Hello! I can help with your financial questions and provide personalized advice.',
    
    // Budget
    budgetManagement: 'budget management',
    addBudget: 'add budget',
    category: 'category',
    monthlyLimit: 'monthly limit',
    createBudget: 'create budget',
    
    // Predictions
    expenseForecast: 'expense forecast',
    predictedSpending: 'predicted for next month',
    aiConfidence: 'AI confidence',
    
    // Tips
    smartFinancialTips: 'smart financial tips',
    personalizedRecommendations: 'personalized recommendations',
    potentialSavings: 'potential savings',
    
    // Language
    language: 'language',
    english: 'english',
    hindi: 'hindi',
    malayalam: 'malayalam',
    kannada: 'kannada',
    
    // New translations
    smart_categorization: 'smart categorization',
    receipt_upload: 'receipt upload',
    recurring_transactions: 'recurring transactions',
    search_transactions: 'search transactions',
    split_expenses: 'split expenses',
    multi_currency: 'multi currency',
    download_reports: 'download reports',
    savings_goals: 'savings goals',
    logged_out_successfully: 'you have been logged out successfully',
    search_transactions_and_categories: 'search transactions and categories...',
    notifications_checked: 'notifications checked',
    budget_alert: 'budget alert',
    food_budget_alert: 'your food category is at 91% of monthly budget',
    smart_tip_available: 'smart tip available',
    new_savings_opportunity: 'we found a new savings opportunity for you',
    new_prediction_ready: 'new prediction ready',
    next_month_prediction: 'your next month prediction is ready',
    hours_ago: 'hours ago',
    yesterday: 'yesterday',
    days_ago: 'days ago',
    mark_all_as_read: 'mark all as read',
    view_all_notifications: 'view all notifications',
    total_balance: 'total balance',
    monthly_income: 'monthly income',
    monthly_expenses: 'monthly expenses',
    spending_overview: 'spending overview',
    category_distribution: 'category distribution',
    budget_progress: 'budget progress',
    smart_insights: 'smart insights',
    recent_transactions: 'recent transactions',
    
    // Additional translations for Dashboard
    ai_insights: 'ai insights',
    view_detailed_reports: 'view detailed reports',
    view_all_transactions: 'view all transactions',
    manage_budgets: 'manage budgets',
    view_all_insights: 'view all insights',
    add_new_transaction: 'add new transaction',
    forecast_your_finances: 'forecast your finances',
    get_ai_powered_predictions: 'get ai-powered predictions about your future expenses and plan ahead',
    view_predictions: 'view predictions',
    customize_your_experience: 'customize your experience',
    personalize_your_dashboard: 'personalize your dashboard, notification preferences, and more',
    go_to_settings: 'go to settings',
  },
  
  hi: {
    // Common
    dashboard: 'डैशबोर्ड',
    transactions: 'लेन-देन',
    budget: 'बजट',
    history: 'इतिहास',
    reports: 'रिपोर्ट',
    predictions: 'भविष्यवाणी',
    tips: 'स्मार्ट सुझाव',
    settings: 'सेटिंग्स',
    notifications: 'सूचनाएं',
    balance: 'बैलेंस',
    income: 'आय',
    expenses: 'खर्च',
    save: 'सहेजें',
    cancel: 'रद्द करें',
    main: 'मुख्य',
    analytics: 'विश्लेषण',
    account: 'खाता',
    sign_out: 'साइन आउट',
    
    // AI Assistant
    askAssistant: 'अपने वित्तीय सहायक से पूछें...',
    assistant: 'वित्तीय सहायक',
    assistantWelcome: 'नमस्ते! मैं आपके वित्तीय प्रश्नों में मदद कर सकता हूं और व्यक्तिगत सलाह दे सकता हूं।',
    
    // Budget
    budgetManagement: 'बजट प्रबंधन',
    addBudget: 'बजट जोड़ें',
    category: 'श्रेणी',
    monthlyLimit: 'मासिक सीमा',
    createBudget: 'बजट बनाएं',
    
    // Predictions
    expenseForecast: 'खर्च का पूर्वानुमान',
    predictedSpending: 'अगले महीने के लिए अनुमानित',
    aiConfidence: 'AI विश्वास',
    
    // Tips
    smartFinancialTips: 'स्मार्ट वित्तीय सुझाव',
    personalizedRecommendations: 'व्यक्तिगत सिफारिशें',
    potentialSavings: 'संभावित बचत',
    
    // Language
    language: 'भाषा',
    english: 'अंग्रे़ी',
    hindi: 'हिंदी',
    malayalam: 'मलयालम',
    kannada: 'कन्नड़',
    
    // New translations
    smart_categorization: 'स्मार्ट वर्गीकरण',
    receipt_upload: 'रसीद अपलोड',
    recurring_transactions: 'आवर्ती लेनदेन',
    search_transactions: 'लेनदेन खोजें',
    split_expenses: 'खर्च विभाजित करें',
    multi_currency: 'बहु मुद्रा',
    download_reports: 'रिपोर्ट डाउनलोड करें',
    savings_goals: 'बचत लक्ष्य',
    logged_out_successfully: 'आप सफलतापूर्वक लॉग आउट हो गए हैं',
    search_transactions_and_categories: 'लेनदेन और श्रेणियां खोजें...',
    notifications_checked: 'सूचनाएं देखी गईं',
    budget_alert: 'बजट अलर्ट',
    food_budget_alert: 'आपकी खाद्य श्रेणी मासिक बजट का 91% है',
    smart_tip_available: 'स्मार्ट टिप उपलब्ध',
    new_savings_opportunity: 'हमने आपके लिए एक नया बचत अवसर खोजा',
    new_prediction_ready: 'नई भविष्यवाणी तैयार',
    next_month_prediction: 'आपका अगले महीने का अनुमान तैयार है',
    hours_ago: 'घंटे पहले',
    yesterday: 'कल',
    days_ago: 'दिन पहले',
    mark_all_as_read: 'सभी को पढ़ा हुआ चिह्नित करें',
    view_all_notifications: 'सभी सूचनाएं देखें',
    total_balance: 'कुल बैलेंस',
    monthly_income: 'मासिक आय',
    monthly_expenses: 'मासिक खर्च',
    spending_overview: 'खर्च अवलोकन',
    category_distribution: 'श्रेणी वितरण',
    budget_progress: 'बजट प्रगति',
    smart_insights: 'स्मार्ट अंतर्दृष्टि',
    recent_transactions: 'हाल के लेनदेन',
    
    // Additional translations for Dashboard
    ai_insights: 'एआई अंतर्दृष्टि',
    view_detailed_reports: 'विस्तृत रिपोर्ट देखें',
    view_all_transactions: 'सभी लेनदेन देखें',
    manage_budgets: 'बजट प्रबंधित करें',
    view_all_insights: 'सभी अंतर्दृष्टि देखें',
    add_new_transaction: 'नया लेनदेन जोड़ें',
    forecast_your_finances: 'अपने वित्त का पूर्वानुमान लगाएं',
    get_ai_powered_predictions: 'अपने भविष्य के खर्चों के बारे में एआई-संचालित भविष्यवाणियां प्राप्त करें और पहले से योजना बनाएं',
    view_predictions: 'भविष्यवाणियां देखें',
    customize_your_experience: 'अपने अनुभव को अनुकूलित करें',
    personalize_your_dashboard: 'अपने डैशबोर्ड, अधिसूचना प्राथमिकताएं और अधिक को वैयक्तिकृत करें',
    go_to_settings: 'सेटिंग्स पर जाएं',
  },
  
  ml: {
    // Common
    dashboard: 'ഡാഷ്‌ബോർഡ്',
    transactions: 'ഇടപാടുകൾ',
    budget: 'ബജറ്റ്',
    history: 'ചരിത്രം',
    reports: 'റിപ്പോർട്ടുകൾ',
    predictions: 'പ്രവചനങ്ങൾ',
    tips: 'സ്മാർട്ട് നിർദ്ദേശങ്ങൾ',
    settings: 'ക്രമീകരണങ്ങൾ',
    notifications: 'അറിയിപ്പുകൾ',
    balance: 'ബാലൻസ്',
    income: 'വരുമാനം',
    expenses: 'ചെലവുകൾ',
    save: 'സേവ് ചെയ്യുക',
    cancel: 'റദ്ദാക്കുക',
    main: 'പ്രധാന',
    analytics: 'അനലിറ്റിക്സ്',
    account: 'അക്കൗണ്ട്',
    sign_out: 'സൈൻ ഔട്ട്',
    
    // AI Assistant
    askAssistant: 'നിങ്ങളുടെ സാമ്പത്തിക സഹായിയോട് ചോദിക്കുക...',
    assistant: 'സാമ്പത്തിക സഹായി',
    assistantWelcome: 'ഹലോ! എനിക്ക് നിങ്ങളുടെ സാമ്പത്തിക ചോദ്യങ്ങളിൽ സഹായിക്കാനും വ്യക്തിഗത ഉപദേശം നൽകാനും കഴിയും.',
    
    // Budget
    budgetManagement: 'ബജറ്റ് മാനേജ്മെന്റ്',
    addBudget: 'ബജറ്റ് ചേർക്കുക',
    category: 'വിഭാഗം',
    monthlyLimit: 'പ്രതിമാസ പരിധി',
    createBudget: 'ബജറ്റ് സൃഷ്ടിക്കുക',
    
    // Predictions
    expenseForecast: 'ചെലവ് പ്രവചനം',
    predictedSpending: 'അടുത്ത മാസത്തേക്ക് പ്രവചിച്ചത്',
    aiConfidence: 'AI വിശ്വാസ്യത',
    
    // Tips
    smartFinancialTips: 'സ്മാർട്ട് സാമ്പത്തിക നുറുങ്ങുകൾ',
    personalizedRecommendations: 'വ്യക്തിഗതമാക്കിയ ശുപാർശകൾ',
    potentialSavings: 'സാധ്യമായ സമ്പാദ്യങ്ങൾ',
    
    // Language
    language: 'ഭാഷ',
    english: 'ഇംഗ്ലീഷ്',
    hindi: 'ഹിന്ദി',
    malayalam: 'മലയാളം',
    kannada: 'കന്നഡ',
    
    // New translations
    smart_categorization: 'സ്മാർട്ട് വർഗ്ഗീകരണം',
    receipt_upload: 'രസീത് അപ്‌ലോഡ്',
    recurring_transactions: 'ആവർത്തിച്ചുള്ള ഇടപാടുകൾ',
    search_transactions: 'ഇടപാടുകൾ തിരയുക',
    split_expenses: 'ചെലവുകൾ വിഭജിക്കുക',
    multi_currency: 'ബഹു കറൻസി',
    download_reports: 'റിപ്പോർട്ടുകൾ ഡൗൺലോഡ് ചെയ്യുക',
    savings_goals: 'സമ്പാദ്യ ലക്ഷ്യങ്ങൾ',
    logged_out_successfully: 'നിങ്ങൾ വിജയകരമായി ലോഗ് ഔട്ട് ചെയ്തു',
    search_transactions_and_categories: 'ഇടപാടുകളും വിഭാഗങ്ങളും തിരയുക...',
    notifications_checked: 'അറിയിപ്പുകൾ പരിശോധിച്ചു',
    budget_alert: 'ബജറ്റ് അലേർട്ട്',
    food_budget_alert: 'നിങ്ങളുടെ ഭക്ഷണ വിഭാഗം മാസ ബജറ്റിന്റെ 91% ആണ്',
    smart_tip_available: 'സ്മാർട്ട് ടിപ്പ് ലഭ്യമാണ്',
    new_savings_opportunity: 'ഞങ്ങൾ നിങ്ങൾക്ക് ഒരു പുതിയ സമ്പാദ്യ അവസരം കണ്ടെത്തി',
    new_prediction_ready: 'പുതിയ പ്രവചനം തയ്യാറാണ്',
    next_month_prediction: 'നിങ്ങളുടെ അടുത്ത മാസത്തെ പ്രവചനം തയ്യാറാണ്',
    hours_ago: 'മണിക്കൂർ മുമ്പ്',
    yesterday: 'ഇന്നലെ',
    days_ago: 'ദിവസങ്ങൾക്ക് മുമ്പ്',
    mark_all_as_read: 'എല്ലാം വായിച്ചതായി മാർക്ക് ചെയ്യുക',
    view_all_notifications: 'എല്ലാ അറിയിപ്പുകളും കാണുക',
    total_balance: 'ആകെ ബാലൻസ്',
    monthly_income: 'പ്രതിമാസ വരുമാനം',
    monthly_expenses: 'പ്രതിമാസ ചെലവുകൾ',
    spending_overview: 'ചെലവാക്കൽ അവലോകനം',
    category_distribution: 'വിഭാഗ വിതരണം',
    budget_progress: 'ബജറ്റ് പുരോഗതി',
    smart_insights: 'സ്മാർട്ട് ഇൻസൈറ്റുകൾ',
    recent_transactions: 'സമീപകാല ഇടപാടുകൾ',
    
    // Additional translations for Dashboard
    ai_insights: 'എഐ ഇൻസൈറ്റുകൾ',
    view_detailed_reports: 'വിശദമായ റിപ്പോർട്ടുകൾ കാണുക',
    view_all_transactions: 'എല്ലാ ഇടപാടുകളും കാണുക',
    manage_budgets: 'ബജറ്റുകൾ നിയന്ത്രിക്കുക',
    view_all_insights: 'എല്ലാ ഇൻസൈറ്റുകളും കാണുക',
    add_new_transaction: 'പുതിയ ഇടപാട് ചേർക്കുക',
    forecast_your_finances: 'നിങ്ങളുടെ സാമ്പത്തിക കാര്യങ്ങൾ പ്രവചിക്കുക',
    get_ai_powered_predictions: 'നിങ്ങളുടെ ഭാവി ചെലവുകളെക്കുറിച്ച് എഐ അധിഷ്ഠിത പ്രവചനങ്ങൾ ലഭിക്കുക, മുൻകൂട്ടി ആസൂത്രണം ചെയ്യുക',
    view_predictions: 'പ്രവചനങ്ങൾ കാണുക',
    customize_your_experience: 'നിങ്ങളുടെ അനുഭവം ക്രമീകരിക്കുക',
    personalize_your_dashboard: 'നിങ്ങളുടെ ഡാഷ്‌ബോർഡ്, അറിയിപ്പ് മുൻഗണനകൾ, മറ്റു കാര്യങ്ങളും വ്യക്തിഗതമാക്കുക',
    go_to_settings: 'ക്രമീകരണങ്ങളിലേക്ക് പോകുക',
  },
  
  kn: {
    // Common
    dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    transactions: 'ವಹಿವಾಟುಗಳು',
    budget: 'ಬಜೆಟ್',
    history: 'ಇತಿಹಾಸ',
    reports: 'ವರದಿಗಳು',
    predictions: 'ಮುನ್ಸೂಚನೆಗಳು',
    tips: 'ಸ್ಮಾರ್ಟ್ ಸಲಹೆಗಳು',
    settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    notifications: 'ಅಧಿಸೂಚನೆಗಳು',
    balance: 'ಬ್ಯಾಲೆನ್ಸ್',
    income: 'ಆದಾಯ',
    expenses: 'ವೆಚ್ಚಗಳು',
    save: 'ಉಳಿಸಿ',
    cancel: 'ರದ್ದುಮಾಡಿ',
    main: 'ಮುಖ್ಯ',
    analytics: 'ವಿಶ್ಲೇಷಣೆ',
    account: 'ಖಾತೆ',
    sign_out: 'ಸೈನ್ ಔಟ್',
    
    // AI Assistant
    askAssistant: 'ನಿಮ್ಮ ಹಣಕಾಸು ಸಹಾಯಕನನ್ನು ಕೇಳಿ...',
    assistant: 'ಹಣಕಾಸು ಸಹಾಯಕ',
    assistantWelcome: 'ಹಲೋ! ನಾನು ನಿಮ್ಮ ಹಣಕಾಸು ಪ್ರಶ್ನೆಗಳಿಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ ಮತ್ತು ವೈಯಕ್ತಿಕ ಸಲಹೆ ನೀಡಬಲ್ಲೆ.',
    
    // Budget
    budgetManagement: 'ಬಜೆಟ್ ನಿರ್ವಹಣೆ',
    addBudget: 'ಬಜೆಟ್ ಸೇರಿಸಿ',
    category: 'ವರ್ಗ',
    monthlyLimit: 'ಮಾಸಿಕ ಮಿತಿ',
    createBudget: 'ಬಜೆಟ್ ರಚಿಸಿ',
    
    // Predictions
    expenseForecast: 'ವೆಚ್ಚದ ಮುನ್ಸೂಚನೆ',
    predictedSpending: 'ಮುಂದಿನ ತಿಂಗಳಿಗೆ ಊಹಿಸಲಾಗಿದೆ',
    aiConfidence: 'AI ವಿಶ್ವಾಸ',
    
    // Tips
    smartFinancialTips: 'ಸ್ಮಾರ್ಟ್ ಹಣಕಾಸು ಸಲಹೆಗಳು',
    personalizedRecommendations: 'ವೈಯಕ്ತಿಕಗೊಳಿಸಿದ ಶಿಫಾರಸುಗಳು',
    potentialSavings: 'ಸಂಭಾವ್ಯ ಉಳಿತಾಯಗಳು',
    
    // Language
    language: 'ಭಾಷೆ',
    english: 'ಇಂಗ್ಲಿಷ್',
    hindi: 'ಹಿಂದಿ',
    malayalam: 'ಮಲಯಾಳಂ',
    kannada: 'ಕನ್ನಡ',
    
    // New translations
    smart_categorization: 'ಸ್ಮಾರ್ಟ್ ವರ್ಗೀಕರಣ',
    receipt_upload: 'ರಸೀದಿ ಅಪ್‌ಲೋಡ್',
    recurring_transactions: 'ಪುನರಾವರ್ತಿತ ವಹಿವಾಟುಗಳು',
    search_transactions: 'ವಹಿವಾಟುಗಳನ್ನು ಹುಡುಕಿ',
    split_expenses: 'ವೆಚ್ಚಗಳನ್ನು ವಿಭಜಿಸಿ',
    multi_currency: 'ಬಹು ಕರೆನ್ಸಿ',
    download_reports: 'ವರದಿಗಳನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
    savings_goals: 'ಉಳಿತಾಯ ಗುರಿಗಳು',
    logged_out_successfully: 'ನೀವು ಯಶಸ್ವಿಯಾಗಿ ಲಾಗ್ ಔಟ್ ಆಗಿದ್ದೀರಿ',
    search_transactions_and_categories: 'ವಹಿವಾಟುಗಳು ಮತ್ತು ವರ್ಗಗಳನ್ನು ಹುಡುಕಿ...',
    notifications_checked: 'ಅಧಿಸೂಚನೆಗಳನ್ನು ಪರಿಶೀಲಿಸಲಾಗಿದೆ',
    budget_alert: 'ಬಜೆಟ್ ಎಚ್ಚರಿಕೆ',
    food_budget_alert: 'ನಿಮ್ಮ ಆಹಾರ ವರ್ಗವು ಮಾಸಿಕ ಬಜೆಟ್‌ನ 91% ಆಗಿದೆ',
    smart_tip_available: 'ಸ್ಮಾರ್ಟ್ ಟಿಪ್ ಲಭ್ಯವಿದೆ',
    new_savings_opportunity: 'ನಿಮಗಾಗಿ ನಾವು ಹೊಸ ಉಳಿತಾಯ ಅವಕಾಶವನ್ನು ಕಂಡುಕೊಂಡಿದ್ದೇವೆ',
    new_prediction_ready: 'ಹೊಸ ಮುನ್ಸೂಚನೆ ಸಿದ್ಧವಾಗಿದೆ',
    next_month_prediction: 'ನಿಮ್ಮ ಮುಂದಿನ ತಿಂಗಳ ಮುನ್ಸೂಚನೆ ಸಿದ್ಧವಾಗಿದೆ',
    hours_ago: 'ಗಂಟೆಗಳ ಹಿಂದೆ',
    yesterday: 'ನಿನ್ನೆ',
    days_ago: 'ದಿನಗಳ ಹಿಂದೆ',
    mark_all_as_read: 'ಎಲ್ಲವನ್ನೂ ಓದಿದೆ ಎಂದು ಗುರುತಿಸಿ',
    view_all_notifications: 'ಎಲ್ಲಾ ಅಧಿಸೂಚನೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    total_balance: 'ಒಟ್ಟು ಬ್ಯಾಲೆನ್ಸ್',
    monthly_income: 'ಮಾಸಿಕ ಆದಾಯ',
    monthly_expenses: 'ಮಾಸಿಕ ವೆಚ್ಚಗಳು',
    spending_overview: 'ವೆಚ್ಚದ ಅವಲೋಕನ',
    category_distribution: 'ವರ್ಗದ ವಿತರಣೆ',
    budget_progress: 'ಬಜೆಟ್ ಪ್ರಗತಿ',
    smart_insights: 'ಸ್ಮಾರ್ಟ್ ಒಳನೋಟಗಳು',
    recent_transactions: 'ಇತ್ತೀಚಿನ ವಹಿವಾಟುಗಳು',
    
    // Additional translations for Dashboard
    ai_insights: 'ಏಐ ಒಳನೋಟಗಳು',
    view_detailed_reports: 'ವಿವರವಾದ ವರದಿಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    view_all_transactions: 'ಎಲ್ಲಾ ವಹಿವಾಟುಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    manage_budgets: 'ಬಜೆಟ್‌ಗಳನ್ನು ನಿರ್ವಹಿಸಿ',
    view_all_insights: 'ಎಲ್ಲಾ ಒಳನೋಟಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    add_new_transaction: 'ಹೊಸ ವಹಿವಾಟನ್ನು ಸೇರಿಸಿ',
    forecast_your_finances: 'ನಿಮ್ಮ ಹಣಕಾಸನ್ನು ಮುನ್ಸೂಚನೆ ಮಾಡಿ',
    get_ai_powered_predictions: 'ನಿಮ್ಮ ಭವಿಷ್ಯದ ವೆಚ್ಚಗಳ ಬಗ್ಗೆ ಏಐ-ಪವರ್ಡ್ ಮುನ್ಸೂಚನೆಗಳನ್ನು ಪಡೆಯಿರಿ ಮತ್ತು ಮುಂಚಿತವಾಗಿ ಯೋಜಿಸಿ',
    view_predictions: 'ಮುನ್ಸೂಚನೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    customize_your_experience: 'ನಿಮ್ಮ ಅನುಭವವನ್ನು ಕಸ್ಟಮೈಸ್ ಮಾಡಿ',
    personalize_your_dashboard: 'ನಿಮ್ಮ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್, ಅಧಿಸೂಚನೆ ಆದ್ಯತೆಗಳು ಮತ್ತು ಇನ್ನೂ ಹೆಚ್ಚಿನವುಗಳನ್ನು ವೈಯಕ್ತೀಕರಿಸಿ',
    go_to_settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳಿಗೆ ಹೋಗಿ',
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Initialize language from localStorage if available
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'hi', 'ml', 'kn'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const value = { language, setLanguage, t };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
