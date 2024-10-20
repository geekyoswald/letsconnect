import FeatureBox from "@/app/utilcomponents/FeatureBox";
import React from "react";
import { Trash, Calendar } from "react-feather";

const AppUtilities = () => {
  return (
    <div className=" m-2 flex flex-col h-52 w-11/12">
      <FeatureBox icon={Trash} text="Bin" />
      <FeatureBox icon={Calendar} text="Calendar" />
    </div>
  );
};

export default AppUtilities;
