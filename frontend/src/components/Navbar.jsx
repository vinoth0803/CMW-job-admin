import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import { menuOutline, closeOutline } from "ionicons/icons";

const Navbar = ({ onCreateJobClick }) => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state

  return (
    <nav className="bg-[#FCFCFC] shadow-xs rounded-full px-4 py-3 -z-20  w-10/12 justify-between mx-auto mt-4">
      <div className="container mx-auto flex justify-between items-center relative">
        {/* Logo Section */}
        <div className="flex items-center">
          <img src="/src/assets/CWB logo.png" alt="Logo" className="h-10 w-10 mr-3" />
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-[#303030] hover:bg-white hover:shadow-sm hover:px-5 hover:py-2 hover:rounded-xl transition-all duration-300">Home</a>
          <a href="#" className="text-[#303030] hover:bg-white hover:shadow-sm hover:px-5 hover:py-2 hover:rounded-xl transition-all duration-300">Find Job</a>
          <a href="#" className="text-[#303030] hover:bg-white hover:shadow-sm hover:px-5 hover:py-2 hover:rounded-xl transition-all duration-300">Find Talent</a>
          <a href="#" className="text-[#303030] hover:bg-white hover:shadow-sm hover:px-5 hover:py-2 hover:rounded-xl transition-all duration-300">About us</a>
          <a href="#" className="text-[#303030] hover:bg-white hover:shadow-sm hover:px-5 hover:py-2 hover:rounded-xl transition-all duration-300">Testimonials</a>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="flex md:hidden items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <IonIcon icon={isOpen ? closeOutline : menuOutline} className="w-6 h-6 text-[#303030]" />
          </button>
        </div>

        {/* Desktop Create Job Button */}
        <button
          onClick={onCreateJobClick}
          className="hidden md:block bg-gradient-to-b from-[#A128FF] to-[#6100AD] text-white px-6 py-2 rounded-full text-sm font-medium"
        >
          Create job
        </button>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="absolute top-16 left-0 w-full z-50 bg-white shadow-lg rounded-lg md:hidden">
            <div className="flex flex-col items-center py-4 space-y-4">
              <a href="#" className="block text-[#303030]">Home</a>
              <a href="#" className="block text-[#303030]">Find Job</a>
              <a href="#" className="block text-[#303030]">Find Talent</a>
              <a href="#" className="block text-[#303030]">About us</a>
              <a href="#" className="block text-[#303030]">Testimonials</a>
              <button
                onClick={() => {
                  onCreateJobClick();
                  setIsOpen(false); // close mobile menu
                }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-medium"
              >
                Create job
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
