import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

function UserLayout() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-white selection:text-black">
      <Navbar />
      <main className="flex-1 bg-black">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default UserLayout;