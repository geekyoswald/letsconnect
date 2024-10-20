import FriendBox from "@/app/utilcomponents/FriendBox";
import PrimaryHeading from "@/app/utilcomponents/PrimaryHeading";
import React from "react";
import friend1 from "../../assets/pp7.png";
import friend2 from "../../assets/pp6.png";
import friend3 from "../../assets/pp5.png";
import friend4 from "../../assets/pp4.png";
import friend5 from "../../assets/pp3.png";
import friend6 from "../../assets/pp2.png";

const Chats = () => {
  return (
    <div className=" m-2 h-3/6 w-11/12 ">
      <PrimaryHeading data="Chats" />
      <FriendBox url={friend1.src} name="John" />
      <FriendBox url={friend2.src} name="John" />
      <FriendBox url={friend3.src} name="John" />
      <FriendBox url={friend4.src} name="John" />
      <FriendBox url={friend5.src} name="John" />
      <FriendBox url={friend6.src} name="John" />
    </div>
  );
};

export default Chats;
