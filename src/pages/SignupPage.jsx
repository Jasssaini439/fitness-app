
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      toast.error('Passwords do not match.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8000/api/v1/users/register', {
        username,
        email,
        password,
        firstname,
        lastname,
        confirmPassword,
        securityQuestion,
        securityAnswer,
        age,
        gender: gender.charAt(0).toUpperCase() + gender.slice(1), // Ensure gender is capitalized
      });
  
      if (response.status === 201) {
        console.log('Signup successful:', response);
        toast.success('Registration Successful');
        navigate('/login'); // Redirect to login after successful signup
      } else {
        setError(response.data.message || 'Signup failed.');
        toast.error(response.data.message || 'Signup failed.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      toast.error('An error occurred during signup.');
      setError(err.response?.data.message || 'An error occurred during signup.');
    }
  };
  

  return (

    <div className=" flex justify-center w-full min-h-screen ">
    {/* Video Element */}
    <video className="fixed top-0 left-0 w-full h-full object-cover z-0"
      src="/v2.mp4" // 👈 your video path
      autoPlay 
      loop 
      muted 
      playsInline 
    />
      {/* Semi-transparent overlay (optional, makes text more visible) */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

    <main className=" relative z-10  flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
      <section className="bg-white/25 shadow-md rounded-lg p-8 w-full max-w-md overflow-y-auto">
        <h2 className="text-2xl font-bold text-yellow-500 mb-6 text-center">
          Create an Account on <span className="text-green-500">FitLife</span>
        </h2>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-300  text-xl capitalize font-bold mb-2">
              Username:
            </label>
            <input
              type="text"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-300  text-xl capitalize font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-300  text-xl capitalize font-bold mb-2">
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
          <div>
            <label htmlFor="confirm-password" className="block text-gray-300  text-xl capitalize font-bold mb-2">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirm-password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="age" className="block text-gray-300  text-xl capitalize font-bold mb-2">
              gender:
            </label>
            <select
    value={gender}
    onChange={(e) => setGender(e.target.value)}
    required
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  >
    <option value="">Select gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
  </select>
          </div>

          <div>
            <label htmlFor="firstname" className="block text-gray-300  text-xl capitalize font-bold mb-2">
              First Name:
            </label>
            <input
              type="text"
              id="firstname"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="lastname" className="block text-gray-300 text-xl capitalize font-bold mb-2">
              Last Name:
            </label>
            <input
              type="text"
              id="lastname"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="age" className="block text-gray-300 text-xl capitalize font-bold mb-2">
              Age:
            </label>
            <input
              type="number"
              id="age"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div>
          <label htmlFor="age" className="block text-gray-300 text-xl capitalize font-bold mb-2">
              Security Question:
            </label>
          <input
  type="text"
  id="securityQuestion"
  value={securityQuestion}
  onChange={(e) => setSecurityQuestion(e.target.value)}
  placeholder="Security Question (e.g. Your pet's name?)"
  className="border border-gray-300 p-2 mb-4 w-full rounded"
  name="securityQuestion"
  required
/>
</div>
<div>
<label htmlFor="age" className="block text-gray-300 text-xl capitalize font-bold mb-2">
              Security Answer:
            </label>
<input
  type="text"
  id="securityAnswer"
  value={securityAnswer}
  onChange={(e) => setSecurityAnswer(e.target.value)}
  placeholder="Your Answer"
  className="border border-gray-300 p-2 mb-4 w-full rounded"
  name="securityAnswer"
  required
/>
</div>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Sign Up
          </button>
          <div className="mt-4 text-center">
            <p className="text-gray-300 text-sm">
              Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
            </p>
            <p className="text-gray-600 text-sm">
              <Link to="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</Link>
            </p>
          </div>
        </form>
      </section>
    </main>
    </div>
  );
}

export default SignupPage;