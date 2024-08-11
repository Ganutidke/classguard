import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <div className="shadow bg-gradient-to-r from-white to-pink-50  items-center">
      <navbar className="h-20 flex items-center  lg:pl-0 lg:max-w-6xl 2xl:border-b w-full  border-gray-300 mx-auto  my-auto">
        <header className="flex items-center h-full pt-4 justify-between   w-full">
          <div className="font-bold text-xl pl-3">
            <span className="text-[#6352FE] ">Class</span>Guard
          </div>
          <div className="hidden sm:flex pr-3">
            <ul className="font-medium text-sm flex items-center gap-4">
              <li>
                <Link href={"/"} className="border-b border-gray-800">
                  Home
                </Link>
              </li>
              <li>
                <Link href={"#upload"} className="text-gray-500">
                  Upload
                </Link>
              </li>
              <li>
                <Link href={"#about"} className="text-gray-500">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:hidden cursor-pointer pr-4">
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </div>
        </header>
      </navbar>
    </div>
  );
}

export default Navbar;
