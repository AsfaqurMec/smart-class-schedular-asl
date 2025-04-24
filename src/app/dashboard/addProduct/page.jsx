/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
// 'use client'
// import Layout from '@/Components/Layout';
// import React, { useState } from 'react';
// import toast, { Toaster } from 'react-hot-toast';


// const page = () => {

//     const [product, setProduct] = useState({
//         title: "",
//         price: "",
//         category: "",
//         type: "",
//         ram: [],
//         rom: [],
//         colors: [],
//         image1: null,
//         image2: null,
//       });
//       const [ramInput, setRamInput] = useState("");
//       const [romInput, setRomInput] = useState("");
//       const [colorInput, setColorInput] = useState("");
    
//       const handleAddRam = () => {
//         if (ramInput.trim()) {
//           setProduct({ ...product, ram: [...product.ram, ramInput] });
//           setRamInput("");
//         }
//       };
    
//       const handleAddRom = () => {
//         if (romInput.trim()) {
//           setProduct({ ...product, rom: [...product.rom, romInput] });
//           setRomInput("");
//         }
//       };
    
//       const handleAddColor = () => {
//         if (colorInput.trim()) {
//           setProduct({ ...product, colors: [...product.colors, colorInput] });
//           setColorInput("");
//         }
//       };
    
//       const handleImageUpload = (e) => {
//         const file = e.target.files[0];
//         if (!file) return;
    
//         if (!product.image1) {
//           setProduct({ ...product, image1: file });
//         } else if (!product.image2) {
//           setProduct({ ...product, image2: file });
//         } else {
//           alert("You can only upload two images.");
//         }
//       };
    
//       const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log("Product Details:", product);
//         // Add your form submission logic here

//         const resp = await fetch(' https://electro-brown.vercel.app/dashboard/addProduct/api', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(product),
      
      
//           })
      
//           if (resp.status === 200) {
//             //alert('added');
//             toast.success("Product Added Successfully");
            
      
//           } else {
//             toast.error("Something went Wrong");
//           }
//       };

//     return (
//         <Layout>
//       <h1 className="text-2xl font-bold text-center mb-20">Add Product</h1>
//        <>
       
//        <form onSubmit={handleSubmit} className="space-y-4 mx-5 p-5 shadow-xl">
//       <div>
//         <label htmlFor="title" className="block font-medium">Title</label>
//         <input
//           type="text"
//           id="title"
//           value={product.title}
//           onChange={(e) => setProduct({ ...product, title: e.target.value })}
//           className="w-full border rounded p-2"
//         />
//       </div>

//       <div>
//         <label htmlFor="price" className="block font-medium">Price</label>
//         <input
//           type="number"
//           id="price"
//           value={product.price}
//           onChange={(e) => setProduct({ ...product, price: e.target.value })}
//           className="w-full border rounded p-2"
//         />
//       </div>

//       <div>
//         <label htmlFor="category" className="block font-medium">Category</label>
//         <select
//           id="category"
//           value={product.category}
//           onChange={(e) => setProduct({ ...product, category: e.target.value })}
//           className="w-full border rounded p-2"
//         >
//           <option value="">Select Category</option>
//           <option value="Smartphone">Smartphone</option>
//           <option value="Earbuds">Earbuds</option>
//           <option value="Headphone">Headphone</option>
//           <option value="Smartwatch">Smartwatch</option>
//         </select>
//       </div>

//       <div>
//         <label htmlFor="category" className="block font-medium">Type</label>
//         <select
//           id="type"
//           value={product.type}
//           onChange={(e) => setProduct({ ...product, type: e.target.value })}
//           className="w-full border rounded p-2"
//         >
//           <option value="">Select Type</option>
//           <option value="flagship">Flagship</option>
//           <option value="standard">Standard</option>
//           <option value="budget">Budget</option>
          
//         </select>
//       </div>

//       <div>
//         <label htmlFor="ram" className="block font-medium">Add RAM</label>
//         <div className="flex items-center gap-2">
//           <input
//             type="text"
//             id="ram"
//             value={ramInput}
//             onChange={(e) => setRamInput(e.target.value)}
//             className="border rounded p-2 flex-1"
//           />
//           <button
//             type="button"
//             onClick={handleAddRam}
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             Add
//           </button>
//         </div>
//         <p>RAMs: {product.ram.join(", ")}</p>
//       </div>

//       <div>
//         <label htmlFor="rom" className="block font-medium">Add ROM</label>
//         <div className="flex items-center gap-2">
//           <input
//             type="text"
//             id="rom"
//             value={romInput}
//             onChange={(e) => setRomInput(e.target.value)}
//             className="border rounded p-2 flex-1"
//           />
//           <button
//             type="button"
//             onClick={handleAddRom}
//             className="bg-green-500 text-white px-4 py-2 rounded"
//           >
//             Add
//           </button>
//         </div>
//         <p>ROMs: {product.rom.join(", ")}</p>
//       </div>

//       <div>
//         <label htmlFor="color" className="block font-medium">Add Color</label>
//         <div className="flex items-center gap-2">
//           <input
//             type="text"
//             id="color"
//             value={colorInput}
//             onChange={(e) => setColorInput(e.target.value)}
//             className="border rounded p-2 flex-1"
//           />
//           <button
//             type="button"
//             onClick={handleAddColor}
//             className="bg-purple-500 text-white px-4 py-2 rounded"
//           >
//             Add
//           </button>
//         </div>
//         <p>Colors: {product.colors.join(", ")}</p>
//       </div>

//       <div>
//         <label htmlFor="image" className="block font-medium">Upload Images</label>
//         <input
//           type="file"
//           id="image"
//           accept="image/*"
//           onChange={handleImageUpload}
//           className="w-full border rounded p-2"
//         />
//         <p>Image 1: {product.image1?.name || "No image uploaded"}</p>
//         <p>Image 2: {product.image2?.name || "No image uploaded"}</p>
//       </div>

//       <button
//         type="submit"
//         className="btn bg-teal-500 text-white px-6 py-2 rounded w-full"
//       >
//         Submit Product
//       </button>
//     </form>

//        </>
//        <Toaster></Toaster>
//     </Layout>
//     );
// };

// export default page;

'use client';
import Layout from '@/Components/Layout';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { CldUploadWidget } from "next-cloudinary";
import Image from 'next/image';
import axios from 'axios';


const page = () => {

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
    console.log('Widget opened');
  };

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        ` http://localhost:3000/dashboard/users/api`
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
      // Check if the first slot is empty
      // if (!prev.image) {
      //   toast.success('Cover Image uploaded successfully!');
      //   return { ...prev, image: uploadedUrl }; // Update image1
      // }
      // Check if the second slot is empty
    
    });
  } else {
    toast.error('Image upload failed or canceled.');
  }
};

  // const handleAddRam = () => {
  //   if (ramInput.trim()) {
  //     setProduct({ ...product, ram: [...product.ram, ramInput] });
  //     setRamInput("");
  //   }
  // };

  // const handleAddRom = () => {
  //   if (romInput.trim()) {
  //     setProduct({ ...product, rom: [...product.rom, romInput] });
  //     setRomInput("");
  //   }
  // };

  // const handleAddColor = () => {
  //   if (colorInput.trim()) {
  //     setProduct({ ...product, colors: [...product.colors, colorInput] });
  //     setColorInput("");
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
   // console.log("Product Details:", product);

    const resp = await fetch('http://localhost:3000/dashboard/addProduct/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (resp.status === 200) {
      toast.success("Course Added Successfully");
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
      <h1 className="text-2xl font-bold text-center mb-20">Add New Course</h1>
      <form onSubmit={handleSubmit} action="" className="space-y-4 w-[90%] lg:w-[50%] mx-auto p-5 shadow-2xl shadow-blue-300 border-blue-300 border-2 rounded-md">
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
          onChange={(e) => setProduct({ ...product, mentor: e.target.value })}
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
      <button  type="button" className='btn bg-blue-500 rounded-md text-white' onClick={() => open()}>
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
          className="btn bg-teal-500 text-white px-6 py-2 rounded w-full"
        >
          Create Course
        </button>
      </form>
      <Toaster />
    </Layout>
  );
};

export default page;
