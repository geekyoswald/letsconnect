import FeatureBox from "@/app/utilcomponents/FeatureBox";
import React from "react";
import { MessageCircle, Globe, Settings, Lock } from "react-feather";

const AppFeatures = () => {
  return (
    <div className=" m-2 flex flex-col  h-80 w-11/12">
      <FeatureBox icon={MessageCircle} text="How Aliens Came ?" count="2" />
      <FeatureBox icon={MessageCircle} text="Python Setup" count="2" />
      <FeatureBox icon={MessageCircle} text="Astrology Maths" />
      <FeatureBox icon={MessageCircle} text="Youtube is going " />
      <FeatureBox icon={MessageCircle} text="Chat GPT vs Deep Seek" count="2" />
      <FeatureBox icon={MessageCircle} text="Amazon is taking .." count="2" />
      <FeatureBox icon={MessageCircle} text="African savannah are .." />
    </div>
  );
};

export default AppFeatures;
