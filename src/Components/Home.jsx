"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import axios from 'axios';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Autoplay, Pagination } from 'swiper/modules';

const Home = () => {

    const [latest, setLatest] = useState([]);
    const [mentor, setMentor] = useState([]);

    useEffect(() => {
        const getData = async () => {
          const { data } = await axios.get(
            ` http://localhost:3000/allCourse`
          )
          
          setLatest(data.service)
         
        }
        getData();
        
      
      
      
      }, [])

      useEffect(() => {
        const getData = async () => {
          const { data } = await axios.get(
            ` http://localhost:3000/allMentor`
          )
          
          setMentor(data.service)
         
        }
        getData();
        
      
      
      }, [])

    return (
        <>
        {/* Course Section */}
        <h1 className='text-4xl text-center font-extrabold my-10'>Our Courses</h1>

       {/* <div className='w-full glass mx-10'>
       <Swiper
       slidesPerView={3}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
      }}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >

       {latest.length > 0 ? 
         <>
         {latest?.map(latest => (
          <SwiperSlide key={latest._id} >
      <div key={latest._id} className='space-y-3 shadow-2xl p-3 rounded-md' >
         <img src={latest.image} alt='' className='rounded-md '/>
         <h1 className='text-2xl font-bold'>{latest.title}</h1>
         <button className="btn w-full bg-blue-300 rounded-lg hover:bg-blue-700 hover:text-white flex gap-2"><span>Enroll Now</span></button>
      </div>
      </SwiperSlide>
         ))}
       </>

:
<h1 className="text-center text-2xl font-medium my-10">No Courses</h1>
}




      </Swiper>

      </div> */}



        {latest.length > 0 ? 
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-5 mx-5 rounded-sm lg:mx-20 py-5 glass '>
              
              {latest?.map(latest => (
                    <div key={latest._id} className='space-y-3 shadow-2xl p-3 rounded-md' >
                           <img src={latest.image} alt='' className='rounded-md '/>
                           <h1 className='text-2xl font-bold'>{latest.title}</h1>
                           <button className="btn w-full bg-blue-300 rounded-lg hover:bg-blue-700 hover:text-white flex gap-2"><span>Enroll Now</span></button>
                    </div>
                     ))}
                  
            </div> 
            
           :
          <h1 className="text-center text-2xl font-medium my-10">No Courses</h1>
         }



        {/* Our Instructors */}

        <div className='py-10'>
        <h1 className='text-center text-4xl my-10 font-extrabold pb-10'>Our Instructors</h1>
             
        {mentor.length > 0 ? 
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-5 px-5 py-5 glass'>
              
              {mentor?.map(latest => (
                    <div key={latest._id} className='space-y-3 shadow-2xl p-3 rounded-md' >
                           <img src={latest.image} alt='' className='rounded-md '/>
                           <h1 className='text-center text-2xl font-bold'>{latest.name}</h1>
                           <h1 className='text-center text-2xl font-bold'>{latest.decipline}</h1>
                          
                    </div>
                     ))}
                  
            </div> 
        
           :
          <h1 className="text-center text-2xl font-medium my-10">No Instructor</h1>
         }

                
            


        </div>


        </>
    );
};

export default Home;