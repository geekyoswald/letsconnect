import React from "react";

import { ArrowRight } from "react-feather";

const CenterBottom = () => {
  return (
    <div className="border-2 w-11/12 h-12 rounded-2xl p-2 flex justify-between bg-amber-200">
      <input
        type="text"
        className=" bg-transparent outline-none w-10/12"
        placeholder="Please Enter Your Text .."
      />

      <div className="w-8 h-8 flex justify-center rounded-full items-center bg-amber-500">
        <ArrowRight />
      </div>
    </div>
  );
};

export default CenterBottom;
