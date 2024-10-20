import React from "react";
import RecentlyContacted from "./RecentlyContacted";
import Divider from "@/app/utilcomponents/Divider";
import Chats from "./Chats";
import Groups from "./Groups";

const RightBar = () => {
  return (
    <div className="h-full border-2 border-black col-span-1 rounded-2xl bg-cyan-950 flex flex-col items-center">
      <RecentlyContacted />
      <Divider />
      <Chats />
      <Divider />
      <Groups />
    </div>
  );
};

export default RightBar;
