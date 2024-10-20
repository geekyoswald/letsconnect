import CircularImage from "@/app/utilcomponents/CircularImage";
import React from "react";

import friend1 from "../../assets/pp1.png";
import friend2 from "../../assets/pp3.png";
import friend3 from "../../assets/pp4.png";
import SecondaryHeading from "@/app/utilcomponents/SecondaryHeading";

const RecentlyContacted = () => {
  return (
    <div className=" w-11/12 h-24 m-2 flex flex-col gap-2">
      <SecondaryHeading data="Recents" />
      <div className="flex items-center justify-start gap-2">
        <CircularImage url={friend1.src} dim="45px" />
        <CircularImage url={friend2.src} dim="45px" />
        <CircularImage url={friend3.src} dim="45px" />
      </div>
    </div>
  );
};

export default RecentlyContacted;
