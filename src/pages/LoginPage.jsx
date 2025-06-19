import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';




function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

       try {
          const res = await axios.post('http://localhost:8000/api/v1/users/login',{
            email,
            password,
          });
          const {user,token} = res.data;

           // Save user ID and token to localStorage
      localStorage.setItem('userId', user._id);
      localStorage.setItem('token', token);

      // Save user data to localStorage
      localStorage.setItem('user', JSON.stringify(user));

      // Dispatch the event to notify user state change
      window.dispatchEvent(new Event('userChanged'));

          

    // if (response.status === 200) {
    //   localStorage.setItem('user', JSON.stringify(response.data.user));
    //   window.dispatchEvent(new Event("userChanged")); // 👈 instead of reload
    //   navigate('/'); // Navigate to home or dashboard 

    
    toast.success(`Login successful as ${user.role}`);
    navigate(user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
       
        } catch (err) {
          console.error('Error fetching stats:', err);
          setError('Invalid email or password');
          toast.error('Invalid email or password');
        } 
      };

     

  return (
    <div className="relative w-full h-screen overflow-hidden">
    {/* Video Element */}
    <video 
      className="absolute top-0 left-0 w-full h-full object-cover"
      src="/v1.mp4" // 👈 your video path
      autoPlay 
      loop 
      muted 
      playsInline 
    />
      {/* Semi-transparent overlay (optional, makes text more visible) */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

    <main className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <section className="bg-white bg-opacity-10   shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-yellow-500 mb-6 text-center">
          Login to <span className="text-green-500">FitLife</span>
        </h2>
        {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div>
            <label htmlFor="email" className="block text-black text-xl capitalize  text-sm font-bold mb-2">
              email:
            </label>
            <input
              type="text"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-black text-xl text-sm font-bold mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Login
          </button>
          <div className="mt-4 text-center">
            <p className="text-black text-sm">
              Don't have an account? <Link to="/signup" className="text-blue-600 font-bold hover:underline">Sign up</Link>
            </p>
            <p className="text-gray-600 text-sm">
              <Link to="/forgot-password" className="text-blue-600 font-bold hover:underline">Forgot Password?</Link>
            </p>
          </div>
        </form>
      </section>
    </main>
    </div>
  );
}

export default LoginPage;
