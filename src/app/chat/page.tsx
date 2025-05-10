import React from "react";
import LeftBar from "../components/left/LeftBar";
import CenterBar from "../components/center/CenterBar";
import RightBar from "../components/right/RightBar";

const page = () => {
  return (
    <div className="w-screen h-screen    ">
      <div className=" h-full  grid grid-cols-5  rounded-2xl">
        <LeftBar />
        <CenterBar />
        {/* <RightBar /> */}
      </div>
    </div>
  );
};

export default page;
