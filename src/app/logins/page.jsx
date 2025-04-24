'use client';

import { useState } from 'react';
import { FaGoogle, FaGithub, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { HiOutlineUser, HiOutlineLockClosed } from 'react-icons/hi';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Left side (Register section) */}
        <div className="bg-blue-400 text-white flex flex-col items-center justify-center p-8 md:w-1/2 rounded-b-full  lg:rounded-tl-full">   
          <h2 className="text-3xl font-bold mb-2">Hello, Welcome!</h2>
          <p className="mb-6">Don't have an account?</p>
          <button className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-blue-500 transition">
            Register
          </button>
        </div>

        {/* Right side (Login form) */}
        <div className="flex flex-col justify-center p-8 md:w-1/2 w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>

          {/* Username */}
          <div className="flex items-center bg-gray-100 rounded-md mb-4 px-3">
            <HiOutlineUser className="text-gray-500" />
            <input
              type="text"
              placeholder="Username"
              className="w-full bg-transparent px-2 py-3 outline-none"
            />
          </div>

          {/* Password */}
          <div className="flex items-center bg-gray-100 rounded-md mb-4 px-3">
            <HiOutlineLockClosed className="text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-transparent px-2 py-3 outline-none"
            />
          </div>

          <div className="text-right text-sm text-blue-600 mb-4 cursor-pointer hover:underline">
            Forgot password?
          </div>

          {/* Login Button */}
          <button className="bg-blue-400 text-white py-3 rounded-md hover:bg-blue-500 transition mb-4">
            Login
          </button>

          {/* Social login */}
          <p className="text-center text-gray-500 text-sm mb-3">or login with social platforms</p>
          <div className="flex justify-center gap-4">
            <SocialButton icon={<FaGoogle />} />
            <SocialButton icon={<FaGithub />} />
            <SocialButton icon={<FaFacebookF />} />
            <SocialButton icon={<FaLinkedinIn />} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialButton({ icon }) {
  return (
    <button className="w-10 h-10 flex items-center justify-center border rounded-full text-gray-600 hover:bg-gray-100 transition">
      {icon}
    </button>
  );
}
