import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Membercards from '../../components/admin/Membercards';

function AdminDashboardPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      // If no user, redirect
      navigate('/login');
    }
  }, [navigate]);
  
  // Placeholder data for workout and nutrition summaries


  return (
    <div className='bg-[url("/bg3.jpg")] bg-cover bg-center bg-no-repeat min-h-screen'>
    <div className="container mx-auto py-12 ">
      <h1 className="text-3xl font-bold text-gray-800 mt-12 flex flex-wrap gap-2 mb-6 text-start text-[5rem] text-stroke-green">Admin </h1>
      <h1 className="text-3xl font-bold text-gray-800 mt-12 flex flex-wrap gap-2 mb-6 text-start text-[5rem] text-stroke-red">Dashboard</h1>
   
     <h1 className='text-3xl font-bold text-gray-800 mt-12  gap-2 mb-6 text-end text-[5rem] text-stroke-yellow'>PAIN IS GAIN </h1>
     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 mt-28">
        {/* Total Users Card */}
        <Membercards/>
        {/* <NutritionSummaryCard totalFoodItems={100} recentMealLogs={[{ id: 1, userId: 1, foodName: 'Chicken Salad' }]} /> */}
       </div>

      <div className="bg-white/15 shadow-md rounded-md p-6 mb-6">
        <h2 className="text-4xl font-semibold text-black  font-bold font-serif mb-4">Admin Navigation</h2>
        <ul className="space-y-2">
          <li>
            <Link to="/admin/users">
              <h1 className="text-blue-500 hover:text-blue-700 text-2xl">Manage Users</h1>
            </Link>
          </li>
          <li>
            <Link to="/admin/workouts">
              <h1 className="text-green-500 hover:text-green-700 text-2xl">Manage Workouts</h1>
            </Link>
          </li>
          <li>
            <Link to="/admin/nutrition" >
              <h1 className="text-orange-500 hover:text-orange-700 text-2xl">Manage Nutrition</h1>
            </Link>
          </li>
          <li>
            <Link to="/admin/gallery" >
              <h1 className="text-red-500 hover:text-red-700 text-2xl">Manage GAllERY</h1>
            </Link>
          </li>
        </ul>
      </div>
    </div>
    </div>
  );
}

export default AdminDashboardPage;