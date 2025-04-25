/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client"
import Image from "next/image";
//import logo from '../../../public/Screenshot 2024-08-19 162502.png'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosSearch } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import logo from '../../public/asl-removebg-preview.png'
import { useUser } from "../../context/UserContext";
import { useSession } from "next-auth/react";
import axios from "axios";
import { MdCall } from "react-icons/md";
import AOS from "aos";
import 'aos/dist/aos.css';

const Navbar = () => {

  useEffect(() => {
    AOS.init({});
}, []);

  const drawerRef = useRef(null);

  const closeDrawer = () => {
    if (drawerRef.current) {
      drawerRef.current.checked = false;
    }
  };
  const  session  = useSession();
 //console.log(session);
 
  const { user } = useUser(); // Access user data from context


  const pathname = usePathname();
  const [search, setSearch] = useState('');
  const [text, setText] = useState('')
  const [items, setItems] = useState([]);

  const [toggle, setToggle] = useState(false);

   const handleToggle = () => {
          setToggle(true);
   }

   const handleToggles = () => {
    setToggle(false);
}

   const handle = () => {
    setItems([]);
    setSearch('');
  }

  const [latest, setLatest] = useState([]);
     
  const handleSearch = () => {
    setText(search);
}

const handleDelete = () => {
  setText();
}

useEffect(() => {
  const getData = async () => {
    const { data } = await axios.get(
      ` https://schedular-asl.vercel.app`
    )
    
    setLatest(data.service)
   // console.log(data);
   // console.log(latest);
  }
  getData();
  



}, [latest, session?.data?.user?.email, user?.email])

//console.log(latest);

  useEffect(() => {
    if (search) {
      
    
    const fetchData = async () => {
      try {
        const { data } = await axios.get(` https://electro-brown.vercel.app/search/api?search=${text}`);
        setItems(data);
       // console.log('dataaaas :',items.service);
        
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
      
    };
    fetchData();
  } else {
    setItems([]);
  }

  
  
  }, [items.service, text]);

  const Smartphone = 'Smartphone';
const Smartwatch = 'Smartwatch';
const Earbuds = 'Earbuds';
const Headphones = 'Headphones';

    return (
        <>
        
       {/* upper NAVBAR */}
       <div className="sticky top-0 z-10 shadow-sm backdrop-blur-xl ">
       <div  className="navbar shadow-sm bg-[#00000027] px-1 md:px-2 flex w-full">
               <div className="w-[50%] lg:w-[20%] ">

<div className="flex justify-start gap-1 items-center">

<div className="drawer flex lg:hidden justify-start p-0">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" ref={drawerRef} />
      <div className="drawer-content flex">
        {/* Page content here */}
        <label htmlFor="my-drawer-4" className="drawer-button btn p-0 bg-transparent border-none shadow-none text-slate-50 hover:bg-transparent text-2xl">
          <GiHamburgerMenu className="md:w-8 w-9 h-9 md:h-8 text-white mx-2" />
        </label>
        <Link href='/' className=" btn hover:bg-transparent border-none bg-transparent shadow-none text-black p-0 font-bold normal-case text-lg md:text-2xl lg:text-3xl" >
                        {/* <h1 className="lg:ml-5 ml-0">Exponential</h1> */}
                      <Image className="w-24 md:w-1 h-12 md:h-32 ml-0 lg:ml-10 rounded-sm" src={logo} alt="logo"></Image>
                      </Link>
      </div>
      <div className="drawer-side z-10 overflow-y-scroll">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu glass bg-[#012b3a] border-2 border-sky-100 text-base-content min-h-[150vh] w-64 md:w-80 pb-10 pt-1 px-1 z-10 space-y-1">
          {/* <li className="flex flex-row w-full justify-end">
            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay py-1 pl-[11px] w-9 rounded-full bg-[#000000] hover:bg-[#061245] text-white text-xl font-bold">
              X
            </label>
          </li> */}

           
          <Image className=" rounded-sm" src={logo} alt="logo"></Image>

          <Link href="/" onClick={closeDrawer}>
            <div className="collapse border-b-[2px] border-b-[#cfcfcf] hover:bg-[#dedddd]">
              <div className="collapse-title text-white hover:text-black  text-xl font-medium">
                <h1>Home</h1>
              </div>
            </div>
          </Link>

          <Link href="/courses" onClick={closeDrawer}>
            <div className="collapse border-b-[2px] border-b-[#cfcfcf] hover:bg-[#dedddd]">
              <div className="collapse-title text-white hover:text-black text-xl font-medium">
                <h1>Courses</h1>
              </div>
            </div>
          </Link>

          <Link href="/instructor" onClick={closeDrawer}>
            <div className="collapse border-b-[2px] border-b-[#cfcfcf] hover:bg-[#dedddd]">
              <div className="collapse-title text-white hover:text-black  text-xl font-medium">
                <h1>Instructors</h1>
              </div>
            </div>
          </Link>

          <Link href="/session" onClick={closeDrawer}>
            <div className="collapse border-b-[2px] border-b-[#cfcfcf] hover:bg-[#dedddd]">
              <div className="collapse-title text-white hover:text-black  text-xl font-medium">
                <h1>Upcoming Session</h1>
              </div>
            </div>
          </Link>
          
        </ul>
      </div>
    </div>


                   <Link href='/' data-aos="fade-down" data-aos-duration="2000" data-aos-delay="200" className="hidden lg:flex btn hover:bg-transparent border-none bg-transparent shadow-none text-black p-0 font-bold normal-case text-lg md:text-2xl lg:text-3xl" >
                        {/* <h1 className="lg:ml-5 ml-0">Exponential</h1> */}
                      <Image className="w-24 md:w-32 h-10 md:h-[55px] ml-0 lg:ml-10 rounded-sm" src={logo} alt="logo"></Image>
                      </Link>
                 </div>   

               </div>


               <div data-aos="fade-down" data-aos-duration="1000" data-aos-delay="300" className="w-[60%] lg:w-[90%] lg:flex hidden">
                   <ul className="menu-horizontal px-1 text-sm font-normal w-full">
                   <div className="flex w-full  items-center justify-center gap-8 text-lg font-semibold ml-16 text-white">
                
                      <Link data-aos="fade-down" data-aos-duration="2000" data-aos-delay="300" href={'/'}><h1>Home</h1></Link>
                      <Link data-aos="fade-down" data-aos-duration="2000" data-aos-delay="600" href={'/courses'}><h1>Courses</h1></Link>
                      <Link data-aos="fade-down" data-aos-duration="2000" data-aos-delay="900" href={'/instructor'}><h1>Instructor</h1></Link>
                      <Link data-aos="fade-down" data-aos-duration="2000" data-aos-delay="1200" href={'/session'}><h1>Upcoming Sessions</h1></Link>
        
                </div>
                   </ul>
               </div>



               <div className="flex w-[80%] lg:w-[30%] justify-en">
               
               <div className="w-full flex justify-end gap-2 items-center pr-1 md:pr-3 lg:pr-14">
          
        
                           <div data-aos="fade-down" data-aos-duration="2000" data-aos-delay="200" className="flex justify-end">
                            {
                               session?.data?.user? 
                          
                           <Link href='/account'>
                               {/* <button className="text-white text-white-sm bg-green-500 hover:bg-blue-500 text-white mr-2  text-white-ghost">Login</button> */}
                               <h1 className="flex gap-1 items-center uppercase font-medium"> <img className="w-9 md:w-8 rounded-full border-2 border-blue-300 shadow-2xl" src={session?.data?.user?.image } /> <span className="text-white text-base hover:text-black hover:shadow-lg md:flex hidden">{ session?.data?.user?.name}</span> </h1>
                           </Link>
                           :
                               <div className="flex gap-1 md:gap-2">
                               {/* <button className="text-white text-white-sm bg-green-500 hover:bg-blue-500 text-white mr-2  text-white-ghost">Login</button> */}
                               <h1 className="flex gap-1 items-center uppercase font-medium text-[8px] md:text-[14px]"> <span className="text-black  "><Link href='/login' className="text-[12px] md:text-[14px] hover:bg-white hover:text-red-700 hover:font-semibold btn text-white   bg-[#0c516f] md:bg-white">Login</Link></span> </h1>
                               <h1 className="flex gap-1 items-center uppercase font-medium"> <span className="text-black  "><Link href='/enroll' className="text-[12px] md:text-[14px] hover:text-white hover:bg-[#0c516f] hover:font-semibold btn text-black bg-white border-2 border-white">Sign Up</Link></span> </h1>
                               </div>
                            } 
                       </div>

        </div>
               

               </div>
           </div>
           </div>

       </>
    );
};

export default Navbar;