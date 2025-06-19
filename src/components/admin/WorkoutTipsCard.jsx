import React from 'react';

const workoutTips = [
  "Warm up before exercising to prevent injury.",
  "Focus on compound movements for maximum results.",
  "Listen to your body – don't overstrain yourself.",
  "Vary your routine to avoid plateaus and boredom.",
  "Cool down after exercising to aid recovery and flexibility."
];

function WorkoutTipsCard() {
  return (
    <div className="my-card bg-white shadow-md rounded-md p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-2">Workout Tips</h2>
      <ul className="list-disc pl-5 text-gray-600">
        {workoutTips.map((tip, index) => (
          <li key={index} className="py-1">{tip}</li>
        ))}
      </ul>
      <p className="text-gray-500 mt-4 text-sm">Remember, consistency and proper technique are key to progress!</p>
    </div>
  );
}

export default WorkoutTipsCard;
