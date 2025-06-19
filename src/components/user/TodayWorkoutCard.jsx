import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AppleIcon, DumbbellIcon } from 'lucide-react'; // Optional icon (or replace with your own)
import { FolderOpenIcon } from '@heroicons/react/24/outline';
import { CursorArrowRippleIcon, SparklesIcon, SunIcon } from '@heroicons/react/24/solid';
import { format } from 'date-fns';
const TodayWorkoutCard = () => {
  const [nutritionData, setNutritionData] = useState([]);
  const [workoutData,setWorkoutData] = useState([]);
  const [userId, setUserId] = useState(null);

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

  return (
    <div className="flex justify-center items-center mt-16 mb-28 gap-28">
      {/* Today's Workout Card */}
      <div className="bg-white/20 w-full sm:w-1/2 md:w-1/3 backdrop-blur-md rounded-xl p-6 shadow-lg transition-transform hover:scale-105 hover:shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <DumbbellIcon className="text-green-600 w-6 h-6" />
          <h2 className="text-xl font-semibold text-white">Today’s Workout</h2>
        </div>
    
        <p className="text-white">
          <span className="font-medium">Workout:</span> {workoutName || "No data available"}
        </p>
        <p className="text-white">
          <span className="font-medium">Duration:</span> {workoutDuration || "No data available"} mins
        </p>
        <p className='text-white'>
          <span className='font-medium'>Description: </span> {workoutDescription || "No data available"}
        </p>
        <p className='text-white'>
          <span className='font-medium'>Catagory: </span> {workoutCategory || "No data available"}
        </p>
        <p className='text-white'>
          <span className='font-medium'>Difficulty: </span> {workoutDifficulty || "No data available"}
        </p>
        <p className='text-white'>
          <span className='font-medium'>TargetMuscles: </span> {workoutTargetMuscles || "No data available"}
        </p>
        <p className='text-white'>
          <span className='font-medium'>Equipment: </span>{workoutEquipment || "No data available"}
        </p>
        <p className='text-white'>
          <span className='font-medium'>Exercises: </span>{workoutExercises || "No data available"}
        </p>
        <p className='text-white'>
          <span className='font-medium'>Date:  </span>
          {workoutDate ? format(new Date(workoutDate), 'dd-MM-yyyy') : "No date " || "No data available"}
        </p>
        <p className="text-white">
  <a 
    href={workoutLink} 
    target="_blank" 
    rel="noopener noreferrer"
  >
    <button className="bg-green-600 rounded-lg p-2 mt-3 transition-transform hover:scale-105 hover:shadow-xl">
      Learn more
    </button>
  </a>
</p>

        </div>
        
        
      
     

      {/* Meal for Today Card */}
      <div className="bg-white/20 w-full sm:w-1/2 md:w-1/3 backdrop-blur-md rounded-xl p-6 shadow-lg transition-transform hover:scale-105 hover:shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <AppleIcon className="text-yellow-600 w-6 h-6" />
          <h2 className="text-xl font-semibold text-white">Meal For Today</h2>
        </div>
        <p className="text-white">
          <span className="font-medium">Meal Name:</span> {mealName || 'No meal data available'}
        </p>
        <p className="text-white">
          <span className="font-medium">Meal Items:</span> {mealItems || 'No items listed'}
        </p>
        <p className="text-white">
          <span className="font-medium">Calories:</span> {mealCalories || 'No calorie data'}
        </p>
        <p className="text-white">
          <span className="font-medium">Protein Intake:</span> {mealProtein || 'No protein data'}
        </p>
        <p className='text-white'>
          <span className='font-medium'>Date:  </span>
          {mealdate ? format(new Date(mealdate), 'dd MM yyyy') : "No date "}
        </p>
      </div>
    </div>
  );
};

export default TodayWorkoutCard;
