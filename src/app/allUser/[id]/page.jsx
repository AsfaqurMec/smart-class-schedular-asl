/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { useEffect, useState } from "react";

import Link from "next/link";
import axios from "axios";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";


const page = ({ }) => {


      // if (!session) return <p>Redirecting to login...</p>;
    const params = useParams();
  // const  services =await getServicesCategory(params.category);
  const [latest, setLatest] = useState([]);
  const [course, setCourse] = useState([]);
  // console.log('search = ',params.category);
  const [loading, setLoading] = useState(true);
const [selectedDay, setSelectedDay] = useState();
const [selectedCourse, setSelectedCourse] = useState('');
  const daysOfWeek = ["member", "mentor", "admin"];
  //console.log(params);
  
  useEffect(() => {
    fetchUsers();
    // const getData = async () => {
    //     try {
    //         const response = await axios.get("/allUser/api/");
    //         console.log("Full API Response:", response);
            
    //         if (response.data) {
    //             console.log("Data received:", response.data);
    //             setLatest(response.data.service); // Ensure `service` exists
    //         } else {
    //             console.error("No data received from API");
    //         }
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     }
    // };

    // getData();
}, []);

const fetchUsers = async () => {
  try {
    const response = await axios.get("https://schedular-asl.vercel.app/allUser/api/");
    if (response.data) {
      setLatest(response.data.service);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

useEffect(() => {
  const getData = async () => {
    const { data } = await axios.get(
      ` https://schedular-asl.vercel.app/allCourse`
    )
    
    setCourse(data.service)
   
  }
  getData();
  



}, [])

const roleChange = async () => {

  try {
    if(selectedDay === 'member' || 'admin'){
       setSelectedCourse('None');
    }
    const response = await fetch("/update/api/", {
      method: "POST",
      body: JSON.stringify({
        email: classes[0]?.email,
        selectedDay, selectedCourse,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      toast.success("User Role updated successfully!");
      await fetchUsers();
    } else {
      alert("Failed to update user role.");
    }
  } catch (error) {
    console.error("Error updating user role:", error);
  }
};


  const classes = latest.filter(item => item._id === params.id);

//console.log(selectedCourse);


  return (
    <div className=" flex justify-center w-full">

      <div className="w-[90%] lg:w-1/2 mx-auto border-2 rounded-md shadow-2xl my-5 p-10 space-y-3 glass bg-[#ffffffa7]">
          <h1><span className="text-xl font-bold">User Email :</span> {classes[0]?.email}</h1>
          <h1><span className="text-xl font-bold">User Name :</span> {classes[0]?.name}</h1>
          <h1><span className="text-xl font-bold">User Role :</span> {classes[0]?.role}</h1>

          {classes[0]?.discipline ? <h1><span className="text-xl font-bold">User Discipline :</span> {classes[0]?.discipline}</h1> : '' }
          
          <div>
            <h1 className="text-xl font-bold mb-1">Change Role : </h1>
          <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option>Enter Role</option>
          {daysOfWeek.map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
        </div>

        {
          selectedDay  === 'mentor' ? 

          <div>
            <h1 className="text-xl font-bold mb-1">Add Descipline: </h1>
          <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="w-full p-2 border rounded"
        >  
          <option>Enter Discipline</option>
          {course.map((day) => (
            <option key={day._id} value={day.subject}>{day.subject}</option>
          ))}
        </select>
        </div>
        : ''
        }
          <button onClick={roleChange} className="btn w-full bg-red-400 hover:bg-red-500 hover:text-white">Change Role</button>
      </div>
      
    </div>
  );
};

export default page;
