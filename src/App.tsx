
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Layout
import Layout from './components/layout/Layout';

// Pages
import HomePage from './pages/HomePage';
import BookingsPage from './pages/BookingsPage';
import BudgetPage from './pages/BudgetPage';
import StoryPage from './pages/StoryPage';
import EmergencyPage from './pages/EmergencyPage';
import SurprisePage from './pages/SurprisePage';
import ContactPage from './pages/ContactPage';
import JenieAssistantPage from './pages/JenieAssistantPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFound from './pages/NotFound';

// Context
import { AuthProvider } from './context/AuthContext';

// Styles
import './styles/main.css';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Main Layout with Navbar */}
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/bookings" element={<BookingsPage />} />
              <Route path="/budget" element={<BudgetPage />} />
              <Route path="/story" element={<StoryPage />} />
              <Route path="/emergency" element={<EmergencyPage />} />
              <Route path="/surprise" element={<SurprisePage />} />
              <Route path="/jenie-tools" element={<JenieAssistantPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>
            
            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
