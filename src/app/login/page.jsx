"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState }  from "react";
 import { signIn, useSession } from "next-auth/react";
 import { FaGoogle, FaGithub, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
 import { HiOutlineUser, HiOutlineLockClosed } from 'react-icons/hi';
import { useRouter } from "next/navigation";
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from "react-icons/fa6";


const Page = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const resp = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/",
    });
   // console.log(resp);
    
  };

  return (

    <div className="bg-gradient-to-r from-red-300 to-red-400 flex items-center justify-center bg-gray-100 px-4 py-10 lg:py-20">
      <div className="flex flex-col bg-none lg:flex-row w-full max-w-6xl rounded-xl  overflow-hidden gap-3">

                    {/* Left side (Register section) */}
        <div className="hidden lg:flex bg-gradient-to-r from-red-400 via-red-700 to-amber-800 text-white flex-col items-center justify-center p-8 md:w-1/2 rounded-b-full  lg:rounded-tl-full  banner2 h-72 md:h-auto">   
          {/* <h2 className="text-3xl font-bold mb-2">Welcome! To ASL</h2>
          <p className="mb-6">Don't have an account?</p>
          <Link href={"/enroll"}> <button className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-blue-500 transition">
            Register
          </button></Link> */}
        </div>
                      <div className="card flex-shrink-0 w-full lg:w-1/2 rounded-none glass bg-[#d2d2d275]">
                        
                        
                          <form  onSubmit={handleLogin} className="card-body gap-1">
                          <div className='w-full flex flex-col justify-center items-center gap-2'>
                          <h1 className='font-semibold text-teal-900 text-5xl'>Login</h1>
                          
                              </div> 

                  <div className="form-control mt-5">
                  <label className="text-xl text-[#d38303]" htmlFor="email">Email</label> <br />
                  <div className="flex items-center bg-gray-100 rounded-md mb-4 px-3 text-lg">
                  <HiOutlineUser className="text-gray-500" />  
               <input
                 type="text"
                 name="email"
                 placeholder="your email"
                 className="w-full bg-transparent px-2 py-3 outline-none"
               />
               </div>
               </div>
               <div className="form-control mt-0">
               <label className="text-[#d38303] text-xl" htmlFor="password">Password</label> <br />
               <div className="relative flex items-center bg-gray-100 rounded-md mb-4 px-3 text-lg">
               <HiOutlineLockClosed className="text-gray-500" />
               <div className="">
               <input
                 type={show ? "text" : "password"}
                 name="password"
                 placeholder="your password"
                 className="w-full bg-transparent px-2 py-3 outline-none"
               />
               <span className="absolute top-4 right-2 cursor-pointer" onClick={()=> setShow(!show)}>
                                                {
                                                       show ?  <FaEye className="w-6 h-5"></FaEye> : <FaEyeSlash className="w-6 h-5"></FaEyeSlash> 
                                                }
                                                </span>
                              </div>
               </div>
                </div>


               <div className="form-control mt-2 p-0">
               <button
                 type="submit"
                 className="w-full btn bg-red-800 text-white py-3 rounded-md hover:bg-red-900 transition mb-4"
               >
                 Sign In
               </button>

               {/* Social login */}
                         <p className="text-center text-white text-sm mb-3">or login with social platforms</p>
                         <div className="flex justify-center gap-4">
                           <SocialButton  icon={<FaGoogle />} />
                           <SocialButton icon={<FaGithub />} />
                           <SocialButton icon={<FaFacebookF />} />
                           <SocialButton icon={<FaLinkedinIn />} />
                         </div>
               </div>
    
                          </form>
                          <div className="flex justify-center gap-3 items-center pb-5">
                          <p className="">Don't have an account?</p>
                          <Link href={"/enroll"}> <button className=" px-4 py-1 rounded-lg hover:bg-white hover:text-blue-500 bg-blue-500 text-white">
                            Register
                          </button></Link>
                          </div>    
                      </div>
                  </div>
                  
              </div>

  );
};

function SocialButton({ icon }) {
  return (
    <button className="w-10 h-10 flex items-center justify-center border rounded-full text-white hover:bg-blue-500 transition">
      {icon}
    </button>
  );
}

export default Page;
