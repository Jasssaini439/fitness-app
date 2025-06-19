import React, { useEffect, useState } from 'react';
import axios from 'axios';

  import {   Users,
    UserCheck,
    UserPlus,
    UserX,
    Clock,
   } from 'lucide-react'    
import CountUp from 'react-countup';
const Membercards = () => {

  // Fetch data from the API
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/v1/users/stats');
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return <div>Loading...</div>; // Show loading if stats not yet fetched
  }


  const memberStatsConfig = stats && [
    {
      head: 'total members',
      value: stats.total,
      icon: Users,
    },
    {
      head: 'active members',
      value: stats.active,
      icon: UserCheck,
    },
    {
      head: 'inactive members',
      value: stats.inactive,
      icon: UserX,
    },
    {
      head: 'new members',
      value: stats.newUsers,
      icon: UserPlus,
    },
    {
      head: 'members expired',
      value: stats.expired,
      icon: Clock,
    },
  ];




  return (
    <div><div className="flex flex-wrap justify-center  gap-4 ">

  {memberStatsConfig.map((item, index) => {
    const Icon = item.icon;
    return (
      <div
        key={index}
        className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105 max-w-xs w-full" 
      >
        <div className="mb-4 flex justify-center">
          <Icon size={48} className="text-green-400" />
        </div>
        <h3 className="text-xl font-semibold text-white text-center mb-1 uppercase">
          {item.head}
        </h3>
        <p className="text-white text-center text-2xl font-medium"> <CountUp end={item.value} duration={2} delay={0.8}/></p>
      </div>
    );
  })}
</div>



    </div>
  )
}

export default Membercards