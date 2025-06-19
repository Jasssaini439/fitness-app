import React from 'react';
import { Dumbbell, HeartPulse, Apple } from 'lucide-react'; // Optional: Replace with your icons or images

const services = [
  {
    icon: <Dumbbell className="w-10 h-10 text-green-500" />,
    title: 'Personal Training',
    description: 'Customized workout plans tailored to your fitness goals.',
  },
  {
    icon: <Apple className="w-10 h-10 text-yellow-500" />,
    title: 'Nutrition Coaching',
    description: 'Healthy eating strategies to support your lifestyle.',
  },
  {
    icon: <HeartPulse className="w-10 h-10 text-red-500" />,
    title: 'Health Monitoring',
    description: 'Track your progress with regular health check-ins.',
  },
  {
    icon: <Dumbbell className="w-10 h-10 text-blue-500" />,
    title: 'Group Classes',
    description: 'Join our community for fun and engaging workout sessions.',
  },
  {
    icon: <Apple className="w-10 h-10 text-orange-500" />,
    title: 'Meal Planning',
    description: 'Personalized meal plans to fuel your workouts.',
  },
  {
    icon: <HeartPulse className="w-10 h-10 text-purple-500" />,
    title: 'Wellness Workshops',
    description: 'Educational sessions on fitness, nutrition, and wellness.',
  },
 

  

];

const Services = () => {
  return (
    <section className="py-16 px-4 slide-up" style={{ animationDelay: '0.1s' }}>
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-5xl font-bold text-red-700 mb-4">Our Services</h2>
        <p className="text mb-12 text-white text-xl ">Explore what we offer to help you stay fit and healthy.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white/20 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300
              transform transition-transform duration-300 hover:scale-125
"
            >
              <div className="mb-4 flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
              <p className="text-white">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
