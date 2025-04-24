"use client";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useUser } from "../../../context/UserContext";
import toast from "react-hot-toast";
import axios from "axios";


const ITEMS_PER_PAGE = 10;

const Page = () => {

    const session = useSession();
    const { user } = useUser();

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterDate, setFilterDate] = useState("");
  const [selectedDate, setSelectedDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [topic, setTopic] = useState('');
  const [course, setCourse] = useState('');
  const [error, setError] = useState('');

  const [latest, setLatest] = useState([]);
    useEffect(() => {
        const getData = async () => {
          const { data } = await axios.get(
            ` http://localhost:3000/allCourse`)
          
          setLatest(data.service)
         
        }
        getData();
    
      }, [])


  const fetchData = async (date = "") => {
    try {
      const url = date ? `http://localhost:3000/allSchedule?day=${date}` : "http://localhost:3000/allSchedule";
      const res = await fetch(url);

      const raw = await res.json();
      setData(raw.service || []);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchData();
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
      setError('Time difference must be at least 5 hours.');
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
      const res = await fetch('http://localhost:3000/addSchedule/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slot),
      });

      const data = await res.json();
      if (res.ok){
        toast.success("Schedule added successfully!")
         
      }
      // if(res.message == 'User Exists'){
      //   toast.error('You have already given your availiyy')
      // }
      
    } catch (err) {
      setError(err.message);
      toast.error(`Error: ${err.message}`)
    }
  };


  const handleFilterChange = (e) => {
    const selected = e.target.value;
    setFilterDate(selected);
    setCurrentPage(1);
    fetchData(selected);
  };

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const paginatedData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6 w-full backdrop-blur-sm bg-[#ffffff96] ">
      <h1 className="text-3xl font-bold mb-6">Mentor's Dashboard</h1>

      {/* Date Input */}
      <div className="w-full mx-auto mt-10 px-6 py-4 backdrop-blur-sm bg-[#ffffff96] border-2 shadow-lg rounded-2xl space-y-4 mb-10">
      <h2 className="text-5xl font-semibold text-center mb-8">Add Schedule</h2>

      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col lg:flex-row gap-3 justify-center lg:items-center">
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

        <div>
          <label className="block font-medium mb-1">Topic</label>
          <input
            type="text"
            value={topic}
            placeholder="Enter topic"
            onChange={(e) => setTopic(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-black"
          />
        </div>

        <div>
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
         {/* <input
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          /> */}
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 text-lg rounded-md hover:bg-blue-700 transition w-40 h-11 lg:mt-4"
        >
          Add Schedule
        </button>
      </form>
    </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-xl p-4">
        <div className="flex justify-between items-center">
        <h1 className=" text-lg">📋 Member Submissions</h1>
        <div className="mb-4 bg-[#e6cbac] p-3 rounded-sm border-2">
        <label className="text-xl font-medium mr-4">Select Date:</label>
        <input
          type="date"
          value={filterDate}
          onChange={handleFilterChange}
          className="border p-1 rounded bg-white"
        />
      </div>
      </div>
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Email</th>
              <th className="p-2">Day</th>
              <th className="p-2">Start</th>
              <th className="p-2">End</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((entry, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{entry.email}</td>
                <td className="p-2">{format(new Date(entry.day), "yyyy-MM-dd")}</td>
                <td className="p-2">
                  {format(new Date(`2000-01-01T${entry.startTime}`), "h:mm a")}
                </td>
                <td className="p-2">
                  {format(new Date(`2000-01-01T${entry.endTime}`), "h:mm a")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ⬅️ Prev
          </button>

          <div className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </div>

          <button
            className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next ➡️
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;




















// "use client";
// import React, { useEffect, useState } from 'react';
// import { getBestOverlappingTimeSlots } from '../../../lib/overlapLogic';
// import { format } from 'date-fns';

// const ITEMS_PER_PAGE = 10;

// const page = () => {
//   const [data, setData] = useState([]);
//   const [bestSlots, setBestSlots] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedDate, setSelectedDate] = useState('All');

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetch('http://localhost:3000/allSchedule/');
//       const raw = await res.json();
//       setData(raw.service);
//       const best = getBestOverlappingTimeSlots(raw.service);
//       setBestSlots(best);
//     };
//     fetchData();
//   }, []);

//   const uniqueDates = [...new Set(data.map((item) => item.day))];

//   const filteredData =
//     selectedDate === 'All'
//       ? data
//       : data.filter((item) => item.day === selectedDate);

//   const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
//   const paginatedData = filteredData.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   return (
//     <div className="p-6 w-full mx-auto">
//       <h1 className="text-3xl font-bold mb-6">Mentor Dashboard</h1>

//       {/* <div className="bg-white shadow rounded-xl p-4 mb-8">
//         <h2 className="text-xl font-semibold mb-4">📅 Best Overlapping Slots</h2>
//         {bestSlots.length > 0 ? (
//           <ul className="space-y-3">
//             {bestSlots.map((slot, index) => (
//               <li key={index} className="border p-4 rounded-xl bg-blue-50 flex gap-5">
//                 <p><strong>Day:</strong> {format(new Date(slot.day), 'EEEE, MMMM d')}</p>
//                 <p><strong>Time:</strong> {slot.start} - {slot.end}</p>
//                 <p><strong>Available Members:</strong> {slot.count}</p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No overlaps found.</p>
//         )}
//       </div> */}

//       {/* All Member Submissions with Filter + Pagination */}
//       <div className="bg-white shadow rounded-xl p-4">
//         <h2 className="text-xl font-semibold mb-4">📋 All Member Submissions</h2>

//         {/* Filter Dropdown + Clear Filter */}
//         <div className="mb-4 flex items-center gap-4">
//           <div>
//             <label className="text-sm font-medium mr-2">Filter by Date:</label>
//             <select
//               className="border p-1 rounded"
//               value={selectedDate}
//               onChange={(e) => {
//                 setSelectedDate(e.target.value);
//                 setCurrentPage(1);
//               }}
//             >
//               <option value="All">All</option>
//               {uniqueDates.map((day) => (
//                 <option key={day} value={day}>
//                   {format(new Date(day), 'EEEE, MMMM d')}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {selectedDate !== 'All' && (
//             <button
//               onClick={() => {
//                 setSelectedDate('All');
//                 setCurrentPage(1);
//               }}
//               className="text-sm px-3 py-1 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
//             >
//               Clear Filter
//             </button>
//           )}
//         </div>

//         <div className="overflow-x-auto">
//           <table className="table-auto w-full text-left border-collapse">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="p-2">Email</th>
//                 <th className="p-2">Day</th>
//                 <th className="p-2">Start</th>
//                 <th className="p-2">End</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedData.map((entry, i) => (
//                 <tr key={i} className="border-t">
//                   <td className="p-2">{entry.email}</td>
//                   <td className="p-2">{format(new Date(entry.day), 'yyyy-MM-dd')}</td>
//                   <td className="p-2">{entry.startTime}</td>
//                   <td className="p-2">{entry.endTime}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination Controls */}
//         <div className="flex justify-between items-center mt-4">
//           <button
//             className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//           >
//             ⬅️ Prev
//           </button>

//           <div className="text-sm text-gray-700">
//             Page {currentPage} of {totalPages}
//           </div>

//           <button
//             className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//           >
//             Next ➡️
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default page;




// "use client"
// import React from 'react';
// import { useEffect, useState } from 'react';
// import { getBestOverlappingTimeSlots } from '../../../lib/overlapLogic'; // We'll add this file
// import { format } from 'date-fns';

// const ITEMS_PER_PAGE = 5;

// const page = () => {

//         const [data, setData] = useState([]);
//   const [bestSlots, setBestSlots] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetch('http://localhost:3000/allSchedule/');
//       const raw = await res.json();
//       setData(raw.service);
//       const best = getBestOverlappingTimeSlots(raw.service);
//       setBestSlots(best);
//     };
//     fetchData();
//   }, []);


//   const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
//   const paginatedData = data.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   return (

//     <div className="p-6 max-w-4xl mx-auto">
//     <h1 className="text-3xl font-bold mb-6">Mentor Dashboard</h1>

//     <div className="bg-white shadow rounded-xl p-4 mb-8">
//       <h2 className="text-xl font-semibold mb-4">📅 Best Overlapping Slots</h2>
//       {bestSlots.length > 0 ? (
//         <ul className="space-y-3">
//           {bestSlots.map((slot, index) => (
//             <li key={index} className="border p-4 rounded-xl bg-blue-50">
//               <p><strong>Day:</strong> {format(new Date(slot.day), 'EEEE, MMMM d')}</p>
//               <p><strong>Time:</strong> {slot.start} - {slot.end}</p>
//               <p><strong>Available Members:</strong> {slot.count}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No overlaps found.</p>
//       )}
//     </div>

//     {/* All Member Submissions with Pagination */}
//     <div className="bg-white shadow rounded-xl p-4">
//       <h2 className="text-xl font-semibold mb-4">📋 All Member Submissions</h2>
//       <div className="overflow-x-auto">
//         <table className="table-auto w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-2">Email</th>
//               <th className="p-2">Day</th>
//               <th className="p-2">Start</th>
//               <th className="p-2">End</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.map((entry, i) => (
//               <tr key={i} className="border-t">
//                 <td className="p-2">{entry.email}</td>
//                 <td className="p-2">{format(new Date(entry.day), 'yyyy-MM-dd')}</td>
//                 <td className="p-2">{entry.startTime}</td>
//                 <td className="p-2">{entry.endTime}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex justify-between items-center mt-4">
//         <button
//           className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           ⬅️ Prev
//         </button>

//         <div className="text-sm text-gray-700">
//           Page {currentPage} of {totalPages}
//         </div>

//         <button
//           className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//         >
//           Next ➡️
//         </button>
//       </div>
//     </div>
//   </div>

//   );
// };


// export default page;