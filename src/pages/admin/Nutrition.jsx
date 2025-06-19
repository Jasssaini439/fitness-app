import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
function AdminNutritionPage() {
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState(null);
  const [isAddingMeal, setIsAddingMeal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [newFood, setNewFood] = useState({
    name: '',
    items: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
    caloriegoal: ''
  });

// fetchprofiles
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/users/all-users');
        setProfiles(response.data);
      } catch (e) {
        setError(e.message);
      }
    };

    fetchProfiles();
  }, []);



  // Fetch meals on component mount
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/nutrition/all-nutrition');
        setFoods(response.data);
      } catch (e) {
        setError(e.message);
      }
    };

    fetchFoods();
  }, []);

  // Delete a meal
  const handleDeleteFood = async (logId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this meal?");
      if (!confirmDelete) return;
  
      await axios.delete(`http://localhost:8000/api/v1/nutrition/nutrition/${logId}`);
  
      setFoods((prevFoods) => prevFoods.filter((meal) => meal._id !== logId));
    } catch (error) {
      console.error("Error deleting meal:", error);
      alert("Failed to delete meal");
    }
  };
  

  // Handle new meal form toggle
  const handleAddFood = (userId) => {
    setSelectedUserId(userId);
    setIsAddingMeal(true);
  };

  // Submit new meal
  const handleAddMeal = async (e) => {
    e.preventDefault();
    if (!selectedUserId) {
      alert("User ID not selected");
      return;
    }
  
    try {
      const foodToAdd = {
        userId: selectedUserId,
        name: newFood.name,
        items: newFood.items.split(',').map(item => item.trim()), 
        calories: parseInt(newFood.calories, 10),
        protein: parseInt(newFood.protein, 10),
        carbs: parseInt(newFood.carbs, 10),
        fats: parseInt(newFood.fats, 10),
        caloriegoal: parseInt(newFood.caloriegoal, 10) 

      };
  
      const response = await axios.post('http://localhost:8000/api/v1/nutrition/AddNutrition', foodToAdd);
      setFoods(prev => [...prev, response.data]);
      setNewFood({ name: '', items: '', calories: '', protein: '', carbs: '', fats: '' , caloriegoal: ''});
      setIsAddingMeal(false);
      setSelectedUserId(null);
    } catch (err) {
      console.error(err);
      alert('Error adding food item');
    }
  };
  
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin - Nutrition Management</h1>
<div>
        <h2 className="text-4xl font-semibold text-gray-700 mb-4">Profiles :-</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {profiles.map((profile) => (
            <div key={profile._id} className="bg-white shadow-md rounded-md p-4">
              <h3 className="text-xl font-semibold text-gray-800">{profile.username}</h3>
              <button
          onClick={() => handleAddFood(profile._id)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold my-4 py-1 px-3 rounded"
        >
          Add New Food
        </button>
             </div>
             
          ))}
        </div>
          
      <div className="mb-4">
       

        {isAddingMeal && (
          <form onSubmit={handleAddMeal} className="bg-gray-100 p-4 rounded mt-4">
            <div className="grid grid-cols-2 gap-4">
              {['name', 'items', 'calories', 'protein', 'carbs', 'fats','caloriegoal'].map((field) => (
                <input
                  key={field}
                  type={field === 'calories' || field === 'protein' || field === 'carbs' || field === 'fats' ? 'number' : 'text' || 'caloriegoal'==='number'}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={newFood[field]}
                  onChange={(e) => setNewFood({ ...newFood, [field]: e.target.value })}
                  className="p-2 border rounded"
                  required
                />
              ))}
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setIsAddingMeal(false)}
              className="mt-4 ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
      </div>
      {error && <div className="text-red-500 mb-4">Error loading data: {error}</div>}

      <div className="bg-white shadow-md rounded-md overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              {['ID', 'Name', 'Items', 'Calories', 'Protein (g)', 'Carbs (g)', 'Fats (g)', 
              'caloriegoal','Actions'].map((head) => (
                <th
                  key={head}
                  className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr key={food._id}>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                {
    profiles.find((user) => user._id === food.userId)?.username || 'Unknown User'
  }
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">{food.name}</td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">{food.items}</td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">{food.calories}</td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">{food.protein}</td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">{food.carbs}</td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">{food.fats}</td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">{food.caloriegoal}</td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>{food.date ? format(new Date(food.date), 'dd MM yyyy') : "No date "}</td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  <button
                    onClick={() => alert("Edit functionality coming soon")}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                   onClick={() => handleDeleteFood(food._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6">
        <a
          href="/admin/dashboard"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Dashboard
        </a>
      </div>
    </div>
  );
}

export default AdminNutritionPage;