import React from "react";
import chatlogo from "../../assets/chatlogo.png";
import CircularImage from "@/app/utilcomponents/CircularImage";
import PrimaryHeading from "@/app/utilcomponents/PrimaryHeading";

const AppLogo = () => {
  return (
    <div className="m-2 flex items-center justify-center border-2 h-20 w-11/12 gap-4">
      <CircularImage url={chatlogo.src} dim="40px" />
      <PrimaryHeading data="WeChat" />
    </div>
  );
};

export default AppLogo;
