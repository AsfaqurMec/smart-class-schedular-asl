"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
// import SocialSignin from "@/components/shared/SocialSignin";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "../../../context/UserContext";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";; // Import useRouter
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from "react-icons/fa6";
import { FaGoogle, FaGithub, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { HiOutlineUser, HiOutlineLockClosed } from 'react-icons/hi';
import { MdOutlineMailLock } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { CiUnlock } from "react-icons/ci";
const SignUpPage = () => {

  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [imagePath, setImagePath] = useState('');
  // Initialize the router
  const { user } = useUser(); // Access user data from context
  const { setUser } = useUser(); // Access setUser from context
  const router = useRouter(); // Initialize the router
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);

  const handleDebug = () => {
   // console.log('Widget opened');
  };


  const handleUploadComplete = (result) => {
    if (result?.event === 'success') {
      setImageUrl(result?.info.secure_url);
     // console.log('Upload successful:', result?.info);
    } else {
      console.error('Upload failed or canceled:', result);
    }
  };
  

  const handleFileChange = async (e) => {
    const file = e.target.files[0]; // Get the selected file directly
    if (!file) {
      setMessage('No file selected');
      return;
    }
  
    setImage(file); // Update state if you need it elsewhere
  
    const formData = new FormData();
    formData.append('image', file); // Use the file directly
  
    try {
      const res = await fetch(' https://schedular-asl.vercel.app/upload/api', {
        method: 'POST',
        body: formData, // Send the FormData directly
      });
  
      if (res.ok) {
        const data = await res.json();
        setMessage('Upload Successfully');
        setImagePath(data.filePath); 
        //console.log(imagePath);
        // Use the file path from the server response
      } else {
        const error = await res.json();
        console.error('Upload failed', error);
        setMessage('Upload failed');
      }
    } catch (err) {
      console.error('An error occurred during upload:', err);
      setMessage('Upload failed');
    }
  };



  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      toast.error('Passwords do not match');
      setError('Passwords do not match');
    } else {
      setError('');
    }
  };



  const handleSignUp = async (event) => {
    
    event.preventDefault();

    
    const newUser = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
      image: imageUrl,
      role:'member',
      course:[]

    };
    const resp = await fetch(" https://schedular-asl.vercel.app/enroll/api", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "content-type": "application/json",
      },
    });

    if (resp.status === 200) {
      setUser(newUser); // Save the user details in context
      toast.success("User Register Successfully");
      //console.log(newUser);
      setImageUrl(null);
      event.target.reset();

     // Redirect after 2 seconds
     setTimeout(() => {
      router.push("/login");
    }, 2000); // 2000 milliseconds = 2 seconds


    }else {
      toast.error("Something went Wrong");
    }
  };


  const handlePayment = async (event) => {


    const paynetData = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
      image: imageUrl
    };

    try {
      const { data } = await axios.post("https://schedular-asl.vercel.app/make-payment/api", paynetData);
      if (data.url) {
        router.push(data.url);
      }
    } catch (error) {
     // console.log(error);
      alert("Something went wrong");
    }
  }


//console.log(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);

  return (
    <div className="container  px-5 lg:px-24 mx-auto py-5">
      <div className="grid grid-cols-1 gap-12 items-center justify-center w-full">
       
        <div className="w-full lg:w-[70%] mx-0 lg:mx-auto border-2 backdrop-blur-3xl glass bg-[#d2d2d275] px-12 py-5 border-red-400 rounded-md">
          <h6 className="text-5xl font-semibold text-[#8d1e18] text-center mb-8">
            Sign Up
          </h6>


          <form onSubmit={handleSignUp} action="">

           <div className="mb-5 shadow-md shadow-red-400 p-5 glass rounded-sm">
      <h1 className="mb-3 font-semibold">Upload Profile Image</h1>
      <div className="flex justify-between">

    <CldUploadWidget 
       cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dzmglrehf"}
      uploadPreset="electro"
      onSuccess={(result) => handleUploadComplete(result)}
      onWidgetOpen={handleDebug}
      >
  {({ open }) => {
    return (
      <button className="border-2 border-black p-2 rounded-md hover:bg-blue-500 text-white bg-[#a7211abe]" onClick={() => open()}>
        Upload an Image
      </button>
    );
  }}
</CldUploadWidget>
         {imageUrl && (
        <div className="flex gap-3 flex-col">
          <h2>Uploaded Image:</h2>
          <img src={imageUrl} alt="Uploaded" style={{ width: '100px' }} />
          {/* <h1>{imageUrl}</h1> */}
        </div>
      )}






        {/* <input type="file" className="" onChange={handleFileChange} required />
        <img src={imagePath} alt="" className="w-20 h-18 rounded-md"/> */}
      </div>
      {/* {message && <p>{message}</p>} */}
      
    </div>                                                                                                          
            <div className="flex flex-col md:flex-row items-center gap-5 pt-5">
            <div className="w-full md:w-1/2 flex items-center glass rounded-md">
             <HiOutlineUser className="text-gray-500 text-2xl ml-2" />
            <input
              type="text"
              name="name"
              placeholder="your name"
              className="w-full px-3 py-2 focus:outline-none bg-transparent text-black text-lg "
               required />
            </div>
            
            <div className="w-full md:w-1/2 flex items-center glass rounded-md">
            <MdOutlineMailLock className="text-gray-500 text-2xl ml-2" />
            <input
              type="email"
              name="email"
              placeholder="your email"
              className="w-full px-3 py-2 focus:outline-none bg-transparent text-black text-lg "
               required />
            </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-5 mt-5 w-full">

            <div className="relative w-full md:w-1/2">
            <div className="w-full flex items-center glass rounded-md">
            <RiLockPasswordLine className="text-gray-500 text-2xl ml-2" />
            <input
               type={show ? "text" : "password"}
              name="password"
              placeholder="your password"
              onChange={handlePasswordChange}
              className="w-full px-3 py-2  rounded-md  focus:outline-none bg-transparent text-black text-lg "
              required />
              <span className="absolute top-4 right-2 cursor-pointer" onClick={()=> setShow(!show)}>
                                 {
                                        show ?  <FaEye className="w-6 h-5"></FaEye> : <FaEyeSlash className="w-6 h-5"></FaEyeSlash> 
                                 }
                                 </span>
               </div>
               </div>

               <div className="w-full md:w-1/2 flex items-center glass rounded-md">
               <CiUnlock className="text-gray-500 text-2xl ml-2" />
            <div className="relative w-full">
            <input
               type={show ? "text" : "password"}
              name="confirmPassword"
              placeholder="confirm password"
              id='confirmPassword'
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="w-full px-3 py-2 rounded-md focus:outline-none bg-transparent text-black text-lg"
              required />
              <span className="absolute top-4 right-2 cursor-pointer" onClick={()=> setShow(!show)}>
                                 {
                                        show ?  <FaEye className="w-6 h-5"></FaEye> : <FaEyeSlash className="w-6 h-5"></FaEyeSlash> 
                                 }
                                 </span>
               </div>
               </div>
               </div>
            <button
            disabled={password !== confirmPassword}
              type="submit"
              className="w-full btn btn-primary bg-[#9a4c2b] hover:bg-[#462828] mt-8 text-lg border-none"
            >
              Sign Up
            </button>
          </form>
          <div>

            {/* Social login */}
                                     <p className="text-center text-sm mb-3 mt-5">or signup with social platforms</p>
                                     <div className="flex justify-center gap-4">
                                       <SocialButton  icon={<FaGoogle />} />
                                       <SocialButton icon={<FaGithub />} />
                                       <SocialButton icon={<FaFacebookF />} />
                                       
                                     </div>
           
            <h6 className="mt-5 mb-5 text-center text-black">
              Already have an account ?{" "}
              <Link className="text-[#9e2b0e] font-semibold text-xl ml-2 underline" href={"/login"}>
                Login
              </Link>
            </h6>
          </div>
        </div>

       
      </div>
      <Toaster></Toaster>
    </div>
  );
};


function SocialButton({ icon }) {
  return (
    <button className="w-10 h-10 flex items-center justify-center border rounded-full hover:bg-blue-400 transition">
      {icon}
    </button>
  );
}

export default SignUpPage;