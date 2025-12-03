import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BsFillTelephoneForwardFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { IoShirtOutline } from "react-icons/io5";
import { FaCarSide } from "react-icons/fa6";
import { CiDiscount1 } from "react-icons/ci";

function Navbar() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setEmail("");
  }
  return (
    <div>
      {/* Part 1  */}
      <div className="bg-gray-200">
        <div
          className="py-6 px-2 sm:px-16 md:px-28 lg:px-44 
          flex flex-col sm:flex-row gap-4 sm:gap-0 
          justify-between items-center sm:items-center"
        >
          <div>
            <p className="text-xl">Sign up to Newsletter</p>
          </div>
          <div>
            <form className="relative w-full sm:w-64 md:w-75 lg:w-96" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Your email address"
                className="bg-white border border-gray-300 py-2 px-5 pr-10 w-full rounded focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* React Icon Button */}
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-black cursor-pointer mr-2"
              >
                <FiSend size={18} />
              </button>
            </form>
          </div>
          <div className="items-center">
            <p className="text-xl">Follow us on</p>
            <div className="flex items-center gap-4 text-xl mt-3 text-gray-600">
              <FaFacebook className="cursor-pointer hover:text-blue-600" />
              <FaInstagram className="cursor-pointer hover:text-pink-600" />
              <FaTwitter className="cursor-pointer hover:text-blue-400" />
              <FaYoutube className="cursor-pointer hover:text-red-600" />
            </div>
          </div>
        </div>
      </div>
      {/* Part 2  */}
      <div className="bg-black py-10 px-8 sm:px-16 md:px-28 lg:px-35 ">
        <div className="text-white grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-15 ">
          <div className="space-y-4 cursor-pointer ">
            <p className="text-xl font-medium">Store Information</p>
            <div className="space-y-5" >
              <p className="flex items-center gap-3 text-gray-400">
                <FaLocationDot size={18} className="mb-3"/>
                Gupta enterprises, kakarahwa bazar, siddharth nagar UP 272206
              </p>
              <p className="flex items-center gap-3 text-gray-400">
                <BsFillTelephoneForwardFill size={18}/>
                +91 6392861704
              </p>
              <p className="flex items-center gap-3 text-gray-400 cursor-pointer">
                <MdEmail size={18}/>
                amit1704gupta@gmail.com 
              </p>
            </div>
          </div>
          <div className="space-y-2 cursor-pointer">
            <p className="text-xl font-medium mb-4">Get to know Us</p>
            <p className="text-gray-400">About us</p>
            <p className="text-gray-400">Term and Policy</p>
            <p className="text-gray-400">Careers</p>
            <p className="text-gray-400">New blog</p>
            <p className="text-gray-400">Contact us</p>
          </div>
          <div className="space-y-2 cursor-pointer">
            <p className="text-xl font-medium mb-4" >Information</p>
            <p className="text-gray-400">Help Center</p>
            <p className="text-gray-400">Press</p>
            <p className="text-gray-400">FAQs</p>
            <p className="text-gray-400">Size Guide</p>
            <p className="text-gray-400">Payments</p>
          </div>
          <div className="space-y-2 cursor-pointer">
            <p className="text-xl font-medium mb-4">Orders & Returns</p>
            <p className="text-gray-400">Track Order</p>
            <p className="text-gray-400">Delivery</p>
            <p className="text-gray-400">Services</p>
            <p className="text-gray-400">Return</p>
            <p className="text-gray-400">Exchange</p>
          </div>
        </div>
        <div className="bg-gray-600 w-full h-px mt-12"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-white mt-12 gap-2">
            <p className="flex items-center text-sm md:text-xl lg:text-2xl gap-2">
                <IoShirtOutline  size={25}/>
                GuptaG
            </p>
            <p className="flex items-center text-sm md:text-xl lg:text-2xl gap-2">
                <BsFillTelephoneForwardFill size={25}/>
                +91 6392861704
            </p>
            <p className="flex items-center text-sm md:text-xl lg:text-2xl gap-2">
                <FaCarSide size={25}/>
                Amount over $ 100
            </p>
            <p className="flex items-center text-sm md:text-xl lg:text-2xl gap-2">
                <CiDiscount1 size={25}/>
                Discount up to 10% 
            </p>
        </div>
        <div className="bg-gray-600 w-full h-px mt-12"></div>
        <p className="text-gray-400 mt-4">© 2025 GuptaG. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Navbar;
