/* eslint-disable react-hooks/rules-of-hooks */

"use client";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from 'react';
import { format, startOfWeek, endOfWeek, addDays, isAfter, isBefore, isSameDay } from 'date-fns';
import { useUser } from "../../../context/UserContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const Page = () => {
  const session = useSession();
  const { user } = useUser();
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const today = new Date();
    const weekStart = startOfWeek(today, { weekStartsOn: 0 }); // Sunday
    const weekEnd = endOfWeek(today, { weekStartsOn: 0 }); // Saturday
    const tempDates = [];
  
    for (let i = 0; i < 7; i++) {
      const current = addDays(weekStart, i);
  
      // Only include dates from today onward
      if (isBefore(current, today) && !isSameDay(current, today)) continue;
  
      tempDates.push(format(current, 'yyyy-MM-dd'));
    }
  
    setAvailableDates(tempDates);
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

    if (end - start < 5) {
      setError('Time difference must be at least 5 hours.');
      return;
    }

    const slot = {
      email: session?.data?.user?.email,
      day: selectedDate,
      startTime: startTime,
      endTime: endTime,
    };

    try {
      const res = await fetch('http://localhost:3000/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slot),
      });

      const data = await res.json();
      if (res.ok){
        toast.success("Availability saved successfully!")
      }
      // if(res.message == 'User Exists'){
      //   toast.error('You have already given your availiyy')
      // }
      
    } catch (err) {
      setError(err.message);
      toast.error(`Error: ${err.message}`)
    }
  };








  const router = useRouter();


  // State for managing modals
  const [showCodePopup, setShowCodePopup] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Function to generate a random 5-digit code
  const generateCode = () => Math.floor(10000 + Math.random() * 90000).toString();

  // Function to send the code via API
  const sendCodeToEmail = async () => {
    const code = generateCode();
    setGeneratedCode(code);

    try {
      const response = await fetch("http://localhost:3000/email/api/", {
        method: "POST",
        body: JSON.stringify({
          email: session?.data?.user?.email || user?.email,
          code,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success('OTP send to email successfully.')
        setShowCodePopup(true);
      } else {
        alert("Failed to send code. Try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  // Function to verify the entered code
  const verifyCode = () => {
    if (enteredCode === generatedCode) {
      setShowCodePopup(false);
      setShowPasswordPopup(true);
    } else {
      alert("Incorrect code. Try again.");
    }
  };

  // Function to update the password
  const updatePassword = async () => {
    try {
      const response = await fetch("http://localhost:3000/update/api/", {
        method: "POST",
        body: JSON.stringify({
          email: session?.data?.user?.email || user?.email,
          newPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Password updated successfully!");
        setShowPasswordPopup(false);
      } else {
        alert("Failed to update password.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };


  const [availability, setAvailability] = useState([]);
  const [selectedDay, setSelectedDay] = useState("Monday");
  // const [startTime, setStartTime] = useState(new Date());
  // const [endTime, setEndTime] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const handleTimeChange = (time) => {
    const formattedTime = time.toLocaleTimeString("en-US", {
      hour12: false, // 24-hour format
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    setStartTime(formattedTime);
  };


  const handleTimeChanges = (time) => {
    // const formattedTime = time.toLocaleTimeString("en-US", {
    //   hour12: false, // 24-hour format
    //   hour: "2-digit",
    //   minute: "2-digit",
    //   second: "2-digit",
    // });
    setEndTime(time);
  };

  const formatTime = (time) => {
    return time
      ? time.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : "";
  };

  const addAvailabilitySlot = () => {
    if (startTime >= endTime) {
      setMessage("End time must be later than start time.");
      return;
    }
    
    const newSlot = {
      day: selectedDay,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    };

    setAvailability([...availability, newSlot]);
    setMessage("");
  };

  const handleSubmits = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
     
    const newSlot = {
      email: session?.data?.user?.email || user?.email,
      day: selectedDay,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    };

    try {
      const res = await fetch("http://localhost:3000/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSlot),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Availability saved successfully!");
        setAvailability([]); // Reset availability after submission
        toast.success("Availability saved successfully!")
      } else {
        setMessage(`Error: ${data.error}`);
        toast.success(`Error: ${data.error}`)
      }
    } catch (error) {
      setMessage("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="flex  bg-gray-100 relative">
      {/* Sidebar */}
      <div className="w-36 md:w-64 bg-white shadow-lg p-2 md:p-6">
        <div className="text-xl font-bold mb-8">My Account</div>
        <ul>
          <li className="mb-4">
            <a href="" className="flex items-center text-orange-500 font-semibold">
              <span className="mr-2">&#128100;</span> Account Info
            </a>
          </li>
          {session?.data?.user?.role === "admin" && (
            <li className="mb-4">
              <Link href={"/dashboard"}>
                <button className="flex items-center text-gray-600 hover:text-orange-500">
                  <span className="mr-2">&#128682;</span> Dashboard
                </button>
              </Link>
            </li>
          )}
          {session?.data?.user?.role === "mentor" || "admin" && (
            <li className="mb-4">
              <Link href={"/schedule"}>
                <button className="flex items-center text-gray-600 hover:text-orange-500">
                  <span className="mr-2">&#128682;</span> Add Schedule
                </button>
              </Link>
            </li>
          )}
          {session?.data?.user?.role === "member" && (
          <li className="mb-4">
            <a href="/myclass" className="flex items-center text-gray-600 hover:text-orange-500">
              <span className="mr-2">&#128203;</span> My classes
            </a>
          </li>
          )}

          <li className="mb-4">
            <a href="/session" className="flex items-center text-gray-600 hover:text-orange-500">
              <span className="mr-2">&#128203;</span>Upcoming Session
            </a>
          </li>
          {session?.data?.user?.email || user?.email ? (
            <li onClick={() => signOut({ callbackUrl: "/" })}>
              <button className="flex items-center text-gray-600 hover:text-orange-500">
                <span className="mr-2">&#128682;</span> Logout
              </button>
            </li>
          ) : (
            <li>
              <Link href={"/login"}>
                <button className="flex items-center text-gray-600 hover:text-orange-500">
                  <span className="mr-2">&#128682;</span> Login
                </button>
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5 md:p-10">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">
            Hello{" "}
            <span className="text-xl font-medium text-orange-600">
              {session?.data?.user?.name || user?.name}
            </span>
          </h2>
        </div>

        {/* Account Details Form */}
        <div className="bg-white p-2 md:p-8 shadow-lg rounded-lg max-w-4xl">
          <h3 className="text-lg font-bold mb-4">Account Details</h3>

          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue={session?.data?.user?.name || user?.name}
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                  readOnly
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={session?.data?.user?.email || user?.email}
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                  disabled
                />
              </div>
            </div>

            {/* <button
              type="button"
              className="btn hover:bg-blue-300"
              onClick={sendCodeToEmail}
            >
              Change Password
            </button> */}
          </form>
        </div>
<div>
        {
      session?.data?.user?.role == 'member' || user?.role == 'member' ?


      <div className="w-full mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl space-y-4">
      <h2 className="text-xl font-semibold">Schedule a Future Time Slot</h2>

      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col lg:flex-row gap-3  lg:items-center">
        <div>
          <label className="block font-medium mb-1">Select a Date (This Week)</label>

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

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 text-lg rounded-md hover:bg-blue-700 transition w-28 h-11 lg:mt-4"
        >
          Submit
        </button>
      </form>
    </div>



//       <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-10 ">
//       <h2 className="text-2xl font-semibold mb-4">Set Your Availability</h2>
      
//       <div className="mb-4">
//         <label className="block text-sm font-medium">Select Day:</label>
//         <select
//           value={selectedDay}
//           onChange={(e) => setSelectedDay(e.target.value)}
//           className="w-full p-2 border rounded"
//         >
//           {daysOfWeek.map((day) => (
//             <option key={day} value={day}>{day}</option>
//           ))}
//         </select>
//       </div>

//       <div className="mb-4">
//         <label className="block text-sm font-medium">Start Time:</label>
//         <DatePicker
//   selected={startTime}
//   onChange={(time) => setStartTime(formatTime(time))}
//   showTimeSelect
//   showTimeSelectOnly
//   timeIntervals={30}
//   timeFormat="hh:mm aa"
//       dateFormat="hh:mm aa"
//   className="w-full p-2 border rounded"
// />
//       </div>

//       <div className="mb-4">
//         <label className="block text-sm font-medium">End Time:</label>
//         <DatePicker
//   selected={endTime}
//   onChange={(time) => setEndTime(formatTime(time))}
//   showTimeSelect
//   showTimeSelectOnly
//   timeIntervals={30}
//    timeFormat="hh:mm aa"
//       dateFormat="hh:mm aa"
//   className="w-full p-2 border rounded"
// />
// <input type="time" name="" id="" className="w-full p-2 border rounded" selected={endTime} onChange={handleTimeChanges()}/>
//       </div>

//        <button
//         type="button"
//         onClick={addAvailabilitySlot}
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Add Slot
//       </button>

//       <ul className="mt-4">
//         {availability.map((slot, index) => (
//           <li key={index} className="p-2 border-b">
//             {slot.day} - {new Date(slot.startTime).toLocaleTimeString()} to {new Date(slot.endTime).toLocaleTimeString()}
//           </li>
//         ))}
//       </ul>

//       <button
//         type="submit"
//         onClick={handleSubmit}
//         className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded"
//         disabled={loading}
//       >
//         {loading ? "Saving..." : "Save Availability"}
//       </button>

//       {message && <p className="mt-2 text-red-500">{message}</p>}
//     </div>
      : ''
   }
</div>

      </div>

      {/* Code Verification Popup */}
      {showCodePopup && (
        <div className="popup absolute space-y-4 my-44 ml-56 lg:ml-80 px-10 py-5 w-80 bg-blue-300 rounded-2xl shadow-2xl">
          <div className="flex justify-end">
            <h1 onClick={() => setShowCodePopup(false)} className="bg-black text-white px-2">X</h1>
          </div>
          <h3 className="text-center font-bold">Enter the code sent to your email</h3>
          <input type="text" className="border-2 rounded-lg py-1 w-full" onChange={(e) => setEnteredCode(e.target.value)} />
          <button className="btn hover:bg-blue-500" onClick={verifyCode}>Verify</button>
        </div>
      )}

      {/* New Password Popup */}
      {showPasswordPopup && (
        <div className="popup space-y-4 absolute my-44 ml-56 lg:ml-80 px-10 py-5 w-80 bg-blue-300 rounded-2xl shadow-2xl">
          <div className="flex justify-end">
            <h1 onClick={() => setShowPasswordPopup(false)} className="bg-black text-white px-2">X</h1>
          </div>
          <h3 className="text-center font-bold">Enter New Password</h3>
          <input type="password" className="border-2 rounded-lg py-1 w-full" onChange={(e) => setNewPassword(e.target.value)} />
          <button className="btn hover:bg-blue-500" onClick={updatePassword}>New Password</button>
        </div>
      )}
    </div>

</>
  );
};

export default Page;






// "use client"
// import { signOut, useSession } from 'next-auth/react';
// import React, { useState } from 'react';
// import { useUser } from '../../../context/UserContext';
//  // Import the useRouter hook
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';




// const page = () => {
//     const router = useRouter(); // Initialize the router
//     const  session  = useSession();
//    // console.log('session : ',session?.data?.user);
    
//     const { user } = useUser(); // Access user data from context
//  // console.log('USER : ',user);

//      // State to toggle edit mode
//   const [isEditable, setIsEditable] = useState(false);

//   // Function to toggle edit mode
//   const handleEditToggle = () => {
//     setIsEditable((prevState) => !prevState);
//   };

// const handleLogout = async () => {
//     try {
//       await signOut({ callbackUrl: '/' }); // Redirect to home page after sign out
//     } catch (error) {
//       console.error('Failed to sign out:', error);
//     }
//   };
    
//     return (
//         <div className="flex h-screen bg-gray-100">
//         {/* Sidebar */}
//         <div className="w-36 md:w-64 bg-white shadow-lg p-2 md:p-6">
//           <div className="text-xl font-bold mb-8">My Account</div>
//           <ul>
//             <li className="mb-4">
//               <a href="" className="flex items-center text-orange-500 font-semibold">
//                 <span className="mr-2">&#128100;</span> Account Info
//               </a>
//             </li>
//             {
//               session?.data?.user?.role === 'admin' ?  <li className="mb-4">
//              <Link href={'/dashboard'}> <button className="flex items-center text-gray-600 hover:text-orange-500">
//                  <span className="mr-2">&#128682;</span> Dashboard
//                </button></Link>
//              </li>
//              :
//              ""
//             }
//             <li className="mb-4">
//               <a href="/myclass" className="flex items-center text-gray-600 hover:text-orange-500">
//                 <span className="mr-2">&#128203;</span> My classes
//               </a>
//             </li>
            
//             {
//               session?.data?.user.email || user?.email ?  <li onClick={handleLogout}>
//               <button className="flex items-center text-gray-600 hover:text-orange-500">
//                  <span className="mr-2">&#128682;</span> Logout
//                </button>
//              </li>
//              :
//              <li>
//              <Link href={'/login'}><button className="flex items-center text-gray-600 hover:text-orange-500">
//              <span className="mr-2">&#128682;</span> Login
//            </button></Link>
//          </li>
            
//             }
//           </ul>
//         </div>
  
//         {/* Main Content */}
//         <div className="flex-1 p-5 md:p-10">
//           <div className="mb-8">
//             <h2 className="text-2xl font-semibold">Hello <span className='text-xl font-medium text-orange-600 '>{session?.data?.user.name || user?.name}</span></h2>
//           </div>
  
//           {/* Account Details Form */}
//           <div className="bg-white p-2 md:p-8 shadow-lg rounded-lg max-w-4xl">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-bold">Account Details</h3>
//               <button
//                 onClick={handleEditToggle}
//                 className="text-orange-500 hover:text-orange-600 flex items-center"
//               >
//                 <span className="mr-1">&#9998;</span> {isEditable ? 'Cancel' : 'Edit'}
//               </button>
//             </div>
  
//             <form>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
//                 {/* Full Name */}
//                 <div className="mb-4">
//                   <label className="block text-gray-600 mb-2">Full Name</label>
//                   <input
//                     type="text"
//                     defaultValue={session?.data?.user.name || user?.name}
//                     className={`w-full p-2 border border-gray-300 rounded ${isEditable ? 'bg-white' : 'bg-gray-100'}`}
//                     readOnly={!isEditable}
//                   />
//                 </div>
  
  
//                 {/* Email */}
//                 <div className="mb-4">
//                   <label className="block text-gray-600 mb-2">Email</label>
//                   <input
//                     type="email"
//                     defaultValue={session?.data?.user.email || user?.email}
//                     className={`w-full p-2 border border-gray-300 rounded ${isEditable ? 'bg-white' : 'bg-gray-100'}`}
//                     disabled
//                   />
//                 </div>
  
                
//               </div>
//               <button className='btn hover:bg-blue-300'>Change Password</button>
//               {isEditable && (
//                 <div className="mt-6">
//                   <button
//                     type="submit"
//                     className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
//                   >
//                     Save Changes
//                   </button>
//                 </div>
//               )}
//             </form>
//           </div>
//         </div>
//       </div>
//     );
// };

// export default page;