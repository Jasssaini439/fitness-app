import React, { useState } from "react";
import { toast } from "react-toastify";

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [bmi, setBmi] = useState("");

  const calculateBMI = (e) => {
    e.preventDefault();
  
    if (!height || !weight || !gender) {
      toast.error("Please enter valid height, weight and gender.");
      return;
    }
  
    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(bmiValue);
  
    if (bmiValue < 18.5) {
      toast.warning(
        "You are underweight. Consider seeking advice from a healthcare provider."
      );
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      toast.success("You have normal weight. Keep maintaining a healthy lifestyle.");
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      toast.warning("You are overweight. Consider seeking advice from a healthcare provider.");
    } else {
      toast.error("You are in the obese range. It is recommended to seek advice from a healthcare specialist.");
    }
  
    // ✅ Reset fields after submission
    setHeight("");
    setWeight("");
    setGender("");
  };
  

  return (
    <section className="relative flex flex-col items-center gap-8 py-[80px] px-4 bg-white/10 backdrop-blur-md">
    <h1 className="text-white text-3xl font-bold uppercase tracking-wider">
      BMI Calculator</h1>

  <div className="flex flex-col lg:flex-row gap-8 text-white w-full max-w-6xl">
    {/* Form Section - Smaller width & aligned left */}
    <div className="w-full lg:w-[30%]">
      <form
        onSubmit={calculateBMI}
        className="flex flex-col justify-center gap-8"
      >
        <div className="flex flex-col gap-2 text-[1.2rem] font-medium">
          <label>Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
            className="bg-transparent border-b border-white text-[1.2rem] p-2 text-[antiquewhite] focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-2 text-[1.2rem] font-medium">
          <label>Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
            className="bg-transparent border-b border-white text-[1.2rem] p-2 text-[antiquewhite] focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-2 text-[1.2rem] font-medium">
          <label>Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="bg-transparent border-b border-white text-[1.2rem] p-2 text-[antiquewhite] focus:outline-none"
          >
            <option value="" className="text-black">Select Gender</option>
            <option value="Male" className="text-black">Male</option>
            <option value="Female" className="text-black">Female</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-white text-blue-500 font-medium text-[1.2rem] px-6 py-2 rounded"
        >
          Calculate BMI
        </button>
      </form>
    </div>

    {/* Image Section - Right side */}
    <div className="w-full ml-12 lg:w-[55%]">
      <img
        src="./public/bmi.jpg"
        alt="BMI Illustration"
        className="w-full h-full object-cover rounded"
      />
    </div>
  </div>
</section>

  );
};

export default BMICalculator;
