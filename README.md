# BudgetIQ - Smart AI-Powered Financial Management

![BudgetIQ Logo](https://raw.githubusercontent.com/TechieTojin/BudgetIQ/main/public/logo.png)

## Project Description
BudgetIQ is an intelligent financial management platform built to tackle the complexity of personal finance through artificial intelligence. In today's fast-paced world, managing expenses, tracking spending patterns, and making informed financial decisions has become increasingly challenging. BudgetIQ addresses these pain points by leveraging AI to transform complex financial data into actionable insights, providing users with a comprehensive yet intuitive financial management experience.

Our platform analyzes transaction patterns, predicts future expenses, and offers personalized recommendations tailored to each user's financial habits. With features ranging from automated receipt scanning to multi-currency support, BudgetIQ empowers users to take control of their financial health regardless of their financial literacy level.

## Why BudgetIQ?
- **Financial Visibility Gap**: Most people lack clear insight into their spending patterns and financial health
- **Manual Tracking Burden**: Traditional expense tracking is time-consuming and error-prone
- **Financial Literacy Barrier**: Complex financial planning requires expertise most users don't possess
- **Language Accessibility**: Many financial tools lack support for Indian languages, limiting accessibility
- **Decision Support**: Users need contextual guidance for making better financial choices

## Features

### Core Features
- **Smart Dashboard**: Interactive visualizations of spending patterns, budget status, and financial insights with real-time updates
- **AI-Powered Receipt Scanner**: Automatically extract and categorize data from uploaded receipts using computer vision and OCR
- **Intelligent Categorization**: Smart classification of transactions with machine learning algorithms that improve over time
- **Multi-Currency Support**: Seamless handling of transactions in multiple currencies with automatic conversion
- **Predictive Analytics**: Forecast future expenses based on historical spending patterns and seasonal trends

### User Experience
- **Personalized Financial Assistant**: AI chatbot providing contextual financial advice based on spending habits
- **Budget Management**: Set, track, and receive alerts on custom budget categories with progress tracking
- **Savings Goals**: Define and visualize progress toward financial objectives with milestone celebrations
- **Multi-Language Support**: Interface available in English, Hindi, Malayalam, and Kannada for wider accessibility
- **Responsive Design**: Optimized experience across desktop and mobile devices with adaptive visualizations

## How It Works
1. **Data Collection**: Users connect accounts or manually upload receipts through our OCR system
2. **AI Processing**: Our algorithms analyze transaction data, categorize expenses, and identify patterns
3. **Insight Generation**: The system transforms raw data into actionable financial insights and visualizations
4. **Personalized Recommendations**: Based on spending patterns, BudgetIQ provides tailored financial advice
5. **Continuous Learning**: The system improves over time by learning from user interactions and feedback

## Technology Stack

### Frontend
- **Core**: React, TypeScript, Tailwind CSS
- **UI Components**: Shadcn UI, Framer Motion
- **Data Visualization**: Recharts, D3.js
- **State Management**: React Query, Context API
- **Routing**: React Router

### Backend
- **Server**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Real-time Features**: Socket.io
- **Caching**: Redis

### AI/ML
- **Core ML**: TensorFlow.js
- **Natural Language Processing**: For financial assistant and transaction categorization
- **Computer Vision**: OpenCV, Tesseract OCR for receipt processing
- **Predictive Models**: Custom algorithms for expense forecasting

### Cloud Infrastructure
- **Services**: AWS Lambda, Amazon S3
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel

## Challenges We Faced

- **Receipt Analysis Complexity**: Developed custom preprocessing pipelines to handle varied receipt formats, fonts, and layouts
- **Multi-Currency Integration**: Created a reliable exchange rate system with fallbacks for accurate currency conversions
- **AI Knowledge Base Development**: Balanced hardcoded financial knowledge with dynamic, context-aware responses
- **Language Localization**: Accurately translated complex financial terminology across multiple Indian languages
- **Performance Optimization**: Enhanced rendering efficiency for data-intensive dashboards across various devices
- **Mobile UI Adaptation**: Designed adaptive visualizations that transform based on screen size without losing functionality
- **Security Implementation**: Built robust protection measures for sensitive financial data with end-to-end encryption
- **Deployment Constraints**: Unable to deploy due to hosting platform limitations that only supported HTML, CSS, and JavaScript while working within budget constraints

## Future Scope

- **Banking API Integration**: Direct connection with banking systems for automatic transaction import
- **Advanced Predictive Models**: Enhanced AI predictions for long-term financial planning and scenario analysis
- **Investment Portfolio Tracking**: Comprehensive investment management with performance analytics
- **Collaborative Budgeting**: Family and group budget management with shared access controls
- **Gamification System**: Expanded reward system to encourage positive financial habits
- **Voice Command Interface**: Natural language processing for hands-free operation
- **Financial Education Hub**: Personalized learning resources based on user's financial knowledge gaps
- **Expanded Language Support**: Additional regional Indian languages to increase accessibility

## Team Members

- **Tojin Varkey Simson** - [GitHub](https://github.com/TechieTojin) - [Email](mailto:tojinsimson28@gmail.com)
- **Jaiby Mariya Joseph** - [GitHub](https://github.com/jaiby) - [Email](mailto:jaiby.joseph2003@gmail.com)

## 📋 Installation and Setup

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB (local or Atlas connection)

### Local Development

1. Clone the repository
   ```bash
   git clone https://github.com/TechieTojin/TJ-Squard_AMUHACKS4.0.git
   cd TJ-Squard_AMUHACKS4.0
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

## 📊 Project Screenshots

| Dashboard | Budget Management |
|-----------|-------------------|
| ![Dashboard](https://raw.githubusercontent.com/TechieTojin/BudgetIQ/main/screenshots/dashboard.png) | ![Budget](https://raw.githubusercontent.com/TechieTojin/BudgetIQ/main/screenshots/budget.png) |

| Receipt Scanner | Financial Assistant |
|-----------------|---------------------|
| ![Receipt](https://raw.githubusercontent.com/TechieTojin/BudgetIQ/main/screenshots/receipt.png) | ![Assistant](https://raw.githubusercontent.com/TechieTojin/BudgetIQ/main/screenshots/assistant.png) |

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- CHRIST (Deemed-to-be University) for academic support
- [Shadcn UI](https://ui.shadcn.com/) for the component library
- All open-source libraries and tools that made this project possible

## Hashtags
#FinancialIntelligence #AI #BudgetManagement #MachineLearning #PersonalFinance 
#FinTech #DataVisualization #AMUHACKS4.0 #CSSAMU #AMU
