import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


import TodayWorkoutCard from '../../components/user/TodayWorkoutCard';
import WorkoutTipsCard from '../../components/admin/WorkoutTipsCard';
import Sleeptipscards from '../../components/admin/Sleeptipscards';
import Healthytipscards from '../../components/admin/Healthytipscards';

function UserDashboard() {
  const navigate = useNavigate();
  const [workoutData,setWorkoutData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [UserData, setUserdata] = useState({});
  const [nutritionData, setNutritionData] = useState([]);
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const id = localStorage.getItem('userId');
    if (!user || !id) {
      navigate('/login');
    } else {
      setUserId(id);
    }
  }, [navigate]);

  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/users/user/${userId}`);
        setUserdata(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchNutritionData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/nutrition/user/${userId}`);
        setNutritionData(response.data);
      } catch (error) {
        console.error('Error fetching nutrition data:', error);
      }
    };

    fetchNutritionData();
  }, [userId]);

  useEffect(() =>{
    if (!userId) return;

    const fetchworkoutdata = async () => {
      try{
        const response = await axios.get(`http://localhost:8000/api/v1/workouts/user/${userId}`);
        setWorkoutData(response.data);
      }
      catch(error){
        console.error('error fetching workout data', error)
      }
    };

    fetchworkoutdata();

  },[userId]);


  const {
    name: workoutName,
    description: workoutDescription,
    category: workoutCategory,
    difficulty: workoutDifficulty,
    duration: workoutDuration,
    targetMuscles: workoutTargetMuscles = [],
    equipment: workoutEquipment,
    exercises: workoutExercises = [],
    link: workoutLink,
    date: workoutDate,
  } = workoutData[0] || {};


  
  const { name: mealName, items: mealItems = [], calories: mealCalories, protein: mealProtein, date: mealdate } = nutritionData[0] || {};


  
  const calorieGoal = nutritionData[0]?.caloriegoal || 0;

 
 

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/background.jpg')" }}>
      <h1 className="text-5xl pt-7 pb-7 font-bold flex flex-col items-center text-white mb-6 text-[6rem] font-black text-center text-stroke-yellow uppercase">
        WELCOME {UserData?.username}
      </h1>

      <h1 className="text-3xl font-bold flex flex-col items-center mb-6 animate-pulse text-[3rem] text-center text-stroke-yellow">
        HERE IS YOUR TODAY'S WORKOUT
      </h1>
      <h1 className="text-3xl font-bold flex flex-col items-center text-green-400 mt-14 animate-pulse">
        LET'S GET STARTED....
      </h1>

      <TodayWorkoutCard />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-bounce p-6" style={{ animationIterationCount: '1.5', animationDuration: '1.5s' }}>
        <div className="bg-white/70 shadow-md rounded-md p-6 transition-transform hover:scale-105 hover:shadow-xl">
          <h2 className="text-2xl font-semibold text-red-800 mb-2 animate-fade-in">Welcome, {UserData?.username}!</h2>
          <p className="text-gray-600">Ready to crush your fitness goals today?</p>
        </div>

        <div className="bg-white/70 shadow-md rounded-md p-6 transition-transform hover:scale-105">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 animate-fade-in">Your Last Workout</h2>
          <p className="text-gray-600">Activity: <span className="font-semibold">{UserData?.lastWorkout}</span></p>
        </div>

        <div className="bg-white/70 shadow-md rounded-md p-6 transition-transform hover:scale-105">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 animate-fade-in">Today's Calorie Goal</h2>
          <p className="text-gray-600">Goal: <span className="font-semibold">{mealCalories} calories</span></p>
        </div>
      </div>

      <section className="my-12 px-4 animate-fade-in" style={{ animationDelay: '0.4s', animationDuration: '2s' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 shadow-lg">
            <Healthytipscards />
          </div>

          <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 shadow-lg">
            <WorkoutTipsCard/>
          </div>

          <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 shadow-lg">
            <Sleeptipscards/>
          </div>
        </div>
      </section>

      <div className="mt-8 mb-6 flex flex-col items-center animate-fade-in" style={{ animationDelay: '2.5s' }}>
        <div className='bg-white/60 hover:bg-black/20 backdrop-blur-md rounded-xl p-1 shadow-lg mb-5'>
          <h2 className="text-2xl font-semibold text-amber-800 pt-1 mb-4">Explore Features</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Link to="/user/workout">
            <button className="bg-blue-500/55 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Track Workout</button>
          </Link>
          <Link to="/user/nutrition">
            <button className="bg-green-500/55 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Track Your Nutrition</button>
          </Link>
          <Link to="/pricing">
            <button className="bg-yellow-500/55 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">Renew Membership</button>
          </Link>
          <Link to="/user/profile">
            <button className="bg-purple-500/55 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded uppercase">Profile Settings</button>
          </Link>
          <Link to="/user/progress">
            <button className="bg-cyan-500/55 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded uppercase">Track Your Progress</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
