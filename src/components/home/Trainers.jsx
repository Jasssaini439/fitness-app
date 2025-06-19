import React from 'react';

const trainers = [
  {
    name: 'Ashley Cooper',
    role: 'Yoga Trainer',
    image: '/trainers/timg5.jpg',
  },
  {
    name: 'Wade Warren',
    role: 'Fit Trainer',
    image: '/trainers/timg6.jpg',
  },
  {
    name: 'Esther Howard',
    role: 'Bootcamp Trainer',
    image: '/trainers/timg7.jpg',
  },
];

const Trainers = () => {
  return (
    <section className="bg-black/35 text-white py-20 px-7">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-[6rem] font-black text-center text-stroke-yellow">Our Trainers</p>
        <h2 className="text-4xl md:text-6xl font-bold tracking-wide mb-12 text-[6rem] font-black text-center text-stroke-white ">
          MEET THE DEDICATED FITNESS EXPERTS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {trainers.map((trainer, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <img
                src={trainer.image}
                alt={trainer.name}
                className="w-full h-[450px] object-cover rounded-md shadow-md"
              />
              <h3 className="text-xl md:text-2xl font-semibold mt-4 tracking-wide">{trainer.name.toUpperCase()}</h3>
              <p className="text-gray-300 mt-1">{trainer.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trainers;
