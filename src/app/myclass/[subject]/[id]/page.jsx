/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { useEffect, useState } from "react";
import { HiArrowCircleRight } from "react-icons/hi";
import Link from "next/link";
import axios from "axios";
import { useParams } from "next/navigation";
import { useSession } from 'next-auth/react';
import { useUser } from '../../../../../context/UserContext';
import { useRouter } from 'next/navigation';
import { FaVideo } from "react-icons/fa";


const page = ({ }) => {

  useEffect(() => {
    // Disable right-click
    const handleContextMenu = (event) => event.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);

    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+C, etc.
    const handleKeyDown = (event) => {
      if (
        event.key === "F12" ||
        (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "C" || event.key === "J"))
      ) {
        event.preventDefault();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    // Detect Print Screen key and blur content
    const handlePrintScreen = (event) => {
      if (event.key === "PrintScreen") {
        document.body.style.filter = "blur(10px)";
        setTimeout(() => {
          document.body.style.filter = "none";
        }, 2000);
      }
    };

    document.addEventListener("keyup", handlePrintScreen);
    return () => {
      document.removeEventListener("keyup", handlePrintScreen);
    };
  }, []);

  useEffect(() => {
    // Hide content when the tab is inactive (for some screenshot tools)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.body.style.display = "none";
      } else {
        document.body.style.display = "block";
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    // Hide content when window loses focus (for mobile screenshots)
    const handleBlur = () => {
      document.body.style.opacity = "0"; // Hide content when tab is not active
    };

    const handleFocus = () => {
      document.body.style.opacity = "1"; // Show content when tab is active
    };

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  // useEffect(() => {
  //   const detectScreenshot = () => {
  //     if (document.hidden) {
  //       alert("Screenshot is not allowed!");
  //     }
  //   };

  //   document.addEventListener("visibilitychange", detectScreenshot);

  //   return () => {
  //     document.removeEventListener("visibilitychange", detectScreenshot);
  //   };
  // }, []);

      const router = useRouter();
      const { data: session, status } = useSession();
  // console.log(session);
       
    const { user } = useUser(); // Access user data from context

    useEffect(() => {
      if (status === "unauthenticated" && !session?.user?.email || user?.email) {
        router.push("/login"); // Redirect only if no user is found after loading
      } 
      if (status === "authenticated" && !session?.user?.email || user?.email) {
        router.push("/login"); // Redirect only if no user is found after loading
      }
    }, [session, status, router]);




    
      // if (!session) return <p>Redirecting to login...</p>;
    const params = useParams();
  // const  services =await getServicesCategory(params.category);
  const [latest, setLatest] = useState([]);
  // console.log('search = ',params.category);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        ` https://schedular-asl.vercel.app/myclass/api?subject=${params.subject}`
      )

      setLatest(data.service)
      setLoading(false);
    }
    getData();

  }, [params.subject]);

 // console.log(latest);
  

  const classes = latest.filter(item => item._id === params.id);
//  console.log(params.id);
  
//console.log(classes);

if (status === "loading") {
  return <p className="text-current my-10 w-full font-semibold text-xl">Authenticating... Please Wait</p>; // Prevent rendering hooks while loading
}


  return (
    <div>

      <section className='pt-2'>
        <h2 className='text-center font-semibold text-5xl mb-3'>{params.category}</h2>

        {loading ? (
          <div className="loader w-28 h-28 mx-auto my-20"><h1 className="text-center text-2xl font-medium my-10">Loading.....</h1></div>
        ) :

          <div className='flex flex-col lg:flex-row gap-5 px-5 py-3'>
            <div className="w-full lg:w-[60%]">
                <div className="flex gap-2 items-center pb-2 ">
                               <HiArrowCircleRight className="w-10 h-10"/>
                               <h1 className="text-xl font-semibold">{classes[0]?.title}</h1>
                               </div>
                <video src={classes[0].video} className="w-full rounded-md"  controls controlsList="nodownload">
                      <source src={classes[0].video} type="video/mp4"/>
                </video>
                </div>
                <div className="w-full lg:w-[30%] space-y-5 flex flex-col pt-5 lg:pt-14">
                <h1 className="text-xl font-semibold">Other Classes :</h1>
                {latest?.map(latest => (
                    <Link key={latest._id} href={`/myclass/${latest.subject}/${latest._id}`}>
                          <button className="btn w-full bg-blue-300 rounded-lg hover:bg-blue-700 hover:text-white flex gap-2"><FaVideo /><span>{latest?.title}</span></button>
                    </Link>
                     ))}
                </div>
          </div>
        }
      </section>

    </div>
  );
};

export default page;
