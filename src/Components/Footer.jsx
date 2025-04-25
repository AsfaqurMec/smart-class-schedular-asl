import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { MdAddCall } from "react-icons/md";
import { MdMarkEmailRead } from "react-icons/md";

import logo from '../../public/asl-removebg-preview.png';

const Footer = () => {

 
  

    return (
        <div className=' bg-[#0b0719] px-5 relative'>
       
           <footer className="w-full px-5 md:px-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-2 grid  bg-[#0c0a1b]  text-white py-10 border-t-[.5px] border-t-gray-600">
  
  <nav className='space-y-2'>
  {/* <Image className='w-12 h-12' src={logo1} alt='photo'></Image> */}
  <Image className="w-36 md:w-32 h-20 md:h-16 ml-0  rounded-sm" src={logo} alt="logo"></Image>
  <p>A smart class scheduling website.</p>
  <p className='flex items-center'><span className='mr-2'><MdAddCall /></span>01572908354</p>
  </nav>                                                                                        
  

  <nav className='space-y-3 flex flex-col pl-0 md:pl-20'>
    <h6 className="footer-title text-xl mb-3 text-[#5e8cf8] opacity-100">Online Platform</h6>
    <Link href={'/'}><h2 className="link link-hover text-base font-semibold">About</h2></Link>
    <Link href={'/'}><h2 className="link link-hover text-base font-semibold">Course</h2></Link>
    <Link href={'/'}><h2 className="link link-hover text-base font-semibold">Instructor</h2></Link>
    <Link href={'/'}><h2 className="link link-hover text-base font-semibold">Events</h2></Link>

  </nav>

  <nav className='space-y-3 flex flex-col pl-0 md:pl-20'>
    <h6 className="footer-title text-xl mb-3 text-[#5e8cf8] opacity-100">Links</h6>
    <Link href={'/'}><h2 className="link link-hover text-base font-semibold">Contact Us</h2></Link>
    <Link href={'/'}><h2 className="link link-hover text-base font-semibold">Gallery</h2></Link>
    <Link href={'/'}><h2 className="link link-hover text-base font-semibold">Coming Soon</h2></Link>
    <Link href={'/'}><h2 className="link link-hover text-base font-semibold">Sign In</h2></Link>

  </nav>

  <nav className='space-y-3'>
    <h6 className="footer-title text-xl mb-3 text-[#5e8cf8] opacity-100">CONTACT US</h6>
    
     <div className='space-y-3'>
      <p className='flex items-center'><span className='mr-2'><MdAddCall /></span>01956230265</p>
      <p className='flex items-center'><span className='mr-2'><MdAddCall /></span>01572908354</p>
          <p className='font-medium text-lg text-[#ffffff] flex items-center'><span className='mr-2'><MdMarkEmailRead /></span> <span className='mr-2 text-blue-500'></span></p>
     </div>
    
  </nav>

</footer> 
<footer className="w-full flex justify-center mx-auto bg-[#0c0a1b]  text-white py-5 px-5 border-t-[.5px] border-t-gray-600">
  
  
  <p className='text-xl mb-0 '>Copyright © {new Date().getFullYear()} - by <strong className='text-[#5e8cf8]'>ASL</strong>. All right reserved</p>
   
 
  
</footer>


        </div>
    );
};
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
export default Footer;