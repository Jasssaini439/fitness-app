import React from 'react';
import { useNavigate } from 'react-router-dom';

const packages = [
  {
    title: 'QUARTERLY PACKAGE',
    price: 1800,
    duration: '3 Months',
    bgImage: '/bg1.jpg',
  },
  {
    title: 'HEAL-YEARLY PACKAGE',
    price: 3400,
    duration: '6 Months',
    bgImage: '/bg2.jpg',
  },
  {
    title: 'YEARLY PACKAGE',
    price: 6700,
    duration: '12 Months',
    bgImage: '/bg3.jpg',
  },
];

const features = [
  'Equipment',
  'All Day Free Training',
  'Free Restroom',
  '24/7 Skilled Support',
  '20 Days Freezing Option',
];

const PricingCards = () => {
  const navigate = useNavigate();

  const handlePayment = (pkg) => {
    localStorage.setItem('selectedPackage', JSON.stringify(pkg));
    navigate('/payment');
  };

  return (
    <div className="min-h-screen py-12 px-4 ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {packages.map((pkg, index) => (
          <div key={index} className="rounded-lg overflow-hidden shadow-lg">
            <div
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${pkg.bgImage})` }}
            >
              <div className="h-full w-full bg-black/60 flex flex-col justify-center items-center">
                <h3 className="text-blue-400 text-xl font-bold">{pkg.title}</h3>
                <p className="text-white text-2xl font-semibold">₹ {pkg.price}</p>
                <p className="text-gray-300">{pkg.duration}</p>
              </div>
            </div>
            <div className="bg-white p-6">
              <ul className="space-y-2 text-gray-800">
                {features.map((feat, i) => (
                  <li key={i}>✅ {feat}</li>
                ))}
              </ul>
              <button
                onClick={() => handlePayment(pkg)}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
              >
                Join Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingCards;
