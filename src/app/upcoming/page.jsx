"use client";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useUser } from "../../../context/UserContext";
import toast from "react-hot-toast";
import axios from "axios";



const Page = () => {
  const session = useSession();
  const { user } = useUser();

  
  const [selectedDate, setSelectedDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [topic, setTopic] = useState('');
  const [course, setCourse] = useState('');
  const [error, setError] = useState('');
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get("http://localhost:3000/allCourse");
      setLatest(data.service);
    };
    getData();
  }, []);



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
      topic: topic,
      course: course,
    };

    try {
      const res = await fetch('/addUpcomingSchedule/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slot),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Upcoming Schedule added successfully!");
        fetchData(); // refresh list
      }
    } catch (err) {
      setError(err.message);
      toast.error(`Error: ${err.message}`);
    }
  };

  //console.log(session?.data?.user);
  

  return (
    <div className="p-6 w-full backdrop-blur-sm bg-[#ffffff96] relative">
      

      {/* Add Schedule Form */}
      <div className="w-full mx-auto mt-10 px-6 py-4 backdrop-blur-sm bg-[#ffffff96] border-2 shadow-lg rounded-2xl space-y-4 mb-10">
        <h2 className="text-5xl font-semibold text-center mb-8">Add Upcoming Schedule</h2>

        <form onSubmit={handleSubmit} className=" flex flex-col lg:flex-row gap-3 justify-center lg:items-center">
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

           
          <div >
            <label className="block font-medium mb-1">Topic</label>
            <input
              type="text"
              value={topic}
              placeholder="Enter topic"
              onChange={(e) => setTopic(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-black"
            />
          </div>

{
    session?.data?.user?.role === "mentor" ? 

     <div >
            <label className="block font-medium mb-1">Course</label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            >
              <option selected >Enter Course</option>
              <option value={session?.data?.user?.discipline}>{session?.data?.user?.discipline}</option>
             
            </select>
          </div>

            :
           
           <div >
            <label className="block font-medium mb-1">Course</label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            >
              <option>Enter Course</option>
              {latest.map((day) => (
                <option key={day._id} value={day.title}>{day.title}</option>
              ))}
            </select>
          </div>

}


  
        </form>
        <div className="w-full flex justify-center">
         <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 text-lg rounded-md hover:bg-blue-700 transition w-72 h-11 lg:mt-4"
          >
            Add Upcoming Schedule
          </button>
          </div>
           {error && <p className="text-red-500">{error}</p>}
      </div>

      
    </div>
  );
};

export default Page;