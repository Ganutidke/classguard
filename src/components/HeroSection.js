import Image from "next/image";
import React from "react";
import heroImage from "../../public/hero-image.svg";
import Link from "next/link";
// import heroBg from "../../public/hero-bg.svg";

const HeroSection = () => {
  return (
    <div className=" min-h-screen bg-gradient-to-r from-white to-pink-50  xl:bg-hero-pattern flex  items-center ">
      <div className="lg:max-w-6xl max-w-3xl mx-auto  flex-col lg:flex-row items-center xl:gap-5 justify-between px-4 py-16 flex">
        <div className="lg:w-1/2">
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
          <div className="mt-8 ">
            <Link href={"#upload"} className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition">
              Get Started
            </Link>
          </div>
        </div>
        <div className="flex justify-center lg:w-1/2 ">
          <Image src={heroImage} alt="Hero Image" width={420} height={100} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
