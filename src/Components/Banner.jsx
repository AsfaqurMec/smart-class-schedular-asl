"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import 'aos/dist/aos.css';
import Link from 'next/link';
import AOS from 'aos';
import { useEffect } from 'react';
import banner from '../../public/banner-image.jpg';

const Banner = () => {
  useEffect(() => {
    AOS.init({});
  }, []);

  return (
    <>
      <div className="rounded-sm h-[70vh] md:min-h-screen">
        <div className="flex flex-col lg:flex-row gap-3">
          <Swiper
            autoplay={{
              delay: 5500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="mySwiper w-full lg:w-full rounded-md"
          >
            <SwiperSlide className=" w-full h-[70vh] md:min-h-screen overflow-hidden">
              

              {/* Overlay Content */}
              <div className="relative h-[70vh] md:min-h-screen z-20 w-full gap-5 md:gap-0 flex flex-col lg:flex-row justify-center items-center px-2 md:px-5 lg:px-10 pt-6 pb-14 lg:pb-36 bg-opacity-30">
                <div className="w-full lg:w-[100%] flex flex-col justify-center items-center space-y-2 md:space-y-3 py-10 md:py-0">
                  <h1
                    className="text-left text-blue-200 font-bold tracking-[.12em] text-[45px] md:text-9xl"
                    data-aos="fade-up"
                    data-aos-duration="2000"
                    data-aos-delay="200"
                  >
                    Smart Class
                  </h1>
                  <h1
                    className="text-left text-white font-medium tracking-[.12em] text-4xl md:text-8xl"
                    data-aos="fade-down"
                    data-aos-duration="2000"
                    data-aos-delay="400"
                  >
                    Scheduler.
                  </h1>
                  <h1
                    className="text-left text-white font-medium tracking-[.12em] text-lg md:text-4xl"
                    data-aos="fade-right"
                    data-aos-duration="2000"
                    data-aos-delay="600"
                  >
                    Alpha Science Lab
                  </h1>
                  <div className="flex gap-3 md:flex-row">
                    <Link
                      href="/"
                      data-aos="fade-up-right"
                      data-aos-duration="2000"
                      data-aos-delay="800"
                    >
                      <button className="btn bg-[#0c516f] hover:bg-white hover:text-black text-white px-4 md:px-8 text-lg md:text-2xl w-28 md:w-52">
                        Explore
                      </button>
                    </Link>
                    <Link
                      href="/enroll"
                      data-aos="fade-up-left"
                      data-aos-duration="2000"
                      data-aos-delay="1000"
                    >
                      <button className="btn bg-white hover:bg-blue-500 hover:text-white border-white text-black px-4 md:px-8 text-md md:text-xl w-28 md:w-52">
                        Enroll Now
                      </button>
                    </Link>
                  </div>
                </div>

                {/* <div className="w-full lg:w-[40%]">
                  <Image
                    src={banner}
                    alt="banner"
                    className="rounded-sm"
                    data-aos="zoom-in"
                    data-aos-duration="2000"
                    data-aos-delay="700"
                  />
                </div> */}
              </div>
            </SwiperSlide>
          </Swiper>
        </div>


       


      </div>
    </>
  );
};

export default Banner;




// /* eslint-disable @next/next/no-img-element */
// "use client"
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import { Autoplay} from 'swiper/modules';
// import banner from '../../public/banner-image.jpg';
// import Image from 'next/image';
// import 'aos/dist/aos.css';
// import Link from 'next/link';
// import AOS from 'aos';
// import { useEffect } from 'react';

// const Banner = () => {


//   useEffect(() => {
//     AOS.init({});
// }, []);

//     return (
//       <>
      

//         <div className='rounded-sm '>
//         <div className='flex flex-col lg:flex-row gap-3'>
//             <Swiper autoplay={{
//           delay: 5500,
//           disableOnInteraction: false,
//         }}  modules={[Autoplay]} className="mySwiper w-full lg:w-[100%] rounded-md">
//         <SwiperSlide className='rounded-sm w-full  bg-cover bg-center bg-no-repeat '>
           
//             <div className='w-full gap-5 md:gap-0 flex flex-col lg:flex-row justify-center items-center glass px-5 md:px-5 lg:px-10 pt-6 pb-14 lg:pb-36 '>
//           <div className='w-full lg:w-[60%] flex flex-col justify-center items-start space-y-2 md:space-y-3 py-10 md:py-0'>  
//             {/* <Image src={logo} alt='logo' className='lg:w-40 lg:h-40 w-24 h-24'></Image> */}
//             <h1 className='text-left  text-red-900 font-bold tracking-[.12em] text-6xl md:text-8xl' data-aos="fade-up" data-aos-duration="2000" data-aos-delay="200">Smart Class </h1>
//             <h1 className='text-left  text-white font-medium tracking-[.12em] text-5xl md:text-8xl' data-aos="fade-down" data-aos-duration="2000" data-aos-delay="400">Scheduler. </h1>
//             <h1 className='text-left  text-black font-medium tracking-[.12em] text-base md:text-2xl' data-aos="fade-right" data-aos-duration="2000" data-aos-delay="600">Alpha Science Lab </h1>
//             <div className='flex gap-3 md:flex-row'>
//             <Link href={'/'} data-aos="fade-up-right" data-aos-duration="2000" data-aos-delay="800"><button className='btn bg-red-400 hover:bg-white hover:text-black text-white px-4 md:px-8 text-lg md:text-2xl w-28 md:w-52'>Explore</button></Link>
//             <Link href={'/enroll'} data-aos="fade-up-left" data-aos-duration="2000" data-aos-delay="1000"><button className='btn bg-white hover:bg-blue-500 hover:text-white  border-white text-black px-4 md:px-8 text-md md:text-xl w-28 md:w-52'>Enroll Now</button></Link>
//             </div>
//             </div>

//             <div className='w-full lg:w-[40%]'>
//             <Image src={banner} alt='banner' className='rounded-sm' data-aos="zoom-in" data-aos-duration="2000" data-aos-delay="700"></Image>
//             </div>
//             </div>
//         </SwiperSlide>
        
        
        
//       </Swiper>

//       </div>
//     </div>

    
//         </>
//     );
// };

// export default Banner;