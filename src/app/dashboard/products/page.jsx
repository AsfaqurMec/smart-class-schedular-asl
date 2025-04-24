/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import Layout from '@/Components/Layout';
import React from 'react';
import withAuth from '../../../../middleware/withAuth';
import axios from 'axios';
import { useEffect, useState } from 'react';

const page = () => {


  const [latest, setLatest] = useState([]);
     
   
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        ` https://electro-brown.vercel.app/dashboard/products/api`
      )
      
      setLatest(data.service)
     
    }
    getData();
    
  
  
  
  }, [])


  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [itemsPerPage, setItemsPerPage] = useState(10); // Items per page
  const totalPages = Math.ceil(latest.length / itemsPerPage); // Total pages

  // Calculate the data to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = latest.slice(startIndex, endIndex);

  // Handle page navigation
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Handle change in items per page
  const handleItemsPerPageChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      setItemsPerPage(value);
      setCurrentPage(1); // Reset to the first page when items per page changes
    }
  };





    return (
        <Layout>
      <h1 className="text-2xl font-bold">Products</h1>
      <>

<div className="overflow-x-auto min-h-[46vh]">
    <table className="table rounded-none bg-[#c3b8cbc1]">
        {/* head */}
        <thead>
            <tr>
                
                <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">Image</th>
                <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">Title</th>
                <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">Stock</th>
                <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">Price</th>
                
                
                <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">Action</th>
               
            </tr>
      
      </thead>

        <tbody>
            {
             paginatedData.map(user => 
                <tr key={user?.image}>
                
                <td className="px-[5px] md:px-3 font-bold text-lg"><img className="w-12 h-12" src={user?.image1} alt="" /></td>
                <td className="px-[5px] md:px-3 font-bold text-lg">{user?.title}</td>
                <td className="px-[5px] md:px-3 font-bold text-lg">{user?.quantity}</td>
                <td className="px-[5px] md:px-3 font-bold text-lg">৳{user?.price}</td>
               
                
                
                <td className="flex  gap-2 flex-row">
                  <button className='btn-success bg-green-600 px-3 py-2 rounded-md text-white'>Edit</button>
                  <button className='btn-info bg-red-600 px-3 py-2 rounded-md text-white'>Delete</button>
                
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

    <div className='mt-5'> 

     {/* Input for items per page */}
     {/* <div className="mb-4 flex items-center gap-2">
        <label htmlFor="itemsPerPage" className="font-bold">
          Items per page:
        </label>
        <input
          id="itemsPerPage"
          type="number"
          min="1"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="border px-2 py-1 rounded"
        />
      </div> */}

      {/* Pagination Controls */}
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-blue-500 hover:bg-green-500 rounded ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-400"
          }`}
        >
          Previous
        </button>

        <span className="font-bold">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 bg-blue-500 hover:bg-green-500 rounded ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-400"
          }`}
        >
          Next
        </button>
      </div>

    </div>
</div>
</>
    </Layout>
    );
};

export default page;