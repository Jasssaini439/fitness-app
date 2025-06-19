import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
function AdminWorkoutsPage() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [isAddingWorkout, setIsAddingWorkout] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newWorkout, setNewWorkout] = useState({
    name: '',
    description: '',
    category: '',
    difficulty: '',
    duration: '',
    targetMuscles: '',
    equipment: '',
    exercises: '',
    link: ''
  });

  // Fetch user profiles and workouts
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/users/all-users');
        setProfiles(response.data);
      } catch (e) {
        setError(e.message);
      }
    };

    const fetchWorkouts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/workouts/all-Workouts');
        setWorkouts(response.data);
      } catch (e) {
        setError(e.message);
      }
    };

    fetchProfiles();
    fetchWorkouts();
  }, []);

  // Handle workout deletion
  const handleDeleteWorkout = async (workoutId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this workout?");
      if (!confirmDelete) return;

      await axios.delete(`http://localhost:8000/api/v1/workouts/delete-workout/${workoutId}`);
      setWorkouts(prev => prev.filter(w => w._id !== workoutId));
    } catch (error) {
      console.error("Error deleting workout:", error);
      alert("Failed to delete workout");
    }
  };

  // Show the add workout form for a selected user
  const handleAddWorkout = (userId) => {
    setSelectedUserId(userId);
    setIsAddingWorkout(true);
  };

  // Hide the add workout form and reset fields
  const handleCancelAddWorkout = () => {
    setIsAddingWorkout(false);
    setSelectedUserId(null);
    setNewWorkout({
      name: '',
      description: '',
      category: '',
      difficulty: '',
      duration: '',
      targetMuscles: '',
      equipment: '',
      exercises: '',
      link: ''
    });
  };

  // Handle input changes for the new workout form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorkout((prev) => ({ ...prev, [name]: value }));
  };

  // Submit the new workout data to the API
  const handleSubmitWorkout = async (e) => {
    e.preventDefault();
    if (!selectedUserId) {
      alert("User ID not selected");
      return;
    }
  
    try {
      const workoutData = {
        ...newWorkout,
        userId: selectedUserId,
        targetMuscles: newWorkout.targetMuscles.split(',').map(item => item.trim()),
        equipment: newWorkout.equipment.split(',').map(item => item.trim()),
        exercises: newWorkout.exercises.split(',').map(item => item.trim()),
      };
  
      const response = await axios.post('http://localhost:8000/api/v1/workouts/create-workout', workoutData);
      setWorkouts((prev) => [...prev, response.data]);
      handleCancelAddWorkout();
    } catch (err) {
      console.error("Failed to add workout:", err);
      alert("Error adding workout");
    }
  };
  

  // Edit workout (could be expanded with modal or routing logic)
  const handleEditWorkout = (workoutId) => {
    console.log(`Editing workout with ID: ${workoutId}`);
    // You can redirect or show a modal here.
  };

  return (
    <div className="container mx-auto py-12 px-4 ">
  <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin - Workout Management</h1>

  {/* Profile Selection */}
  <div className="mb-10">
    <h2 className="text-xl font-semibold mb-4 text-gray-700">Select a Profile:</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {profiles.map((profile) => (
        <div
          key={profile._id}
          className="p-4 border rounded-lg shadow hover:shadow-md transition"
        >
          <h3 className="text-lg font-medium text-gray-800 mb-2">{profile.username}</h3>
          <button
            onClick={() => handleAddWorkout(profile._id)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Add New Workout
          </button>
        </div>
      ))}
    </div>
  </div>

  {/* Add New Workout Form */}
  {isAddingWorkout && (
    <form
      onSubmit={handleSubmitWorkout}
      className="bg-gray-100 p-4 rounded mt-4 mb-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Workout</h2>
      <div className="grid grid-cols-2 gap-4">
        {[
          'name',
          'description',
          'category',
          'difficulty',
          'duration',
          'targetMuscles',
          'equipment',
          'exercises',
          'link',
        ].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={newWorkout[field]}
            onChange={handleInputChange}
            required={['name', 'description', 'category'].includes(field)}
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>
      <div className="mt-6 flex gap-4">
        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={handleCancelAddWorkout}
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  )}



      {/* Display List of Workouts */}
      <div className="bg-white shadow-md rounded-md overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              {['ID', 'Name', 'Description', 'Category', 'Difficulty', 'Duration', 'Target Muscles', 'Equipment', 'Exercises', 'Actions' , 'Date' , ' '].map(header => (
                <th key={header} className="px-5 py-3 border-b-2 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {workouts.map(workout => (
              <tr key={workout._id}>
                 <td className="px-5 py-5 border-b border-gray-200 text-sm">
                {
    profiles.find((user) => user._id === workout.userId)?.username || 'Unknown User'
  }
  </td>
                <td className="px-5 py-5 border-b border-gray-200">{workout.name}</td>
                <td className="px-5 py-5 border-b border-gray-200">{workout.description}</td>
                <td className="px-5 py-5 border-b border-gray-200">{workout.category}</td>
                <td className="px-5 py-5 border-b border-gray-200">{workout.difficulty}</td>
                <td className="px-5 py-5 border-b border-gray-200">{workout.duration}</td>
                <td className="px-5 py-5 border-b border-gray-200">{workout.targetMuscles}</td>
                <td className="px-5 py-5 border-b border-gray-200">{workout.equipment}</td>
                <td className="px-5 py-5 border-b border-gray-200">{workout.exercises}</td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>{workout.date ? format(new Date(workout.date), 'dd/MM/yyyy') : "No date "}</td>
                <td className="px-5 py-5 border-b border-gray-200 flex gap-2">
                  <button onClick={() => handleEditWorkout(workout._id)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                  <button onClick={() => handleDeleteWorkout(workout._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Back to Dashboard Button */}
      <div className="flex justify-center items-center mt-6">
        <a href="/admin/dashboard" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back to Dashboard
        </a>
      </div>
    </div>
  );
}

export default AdminWorkoutsPage;
