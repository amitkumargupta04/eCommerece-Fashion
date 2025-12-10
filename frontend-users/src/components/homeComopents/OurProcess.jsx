import React from "react";
import { TbWorld } from "react-icons/tb";
import { TbTruckReturn } from "react-icons/tb";
import { FiPhoneCall } from "react-icons/fi";
import { RiSecurePaymentLine } from "react-icons/ri";

function OurProcess() {
  return (
    <div className="bg-purple-100 px-8 sm:px-10 md:px-14 lg:px-20 py-10 mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
        <div className="flex flex-col items-center justify-center text-center mb-1">
          <TbWorld size={50} className="text-[#35B7A8]" />
          <p className="font-bold mt-1">Worldwide Shipping</p>
          <p className="text-gray-500 mt-1">
            We deliver products to customers across the globe quickly and
            reliably,Enjoy hassle-free international shipping with real-time
            tracking.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center text-center">
          <TbTruckReturn size={50} className="text-[#35B7A8]" />
          <p className="font-bold mt-1">Free Returns</p>
          <p className="text-gray-500 mt-1">
            Customers can return products within a specified period if they are
            unsatisfied or receive damaged items
          </p>
        </div>
        <div className="flex flex-col justify-center items-center text-center">
          <FiPhoneCall size={50} className="text-[#35B7A8]" />
          <p className="font-bold mt-1">24/7 Support</p>
          <p className="text-gray-500 mt-1">
            Our support team is available around the clock to assist customers
            with any inquiries or issues they may have
          </p>
        </div>
        <div className="flex flex-col justify-center items-center text-center">
          <RiSecurePaymentLine size={50} className="text-[#35B7A8]" />
          <p className="font-bold mt-1">Flexible Payment</p>
          <p className="text-gray-500 mt-1">
            We ensure secure payment processing to protect your financial
            information and provide peace of mind
          </p>
        </div>
      </div>
    </div>
  );
}

export default OurProcess;
