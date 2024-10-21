import React from "react";
import { ArrowRight } from "react-feather";

const BottomBar = () => {
  return (
    <div className="border-2 w-11/12 h-20 mt-2 rounded-2xl bg-amber-100 flex items-center justify-between p-4">
      <input
        className="w-3/4 bg-transparent outline-none placeholder-gray-500 text-black p-2"
        placeholder="Type your message..."
      />
      <div className="flex items-center justify-center rounded-full p-4 bg-amber-500 h-12 w-12">
        <ArrowRight />
      </div>
    </div>
  );
};

export default BottomBar;
