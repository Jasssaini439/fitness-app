import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,Legend } from 'recharts';
import { Link } from 'react-router-dom';
const ProgressPage = ({ userId }) => {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // --- Simulated Progress Data for Frontend Testing ---
    const dummyProgress = [
      {
        date: '2025-04-01',
        weight: 72,
        workout: 'Upper Body Strength',
        caloriesBurned: 450,
      },
      {
        date: '2025-04-05',
        weight: 71.5,
        workout: 'HIIT + Core',
        caloriesBurned: 520,
      },
      {
        date: '2025-04-10',
        weight: 51,
        workout: 'Leg Day',
        caloriesBurned: 490,
      },
    ];

    setTimeout(() => {
      setProgress(dummyProgress);
      setLoading(false);
    }, 500);

    // --- Backend call (commented out) ---
    // const fetchProgress = async () => {
    //   try {
    //     const response = await fetch(`/api/user/${userId}/progress`);
    //     const data = await response.json();
    //     setProgress(data);
    //     setLoading(false);
    //   } catch (error) {
    //     console.error('Error fetching progress:', error);
    //   }
    // };

    // fetchProgress();
  }, [userId]);

  if (loading) return <div className="text-center">Loading progress...</div>;

  return (
    <div className="min-h-screen bg-[url(/bg4.jpg)] bg-cover bg-center bg-no-repeat">
    <div className="container mx-auto p-6">
      <h1 className="text-[4rem] font-bold mb-5 text-stroke-yellow">Your Progress</h1>
      
  {/* 📊 Line Chart for Weight */}
  <div className="bg-white/5  shadow rounded-lg p-6 mb-8 ">
      <h2 className="text-xl font-semibold mb-4">Weight Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={progress}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis  />
          
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="red"
            strokeWidth={2}
            name='Weight (kg)'
            activeDot={{ r: 6 }}
          />
      
        </LineChart>
      </ResponsiveContainer>
    </div>

  {/* 📊 Line Chart for Calories Burned */}
    <div className="bg-white/5 shadow rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Calories Burned</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={progress}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis  />
          
          <Tooltip />
          <Legend />
       
          <Line
            type="monotone"
            dataKey="caloriesBurned"
            stroke="#eab308"
            strokeWidth={2}
            name='Calories Burned'
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>






      {/* cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {progress.map((entry, idx) => (
          <div key={idx} className="bg-white/55 shadow rounded-lg p-4">
            <p><strong>Date:</strong> {new Date(entry.date).toLocaleDateString()}</p>
            <p><strong>Weight:</strong> {entry.weight} kg</p>
            <p><strong>Workout Completed:</strong> {entry.workout}</p>
            <p><strong>Calories Burned:</strong> {entry.caloriesBurned}</p>
          </div>
        ))}
      </div>
    </div>

    <div className='flex justify-center items-center'>
    <Link to="/user/dashboard">
          <button className="bg-purple-500/55 uppercase hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
         go back to dashboard
          </button>
          </Link>
          </div>
    </div>
  );
};

export default ProgressPage;
