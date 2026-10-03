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

function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <footer className="bg-black text-white border-t border-white/10">
      {/* Newsletter Section */}
      <div className="bg-neutral-950 border-b border-white/10">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-6 justify-between items-center">
          <div>
            <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-white">
              Join The Inner Circle
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
              Receive private sales, early access & curated arrivals.
            </p>
          </div>

          <div className="w-full sm:w-auto">
            <form
              className="relative w-full sm:w-80 md:w-96 flex items-center"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                placeholder="Enter your email address..."
                className="bg-black border border-white/20 hover:border-white focus:border-white py-2.5 px-4 pr-12 w-full rounded-xl text-white text-sm placeholder-neutral-500 focus:outline-none transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                <FiSend size={15} />
              </button>
            </form>
          </div>

          <div className="flex items-center gap-4 text-neutral-400">
            <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mr-1">
              Connect:
            </span>
            <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Facebook">
              <FaFacebook size={18} />
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="YouTube">
              <FaYoutube size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h4 className="text-base font-bold uppercase tracking-wider text-white">
              Boutique Information
            </h4>
            <div className="space-y-3 text-sm text-neutral-400">
              <p className="flex items-start gap-3">
                <FaLocationDot size={16} className="mt-1 flex-shrink-0 text-white" />
                <span>FashionX Atelier, Premium Fashion District, Mumbai, India</span>
              </p>
              <p className="flex items-center gap-3">
                <BsFillTelephoneForwardFill size={15} className="flex-shrink-0 text-white" />
                <span>+91 6392861704</span>
              </p>
              <p className="flex items-center gap-3">
                <MdEmail size={16} className="flex-shrink-0 text-white" />
                <span>concierge@fashionx.com</span>
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-base font-bold uppercase tracking-wider text-white">
              The Brand
            </h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><a href="#" className="hover:text-white transition-colors">Our Heritage</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sustainability & Craft</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers & Press</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Private Styling</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-base font-bold uppercase tracking-wider text-white">
              Client Services
            </h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><a href="#" className="hover:text-white transition-colors">Client Support & FAQs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Complimentary Shipping</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Track Your Order</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-base font-bold uppercase tracking-wider text-white">
              Legal & Terms
            </h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Preferences</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Authentication Guarantee</a></li>
            </ul>
          </div>
        </div>

        {/* Feature Highlights Bar */}
        <div className="border-t border-white/10 my-8"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-neutral-300 text-xs sm:text-sm">
          <div className="flex items-center gap-2 justify-center py-2">
            <IoShirtOutline size={20} className="text-white" />
            <span>Curated Haute Couture</span>
          </div>
          <div className="flex items-center gap-2 justify-center py-2">
            <BsFillTelephoneForwardFill size={16} className="text-white" />
            <span>24/7 VIP Concierge</span>
          </div>
          <div className="flex items-center gap-2 justify-center py-2">
            <FaCarSide size={18} className="text-white" />
            <span>Express Global Delivery</span>
          </div>
          <div className="flex items-center gap-2 justify-center py-2">
            <CiDiscount1 size={22} className="text-white" />
            <span>Exclusive VIP Benefits</span>
          </div>
        </div>

        <div className="border-t border-white/10 mt-6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© 2026 FashionX Atelier. All rights reserved.</p>
          <p className="tracking-wider">DESIGNED IN MONOCHROME LUXURY</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
