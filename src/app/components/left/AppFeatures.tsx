import FeatureBox from "@/app/utilcomponents/FeatureBox";
import React from "react";
import { MessageCircle, Globe, Settings, Lock } from "react-feather";

const AppFeatures = () => {
  return (
    <div className=" m-2 flex flex-col  h-80 w-11/12">
      <FeatureBox icon={MessageCircle} text="Messages" count="2" />
      <FeatureBox icon={Globe} text="Language" />
      <FeatureBox icon={Settings} text="Settings" count="2" />
      <FeatureBox icon={Lock} text="Privacy" count="2" />
    </div>
  );
};

export default AppFeatures;
