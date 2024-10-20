import React from "react";
import AppLogo from "./AppLogo";
import ProfileSection from "./ProfileSection";
import AppFeatures from "./AppFeatures";
import AppUtilities from "./AppUtilities";
import Divider from "@/app/utilcomponents/Divider";

const LeftBar = () => {
  return (
    <div className="col-span-1 flex flex-col items-center border-2 border-black h-full rounded-2xl bg-cyan-950">
      <AppLogo />
      <ProfileSection />
      <Divider />
      <AppFeatures />
      <Divider />
      <AppUtilities />
    </div>
  );
};

export default LeftBar;
