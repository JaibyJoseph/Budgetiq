# BudgetIQ - Smart AI-Powered Financial Management

![BudgetIQ Logo](https://raw.githubusercontent.com/TechieTojin/BudgetIQ/main/public/logo.png)

BudgetIQ is an intelligent financial management platform that leverages AI to help users track expenses, analyze spending patterns, set budgets, and receive personalized financial recommendations. With features like receipt scanning, multi-currency support, and predictive analytics, BudgetIQ transforms complex financial management into an intuitive experience.

## 🌟 Features

- **Smart Dashboard**: Interactive visualizations of spending patterns, budget status, and financial insights
- **AI-Powered Receipt Scanner**: Automatically extract and categorize data from uploaded receipts
- **Intelligent Categorization**: Smart classification of transactions with machine learning
- **Multi-Currency Support**: Seamless handling of transactions in multiple currencies
- **Predictive Analytics**: Forecast future expenses based on historical spending patterns
- **Personalized Financial Assistant**: AI chatbot providing contextual financial advice
- **Budget Management**: Set, track, and receive alerts on custom budget categories
- **Savings Goals**: Define and visualize progress toward financial objectives
- **Multi-Language Support**: Interface available in English, Hindi, Malayalam, and Kannada
- **Responsive Design**: Optimized experience across desktop and mobile devices

## 🖥️ Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI, Framer Motion, Recharts
- **State Management**: React Query, Context API
- **Routing**: React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Cloud Services**: AWS Lambda, Amazon S3
- **AI/ML**: TensorFlow.js, Natural Language Processing, OpenCV, Tesseract OCR
- **Authentication**: JWT
- **Real-time Features**: Socket.io
- **Caching**: Redis
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel

## 📋 Installation and Setup

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB (local or Atlas connection)

### Local Development

1. Clone the repository
   ```bash
   git clone https://github.com/TechieTojin/BudgetIQ.git
   cd BudgetIQ
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   S3_BUCKET=your_s3_bucket_name
   AWS_ACCESS_KEY=your_aws_access_key
   AWS_SECRET_KEY=your_aws_secret_key
   ```

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## 🤝 The Problem It Solves

BudgetIQ addresses multiple challenges in personal financial management:

- **Lack of Financial Visibility**: Provides comprehensive dashboards with intuitive visualizations that break down spending by category, track monthly trends, and highlight budget status in real-time.

- **Manual Expense Tracking**: Employs OCR and AI to automatically extract, categorize, and record transaction details from uploaded receipts, significantly reducing manual data entry.

- **Budget Planning Difficulties**: Analyzes historical transaction data to suggest personalized budget allocations across different categories, helping users create achievable financial plans.

- **Multi-Currency Complexity**: Handles automatic conversions, maintaining accurate financial records regardless of the currencies involved.

- **Lack of Predictive Insights**: Uses AI-powered prediction to analyze spending patterns and forecast future expenses, helping users prepare for upcoming financial obligations.

- **Financial Decision Support**: AI Assistant provides personalized responses to financial queries, offering guidance tailored to the user's specific financial situation and goals.

- **Language Barriers**: Includes support for English, Hindi, Malayalam, and Kannada, making financial management accessible to a diverse user base in India.

## 🛠️ Challenges We Faced

During development, we encountered several significant challenges:

- **Receipt Analysis Implementation**: Improving OCR accuracy for varied receipt formats required developing custom preprocessing pipelines and text parsing algorithms.

- **Multi-Currency Integration**: Building a reliable exchange rate system with fallbacks to ensure accurate currency conversions across multiple sources.

- **AI Assistant Knowledge Base**: Creating a balanced system between hardcoded financial knowledge and dynamic, context-aware responses.

- **Language Localization**: Developing accurate translations for complex financial terminology across multiple Indian languages.

- **React Component Performance**: Optimizing data-heavy dashboards with multiple charts to ensure responsive performance across devices.

- **Mobile Responsiveness**: Designing adaptive visualizations that transform based on screen size to maintain usability on smaller devices.

- **Data Security**: Implementing robust security measures including end-to-end encryption and secure third-party API integrations.

## 📊 Project Screenshots

| Dashboard | Budget Management |
|-----------|-------------------|
| ![Dashboard](https://raw.githubusercontent.com/TechieTojin/BudgetIQ/main/screenshots/dashboard.png) | ![Budget](https://raw.githubusercontent.com/TechieTojin/BudgetIQ/main/screenshots/budget.png) |

| Receipt Scanner | Financial Assistant |
|-----------------|---------------------|
| ![Receipt](https://raw.githubusercontent.com/TechieTojin/BudgetIQ/main/screenshots/receipt.png) | ![Assistant](https://raw.githubusercontent.com/TechieTojin/BudgetIQ/main/screenshots/assistant.png) |

## 📝 Future Enhancements

- Integration with banking APIs for automatic transaction import
- Enhanced AI predictions for long-term financial planning
- Investment portfolio tracking and recommendations
- Collaborative budgeting for families and groups
- Gamification elements to encourage positive financial habits
- Voice command capabilities for hands-free operation

## 👥 Contributors

- **Tojin Varkey Simson** - [GitHub](https://github.com/TechieTojin) - [Email](mailto:tojinsimson28@gmail.com)
- **Jaiby Mariya Joseph** - [GitHub](https://github.com/jaiby) - [Email](mailto:jaiby.joseph2003@gmail.com)

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- CHRIST (Deemed-to-be University) for academic support
- [Shadcn UI](https://ui.shadcn.com/) for the component library
- All open-source libraries and tools that made this project possible
