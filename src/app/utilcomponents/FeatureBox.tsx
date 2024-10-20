import React from "react";
import SmallText from "./SmallText";
import CircularCount from "./CircularCount";

interface FeatureBoxType {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
  count?: string;
}

const FeatureBox = ({ icon: Icon, text, count }: FeatureBoxType) => {
  return (
    <div className=" w-11/12 h-8 m-2 flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Icon className="text-white" />
        <SmallText data={text} />
      </div>
      <div className="text-white">
        {count && <CircularCount count={count} />}
      </div>
    </div>
  );
};

export default FeatureBox;
