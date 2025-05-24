
'use client';
import Layout from '@/Components/Layout';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { CldUploadWidget } from "next-cloudinary";
import Image from 'next/image';
import axios from 'axios';


const page = () => {
  const [email, setEmail] = useState([]);
 const [latest, setLatest] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
const [imageUrl1, setImageUrl1] = useState('');
  const [product, setProduct] = useState({
    title: "",
    subject: "",
    image: "",
    mentor:"",
    
  });


  const handleDebug = () => {
   // console.log('Widget opened');
  };

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        ` https://schedular-asl.vercel.app/dashboard/users/api`
      )
      
      setLatest(data.service)
     
    }
    getData();
    
  
  }, [])

// const handleUploadComplete = (result) => {
//   if (result?.event === 'success') {
//     const uploadedUrl = result.info.secure_url;

//     if (!product.image1) {
//       setImageUrl(uploadedUrl);
//       setProduct((prev) => ({ ...prev, image1: uploadedUrl }));
//       toast.success('Image 1 uploaded successfully!');
//     } else if (!product.image2) {
//       setImageUrl1(uploadedUrl);
//       setProduct((prev) => ({ ...prev, image2: uploadedUrl }));
//       toast.success('Image 2 uploaded successfully!');
//     } else {
//       toast.error('Both image slots are already filled!');
//     }
//   } else {
//     toast.error('Image upload failed or canceled.');
//   }
// };

const handleUploadComplete = (result) => {
  if (result?.event === 'success') {
    const uploadedUrl = result.info.secure_url;
    toast.success('Cover Image uploaded successfully!');
    setProduct((prev) => {
      
      return { ...prev, image: uploadedUrl };
   
    });
  } else {
    toast.error('Image upload failed or canceled.');
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
   // console.log("Product Details:", product);

    const resp = await fetch('/dashboard/addProduct/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (resp.status === 200) {
      toast.success("Course Added Successfully");
      
     const data = {
        email: email,
        course: product
     }

      const resp = await fetch('/updateUser/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    
      setProduct((prev) => {
      
        return { ...prev, title: '', subject: '', image: '',mentor:'' };
      
      });

    } else {
      toast.error("Something went Wrong");
    }
  };

 // console.log('hhh', latest);
  
  return (
    <Layout>
      <h1 className="text-2xl md:text-5xl text-white font-bold text-center mb-20">Add New Course</h1>
      <form onSubmit={handleSubmit} action="" className="glass space-y-4 w-[90%] lg:w-[50%] mx-auto p-5 shadow-2xl shadow-blue-300 border-blue-300 border-2 rounded-md bg-[#aeaeaea2]">
        <div>
          <label htmlFor="title" className="block font-medium">Course Title</label>
          <input
            type="text"
            id="title"
            value={product.title}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label htmlFor="title" className="block font-medium">Class Topic</label>
          <input
            type="text"
            id="subject"
            value={product.subject}
            onChange={(e) => setProduct({ ...product, subject: e.target.value })}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
            <h1 className="text-xl font-bold mb-1">Add Mentor: </h1>
          <select
          value={product.mentor}
          onChange={(e) => {
            const selectedMentorName = e.target.value;
            const selectedMentor = latest.find(user => user.name === selectedMentorName);
            setEmail(selectedMentor?.email)
           setProduct({ ...product, mentor: e.target.value })}}
          className="w-full p-2 border rounded"
        >  
          <option>Enter Mentor</option>
          {latest.map((day) => (
            <option key={day._id} value={day.name}>{day.name}</option>
          ))}
        </select>
        </div>

        <div>
          <label htmlFor="image" className="block font-medium">Upload Cover Image</label>
          <CldUploadWidget 
       cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dzmglrehf"}
      uploadPreset="electro"
      onSuccess={(result) => handleUploadComplete(result)}
      onWidgetOpen={handleDebug}
      >
  {({ open }) => {
    return (
      <button  type="button" className='btn bg-blue-500 hover:bg-blue-900 rounded-md text-white' onClick={() => open()}>
        Upload Image
      </button>
    );
  }}
</CldUploadWidget>
 
 <div className='flex justify-start items-center gap-10'>        
{product.image && (
  <div className="flex gap-3 flex-col">
    <h2>Uploaded Cover Image:</h2>
    {/* <video src={product.video}  style={{ width: '500px', height:"300px" }} controls controlsList="nodownload">
       <source src={product.video} type="video/mp4"/>
    </video> */}
    <Image src={product.image} alt='image' width={100} height={70} ></Image>
  </div>
)}

</div>
        </div>

        <button 
          type="submit"
          className="btn bg-[#0c516f] hover:bg-[#1f2f36] text-white px-6 py-2 rounded w-full"
        >
          Create Course
        </button>
      </form>
      <Toaster />
    </Layout>
  );
};

export default page;
