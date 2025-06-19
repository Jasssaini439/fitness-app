import React from 'react'

const sleepTips = [
    "Stick to a consistent sleep schedule – go to bed and wake up at the same time every day.",
    "Create a relaxing bedtime routine to signal your body it's time to wind down.",
    "Avoid caffeine and heavy meals close to bedtime.",
    "Limit screen time at least 30 minutes before sleep.",
    "Make your sleep environment as comfortable as possible – dark, cool, and quiet."
  ];
const Sleeptipscards = () => {
  return (
    <div className="my-card bg-white shadow-md rounded-md p-6">
    <h2 className="text-xl font-semibold text-gray-700 mb-2">Sleep Tips</h2>
    <ul className="list-disc pl-5 text-gray-600">
      {sleepTips.map((tip, index) => (
        <li key={index} className="py-1">{tip}</li>
      ))}
    </ul>
    <p className="text-gray-500 mt-4 text-sm">A good night's sleep is essential for your overall health and well-being!</p>
  </div>
  
)
}

export default Sleeptipscards