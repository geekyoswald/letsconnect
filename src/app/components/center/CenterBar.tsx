import React from "react";
import FriendChatBox from "./FriendChatBox";
import MessagesComp from "./MessagesComp";
import CenterBottom from "./CenterBottom";

const CenterBar = () => {
  return (
    <div className="col-span-3 h-full border-2 border-black gap-2 rounded-2xl bg-white flex flex-col items-center">
      <FriendChatBox />
      <MessagesComp />
      <CenterBottom />
    </div>
  );
};

export default CenterBar;
