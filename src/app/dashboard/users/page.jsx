/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
'use client'
import Layout from '@/Components/Layout';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const page = () => {


  const [latest, setLatest] = useState([]);
  const [showCodePopup, setShowCodePopup] = useState(false);
   
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        ` https://schedular-asl.vercel.app/dashboard/users/api`
      )
      
      setLatest(data.service)
     
    }
    getData();
    
  
  
  
  }, [])

  const popUp = async () => {
    setShowCodePopup(true);
  }


  return (
    <Layout>
    <div className='min-h-screen relative'>
    <>
<h1 className="text-center text-green-700 text-3xl font-semibold mb-6">All Users</h1>
<div className="overflow-x-auto min-h-[46vh]">
    <table className="table rounded-none bg-[#c3b8cbc1]">
        {/* head */}
        <thead>
            <tr>
                
                <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">user avator</th>
                <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">user email</th>
                <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">user name</th>
                <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">user role</th>
                
                
                <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">Action</th>
               
            </tr>
      
      </thead>

        <tbody>
            {
             latest.map(user => 
                <tr key={user?._id}>
                
                <td className="px-[5px] md:px-3 font-bold text-lg"><img className="w-12 h-12" src={user?.image} alt="" /></td>
                <td className="px-[5px] md:px-3 font-bold text-lg">{user?.email}</td>
                <td className="px-[5px] md:px-3 font-bold text-lg">{user.name}</td>
                <td className="px-[5px] md:px-3 font-bold text-lg">{user?.role}</td>
               
               
                
                
                <td className="flex  gap-2 flex-row">
                  <Link href={`/allUser/${user._id}`}>
                <button
                        className="btn md:mr-2 btn-primary">Edit</button></Link>
                 {/* { user.status == 'active' ?
                   
                   <button onClick={()=>handleBlock(user?._id)}
                        className="btn md:mr-2 btn-error">Block</button>
                
                 : "" }
                  
                  
                  { user.status == 'block' ?
                   
                   <button onClick={()=>handleActive(user?._id)}
                        className="btn md:mr-2 btn-success">Unblock</button>
                
                 : "" }
              
                 
              { user.role == 'customer' ?
                   <button onClick={()=>handleAdmin(user?._id)}
                        className="btn md:mr-2 btn-primary">Admin</button>
                : "" } */}

                </td>

            </tr>
              )
          }
        </tbody>  
    </table>
</div>
</>

      {/* Code Verification Popup */}
      {showCodePopup && (
        <div className='w-full flex justify-center absolute items-center'>
        <div className="popup space-y-4  px-10 py-5 w-80 bg-blue-300 rounded-2xl shadow-2xl">
          <div className="flex justify-end">
            <h1 onClick={() => setShowCodePopup(false)} className="bg-black text-white px-2">X</h1>
          </div>
          <h3 className="text-center font-bold">Enter the code sent to your email</h3>
          <input type="text" className="border-2 rounded-lg py-1 w-full" onChange={(e) => setEnteredCode(e.target.value)} />
          <button className="btn hover:bg-blue-500">Verify</button>
        </div>
        </div>
      )}



    </div>
    </Layout>
  );
};

export default page;