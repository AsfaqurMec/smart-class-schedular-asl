"use client"
import React, { useEffect, useState } from 'react';
import course from '../../../public/course.png'
import Image from 'next/image';
import axios from 'axios';


const page = () => {

const [latest, setLatest] = useState([]);
    useEffect(() => {
        const getData = async () => {
          const { data } = await axios.get(
            ` https://schedular-asl.vercel.app/allCourse`
          )
          
          setLatest(data.service)
         
        }
        getData();
  
      }, [])

    return (
        <>
    <div className='min-h-[70vh] glass bg-[#012b3a]'>
{latest.length > 0 ? 
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center items-center gap-5 px-4 md:px-10 py-5 relative w-full h-full'>
              
              {latest?.map(latest => (
                    <div key={latest._id} className='space-y-3 shadow-2xl p-3 rounded-md backdrop-blur-3xl bg-[#ffffff67] flex flex-col justify-between hover:animate-pulse' >
                      <div>
                           <img src={latest.image} alt='' className='rounded-md'/>
                           <h1 className='text-2xl font-bold'>{latest.title}</h1>
                           
                           <h1 className='text-md font-semibold'>Mentor : {latest?.mentor}</h1>
                           </div>
                           <div>
                               <button className="btn w-full bg-blue-300 rounded-lg hover:bg-blue-700 hover:text-white flex gap-2"><span>Enroll Now</span></button>
                         </div>
                    </div>
                  
                     ))}
                  
            </div> 
        
           :
          <h1 className="text-center text-2xl font-medium my-10">No Courses</h1>
         }
</div>
        </>
    );
};

export default page;