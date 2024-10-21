import React from "react";
import FriendChatBox from "./FriendChatBox";
import MessagesComp from "./MessagesComp";
import BottomBar from "./BottomBar";

const CenterBar = () => {
  return (
    <div className="col-span-3 h-full border-2 border-black  rounded-2xl bg-white flex flex-col items-center">
      <FriendChatBox />
      <MessagesComp />
      <BottomBar />
    </div>
  );
};

export default CenterBar;
