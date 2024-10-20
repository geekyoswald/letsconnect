import FriendBox from "@/app/utilcomponents/FriendBox";
import PrimaryHeading from "@/app/utilcomponents/PrimaryHeading";
import React from "react";
import group1 from "../../assets/gr1.png";
import group2 from "../../assets/gr2.png";

const Groups = () => {
  return (
    <div className=" m-2 h-3/6 w-11/12 my-2">
      <PrimaryHeading data="Groups" />
      <FriendBox url={group1.src} name="College Friends" />
      <FriendBox url={group2.src} name="Colleagues" />
    </div>
  );
};

export default Groups;
