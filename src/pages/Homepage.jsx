import React from 'react';
import { Link } from 'react-router-dom';
import '../components/HomePage.css';
import PricingCards from '../components/home/PricingCards';
import Contact from '../components/home/Contact';
import BMICalculator from '../components/home/BMICalculator';
import Services from '../components/home/Services';
import Trainers from '../components/home/Trainers';
import Gallery from '../components/home/Gallery';

function HomePage() {
  const user = null; // Replace with your actual user authentication logic



  return (
    <div className="min-h-screen bg-[url('./public/background.jpg')] bg-cover bg-center">
      <main className="container mx-auto py-12">
        <section className="hero text-center mb-10">
          <h1 className="text-6xl font-bold text-red-800 animate-fade-in text-[6rem] font-black text-center ">Welcome to <span className='text-green-400 text-[6rem] font-black text-center text-stroke-green'>FitLife</span></h1>
          <p className="text-xl  text-yellow-600 mb-8 mt-7 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            ⚡️Your journey to a <strong className="font-semibold text-red-800">healthier, stronger</strong> you starts here!⚡️
          </p>
          {!user ? (
            <Link to="/login" className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-full transition duration-200 ease-in-out animate-pulse">
              Get Started
            </Link>
          ) : (
            <Link to={user.isAdmin ? '/admin/dashboard' : '/user/dashboard'} className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition duration-200 ease-in-out animate-pulse">
              Go to Dashboard
            </Link>
          )}
        </section>



        <div className="flex flex-col md:flex-row justify-between items-center gap-8 px-4 py-12">
          <div className="md:w-1/2 animate-slide-in-left">
            <h2 className="text-5xl text-center font-bold text-green-600 mb-4">Our Mission</h2>
            <p className="text-white text-xl text-center">
              We help you stay fit and focused. Your journey to a healthier life starts here.
            </p>
          </div>

          <div className="md:w-1/2 animate-slide-in-right">
            <h2 className="text-5xl font-bold text-center text-yellow-500 mb-4">Our Vision</h2>
            <p className="text-white text-xl text-center">
              Empowering people to lead better lives with fitness, nutrition, and expert guidance.
            </p>
          </div>
        </div>







        <section>
          <Services />
        </section>



        <section>
          <Gallery />
        </section>




        <section className="my-12">

          <PricingCards />
          {/* Workout Summary Card */}
          {/* <WorkoutSummaryCard totalWorkouts={totalWorkouts} recentWorkouts={recentWorkouts} /> */}

          {/* Nutrition Summary Card */}
          {/* <NutritionSummaryCard totalFoodItems={totalFoodItems} recentMealLogs={recentMealLogs} /> */}

          {/* Health Tips Card */}
          {/* <HealthTipsCard /> */}
        </section>



        <section className="flex flex-col lg:flex-row items-start justify-center gap-8 px-4 py-12">

          <div className="w-full -mt-72 lg:w-2/3">
            <BMICalculator />
          </div>
          <div className="w-full  lg:w-1/3">
            <Contact />
          </div>
        </section>



        <section>
          <Trainers />
        </section>




      </main>

    </div>

  );
}

export default HomePage;