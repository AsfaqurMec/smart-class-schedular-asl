/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import React from "react";



const page = ({ }) => {

    const session = useSession();

      // if (!session) return <p>Redirecting to login...</p>;
    const params = useParams();
  // const  services =await getServicesCategory(params.category);
  const [latest, setLatest] = useState([]);
   const [selectedDate, setSelectedDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
}, []);

const fetchUsers = async () => {
  try {
    const response = await axios.get("https://schedular-asl.vercel.app/getUpcomingSession/");
    if (response.data) {
      setLatest(response.data.service);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
//console.log(params);

  const data = latest.filter(item => item._id === params.id);
//console.log(data);

//console.log(selectedCourse);


 const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!selectedDate || !startTime || !endTime) {
      setError('All fields are required.');
      return;
    }

    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    const start = startHour + startMin / 60;
    const end = endHour + endMin / 60;

    if (end - start < 2) {
      setError('Time difference must be at least 2 hours.');
      return;
    }

    const slot = {
      email: session?.data?.user?.email,
      day: selectedDate,
      startTime: startTime,
      endTime: endTime,
      topic: data[0]?.topic,
      course: data[0]?.course,
    };
setLoading(true);
    try {
      const res = await fetch('https://schedular-asl.vercel.app/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slot),
      });
        
      const data = await res.json();
      if (res.ok) {
        toast.success("Schedule added successfully!");
       setLoading(false);
      }
    } catch (err) {
      setError(err.message);
      toast.error(`Error: ${err.message}`);
      setLoading(false);
    }
  };


  return (
    <>
    <h2 className="text-5xl font-semibold text-center mb-8 mt-10">Add Upcoming Schedule</h2>
    <div className=" flex flex-col items-center justify-center w-full">
      
      <div className="w-[90%] lg:w-1/2 mx-auto border-2 rounded-md shadow-2xl my-5 p-10 space-y-3 glass bg-[#ffffffa7]">
          <h1><span className="text-xl font-bold">Session Topic :</span> {data[0]?.topic}</h1>
          <h1><span className="text-xl font-bold">Session Course :</span> {data[0]?.course}</h1>
          
      </div>
      
      <div className="mb-10">
        <form onSubmit={handleSubmit} >
         <div className=" flex flex-col lg:flex-row gap-3 justify-center lg:items-center my-5">
          <div>
            <label className="block font-medium mb-1">Select a Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>


          <div>
            <label className="block font-medium mb-1">End Time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

</div>
{error && <p className="text-red-500">{error}</p>}
 <div className="w-full flex justify-center mt-5">
         <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 text-lg rounded-md hover:bg-blue-700 transition w-72 h-11 lg:mt-4"
          >
            {
                loading ? 'Loading...' : 'Add Schedule'
            }
            
          </button>
          </div>
  
        </form>
      </div>
    </div>
    </>
  );
};

export default page;
