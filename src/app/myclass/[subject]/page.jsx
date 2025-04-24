/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
// 'use client';
// import { useEffect, useState } from "react";
// import { HiArrowCircleRight } from "react-icons/hi";
// import Link from "next/link";
// import axios from "axios";
// import { useSession } from 'next-auth/react';
// import { useUser } from '../../../../context/UserContext';
// import { useRouter } from 'next/navigation';
// import PreventScreenshot from "../../../Components/prevent";

// const Page = ({ params }) => {
//   const router = useRouter();
//   const session = useSession();
//   const { user } = useUser();

//   useEffect(() => {
//     if (!session?.data?.user || !user?.email) {
//       router.push("/login");
//     }
//   }, [session, router]);

//   const [latest, setLatest] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getData = async () => {
//       const { data } = await axios.get(`http://localhost:3000/myclass/api?subject=${params.subject}`);
//       setLatest(data.service);
//       setLoading(false);
//     };
//     getData();
//   }, [params.subject, session, user]);

//   useEffect(() => {
//     // Disable right-click
//     const handleContextMenu = (event) => event.preventDefault();
//     document.addEventListener("contextmenu", handleContextMenu);

//     // Disable F12, Ctrl+Shift+I, Ctrl+Shift+C, PrintScreen, etc.
//     const handleKeyDown = (event) => {
//       if (
//         event.key === "F12" ||
//         (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "C" || event.key === "J")) ||
//         event.key === "PrintScreen" ||
//         (event.ctrlKey && event.key === "p")
//       ) {
//         event.preventDefault();
//         alert("This action is not allowed.");
//       }
//     };
//     document.addEventListener("keydown", handleKeyDown);

//     return () => {
//       document.removeEventListener("contextmenu", handleContextMenu);
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//   useEffect(() => {
//     // Dynamic Watermark
//     const watermarkText = user?.email || "Protected Content";
//     document.body.style.backgroundImage = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><text x="50%" y="50%" font-size="24" fill="rgba(0,0,0,0.1)" transform="rotate(-45, 100, 100)" text-anchor="middle">${watermarkText}</text></svg>')`;

//     // Detect visibility change
//     const handleVisibilityChange = () => {
//       if (document.hidden) {
//         alert("Please do not take screenshots or switch tabs.");
//         const video = document.querySelector("video");
//         if (video) video.pause();
//       }
//     };
//     document.addEventListener("visibilitychange", handleVisibilityChange);

//     return () => {
//       document.body.style.backgroundImage = "";
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//     };
//   }, [user]);

//   if (!session) return <p>Redirecting to login...</p>;

//   return (
//     <div>
//       <section className="pt-2">
//         <h2 className="text-center font-semibold text-5xl mb-3">{params.category}</h2>
//         {loading ? (
//           <div className="loader w-28 h-28 mx-auto my-20"></div>
//         ) : (
//           <>
//             {latest.length > 0 ? (
//               <div className="flex flex-col lg:flex-row gap-5 px-5 py-5">
//                 <div className="w-full lg:w-[60%] relative">
//                   <div className="absolute inset-0 bg-transparent pointer-events-none"></div>
//                   <div className="flex gap-2 items-center pb-2">
//                     <HiArrowCircleRight className="w-10 h-10" />
//                     <h1 className="text-xl font-semibold">{latest[0]?.title}</h1>
//                   </div>
//                   <PreventScreenshot />
//                   <video src={latest[0]?.video} controls controlsList="nodownload" className="w-full">
//                     <source src={latest[0]?.video} type="video/mp4" />
//                   </video>
//                 </div>
//                 <div className="w-full lg:w-[30%] space-y-5 flex flex-col pt-5 lg:pt-14">
//                   <h1 className="text-xl font-semibold">Other Classes:</h1>
//                   {latest.map((item) => (
//                     <Link key={item._id} href={`/myclass/${item.subject}/${item._id}`}>
//                       <button className="btn w-full bg-blue-300 rounded-lg hover:bg-blue-700 hover:text-white">
//                         {item.title}
//                       </button>
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <h1 className="text-center text-2xl font-medium my-10">No Classes</h1>
//             )}
//           </>
//         )}
//       </section>
//     </div>
//   );
// };

// export default Page;




"use client"
import { use, useEffect, useState } from "react";
import { HiArrowCircleRight } from "react-icons/hi";
import Link from "next/link";
import axios from "axios";
import { useSession } from 'next-auth/react';
import { useUser } from '../../../../context/UserContext';
import { useParams, useRouter } from 'next/navigation';
import PreventScreenshot from "../../../Components/prevent";
import { FaVideo } from "react-icons/fa";

const page = ({ params }) => {

  const { subjects } = useParams();

//console.log('gg',subjects);


      const router = useRouter();
      const { data: session, status } = useSession();
      console.log(session);
   //console.log(session);
   
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
  // const  services =await getServicesCategory(params.category);
  const [latest, setLatest] = useState([]);
  // console.log('search = ',params.category);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        ` http://localhost:3000/myclass/api?subject=${params?.subject}`
      )

      setLatest(data.service)
      setLoading(false);
    }
    getData();

  }, [params?.subject]);

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
    // Dynamic Watermark
    const watermarkText = session?.data?.user?.email || user?.email || "Protected Content";
    document.body.style.backgroundImage = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><text x="50%" y="50%" font-size="24" fill="rgba(0,0,0,0.1)" transform="rotate(-45, 100, 100)" text-anchor="middle">${watermarkText}</text></svg>')`;


    // Detect visibility change
    // const handleVisibilityChange = () => {
    //   if (document.hidden) {
    //     alert("Please do not take screenshots or switch tabs.");
    //     const video = document.querySelector("video");
    //     if (video) video.pause();
    //   }
    // };
    // document.addEventListener("visibilitychange", handleVisibilityChange);

    // return () => {
    //   document.body.style.backgroundImage = "";
    //   document.removeEventListener("visibilitychange", handleVisibilityChange);
    // };
  }, [session?.data?.user?.email, user?.email]);

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

  if (status === "loading") {
    return <p className="text-current my-10 w-full font-semibold text-xl">Authenticating... Please Wait</p>; // Prevent rendering hooks while loading
  }

  return (
    <div>

      <section className='pt-2'>
        <h2 className='text-center font-semibold text-5xl mb-3'>{params.category}</h2>

        {loading ? (
          <div className="loader w-28 h-28 mx-auto my-20"> <h1 className="text-center text-2xl font-medium my-10">Loading.....</h1></div>
        ) :
        <>
        {latest.length > 0 ? 
            
          <div className='flex flex-col lg:flex-row gap-5 px-5 py-5'>
            <div className="w-full lg:w-[60%] relative">
               {/* Transparent Overlay */}
      <div className="absolute inset-0 bg-transparent pointer-events-none"></div>
                <div className="flex gap-2 items-center pb-2 ">
                <HiArrowCircleRight className="w-10 h-10"/>
                <h1 className="text-xl font-semibold">{latest[0]?.title}</h1>
                </div>
                <PreventScreenshot />
                <video src={latest[0]?.video} className="w-full" controls controlsList="nodownload">
                      <source src={latest[0]?.video} type="video/mp4"/>
                </video>
                </div>
                <div className="w-full lg:w-[30%] space-y-5 flex flex-col pt-5 lg:pt-14">
                    <h1 className="text-xl font-semibold">Other Classes :</h1>
                {latest?.map(latest => (
                    <Link key={latest._id} href={`/myclass/${latest?.subject}/${latest?._id}`}>
                          <button className="btn w-full bg-blue-300 rounded-lg hover:bg-blue-700 hover:text-white flex gap-2"><FaVideo /><span>{latest?.title}</span></button>
                    </Link>
                     ))}
                </div>
          </div> 
      
         :
        <h1 className="text-center text-2xl font-medium my-10">No Classes</h1>
       }
       </>
        }
      </section>

    </div>
  );
};

export default page;
