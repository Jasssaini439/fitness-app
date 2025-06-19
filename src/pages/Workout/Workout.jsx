import React from 'react'

const Workout = () => {
    const workoutData = [
        {
            id: 1,
            name: "Full Body Workout",
            duration: 45,
            calories: 300,
        },
        {
            id: 2,
            name: "Cardio Blast",
            duration: 30,
            calories: 250,
        },
        {
            id: 3,
            name: "Strength Training",
            duration: 60,
            calories: 400,
        },
    ];
  return (
    <>
        <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/background.jpg')" }}>
            <h1 className="text-5xl pt-7 pb-7 font-bold flex flex-col items-center text-white mb-6 transition duration-200 ease-in-out animate-pulse">YOUR WORKOUTS</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workoutData.map((workout) => (
                <div key={workout.id} className="bg-white/20 backdrop-blur-md rounded-xl p-6 shadow-lg transition-transform hover:scale-105 hover:shadow-xl">
                <h2 className="text-xl font-semibold text-white mb-4">{workout.name}</h2>
                <p className="text-white"><span className="font-medium">Duration:</span> {workout.duration} mins</p>
                <p className="text-white"><span className="font-medium">Calories Burned:</span> {workout.calories} kcal</p>
                </div>
            ))}
            </div>
        </div>
    </>
  )
}

export default Workout