import React from "react";
import chatlogo from "../../assets/chatlogo.png";
import npcilogo from "../../assets/11.png";
import npcitext from "../../assets/22..png";
import CircularImage from "@/app/utilcomponents/CircularImage";
import PrimaryHeading from "@/app/utilcomponents/PrimaryHeading";

const AppLogo = () => {
  return (
    <div className="mt-6  flex items-center justify-center  h-20 w-11/12 gap-4 ">
      {/* <CircularImage url={npcilogo.src} dim="60px" /> */}
      <div
        style={{ width: "280px", height: "100px" }}
        className="m-2"
        // className="rounded-full overflow-hidden "
      >
        <img
          src={npcitext.src}
          className="w-full h-full border-4  border-black  rounded-2xl"
          alt=""
        />
      </div>

      {/* <PrimaryHeading data="Lets Connect" /> */}
    </div>
  );
};

export default AppLogo;
