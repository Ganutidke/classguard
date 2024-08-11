import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-[#878787] py-6">
      <div className="max-w-screen-xl gap-4 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:justify-between items-center">
        <div>
          <p className="text-center  text-sm">
            © 2024 ClassGuard. All rights reserved.
          </p>
        </div>
        <div>
          <ul className="text-[#878787] flex gap-3 text-sm">
            <li>Contact</li>
            <li>Privacy</li>
            <li>Help</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
