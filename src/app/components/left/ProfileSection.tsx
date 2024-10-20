import CircularImage from "@/app/utilcomponents/CircularImage";
import React from "react";
import userProfilePic from "../../assets/pp2.png";
import SecondaryHeading from "@/app/utilcomponents/SecondaryHeading";
import SmallText from "@/app/utilcomponents/SmallText";

const ProfileSection = () => {
  return (
    <div className=" m-2 flex flex-col items-center justify-center  h-36 w-11/12">
      <CircularImage url={userProfilePic.src} dim="80px" />
      <SecondaryHeading data="Tina" />
      <SmallText data="Software Developer" />
    </div>
  );
};

export default ProfileSection;
