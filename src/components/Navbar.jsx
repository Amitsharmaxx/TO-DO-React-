import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-violet-800 text-white py-2">
      <div className="logo">
        <span className="font-bold text-xl mx-9">iTask</span>
      </div>
      <ul className="flex gap-10 mx-10">
        <li className="cursor-pointer hover:font-bold transition-all hover:text-lg w-25">Home</li>
        <li className="cursor-pointer hover:font-bold transition-all w-25 hover:text-lg">Your Task</li>
      </ul>
    </nav>
  );
};

export default Navbar;
