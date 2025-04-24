'use client';
import axios from 'axios';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Page = () => {
  const [latest, setLatest] = useState([]);

  useEffect(() => {
      const getData = async () => {
      const { data } = await axios.get(`https://schedular-asl.vercel.app/sessions/`);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const upcomingSessions = data.service
        .filter(session => {
          const sessionDate = new Date(session.day);
          sessionDate.setHours(0, 0, 0, 0);
          return sessionDate >= today;
        })
        .sort((a, b) => new Date(a.day) - new Date(b.day));

      setLatest(upcomingSessions);
    };

    getData();
  }, []);

  return (
    <div className="bg-[#F0F2FA] min-h-screen py-10 px-4 md:px-16">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">Our Upcoming Sessions</h1>

      {latest.length > 0 ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="space-y-4"
        >
          {latest.map((session) => (
            <motion.div
              key={session._id}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1, ease: 'easeOut' }}
              className="bg-white rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4
                         transition-all duration-500 ease-in-out
                         group hover:text-white
                         bg-gradient-to-r from-[#e01515a9] via-[#de472cde] to-[#ad270670]
                          animate-gradient-x"
            >
              <div className="flex items-center gap-4">
                <div className="text-center min-w-[80px] bg-[#ffffffdc] py-5 rounded-lg">
                  <p className="text-xs text-[#8f0a0a] font-semibold ">
                    {format(new Date(session.day), 'dd MMM')}
                  </p>
                  <p className="text-lg font-bold text-[#424141] ">
                  {format(new Date(`2000-01-01T${session.startTime}`), 'h:mm a')}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-white">
                    Topic: {session.topic}
                  </h3>
                  <p className="text-lg text-gray-900 group-hover:text-white">Course: {session.course}</p>
                  <p className="text-lg text-gray-900 group-hover:text-white">
                    Time: {format(new Date(`2000-01-01T${session.startTime}`), 'h:mm a')} -{' '}
                    {format(new Date(`2000-01-01T${session.endTime}`), 'h:mm a')}
                  </p>
                  <p className="text-lg text-gray-900 group-hover:text-white">
                    Date: {format(new Date(session.day), 'PPP')}
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="text-sm px-4 py-2 rounded-full font-medium text-gray-600 
                           bg-white bg-opacity-20 backdrop-blur-sm 
                           transition-all duration-300
                           group-hover:text-white group-hover:bg-white/30"
              >
                View Details
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <h1 className="text-center text-2xl font-medium my-10">No Upcoming Session</h1>
      )}
    </div>
  );
};

export default Page;




// 'use client';
// import axios from 'axios';
// import { format } from 'date-fns';
// import React, { useEffect, useState } from 'react';

// const Page = () => {
//   const [latest, setLatest] = useState([]);

//   useEffect(() => {
//     const getData = async () => {
//       const { data } = await axios.get(`http://localhost:3001/sessions/`);

//       const today = new Date();
//       today.setHours(0, 0, 0, 0);

//       const upcomingSessions = data.service
//         .filter(session => {
//           const sessionDate = new Date(session.day);
//           sessionDate.setHours(0, 0, 0, 0);
//           return sessionDate >= today;
//         })
//         .sort((a, b) => new Date(a.day) - new Date(b.day));

//       setLatest(upcomingSessions);
//     };

//     getData();
//   }, []);

//   return (
//     <div className="bg-[#F0F2FA] min-h-screen py-10 px-4 md:px-16">
//       <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">Our Upcoming Sessions</h1>

//       {latest.length > 0 ? (
//         <div className="space-y-4">
//           {latest.map((session) => (
//             <div
//               key={session._id}
//               className="bg-white rounded-2xl shadow-sm p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-transform duration-300 ease-in-out hover:shadow-md hover:scale-[1.01]"
//             >
//               {/* Left: Date + Time */}
//               <div className="flex items-center gap-4">
//                 <div className="text-center min-w-[80px]">
//                   <p className="text-xs text-gray-500 font-semibold">
//                     {format(new Date(session.day), 'dd MMM')}
//                   </p>
//                   <p className="text-xl font-bold text-[#4F46E5]">
//                   {format(new Date(`2000-01-01T${session.startTime}`), 'h:mm a')}
//                   </p>
//                 </div>

//                 {/* Details */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-1">Topic: {session.topic}</h3>
//                   <p className="text-sm text-gray-600">Course: {session.course}</p>
//                   <p className="text-sm text-gray-600">
//                     Time: {format(new Date(`2000-01-01T${session.startTime}`), 'h:mm a')} -{' '}
//                     {format(new Date(`2000-01-01T${session.endTime}`), 'h:mm a')}
//                   </p>
//                   <p className="text-sm text-gray-600">Date: {format(new Date(session.day), 'PPP')}</p>
//                 </div>
//               </div>

//               {/* Add to calendar button */}
//               <button className="text-sm px-4 py-2 rounded-full font-medium text-gray-600 hover:text-white hover:bg-[#4F46E5] transition-colors duration-300">
//                 + Add to calendar
//               </button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <h1 className="text-center text-2xl font-medium my-10">No Upcoming Session</h1>
//       )}
//     </div>
//   );
// };

// export default Page;





// 'use client'
// import axios from 'axios';
// import { format } from 'date-fns';

// import React, { useEffect, useState } from 'react';

// const page = () => {

//     const [latest, setLatest] = useState([]);
//     useEffect(() => {
//         const getData = async () => {
//           const { data } = await axios.get(
//             ` https://schedular-asl.vercel.app/sessions/`
//           )
          
//           const today = new Date();
//           today.setHours(0, 0, 0, 0); // normalize today's date to 00:00
      
//           const upcomingSessions = data.service
//       .filter(session => {
//         const sessionDate = new Date(session.day);
//         sessionDate.setHours(0, 0, 0, 0); // normalize session date
//         return sessionDate >= today;
//       })
//       .sort((a, b) => new Date(a.day) - new Date(b.day)); // sort by date ascending

//     setLatest(upcomingSessions);
//           // setLatest(data.service)
         
//         }
//         getData();
        
      
      
      
//       }, [])
    
//     return (
//         <div className='mx-3 my-10 glass bg-[#f9f9f98a] p-3 rounded-sm'>
//             <h1 className='text-center text-4xl font-semibold my-5'>Our Upcoming Sessions</h1>

//             <>

// {latest.length > 0 ? 
            
//             <div className='grid grid-cols-1 justify-center gap-5 px-5 py-5'>
              
//               {latest?.map(latest => (
//                     <div key={latest._id} className='space-y-3 shadow-2xl p-3 rounded-md backdrop-blur-3xl bg-[#ffffff67] flex flex-col justify-between border-2 border-[#a19f9f8f]' >
//                       <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-2 '>
                           
//                            <h1 className='text-md md:text-2xl font-semibold'>Topic : {latest?.topic}</h1>
//                            <h1 className='text-md md:text-2xl font-semibold'>Course : {latest?.course}</h1>
//                            <h1 className='text-md md:text-2xl font-semibold'>Date : {latest?.day}</h1>
//                            <h1 className='text-md md:text-2xl font-semibold'>Time : {format(new Date(`2000-01-01T${latest?.startTime}`), "h:mm a")} - {format(new Date(`2000-01-01T${latest?.endTime}`), "h:mm a")}</h1>
//                            </div>
                           
//                     </div>
                  
//                      ))}
                  
//             </div> 
        
//            :
//           <h1 className="text-center text-2xl font-medium my-10">No Upcoming Sesion</h1>
//          }

//         </>


//         </div>
//     );
// };

// export default page;