// import Image from "next/image";
// import React from "react";
// import heroImage from "../../public/hero-image.svg";
// import Link from "next/link";
// // import heroBg from "../../public/hero-bg.svg";

// const HeroSection = () => {
//   return (
//     <div className=" min-h-screen bg-gradient-to-r from-white to-pink-50 bg-cover bg-no-repeat xl:bg-hero-pattern flex  items-center ">
//       <div className="lg:max-w-6xl max-w-3xl mx-auto  flex-col lg:flex-row items-center xl:gap-5 justify-between px-4 py-16 flex">
//         <div className="lg:w-3/5">
//           <h1 className="lg:text-5xl text-4xl font-bold text-black">
//             Welcome to <span className="text-purple-600">ClassGuard</span>
//           </h1>
//           <p className="mt-4 text-sm lg:text-lg text-gray-700">
//             ClassGuard is your ultimate tool for managing student attendance.
//             Easily upload your Excel sheets to generate defaulter lists and
//             ensure your students meet their attendance requirements. Whether
//             you&#39;re an educator or an administrator, our tool streamlines the
//             process of tracking and improving student attendance.
//           </p>
//           <div className="mt-8 ">
//             <Link href={"#upload"} className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition">
//               Get Started
//             </Link>
//           </div>
//         </div>
//         <div className="hidden lg:flex justify-center  lg:w-2/5 ">
//           <Image src={heroImage} alt="Hero Image" width={500} height={150}  className="object-cover"/>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;



"use client"; // Add this line at the top

import Image from "next/image";
import React from "react";
import heroImage from "../../public/hero-image.svg";
import Link from "next/link";

const downloadFormat = () => {
  // URL to your downloadable file
  const fileUrl = "/sample_format.xlsx";
  
  // Create a link element and simulate a click to trigger the download
  const link = document.createElement('a');
  link.href = fileUrl;
  link.download = 'format-file.xlsx'; // The default name for the downloaded file
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const HeroSection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-pink-50 bg-cover bg-no-repeat xl:bg-hero-pattern flex items-center">
      <div className="lg:max-w-6xl max-w-3xl mx-auto flex-col lg:flex-row items-center xl:gap-5 justify-between px-4 py-16 flex">
        <div className="lg:w-3/5">
          <h1 className="lg:text-5xl text-4xl font-bold text-black">
            Welcome to <span className="text-purple-600">ClassGuard</span>
          </h1>
          <p className="mt-4 text-sm lg:text-lg text-gray-700">
            ClassGuard is your ultimate tool for managing student attendance.
            Easily upload your Excel sheets to generate defaulter lists and
            ensure your students meet their attendance requirements. Whether
            you&#39;re an educator or an administrator, our tool streamlines the
            process of tracking and improving student attendance.
          </p>
          <div className="mt-8 flex gap-4">
            <Link href={"#upload"} className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition">
              Get Started
            </Link>
            <button 
              onClick={downloadFormat} 
              className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 transition"
            >
              Download Format
            </button>
          </div>
        </div>
        <div className="hidden lg:flex justify-center lg:w-2/5">
          <Image src={heroImage} alt="Hero Image" width={500} height={150} className="object-cover"/>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
