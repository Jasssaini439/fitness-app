import React, { useState } from 'react';

function AddMealForm({ onAddMeal, onCancel }) {
  const [mealName, setMealName] = useState('');
  const [items, setItems] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fats, setFats] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    onAddMeal({
      name: mealName,
      items: items,
      calories: parseInt(calories, 10) || 0,
      protein: parseInt(protein, 10) || 0,
      carbs: parseInt(carbs, 10) || 0,
      fats: parseInt(fats, 10) || 0,

    });
    // Clear the form after submission
    setMealName('');
    setItems('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFats('');
    onCancel(); // Hide the form
    
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" onClick={onCancel}>
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Add New Meal</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="mealName" className="block text-gray-700 text-sm font-bold mb-2">Meal Name:</label>
            <input
              type="text"
              id="mealName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              required
            />
          </div>
          <div>
  <label htmlFor="items" className="block text-gray-700 text-sm font-bold mb-2">Items:</label>
  <input
    type="text"
    id="items"
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    value={items}
    onChange={(e) => setItems(e.target.value)}
    required
  />
</div>


          <div>
            <label htmlFor="calories" className="block text-gray-700 text-sm font-bold mb-2">Calories:</label>
            <input
              type="number"
              id="calories"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="protein" className="block text-gray-700 text-sm font-bold mb-2">Protein (grams):</label>
            <input
              type="number"
              id="protein"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="carbs" className="block text-gray-700 text-sm font-bold mb-2">Carbs (grams):</label>
            <input
              type="number"
              id="carbs"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={carbs}
              onChange={(e) => setCarbs(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="fats" className="block text-gray-700 text-sm font-bold mb-2">Fats (grams):</label>
            <input
              type="number"
              id="fats"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={fats}
              onChange={(e) => setFats(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Cancel
            </button>
            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Add Meal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMealForm;