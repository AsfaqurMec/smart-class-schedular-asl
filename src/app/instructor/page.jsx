"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import axios from 'axios';
const page = () => {

   const [mentor, setMentor] = useState([]);
   useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        ` https://schedular-asl.vercel.app/allMentor`
      )
      
      setMentor(data.service)
     
    }
    getData();
    
  }, [])


    return (
        <div className='relative'>
             {/* Our Instructors */}
            
             <div className='py-10'>
        <h1 className='text-center text-white text-5xl my-2 font-extrabold underline pb-10'>Our Instructors</h1>
             
        {mentor.length > 0 ? 
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center gap-5 px-5 py-5'>
              
              {mentor?.map(latest => (
                    <div key={latest._id} className='space-y-3 shadow-2xl p-3 rounded-md backdrop-blur-3xl bg-[#ffffff67] hover:animate-pulse' >
                           <img src={latest.image} alt='' className='rounded-md w-full'/>
                           <h1 className='text-2xl font-bold'>{latest.name}</h1>
                           
                           <h1 className='text-md font-bold'>{latest.discipline}</h1>
                          
                    </div>
                     ))}
                  
            </div> 
        
           :
          <h1 className="text-center text-2xl font-medium my-10">No Instructor</h1>
         }

                
            


        </div>
        </div>
    );
};

export default page;