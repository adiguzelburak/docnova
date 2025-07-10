# Docnova

## 🚀 Features

### 📊 **Invoice Management**
- **Invoice List View**: Display invoices in a comprehensive data table with pagination
- **Invoice Details**: Detailed view of individual invoices with complete financial information

### 🔐 **Authentication & Security**
- **JWT Authentication**: Secure login system with token-based authentication
- **Protected Routes**: Automatic redirection to login for unauthorized access
- **Session Persistence**: Maintain login state across browser sessions

### 🌐 **Internationalization**
- **Multi-Language Support**: English and Turkish language options
- **Dynamic Language Switching**: Change language without page reload
- **Localized Date Formats**: Proper date formatting for different locales
- **Comprehensive Translations**: All UI elements and messages translated

### 🎨 **User Experience**
- **Dark/Light Theme**: Toggle between dark and light themes
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface using Ant Design components
- **Loading States**: Proper loading indicators and error handling
- **Accessible**: Built with accessibility best practices

### 📱 **Technical Features**
- **Real-time Updates**: Redux state management for consistent data flow
- **Type Safety**: Full TypeScript integration for better development experience
- **Form Validation**: Client-side validation using Formik and Yup
- **Error Handling**: Comprehensive error handling and user feedback
- **Code Splitting**: Optimized bundle sizes with lazy loading

## 🛠️ Tech Stack

### **Frontend**
- **React** - Modern React with latest features
- **TypeScript** - Type-safe JavaScript development
- **Ant Design** - Enterprise-class UI design language
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Declarative routing for React

### **State Management**
- **Redux Toolkit** - Efficient Redux development
- **React Redux** - Official React bindings for Redux

### **Form Handling**
- **Formik** - Build forms without tears
- **Yup** - Schema validation

### **HTTP Client**
- **Axios** - Promise-based HTTP client

### **Internationalization**
- **React i18next** - Internationalization framework

### **Development Tools**
- **Vite** - Next generation frontend tooling
- **ESLint** - Linting utility for JavaScript and TypeScript
- **TypeScript** - Static type checker

## 📦 Installation

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/adiguzelburak/docnova.git
   cd melasoft
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Configure your environment variables:
   ```env
   VITE_API_BASE_URL=https://api-dev.docnova.ai
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🚀 Available Scripts

- **`npm run dev`** - Start development server
- **`npm run build`** - Build for production
- **`npm run preview`** - Preview production build
- **`npm run lint`** - Run ESLint

## 📱 Usage

### **Login**
1. Navigate to the application
2. Use the provided credentials
3. Click "Login" to access the dashboard

### **Invoice List**
1. **View Invoices**: The home page displays a comprehensive list of invoices
3. **View Details**: Click "Details" on any invoice to see complete information

### **Settings**
- **Theme Toggle**: Click the theme button in the header to switch between light/dark modes
- **Language**: Use the language selector to switch between English and Turkish
- **Logout**: Use the logout functionality to securely end your session

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Common components (Layout, DataTable, etc.)
│   └── app-wrapper.tsx # Main app wrapper with routing
├── pages/              # Page components
│   ├── home/          # Invoice list page
│   ├── invoice-detail/ # Invoice detail page
│   └── login/         # Login page
├── features/           # Feature-based Redux slices
│   ├── auth/          # Authentication logic
│   └── invoice/       # Invoice management logic
├── contexts/           # React contexts
│   └── theme-context.tsx # Theme management
├── hooks/              # Custom React hooks
│   └── useAuth.ts     # Authentication hook
├── i18n/              # Internationalization
├── services/          # API services
├── constants/         # App constants
└── store.ts           # Redux store configuration
```

## 🔌 API Integration

### **Base URL**
```
https://api-dev.docnova.ai
```

### **Endpoints**
- **`POST /auth/login/dev`** - User authentication
- **`POST /invoice/search`** - Fetch invoices with filters

### **Authentication**
All API requests require a valid JWT token passed in the Authorization header:
```
R-Auth: <your-jwt-token>
```

## 🌍 Internationalization

The application supports multiple languages:

- **English (en)** - Default language
- **Turkish (tr)** - Turkish localization

### Adding New Languages
1. Add translations to `src/i18n/index.ts`
2. Update the language selector in `src/components/common/language-selector.tsx`
3. Add flag assets to `src/assets/flags/`

## 🎨 Theming

The application supports both light and dark themes:

- **Light Theme** - Default Ant Design theme
- **Dark Theme** - Ant Design dark algorithm

Theme preference is managed through React Context and can be toggled via the theme button in the header.
