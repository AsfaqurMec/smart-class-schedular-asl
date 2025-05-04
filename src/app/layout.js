
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { UserProvider, useUser} from "../../context/UserContext";
import AuthProvider from "../../services/AuthProvider";
// import LowerNav from "@/Components/LowerNav";
import { Toaster } from "react-hot-toast";
import backup from '../../public/backup.png'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ASL",
  description: "A Smart Class Scheduling Website",
  icons: {
    icon: "/favicon.ico", // Add the path to your favicon file
  },
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en" data-theme="light">
    {/* Wrap the entire app with AuthProvider and UserProvider */}
    <AuthProvider>
      <UserProvider>

        <body className="antialiased background-image relative z-20">
        <div className="absolute top-0 left-0 w-full h-full object-cover bg-cover bg-center -z-0 bg-gradient-to-r from-[#48035c] via-[#022246] to-[#33036e] animate-gradient-diagonal" />
        <video src='/video.mp4'
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
              >
                <source src='/video.mp4' type="video/mp4" />
                
              </video>
          <Navbar />
          {children}
          <Toaster></Toaster>
            
          <div className="">
          
          </div>
          {/* <LowerNav></LowerNav> */}
          <Footer />
          
          
          
        </body>
        
      </UserProvider>
    </AuthProvider>
  </html>
  
  );
}
