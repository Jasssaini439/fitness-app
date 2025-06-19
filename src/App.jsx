import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import UserDashboard from './pages/user/DashBoard1';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import NutritionPage from './pages/user/Nutrition1';
import WorkoutPage from './pages/user/WorkoutPage';
import AdminDashboard from './pages/admin/Dashboard';
import AdminNutritionPage from './pages/admin/Nutrition';
import AdminWorkoutsPage from './pages/admin/Workouts';
import AdminUsersPage from './pages/admin/users';
import UserProfilePage from './pages/user/UserProfilePage';
import UserProgress from './pages/user/UserProgress.jsx';
import UserCustomizationPage from './pages/user/UserCustomizationPage';
import Payment from './pages/Payment.jsx'
import AOS from 'aos';
import 'aos/dist/aos.css';

import './index.css';
import { ToastContainer } from 'react-toastify';
import CursorFollower from './components/CursorFollower.jsx';
import PricingCards from './components/home/PricingCards.jsx';
import Gallery1 from './pages/admin/Gallery1.jsx';

// Stripe Integration
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import HomePage from './pages/Homepage.jsx';

// Replace with your real publishable key
const stripePromise = loadStripe('pk_test_51RMMVJ4IxcU9Rg0vGuRvTtur5WHYae0A1J7WUT9gNhYF6oNwnFXzgWFa9Px3hbZtw9QCDv2AvELHAiIclz8UGaqC00wQui0D87');

function App() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <div className="relative">
      <CursorFollower />
      <Elements stripe={stripePromise}>
        <Router>
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/Signup" element={<SignupPage />} />
              <Route path="/Logout" element={<HomePage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/user/dashboard" element={<UserDashboard />} />
              <Route path="/user/nutrition" element={<NutritionPage />} />
              <Route path="/user/workout" element={<WorkoutPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/nutrition" element={<AdminNutritionPage />} />
              <Route path="/admin/workouts" element={<AdminWorkoutsPage />} />
              <Route path="/admin/users" element={<AdminUsersPage />} />
              <Route path="/user/profile" element={<UserProfilePage />} />
              <Route path="/user/progress" element={<UserProgress />} />
              <Route path="/user/customize" element={<UserCustomizationPage />} />
              <Route path="/pricing" element={<PricingCards />} />
              <Route path="/admin/gallery" element={<Gallery1 />} />
              <Route path='/payment' element={<Payment />}/>
            </Routes>
            <Footer />
            <ToastContainer />
          </div>
        </Router>
      </Elements>
    </div>
  );
}

export default App;
