import React from "react";
import chatlogo from "../../assets/chatlogo.png";

const AppLogo = () => {
  return (
    <div className="m-2 flex items-center justify-center border-2 h-20 w-11/12">
      <div>
        <img src={chatlogo.src} alt="" />
      </div>
      <div></div>
    </div>
  );
};

export default AppLogo;
