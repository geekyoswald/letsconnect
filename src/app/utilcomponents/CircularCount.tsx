import React from "react";
import SmallText from "./SmallText";

interface CircularCountType {
  count: string;
}

const CircularCount = ({ count }: CircularCountType) => {
  return (
    <div className="flex rounded-full items-center justify-center overflow-hidden w-6 h-6 bg-lime-400">
      <SmallText data={count} />
    </div>
  );
};

export default CircularCount;
