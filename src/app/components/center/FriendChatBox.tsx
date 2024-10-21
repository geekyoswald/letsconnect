import CircularImage from "@/app/utilcomponents/CircularImage";
import React from "react";

import friendPic from "../../assets/pp4.png";
import PrimaryHeading from "@/app/utilcomponents/PrimaryHeading";

const FriendChatBox = () => {
  return (
    <div className="h-24 border-2 w-11/12 rounded-2xl bg-green-200 p-2 border-black m-2 flex justify-start items-center gap-2">
      <CircularImage url={friendPic.src} dim="70px" />
      <p className="font-mono text-3xl font-black text-black">Roger</p>
    </div>
  );
};

export default FriendChatBox;
