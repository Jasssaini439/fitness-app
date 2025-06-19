import React, { useState } from 'react';
import axios from 'axios';

const ForgotPasswordPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    answer: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/v1/users/forgot-password', formData);
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-500 to-black p-4">
      <form
        onSubmit={handleReset}
        className="bg-white/20 backdrop-blur-lg p-8 rounded-xl shadow-md w-full max-w-md text-white"
      >
        <h1 className="text-3xl font-bold mb-6 text-yellow-300 text-center">Reset Password</h1>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
          value={formData.email}
          required
          className="w-full p-3 mb-4 rounded bg-white/10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <input
          type="text"
          name="answer"
          placeholder="Enter your security answer"
          onChange={handleChange}
          value={formData.answer}
          required
          className="w-full p-3 mb-4 rounded bg-white/10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New password"
          onChange={handleChange}
          value={formData.newPassword}
          required
          className="w-full p-3 mb-4 rounded bg-white/10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm new password"
          onChange={handleChange}
          value={formData.confirmPassword}
          required
          className="w-full p-3 mb-6 rounded bg-white/10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
        >
          Reset Password
        </button>

        {message && (
          <p className="text-center mt-4 text-sm text-yellow-300">{message}</p>
        )}
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
