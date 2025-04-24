/* eslint-disable jsx-a11y/alt-text */
 
/* eslint-disable @next/next/no-img-element */
'use client';

import Link from "next/link";
import { useSession } from "next-auth/react";
import { FaCartArrowDown } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useUser } from "../../context/UserContext";
import { usePathname } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { FaShopify } from "react-icons/fa";

export default function SessionComponent() {
  const pathname = usePathname();
    const  session  = useSession();
     const { user } = useUser();
  return (
    <div className="w-[100%] mx-auto flex justify-around items-center lg:hidden bottom-0 bg-violet-200 fixed py-1 md:py-4 z-50">
      
      <Link href="/">
        <div className={pathname === "/" ? "bg-blue-400 flex flex-col items-center border py-2 px-4 rounded-md" : "flex flex-col items-center  py-2 px-4 rounded-md"}>
          <h1 className="indicator">
          <FaHome className="h-3 md:h-8 w-3 md:w-8" />
          </h1>
          <h3 className="font-bold text-[7px]">Home</h3>
        </div>
      </Link>
      
      <Link href="/shop">
        <div className={pathname === "/shop" ? "bg-blue-400 flex flex-col items-center border py-2 px-4 rounded-md" : "flex flex-col items-center  py-2 px-4 rounded-md"}>
          <h1 className="indicator">
          <FaShopify className="h-3 md:h-8 w-3 md:w-8" />
          </h1>
          <h3 className="font-bold text-[7px]">Courses</h3>
        </div>
      </Link>
      <Link href="/mycart">
        <div className={pathname === "/mycart" ? "bg-blue-400 flex flex-col items-center border py-2 px-4 rounded-md" : "flex flex-col items-center  py-2 px-4 rounded-md"}>
          <h1 className="indicator">
            <FaCartArrowDown className="h-3 md:h-8 w-3 md:w-8" />
          </h1>
          <h3 className="font-bold text-[7px]">Cart</h3>
        </div>
      </Link>
      { user || session?.data?.user ? (
        <Link href="/account">
          <div className={pathname === "/account" ? "bg-blue-400 flex flex-col items-center  py-2 px-4 rounded-md" : "flex flex-col items-center  py-2 px-4 rounded-md"}>
            <img className="w-3 h-3 rounded-full" src={user?.image ||session?.data?.user?.image } />
            <h3 className="font-bold text-[7px]">Account</h3>
          </div>
        </Link>
      ) : (
        <Link href="/login">
          <div className={pathname === "/account" ? "bg-blue-400 flex flex-col items-center border py-2 px-4 rounded-md" : "flex flex-col items-center  py-2 px-4 rounded-md"}>
            
            <img
              className="w-3 md:w-10 rounded-full"
              src="https://i.ibb.co/8mshvVT/666201.png"
              alt="Account"
            />
            <h3 className="font-bold text-[7px]">Account</h3>
          </div>
        </Link>
      )}
    </div>
  );
}
